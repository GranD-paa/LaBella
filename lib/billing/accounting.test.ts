import { describe, expect, it } from "vitest";

import {
  buildAccountingSnapshot,
  monthKey,
  recentMonthKeys,
} from "./accounting";
import type {
  FxRate,
  PaymentSettings,
  PaymentWithUser,
  Refund,
  SubscriptionWithUser,
} from "@/types";

const NOW = new Date("2026-08-04T12:00:00Z");

const SETTINGS: PaymentSettings = {
  id: "default",
  base_currency: "EUR",
  irr_enabled: true,
  fx_source: "tgju",
  fx_margin_percent: 2.5,
  irr_rounding: 10000,
  fx_manual_rate: null,
  fx_max_deviation_percent: 20,
  stripe_enabled: true,
  zarinpal_enabled: true,
  manual_enabled: true,
  grace_period_days: 3,
  enforce_entitlements: false,
  free_cefr_bands: ["A1"],
  free_quiz_retake_limit: 0,
  pending_payment_timeout_minutes: 20,
  updated_at: NOW.toISOString(),
};

const FX: FxRate = {
  id: "fx1",
  base_currency: "EUR",
  quote_currency: "IRR",
  rate: 2_221_600,
  source: "tgju",
  accepted: true,
  rejection_reason: null,
  fetched_at: NOW.toISOString(),
};

let seq = 0;
function payment(over: Partial<PaymentWithUser> = {}): PaymentWithUser {
  seq += 1;
  return {
    id: `pay-${seq}`,
    user_id: "user-1",
    subscription_id: "sub-1",
    plan_slug: "basic",
    language_slug: "italian",
    period_months: 1,
    plan_title: "Basic",
    list_price_eur_cents: 599,
    discount_percent: 0,
    discount_eur_cents: 0,
    amount_eur_cents: 599,
    paid_currency: "EUR",
    paid_amount: 599,
    fx_rate: null,
    fx_source: null,
    provider: "stripe",
    provider_payment_id: `pi-${seq}`,
    provider_ref: null,
    checkout_reference: null,
    status: "succeeded",
    failure_reason: null,
    paid_at: NOW.toISOString(),
    created_at: NOW.toISOString(),
    updated_at: NOW.toISOString(),
    metadata: {},
    user_email: "a@test.local",
    user_name: "A",
    ...over,
  };
}

function subscription(
  over: Partial<SubscriptionWithUser> = {}
): SubscriptionWithUser {
  seq += 1;
  return {
    id: `sub-${seq}`,
    user_id: "user-1",
    plan_slug: "basic",
    language_slug: "italian",
    status: "active",
    current_period_start: "2026-07-15T00:00:00Z",
    current_period_end: "2026-08-15T00:00:00Z",
    anchor_day: 15,
    period_months: 1,
    cancel_at_period_end: false,
    started_at: "2026-07-15T00:00:00Z",
    canceled_at: null,
    ended_at: null,
    created_at: "2026-07-15T00:00:00Z",
    updated_at: "2026-07-15T00:00:00Z",
    user_email: "a@test.local",
    user_name: "A",
    ...over,
  };
}

function build(over: {
  payments?: PaymentWithUser[];
  refunds?: Refund[];
  subscriptions?: SubscriptionWithUser[];
}) {
  return buildAccountingSnapshot({
    payments: over.payments ?? [],
    refunds: over.refunds ?? [],
    subscriptions: over.subscriptions ?? [],
    settings: SETTINGS,
    fxRate: FX,
    now: NOW,
  });
}

describe("monthKey / recentMonthKeys", () => {
  it("buckets by UTC month", () => {
    expect(monthKey("2026-08-04T12:00:00Z")).toBe("2026-08-01");
    expect(monthKey("2026-01-31T23:59:59Z")).toBe("2026-01-01");
  });

  it("returns a contiguous run ending on the current month", () => {
    const keys = recentMonthKeys(NOW, 3);
    expect(keys).toEqual(["2026-06-01", "2026-07-01", "2026-08-01"]);
  });

  it("crosses the year boundary correctly", () => {
    expect(recentMonthKeys(new Date("2026-02-10T00:00:00Z"), 4)).toEqual([
      "2025-11-01",
      "2025-12-01",
      "2026-01-01",
      "2026-02-01",
    ]);
  });
});

