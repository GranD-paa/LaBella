/**
 * Turns raw ledger rows into the numbers the accounting dashboard shows.
 *
 * Kept as a pure function over plain rows so that both the Supabase and the
 * local repository feed the same logic, and so every figure the business
 * looks at is unit-testable without a database.
 *
 * Reporting rules encoded here:
 *
 *  * Only `succeeded` payments count as revenue. Pending and failed attempts
 *    are traffic, not money.
 *  * Everything is normalised to euro cents. A Rial payment contributes its
 *    `amount_eur_cents`, the euro value it was priced at, so revenue stays
 *    comparable across currencies and is not distorted by later FX moves.
 *  * Refunds are subtracted from the month they were *issued* in, not the
 *    month of the original payment, which is how a cash-basis ledger reads.
 */
import type {
  AccountingSnapshot,
  FxRate,
  Payment,
  PaymentSettings,
  PaymentWithUser,
  Refund,
  RevenueBucket,
  RevenueSlice,
  SubscriptionWithUser,
} from "@/types";

/** `YYYY-MM-01` key for the month a timestamp falls in, in UTC. */
export function monthKey(iso: string | Date): string {
  const date = typeof iso === "string" ? new Date(iso) : iso;
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}-01`;
}

/** The last `count` month keys ending with the month containing `now`. */
export function recentMonthKeys(now: Date, count: number): string[] {
  const keys: string[] = [];
  for (let offset = count - 1; offset >= 0; offset -= 1) {
    const date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1)
    );
    keys.push(monthKey(date));
  }
  return keys;
}

function sumBy<T>(rows: T[], pick: (row: T) => number): number {
  return rows.reduce((total, row) => total + pick(row), 0);
}

function sliceBy(
  payments: Payment[],
  pick: (payment: Payment) => string
): RevenueSlice[] {
  const totals = new Map<string, RevenueSlice>();
  for (const payment of payments) {
    const key = pick(payment);
    const existing = totals.get(key) ?? {
      key,
      netEurCents: 0,
      paymentCount: 0,
    };
    existing.netEurCents += payment.amount_eur_cents;
    existing.paymentCount += 1;
    totals.set(key, existing);
  }
  return Array.from(totals.values()).sort((a, b) => b.netEurCents - a.netEurCents);
}

export type AccountingInput = {
  payments: PaymentWithUser[];
  refunds: Refund[];
  subscriptions: SubscriptionWithUser[];
  settings: PaymentSettings;
  fxRate: FxRate | null;
  now: Date;
  /** How many months the revenue chart covers. */
  monthsOfHistory?: number;
};

export function buildAccountingSnapshot({
  payments,
  refunds,
  subscriptions,
  settings,
  fxRate,
  now,
  monthsOfHistory = 12,
}: AccountingInput): AccountingSnapshot {
  const succeeded = payments.filter(
    (payment) => payment.status === "succeeded" && payment.paid_at !== null
  );

  const grossEurCents = sumBy(succeeded, (p) => p.amount_eur_cents);
  const refundedEurCents = sumBy(refunds, (r) => r.amount_eur_cents);

  const thisMonthKey = monthKey(now);
  const lastMonthKey = monthKey(
    new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1))
  );

  const inMonth = (key: string) =>
    succeeded.filter((p) => monthKey(p.paid_at as string) === key);

  const thisMonthPayments = inMonth(thisMonthKey);
  const lastMonthPayments = inMonth(lastMonthKey);

  // -----------------------------------------------------------------------
  // Revenue over time
  // -----------------------------------------------------------------------
  const buckets = new Map<string, RevenueBucket>();
  for (const key of recentMonthKeys(now, monthsOfHistory)) {
    buckets.set(key, {
      month: key,
      grossEurCents: 0,
      refundedEurCents: 0,
      netEurCents: 0,
      paymentCount: 0,
    });
  }
  for (const payment of succeeded) {
    const bucket = buckets.get(monthKey(payment.paid_at as string));
    if (!bucket) continue; // Older than the chart window.
    bucket.grossEurCents += payment.amount_eur_cents;
    bucket.paymentCount += 1;
  }
  for (const refund of refunds) {
    const bucket = buckets.get(monthKey(refund.created_at));
    if (!bucket) continue;
    bucket.refundedEurCents += refund.amount_eur_cents;
  }
  for (const bucket of Array.from(buckets.values())) {
    bucket.netEurCents = bucket.grossEurCents - bucket.refundedEurCents;
  }

  // -----------------------------------------------------------------------
  // Subscriber counts
  // -----------------------------------------------------------------------
  const active = subscriptions.filter((s) => s.status === "active");
  const pastDue = subscriptions.filter((s) => s.status === "past_due");
  const expired = subscriptions.filter((s) => s.status === "expired");
  const live = [...active, ...pastDue];

  // A learner subscribed to three languages is one subscriber but three
  // subscriptions — the dashboard reports both, because they answer different
  // questions ("how many customers" vs "how many things are being paid for").
  const activeSubscriberIds = new Set(live.map((s) => s.user_id));

  // -----------------------------------------------------------------------
  // MRR: normalise each live subscription to a monthly figure, using the
  // price actually last paid for it rather than today's list price.
  // -----------------------------------------------------------------------
  const latestPaymentBySubscription = new Map<string, Payment>();
  for (const payment of succeeded) {
    if (!payment.subscription_id) continue;
    const existing = latestPaymentBySubscription.get(payment.subscription_id);
    if (
      !existing ||
      new Date(payment.paid_at as string) > new Date(existing.paid_at as string)
    ) {
      latestPaymentBySubscription.set(payment.subscription_id, payment);
    }
  }

  let mrrEurCents = 0;
  for (const subscription of live) {
    // A subscription set to cancel at period end is not recurring revenue.
    if (subscription.cancel_at_period_end) continue;
    const payment = latestPaymentBySubscription.get(subscription.id);
    if (!payment) continue;
    const months = Math.max(1, payment.period_months);
    mrrEurCents += Math.round(payment.amount_eur_cents / months);
  }

  const arpuEurCents =
    activeSubscriberIds.size > 0
      ? Math.round(mrrEurCents / activeSubscriberIds.size)
      : 0;

  // -----------------------------------------------------------------------
  // Churn: subscriptions that lapsed this month, against the base they
  // lapsed out of.
  // -----------------------------------------------------------------------
  const lapsedThisMonth = expired.filter(
    (s) => s.ended_at && monthKey(s.ended_at) === thisMonthKey
  );
  const churnBase = live.length + lapsedThisMonth.length;
  const churnRatePercent =
    churnBase > 0 ? (lapsedThisMonth.length / churnBase) * 100 : 0;

  const newSubscribersThisMonth = subscriptions.filter(
    (s) => monthKey(s.started_at) === thisMonthKey
  ).length;

  // -----------------------------------------------------------------------
  // At-risk and lapsed lists — the "who didn't renew" reporting.
  // -----------------------------------------------------------------------
  const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
  const expiringSoon = active
    .filter((s) => {
      const end = new Date(s.current_period_end).getTime();
      return end >= now.getTime() && end <= now.getTime() + WEEK_MS;
    })
    .sort(
      (a, b) =>
        new Date(a.current_period_end).getTime() -
        new Date(b.current_period_end).getTime()
    );

  // Past-due first: those are still recoverable, expired ones are already gone.
  const lapsed = [...pastDue, ...expired].sort(
    (a, b) =>
      new Date(b.current_period_end).getTime() -
      new Date(a.current_period_end).getTime()
  );

  const recentPayments = [...payments]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 50);

  return {
    totals: {
      grossEurCents,
      refundedEurCents,
      netEurCents: grossEurCents - refundedEurCents,
      paymentCount: succeeded.length,
    },
    thisMonth: {
      netEurCents:
        sumBy(thisMonthPayments, (p) => p.amount_eur_cents) -
        sumBy(
          refunds.filter((r) => monthKey(r.created_at) === thisMonthKey),
          (r) => r.amount_eur_cents
        ),
      paymentCount: thisMonthPayments.length,
      newSubscribers: newSubscribersThisMonth,
    },
    lastMonth: {
      netEurCents:
        sumBy(lastMonthPayments, (p) => p.amount_eur_cents) -
        sumBy(
          refunds.filter((r) => monthKey(r.created_at) === lastMonthKey),
          (r) => r.amount_eur_cents
        ),
      paymentCount: lastMonthPayments.length,
    },
    mrrEurCents,
    arpuEurCents,
    counts: {
      activeSubscribers: activeSubscriberIds.size,
      activeSubscriptions: active.length,
      pastDue: pastDue.length,
      canceledPending: live.filter((s) => s.cancel_at_period_end).length,
      expired: expired.length,
    },
    churnRatePercent,
    revenueByMonth: Array.from(buckets.values()),
    revenueByLanguage: sliceBy(succeeded, (p) => p.language_slug),
    revenueByPlan: sliceBy(succeeded, (p) => p.plan_slug),
    lapsed,
    expiringSoon,
    recentPayments,
    fxRate,
    settings,
  };
}
