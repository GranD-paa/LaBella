import type { PaymentSettings, Subscription, SubscriptionTier } from "@/types";

/**
 * The four things a subscription can unlock.
 *
 * The first three mirror the learner-facing category routes in
 * `app/learn/[language]/[level]/[category]`, where `visual` is the video
 * section. `levelExam` is the level-wide comprehensive exam — a quiz in the
 * `level-exam` section — and is not the same thing as the per-lesson quizzes,
 * which stay free for everybody.
 */
export type EntitlementGate = "vocabulary" | "grammar" | "video" | "levelExam";

export type Entitlement = {
  /** False when gating is switched off platform-wide; everything is open. */
  enforced: boolean;
  /** True when this level sits in a CEFR band the admin has made free. */
  freeBand: boolean;
  /** The tier backing the learner's live subscription for this language. */
  tier: SubscriptionTier | null;
  planSlug: string | null;
  unlocks: Record<EntitlementGate, boolean>;
  /** Retakes past the first free attempt. `null` means unlimited. */
  retakeLimit: number | null;
};

const ALL_UNLOCKED: Record<EntitlementGate, boolean> = {
  vocabulary: true,
  grammar: true,
  video: true,
  levelExam: true,
};

/**
 * The CEFR band a level belongs to.
 *
 * Level slugs are shaped `a1-1`, `a2-3`, … so the band is the part before the
 * first dash. This must stay in step with `private.cefr_band_of` in
 * `supabase/migrations/20260813120000_entitlements_and_plan_periods.sql`,
 * which the retake check uses server-side.
 */
export function cefrBandOf(levelSlug: string | null | undefined): string {
  return (levelSlug ?? "").split("-")[0]!.toUpperCase();
}

export function isFreeBand(
  settings: Pick<PaymentSettings, "free_cefr_bands">,
  levelSlug: string | null | undefined
): boolean {
  const band = cefrBandOf(levelSlug);
  if (!band) return false;
  return (settings.free_cefr_bands ?? []).some(
    (entry) => entry.toUpperCase() === band
  );
}

/**
 * What a learner may see, for one language at one level.
 *
 * Three rules decide it, in this order:
 *
 *  1. Gating switched off platform-wide opens everything. The gate ships off
 *     so that turning entitlements on is always a deliberate act, never a
 *     side effect of deploying.
 *
 *  2. A free CEFR band (A1 by default) opens all of its *lesson* content —
 *     that band is the trial experience. The level-wide exam is excluded on
 *     purpose: it is the one paid thing inside the free band.
 *
 *  3. Otherwise the learner's tier decides, and tiers are cumulative by rank
 *     rather than by listing every lower tier's features again.
 *
 * Retakes are handled separately from content and never inherit the free
 * band: retaking a quiz is a paid feature even in A1, so an unsubscribed
 * learner gets `free_quiz_retake_limit` (zero by default) everywhere.
 */
export function resolveEntitlement(input: {
  settings: Pick<
    PaymentSettings,
    "enforce_entitlements" | "free_cefr_bands" | "free_quiz_retake_limit"
  >;
  tiers: SubscriptionTier[];
  subscription: Subscription | null;
  levelSlug: string | null | undefined;
}): Entitlement {
  const { settings, tiers, subscription, levelSlug } = input;

  const tier = subscription
    ? tiers.find((entry) => entry.plan_slug === subscription.plan_slug) ?? null
    : null;

  if (!settings.enforce_entitlements) {
    return {
      enforced: false,
      freeBand: isFreeBand(settings, levelSlug),
      tier,
      planSlug: subscription?.plan_slug ?? null,
      unlocks: { ...ALL_UNLOCKED },
      retakeLimit: null,
    };
  }

  const freeBand = isFreeBand(settings, levelSlug);

  const unlocks: Record<EntitlementGate, boolean> = {
    vocabulary: freeBand || Boolean(tier?.unlocks_vocabulary),
    grammar: freeBand || Boolean(tier?.unlocks_grammar),
    video: freeBand || Boolean(tier?.unlocks_video),
    // Never opened by the free band.
    levelExam: Boolean(tier?.unlocks_level_exam),
  };

  const retakeLimit = tier
    ? tier.quiz_retake_limit
    : settings.free_quiz_retake_limit ?? 0;

  return {
    enforced: true,
    freeBand,
    tier,
    planSlug: subscription?.plan_slug ?? null,
    unlocks,
    retakeLimit,
  };
}

/** The learner-facing category route a gate corresponds to, for upsell links. */
export function gateForCategory(category: string): EntitlementGate | null {
  switch (category) {
    case "vocabulary":
      return "vocabulary";
    case "grammar":
      return "grammar";
    case "visual":
      return "video";
    default:
      return null;
  }
}

/**
 * The cheapest active tier that would unlock a gate, for "upgrade to X" copy.
 * Ranked ascending so the learner is offered the least they have to pay.
 */
export function cheapestTierUnlocking(
  tiers: SubscriptionTier[],
  gate: EntitlementGate
): SubscriptionTier | null {
  const column = {
    vocabulary: "unlocks_vocabulary",
    grammar: "unlocks_grammar",
    video: "unlocks_video",
    levelExam: "unlocks_level_exam",
  }[gate] as keyof SubscriptionTier;

  return (
    [...tiers]
      .sort((a, b) => a.tier_rank - b.tier_rank)
      .find((tier) => Boolean(tier[column])) ?? null
  );
}