describe("revenue", () => {
  it("counts only succeeded payments", () => {
    const snapshot = build({
      payments: [
        payment({ amount_eur_cents: 599 }),
        payment({ amount_eur_cents: 999, status: "pending", paid_at: null }),
        payment({ amount_eur_cents: 999, status: "failed", paid_at: null }),
      ],
    });

    expect(snapshot.totals.grossEurCents).toBe(599);
    expect(snapshot.totals.paymentCount).toBe(1);
  });

  it("counts a Rial payment at the euro value it was priced in", () => {
    // The whole point of storing amount_eur_cents alongside paid_amount:
    // revenue must not swing because the exchange rate moved.
    const snapshot = build({
      payments: [
        payment({
          paid_currency: "IRR",
          paid_amount: 12_280_000,
          amount_eur_cents: 539,
          fx_rate: 2_221_600,
          fx_source: "tgju",
        }),
      ],
    });

    expect(snapshot.totals.grossEurCents).toBe(539);
  });

  it("subtracts refunds from the net total", () => {
    const snapshot = build({
      payments: [payment({ amount_eur_cents: 1000 })],
      refunds: [
        {
          id: "r1",
          payment_id: "pay-1",
          amount_eur_cents: 400,
          reason: "goodwill",
          created_by: null,
          created_at: NOW.toISOString(),
        },
      ],
    });

    expect(snapshot.totals.grossEurCents).toBe(1000);
    expect(snapshot.totals.refundedEurCents).toBe(400);
    expect(snapshot.totals.netEurCents).toBe(600);
  });

  it("splits this month from last month", () => {
    const snapshot = build({
      payments: [
        payment({ amount_eur_cents: 500, paid_at: "2026-08-02T00:00:00Z" }),
        payment({ amount_eur_cents: 300, paid_at: "2026-07-20T00:00:00Z" }),
        payment({ amount_eur_cents: 100, paid_at: "2026-06-20T00:00:00Z" }),
      ],
    });

    expect(snapshot.thisMonth.netEurCents).toBe(500);
    expect(snapshot.lastMonth.netEurCents).toBe(300);
  });

  it("builds a full 12-month series even where there was no revenue", () => {
    const snapshot = build({
      payments: [payment({ amount_eur_cents: 500 })],
    });

    expect(snapshot.revenueByMonth).toHaveLength(12);
    expect(snapshot.revenueByMonth.at(-1)?.month).toBe("2026-08-01");
    expect(snapshot.revenueByMonth.at(-1)?.netEurCents).toBe(500);
    // Empty months must still be present, or the chart would lie about shape.
    expect(snapshot.revenueByMonth[0].netEurCents).toBe(0);
  });

  it("books a refund in the month it was issued, not the month of the sale", () => {
    const snapshot = build({
      payments: [payment({ amount_eur_cents: 1000, paid_at: "2026-07-05T00:00:00Z" })],
      refunds: [
        {
          id: "r1",
          payment_id: "pay-1",
          amount_eur_cents: 1000,
          reason: null,
          created_by: null,
          created_at: "2026-08-02T00:00:00Z",
        },
      ],
    });

    const july = snapshot.revenueByMonth.find((b) => b.month === "2026-07-01");
    const august = snapshot.revenueByMonth.find((b) => b.month === "2026-08-01");
    expect(july?.netEurCents).toBe(1000);
    expect(august?.netEurCents).toBe(-1000);
  });

  it("slices revenue by language and by plan", () => {
    const snapshot = build({
      payments: [
        payment({ language_slug: "italian", plan_slug: "basic", amount_eur_cents: 500 }),
        payment({ language_slug: "italian", plan_slug: "pro", amount_eur_cents: 800 }),
        payment({ language_slug: "english", plan_slug: "basic", amount_eur_cents: 200 }),
      ],
    });

    expect(snapshot.revenueByLanguage).toEqual([
      { key: "italian", netEurCents: 1300, paymentCount: 2 },
      { key: "english", netEurCents: 200, paymentCount: 1 },
    ]);
    expect(snapshot.revenueByPlan[0]).toEqual({
      key: "pro",
      netEurCents: 800,
      paymentCount: 1,
    });
  });
});

describe("subscriber counts", () => {
  it("separates subscribers from subscriptions", () => {
    // One learner paying for three languages is one customer, three products.
    const snapshot = build({
      subscriptions: [
        subscription({ user_id: "u1", language_slug: "italian" }),
        subscription({ user_id: "u1", language_slug: "english" }),
        subscription({ user_id: "u2", language_slug: "italian" }),
      ],
    });

    expect(snapshot.counts.activeSubscribers).toBe(2);
    expect(snapshot.counts.activeSubscriptions).toBe(3);
  });

  it("counts past_due as still subscribed, expired as not", () => {
    const snapshot = build({
      subscriptions: [
        subscription({ user_id: "u1", status: "past_due" }),
        subscription({ user_id: "u2", status: "expired", language_slug: "english" }),
      ],
    });

    expect(snapshot.counts.activeSubscribers).toBe(1);
    expect(snapshot.counts.pastDue).toBe(1);
    expect(snapshot.counts.expired).toBe(1);
  });

  it("flags subscriptions that are set to cancel", () => {
    const snapshot = build({
      subscriptions: [subscription({ cancel_at_period_end: true })],
    });
    expect(snapshot.counts.canceledPending).toBe(1);
  });
});

