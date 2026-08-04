/**
 * One hourly exchange-rate refresh cycle.
 *
 * Split out from the cron route so the decision logic — which source, is the
 * new rate believable, what gets written — is testable without HTTP.
 */
import { isRateAcceptable } from "@/lib/billing/money";
import { getFxProvider, type FxRateProvider } from "@/lib/billing/fx/providers";
import type { FxRate, PaymentSettings } from "@/types";

/**
 * Only the three operations a refresh actually performs.
 *
 * Narrower than `DataRepository` on purpose: the hourly cron runs without a
 * user session and talks to Supabase with the service role, so it supplies a
 * small purpose-built object rather than a whole repository.
 */
export type FxRateStore = {
  getPaymentSettings(): Promise<PaymentSettings>;
  getLatestFxRate(): Promise<FxRate | null>;
  recordFxRate(input: {
    rate: number;
    source: string;
    accepted: boolean;
    rejectionReason?: string;
  }): Promise<{ error?: string }>;
};

export type FxRefreshOutcome =
  | { status: "skipped"; reason: string }
  | { status: "failed"; reason: string }
  | { status: "rejected"; rate: number; previousRate: number; reason: string }
  | { status: "applied"; rate: number; previousRate: number | null; source: string };

export async function refreshFxRate(
  repo: FxRateStore,
  /** Injectable for tests; defaults to the configured adapter. */
  resolveProvider: (slug: string) => FxRateProvider | null = getFxProvider
): Promise<FxRefreshOutcome> {
  const settings = await repo.getPaymentSettings();

  if (!settings.irr_enabled) {
    return { status: "skipped", reason: "IRR pricing is disabled" };
  }

  // A manually pinned rate is a deliberate override; refreshing over the top
  // of it would silently undo the admin's decision.
  if (settings.fx_source === "manual") {
    return { status: "skipped", reason: "FX source is set to manual" };
  }

  const provider = resolveProvider(settings.fx_source);
  if (!provider) {
    return { status: "failed", reason: `unknown FX source "${settings.fx_source}"` };
  }

  const result = await provider.fetchEurToIrr();
  if (!result.ok) {
    return { status: "failed", reason: result.error };
  }

  const previous = await repo.getLatestFxRate();
  const previousRate = previous?.rate ?? null;

  const acceptance = isRateAcceptable(
    result.rate,
    previousRate,
    settings.fx_max_deviation_percent
  );

  if (!acceptance.accepted) {
    const reason =
      acceptance.reason === "not-positive"
        ? "source returned a non-positive rate"
        : `moved ${acceptance.deviationPercent?.toFixed(1)}% from ${previousRate}, ` +
          `over the ${settings.fx_max_deviation_percent}% limit`;

    // Still recorded, flagged as rejected: pricing ignores it, but an admin
    // can see what the feed claimed and decide whether the market really did
    // move that much.
    await repo.recordFxRate({
      rate: result.rate,
      source: result.source,
      accepted: false,
      rejectionReason: reason,
    });

    return {
      status: "rejected",
      rate: result.rate,
      previousRate: previousRate as number,
      reason,
    };
  }

  const write = await repo.recordFxRate({
    rate: result.rate,
    source: result.source,
    accepted: true,
  });
  if (write.error) {
    return { status: "failed", reason: write.error };
  }

  return {
    status: "applied",
    rate: result.rate,
    previousRate,
    source: result.source,
  };
}
