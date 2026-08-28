import { query, queryOne } from "@/lib/data/postgres/client";
import type {
  AccountingSnapshot,
  FxRate,
  PaymentSettings,
  PaymentWithUser,
  RevenueBucket,
  RevenueSlice,
  SubscriptionWithUser,
} from "@/types";

/**
 * Every figure the admin accounting dashboard shows, gathered in one pass.
 *
 * Revenue is always *net*: gross minus refunds, matched to the month the
 * payment was taken rather than the month a refund landed, so a refunded sale
 * does not leave phantom revenue in the month it happened.
 */

const PAYMENT_WITH_USER = `
  select p.*, u.email as user_email, u.name as user_name
  from payments p
  left join "user" u on u.id = p.user_id
`;

const SUBSCRIPTION_WITH_USER = `
  select s.*, u.email as user_email, u.name as user_name
  from subscriptions s
  left join "user" u on u.id = s.user_id
`;

/**
 * A payment's net contribution. Refunds are subtracted from the payment they
 * belong to, so partial refunds behave and a fully refunded sale nets zero.
 */
const NET_CENTS = `
  (p.amount_eur_cents
   - coalesce((select sum(r.amount_eur_cents) from refunds r where r.payment_id = p.id), 0))
`;

export async function getAccountingSnapshot(): Promise<AccountingSnapshot> {
  const [
    totals,
    months,
    byLanguage,
    byPlan,
    counts,
    mrr,
    churn,
    lapsed,
    expiringSoon,
    recentPayments,
    fxRate,
    settings,
  ] = await Promise.all([
    queryOne<{
      gross: number;
      refunded: number;
      net: number;
      count: number;
      month_net: number;
      month_count: number;
      month_subscribers: number;
      last_month_net: number;
      last_month_count: number;
    }>(`
      select
        coalesce(sum(p.amount_eur_cents), 0)::bigint as gross,
        coalesce((select sum(r.amount_eur_cents) from refunds r), 0)::bigint as refunded,
        coalesce(sum(${NET_CENTS}), 0)::bigint as net,
        count(*)::bigint as count,
        coalesce(sum(${NET_CENTS}) filter (
          where p.paid_at >= date_trunc('month', now())), 0)::bigint as month_net,
        count(*) filter (
          where p.paid_at >= date_trunc('month', now()))::bigint as month_count,
        (select count(*) from subscriptions s
          where s.started_at >= date_trunc('month', now()))::bigint as month_subscribers,
        coalesce(sum(${NET_CENTS}) filter (
          where p.paid_at >= date_trunc('month', now()) - interval '1 month'
            and p.paid_at < date_trunc('month', now())), 0)::bigint as last_month_net,
        count(*) filter (
          where p.paid_at >= date_trunc('month', now()) - interval '1 month'
            and p.paid_at < date_trunc('month', now()))::bigint as last_month_count
      from payments p
      where p.status = 'paid'
    `),

    query<RevenueBucket & { month: string }>(`
      select
        to_char(date_trunc('month', p.paid_at), 'YYYY-MM-01') as month,
        coalesce(sum(p.amount_eur_cents), 0)::bigint as "grossEurCents",
        coalesce(sum(p.amount_eur_cents - ${NET_CENTS}), 0)::bigint as "refundedEurCents",
        coalesce(sum(${NET_CENTS}), 0)::bigint as "netEurCents",
        count(*)::bigint as "paymentCount"
      from payments p
      where p.status = 'paid' and p.paid_at >= date_trunc('month', now()) - interval '11 months'
      group by 1
      order by 1
    `),

    query<RevenueSlice>(`
      select p.language_slug as key,
             coalesce(sum(${NET_CENTS}), 0)::bigint as "netEurCents",
             count(*)::bigint as "paymentCount"
      from payments p
      where p.status = 'paid'
      group by 1
      order by 2 desc
    `),

    query<RevenueSlice>(`
      select p.plan_slug as key,
             coalesce(sum(${NET_CENTS}), 0)::bigint as "netEurCents",
             count(*)::bigint as "paymentCount"
      from payments p
      where p.status = 'paid'
      group by 1
      order by 2 desc
    `),

    queryOne<{
      active_subscribers: number;
      active_subscriptions: number;
      past_due: number;
      canceled_pending: number;
      expired: number;
    }>(`
      select
        count(distinct user_id) filter (where status = 'active')::bigint as active_subscribers,
        count(*) filter (where status = 'active')::bigint as active_subscriptions,
        count(*) filter (where status = 'past_due')::bigint as past_due,
        count(*) filter (where status = 'active' and cancel_at_period_end)::bigint as canceled_pending,
        count(*) filter (where status = 'expired')::bigint as expired
      from subscriptions
    `),

    // Monthly run rate: each active subscription's price spread over the
    // period it was actually bought for, so a quarterly plan contributes a
    // third of its price per month rather than distorting the month it landed.
    queryOne<{ mrr: number }>(`
      select coalesce(sum(
        round(sp.price_eur * (1 - sp.discount_percent / 100.0) * 100)
        / greatest(s.period_months, 1)
      ), 0)::bigint as mrr
      from subscriptions s
      join subscription_plans sp
        on sp.plan_slug = s.plan_slug and sp.language_slug = s.language_slug
      where s.status = 'active'
    `),

    // Churn over the trailing month, against the base that existed at its
    // start — subscriptions created since then were never at risk of churning.
    queryOne<{ ended: number; base: number }>(`
      select
        count(*) filter (
          where ended_at >= now() - interval '1 month')::bigint as ended,
        count(*) filter (
          where started_at < now() - interval '1 month'
            and (ended_at is null or ended_at >= now() - interval '1 month'))::bigint as base
      from subscriptions
    `),

    query<SubscriptionWithUser>(
      `${SUBSCRIPTION_WITH_USER}
       where s.status in ('expired', 'past_due')
       order by coalesce(s.ended_at, s.current_period_end) desc
       limit 25`
    ),

    query<SubscriptionWithUser>(
      `${SUBSCRIPTION_WITH_USER}
       where s.status = 'active'
         and s.current_period_end between now() and now() + interval '7 days'
       order by s.current_period_end asc
       limit 25`
    ),

    query<PaymentWithUser>(
      `${PAYMENT_WITH_USER} order by p.created_at desc limit 25`
    ),

    queryOne<FxRate>(
      `select * from fx_rates where accepted order by fetched_at desc limit 1`
    ),

    queryOne<PaymentSettings>(
      `select * from payment_settings where id = 'default'`
    ),
  ]);

  const activeSubscribers = counts?.active_subscribers ?? 0;
  const netTotal = totals?.net ?? 0;
  const churnBase = churn?.base ?? 0;

  return {
    totals: {
      grossEurCents: totals?.gross ?? 0,
      refundedEurCents: totals?.refunded ?? 0,
      netEurCents: netTotal,
      paymentCount: totals?.count ?? 0,
    },
    thisMonth: {
      netEurCents: totals?.month_net ?? 0,
      paymentCount: totals?.month_count ?? 0,
      newSubscribers: totals?.month_subscribers ?? 0,
    },
    lastMonth: {
      netEurCents: totals?.last_month_net ?? 0,
      paymentCount: totals?.last_month_count ?? 0,
    },
    mrrEurCents: mrr?.mrr ?? 0,
    arpuEurCents: activeSubscribers
      ? Math.round((mrr?.mrr ?? 0) / activeSubscribers)
      : 0,
    counts: {
      activeSubscribers,
      activeSubscriptions: counts?.active_subscriptions ?? 0,
      pastDue: counts?.past_due ?? 0,
      canceledPending: counts?.canceled_pending ?? 0,
      expired: counts?.expired ?? 0,
    },
    churnRatePercent: churnBase
      ? Math.round(((churn?.ended ?? 0) / churnBase) * 1000) / 10
      : 0,
    revenueByMonth: months,
    revenueByLanguage: byLanguage,
    revenueByPlan: byPlan,
    lapsed,
    expiringSoon,
    recentPayments,
    fxRate,
    settings: settings as PaymentSettings,
  };
}
