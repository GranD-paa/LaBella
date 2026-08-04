import { describe, expect, it, vi } from "vitest";

import { refreshFxRate } from "./refresh";
import type { FxRateProvider } from "./providers";
import { DEFAULT_PAYMENT_SETTINGS } from "@/lib/billing/defaults";
import type { DataRepository } from "@/lib/data/repository";
import type { FxRate, PaymentSettings } from "@/types";

function fakeRepo(over: {
  settings?: Partial<PaymentSettings>;
  latestRate?: number | null;
}) {
  const recorded: Array<{
    rate: number;
    source: string;
    accepted: boolean;
    rejectionReason?: string;
  }> = [];

  const latest: FxRate | null =
    over.latestRate === null || over.latestRate === undefined
      ? null
      : {
          id: "fx-prev",
          base_currency: "EUR",
          quote_currency: "IRR",
          rate: over.latestRate,
          source: "tgju",
          accepted: true,
          rejection_reason: null,
          fetched_at: new Date().toISOString(),
        };

  const repo = {
    getPaymentSettings: async () => ({
      ...DEFAULT_PAYMENT_SETTINGS,
      ...over.settings,
    }),
    getLatestFxRate: async () => latest,
    recordFxRate: async (input: {
      rate: number;
      source: string;
      accepted: boolean;
      rejectionReason?: string;
    }) => {
      recorded.push(input);
      return {};
    },
  } as unknown as DataRepository;

  return { repo, recorded };
}

function provider(result: Awaited<ReturnType<FxRateProvider["fetchEurToIrr"]>>) {
  return () =>
    ({
      slug: "tgju",
      fetchEurToIrr: async () => result,
    }) satisfies FxRateProvider;
}

describe("refreshFxRate", () => {
  it("applies a plausible new rate", async () => {
    const { repo, recorded } = fakeRepo({ latestRate: 2_221_600 });
    const outcome = await refreshFxRate(
      repo,
      provider({ ok: true, rate: 2_260_000, source: "tgju" })
    );

    expect(outcome).toMatchObject({ status: "applied", rate: 2_260_000 });
    expect(recorded).toEqual([
      { rate: 2_260_000, source: "tgju", accepted: true },
    ]);
  });

  it("accepts the very first rate with no history to compare against", async () => {
    const { repo } = fakeRepo({ latestRate: null });
    const outcome = await refreshFxRate(
      repo,
      provider({ ok: true, rate: 2_221_600, source: "tgju" })
    );

    expect(outcome).toMatchObject({ status: "applied", previousRate: null });
  });

  it("rejects a rate that moved too far, and records it for review", async () => {
    // The Rial-to-Toman unit switch: a 10x drop that would otherwise reprice
    // every Iranian plan to a tenth of its value.
    const { repo, recorded } = fakeRepo({ latestRate: 2_221_600 });
    const outcome = await refreshFxRate(
      repo,
      provider({ ok: true, rate: 222_160, source: "tgju" })
    );

    expect(outcome.status).toBe("rejected");
    expect(recorded[0].accepted).toBe(false);
    expect(recorded[0].rejectionReason).toContain("90.0%");
  });

  it("does not overwrite a manually pinned rate", async () => {
    const { repo, recorded } = fakeRepo({
      settings: { fx_source: "manual", fx_manual_rate: 2_000_000 },
      latestRate: 2_221_600,
    });
    const fetchSpy = vi.fn();

    const outcome = await refreshFxRate(repo, () => ({
      slug: "manual",
      fetchEurToIrr: fetchSpy,
    }));

    expect(outcome).toMatchObject({ status: "skipped" });
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(recorded).toHaveLength(0);
  });

  it("skips entirely when Rial pricing is turned off", async () => {
    const { repo, recorded } = fakeRepo({
      settings: { irr_enabled: false },
      latestRate: 2_221_600,
    });
    const outcome = await refreshFxRate(
      repo,
      provider({ ok: true, rate: 2_260_000, source: "tgju" })
    );

    expect(outcome).toMatchObject({ status: "skipped" });
    expect(recorded).toHaveLength(0);
  });

  it("reports a source failure without touching the stored rate", async () => {
    const { repo, recorded } = fakeRepo({ latestRate: 2_221_600 });
    const outcome = await refreshFxRate(
      repo,
      provider({ ok: false, error: "tgju: HTTP 503" })
    );

    expect(outcome).toMatchObject({ status: "failed", reason: "tgju: HTTP 503" });
    // Yesterday's rate keeps working rather than pricing falling over.
    expect(recorded).toHaveLength(0);
  });

  it("fails loudly on an unknown source rather than pricing off nothing", async () => {
    const { repo } = fakeRepo({ latestRate: 2_221_600 });
    const outcome = await refreshFxRate(repo, () => null);
    expect(outcome.status).toBe("failed");
  });
});