describe("MRR and ARPU", () => {
  it("uses the price actually last paid, not today's list price", () => {
    const snapshot = build({
      subscriptions: [subscription({ id: "sub-a", user_id: "u1" })],
      payments: [
        payment({ subscription_id: "sub-a", amount_eur_cents: 400, paid_at: "2026-07-01T00:00:00Z" }),
        payment({ subscription_id: "sub-a", amount_eur_cents: 539, paid_at: "2026-08-01T00:00:00Z" }),
      ],
    });

    expect(snapshot.mrrEurCents).toBe(539);
  });

  it("normalises a multi-month payment down to one month", () => {
    const snapshot = build({
      subscriptions: [subscription({ id: "sub-a", user_id: "u1" })],
      payments: [
        payment({
          subscription_id: "sub-a",
          amount_eur_cents: 1200,
          period_months: 12,
        }),
      ],
    });

    expect(snapshot.mrrEurCents).toBe(100);
  });

  it("excludes a subscription that is set to cancel", () => {
    const snapshot = build({
      subscriptions: [
        subscription({ id: "sub-a", user_id: "u1", cancel_at_period_end: true }),
      ],
      payments: [payment({ subscription_id: "sub-a", amount_eur_cents: 599 })],
    });

    expect(snapshot.mrrEurCents).toBe(0);
  });

  it("divides MRR across distinct subscribers for ARPU", () => {
    const snapshot = build({
      subscriptions: [
        subscription({ id: "sub-a", user_id: "u1" }),
        subscription({ id: "sub-b", user_id: "u2", language_slug: "english" }),
      ],
      payments: [
        payment({ subscription_id: "sub-a", amount_eur_cents: 600 }),
        payment({ subscription_id: "sub-b", amount_eur_cents: 400 }),
      ],
    });

    expect(snapshot.mrrEurCents).toBe(1000);
    expect(snapshot.arpuEurCents).toBe(500);
  });

  it("reports zero rather than dividing by zero with no subscribers", () => {
    const snapshot = build({});
    expect(snapshot.mrrEurCents).toBe(0);
    expect(snapshot.arpuEurCents).toBe(0);
  });
});

describe("churn and at-risk reporting", () => {
  it("computes churn against the base it churned out of", () => {
    const snapshot = build({
      subscriptions: [
        subscription({ user_id: "u1" }),
        subscription({ user_id: "u2", language_slug: "english" }),
        subscription({ user_id: "u3", language_slug: "german" }),
        subscription({
          user_id: "u4",
          language_slug: "turkish",
          status: "expired",
          ended_at: "2026-08-02T00:00:00Z",
        }),
      ],
    });

    // 1 lapsed out of a base of 4.
    expect(snapshot.churnRatePercent).toBeCloseTo(25, 5);
  });

  it("ignores lapses from previous months", () => {
    const snapshot = build({
      subscriptions: [
        subscription({ user_id: "u1" }),
        subscription({
          user_id: "u2",
          status: "expired",
          ended_at: "2026-05-02T00:00:00Z",
        }),
      ],
    });

    expect(snapshot.churnRatePercent).toBe(0);
  });

  it("lists everyone who did not renew, recoverable ones first", () => {
    const snapshot = build({
      subscriptions: [
        subscription({ user_id: "u1", status: "active" }),
        subscription({ user_id: "u2", status: "expired", ended_at: "2026-08-01T00:00:00Z" }),
        subscription({ user_id: "u3", status: "past_due" }),
      ],
    });

    expect(snapshot.lapsed).toHaveLength(2);
    expect(snapshot.lapsed[0].status).toBe("past_due");
  });

  it("surfaces active subscriptions ending within a week, soonest first", () => {
    const snapshot = build({
      subscriptions: [
        subscription({ user_id: "u1", current_period_end: "2026-08-09T00:00:00Z" }),
        subscription({
          user_id: "u2",
          language_slug: "english",
          current_period_end: "2026-08-06T00:00:00Z",
        }),
        subscription({
          user_id: "u3",
          language_slug: "german",
          current_period_end: "2026-09-20T00:00:00Z",
        }),
      ],
    });

    expect(snapshot.expiringSoon.map((s) => s.user_id)).toEqual(["u2", "u1"]);
  });

  it("counts subscribers who joined this month", () => {
    const snapshot = build({
      subscriptions: [
        subscription({ user_id: "u1", started_at: "2026-08-01T00:00:00Z" }),
        subscription({
          user_id: "u2",
          language_slug: "english",
          started_at: "2026-06-01T00:00:00Z",
        }),
      ],
    });

    expect(snapshot.thisMonth.newSubscribers).toBe(1);
  });
});
