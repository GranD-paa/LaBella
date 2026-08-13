import type { PaymentSettings, SubscriptionTier } from "@/types";

/**
 * Fallback billing configuration.
 *
 * Used by the local development repository, and as a safety net in the
 * Supabase repository for the window between deploying this code and running
 * the billing migration — without it the subscription page would 500 instead
 * of simply showing euro-only pricing.
 *
 * Gateways default to off: a half-configured gateway that silently accepts
 * checkouts is worse than one that is visibly unavailable.
 */
export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  id: "default",
  base_currency: "EUR",
  irr_enabled: true,
  fx_source: "tgju",
  // Covers the spread between the quoted market rate and what actually
  // settles, plus gateway fees.
  fx_margin_percent: 2.5,
  // 1 means no rounding: the Rial price is whatever the exchange rate actually
  // works out to, down to the Rial. Iranian storefronts conventionally round to
  // a clean 10,000 (1,000 Toman), but an exact figure was the explicit
  // requirement here. Rial is still a whole number, because that is the only
  // unit the gateways accept.
  irr_rounding: 1,
  fx_manual_rate: null,
  fx_max_deviation_percent: 20,
  stripe_enabled: false,
  zarinpal_enabled: false,
  manual_enabled: true,
  grace_period_days: 3,
  // Off by default, and off in the pre-migration fallback: content gating must
  // never switch itself on just because code was deployed.
  enforce_entitlements: false,
  // A1 is the trial experience — every lesson in it is free.
  free_cefr_bands: ["A1"],
  // One free attempt per quiz for everyone; retaking it is a paid feature.
  free_quiz_retake_limit: 0,
  pending_payment_timeout_minutes: 20,
  updated_at: new Date(0).toISOString(),
};

/**
 * Fallback tier capabilities, mirroring the seed in
 * `supabase/migrations/20260813120000_entitlements_and_plan_periods.sql`.
 *
 * Same safety-net role as the settings above: without it, the learn routes
 * would have no capability rows to consult in the window between deploying
 * and migrating. It is only ever consulted while `enforce_entitlements` is
 * false, so these values gate nothing on their own.
 */
export const DEFAULT_SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    plan_slug: "basic",
    tier_rank: 1,
    unlocks_vocabulary: true,
    unlocks_grammar: false,
    unlocks_video: false,
    unlocks_level_exam: true,
    quiz_retake_limit: 3,
    updated_at: new Date(0).toISOString(),
  },
  {
    plan_slug: "pro",
    tier_rank: 2,
    unlocks_vocabulary: true,
    unlocks_grammar: true,
    unlocks_video: false,
    unlocks_level_exam: true,
    quiz_retake_limit: null,
    updated_at: new Date(0).toISOString(),
  },
  {
    plan_slug: "ultimate",
    tier_rank: 3,
    unlocks_vocabulary: true,
    unlocks_grammar: true,
    unlocks_video: true,
    unlocks_level_exam: true,
    quiz_retake_limit: null,
    updated_at: new Date(0).toISOString(),
  },
  {
    plan_slug: "elite",
    tier_rank: 4,
    unlocks_vocabulary: true,
    unlocks_grammar: true,
    unlocks_video: true,
    unlocks_level_exam: true,
    quiz_retake_limit: null,
    updated_at: new Date(0).toISOString(),
  },
];
