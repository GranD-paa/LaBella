import { describe, expect, it } from "vitest";

import {
  cefrBandOf,
  cheapestTierUnlocking,
  resolveEntitlement,
} from "@/lib/entitlements";
import type { PaymentSettings, Subscription, SubscriptionTier } from "@/types";

function tier(
  plan_slug: string,
  tier_rank: number,
  overrides: Partial<SubscriptionTier> = {}
): SubscriptionTier {
  return {
    plan_slug,
    tier_rank,
    unlocks_vocabulary: true,
    unlocks_grammar: false,
    unlocks_video: false,
    unlocks_level_exam: true,
    quiz_retake_limit: 3,
    updated_at: "2026-08-13T00:00:00Z",
    ...overrides,
  };
}

const TIERS: SubscriptionTier[] = [
  tier("basic", 1),
  tier("pro", 2, { unlocks_grammar: true, quiz_retake_limit: null }),
  tier("ultimate", 3, {
    unlocks_grammar: true,
    unlocks_video: true,
    quiz_retake_limit: null,
  }),
];

function settings(
  overrides: Partial<PaymentSettings> = {}
): Pick<
  PaymentSettings,
  "enforce_entitlements" | "free_cefr_bands" | "free_quiz_retake_limit"
> {
  return {
    enforce_entitlements: true,
    free_cefr_bands: ["A1"],
    free_quiz_retake_limit: 0,
    ...overrides,
  };
}

function subscription(plan_slug: string): Subscription {
  return {
    id: "sub-1",
    user_id: "user-1",
    plan_slug,
    language_slug: "italian",
    status: "active",
  } as Subscription;
}

describe("cefrBandOf", () => {
  it("reads the band off a level slug", () => {
    expect(cefrBandOf("a1-1")).toBe("A1");
    expect(cefrBandOf("a2-10")).toBe("A2");
    expect(cefrBandOf("b1-3")).toBe("B1");
  });

  it("survives missing input rather than throwing", () => {
    expect(cefrBandOf(null)).toBe("");
    expect(cefrBandOf(undefined)).toBe("");
  });
});

describe("resolveEntitlement", () => {
  it("opens everything while the master switch is off", () => {
    const result = resolveEntitlement({
      settings: settings({ enforce_entitlements: false }),
      tiers: TIERS,
      subscription: null,
      levelSlug: "b1-2",
    });

    expect(result.enforced).toBe(false);
    expect(result.unlocks).toEqual({
      vocabulary: true,
      grammar: true,
      video: true,
      levelExam: true,
    });
    // Unlimited, exactly as retakes behaved before entitlements existed.
    expect(result.retakeLimit).toBeNull();
  });

  it("opens all lesson content in a free band to a learner with no subscription", () => {
    const result = resolveEntitlement({
      settings: settings(),
      tiers: TIERS,
      subscription: null,
      levelSlug: "a1-4",
    });

    expect(result.freeBand).toBe(true);
    expect(result.unlocks.vocabulary).toBe(true);
    expect(result.unlocks.grammar).toBe(true);
    expect(result.unlocks.video).toBe(true);
  });

  it("keeps the level exam paid inside the free band", () => {
    const result = resolveEntitlement({
      settings: settings(),
      tiers: TIERS,
      subscription: null,
      levelSlug: "a1-4",
    });

    expect(result.unlocks.levelExam).toBe(false);
  });

  it("keeps retakes paid inside the free band", () => {
    const free = resolveEntitlement({
      settings: settings(),
      tiers: TIERS,
      subscription: null,
      levelSlug: "a1-1",
    });
    expect(free.retakeLimit).toBe(0);

    const basic = resolveEntitlement({
      settings: settings(),
      tiers: TIERS,
      subscription: subscription("basic"),
      levelSlug: "a1-1",
    });
    expect(basic.retakeLimit).toBe(3);
  });

  it("gates paid bands by tier", () => {
    const basic = resolveEntitlement({
      settings: settings(),
      tiers: TIERS,
      subscription: subscription("basic"),
      levelSlug: "a2-1",
    });
    expect(basic.unlocks.vocabulary).toBe(true);
    expect(basic.unlocks.grammar).toBe(false);
    expect(basic.unlocks.video).toBe(false);
    expect(basic.unlocks.levelExam).toBe(true);

    const pro = resolveEntitlement({
      settings: settings(),
      tiers: TIERS,
      subscription: subscription("pro"),
      levelSlug: "a2-1",
    });
    expect(pro.unlocks.grammar).toBe(true);
    expect(pro.unlocks.video).toBe(false);
    expect(pro.retakeLimit).toBeNull();

    const ultimate = resolveEntitlement({
      settings: settings(),
      tiers: TIERS,
      subscription: subscription("ultimate"),
      levelSlug: "a2-1",
    });
    expect(ultimate.unlocks.video).toBe(true);
  });

  it("locks a paid band completely for an unsubscribed learner", () => {
    const result = resolveEntitlement({
      settings: settings(),
      tiers: TIERS,
      subscription: null,
      levelSlug: "b2-1",
    });

    expect(result.unlocks).toEqual({
      vocabulary: false,
      grammar: false,
      video: false,
      levelExam: false,
    });
  });

  it("falls back to no capabilities when a subscription names an unknown tier", () => {
    // A tier row deleted from under a live subscription must fail closed
    // rather than grant everything.
    const result = resolveEntitlement({
      settings: settings(),
      tiers: TIERS,
      subscription: subscription("removed-tier"),
      levelSlug: "a2-1",
    });

    expect(result.tier).toBeNull();
    expect(result.unlocks.vocabulary).toBe(false);
    expect(result.retakeLimit).toBe(0);
  });

  it("honours extra free bands the admin adds", () => {
    const result = resolveEntitlement({
      settings: settings({ free_cefr_bands: ["A1", "A2"] }),
      tiers: TIERS,
      subscription: null,
      levelSlug: "a2-7",
    });

    expect(result.freeBand).toBe(true);
    expect(result.unlocks.grammar).toBe(true);
  });
});

describe("cheapestTierUnlocking", () => {
  it("offers the least the learner has to buy", () => {
    expect(cheapestTierUnlocking(TIERS, "vocabulary")?.plan_slug).toBe("basic");
    expect(cheapestTierUnlocking(TIERS, "grammar")?.plan_slug).toBe("pro");
    expect(cheapestTierUnlocking(TIERS, "video")?.plan_slug).toBe("ultimate");
  });

  it("returns null when nothing unlocks the gate", () => {
    const noVideo = TIERS.map((entry) => ({ ...entry, unlocks_video: false }));
    expect(cheapestTierUnlocking(noVideo, "video")).toBeNull();
  });
});
