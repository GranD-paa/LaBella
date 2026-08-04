import type { PaymentSettings } from "@/types";

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
  // Rial prices land on a clean 10,000 (1,000 Toman), as Iranian storefronts
  // are expected to.
  irr_rounding: 10_000,
  fx_manual_rate: null,
  fx_max_deviation_percent: 20,
  stripe_enabled: false,
  zarinpal_enabled: false,
  manual_enabled: true,
  grace_period_days: 3,
  updated_at: new Date(0).toISOString(),
};
