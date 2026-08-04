/**
 * Billing period arithmetic.
 *
 * Subscription dates look trivial until the end of the month: a subscription
 * that starts on 31 January cannot renew on 31 February, and naively clamping
 * to the 28th permanently drags every later renewal to the 28th — the
 * customer quietly loses three days a year, forever. So renewals are computed
 * from a stored *anchor day* (the day-of-month the subscription originally
 * started on) rather than from the previous period's end date.
 */

export type SubscriptionStatus =
  | "active"
  | "past_due"
  | "canceled"
  | "expired";

/** Statuses that still grant the learner access to paid content. */
export const ENTITLED_STATUSES: readonly SubscriptionStatus[] = [
  "active",
  // A failed renewal keeps access during the grace window — locking someone
  // out over a card that expired, before we have even retried, costs more in
  // churn than the few days of service it saves.
  "past_due",
];

function daysInUtcMonth(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

/**
 * Adds whole months in UTC, clamping to the last day of the target month.
 *
 * `anchorDay` is the day-of-month the subscription originally started on. Pass
 * it so that a subscription anchored on the 31st renews 31 → 28 Feb → 31 Mar
 * instead of collapsing to the 28th permanently.
 */
export function addBillingMonths(
  from: Date,
  months: number,
  anchorDay?: number
): Date {
  const year = from.getUTCFullYear();
  const monthIndex = from.getUTCMonth();
  const day = anchorDay ?? from.getUTCDate();

  const targetMonthIndex = monthIndex + months;
  const targetYear = year + Math.floor(targetMonthIndex / 12);
  const normalizedMonth = ((targetMonthIndex % 12) + 12) % 12;

  const clampedDay = Math.min(day, daysInUtcMonth(targetYear, normalizedMonth));

  return new Date(
    Date.UTC(
      targetYear,
      normalizedMonth,
      clampedDay,
      from.getUTCHours(),
      from.getUTCMinutes(),
      from.getUTCSeconds(),
      from.getUTCMilliseconds()
    )
  );
}

export type BillingPeriod = {
  start: Date;
  end: Date;
};

/**
 * Works out the period a successful payment should buy.
 *
 * If the subscription is still running, the new period is stacked on top of
 * the existing one so paying early never burns the days already bought. If it
 * lapsed, the clock restarts from the payment — a customer who comes back
 * after three months away is not owed the three months they did not pay for.
 */
export function computeRenewalPeriod({
  currentPeriodEnd,
  months,
  anchorDay,
  now,
}: {
  currentPeriodEnd: Date | null;
  months: number;
  anchorDay?: number;
  now: Date;
}): BillingPeriod {
  const stillRunning =
    currentPeriodEnd !== null && currentPeriodEnd.getTime() > now.getTime();
  const start = stillRunning ? currentPeriodEnd : now;

  return {
    start,
    end: addBillingMonths(start, months, anchorDay),
  };
}

/** The moment access is actually cut off, once the grace window is spent. */
export function computeGraceDeadline(
  periodEnd: Date,
  gracePeriodDays: number
): Date {
  return new Date(periodEnd.getTime() + gracePeriodDays * 24 * 60 * 60 * 1000);
}

/**
 * The status a subscription *should* have right now, given only its dates.
 *
 * The sweeper cron reconciles stored status against this, which keeps the
 * "who lapsed" reporting honest even if a webhook was missed or the cron
 * skipped a night: the answer is derived from dates, not from whether some
 * background job happened to run.
 */
export function resolveStatusFromDates({
  storedStatus,
  currentPeriodEnd,
  gracePeriodDays,
  now,
}: {
  storedStatus: SubscriptionStatus;
  currentPeriodEnd: Date;
  gracePeriodDays: number;
  now: Date;
}): SubscriptionStatus {
  // A deliberate cancellation is a decision, not a date — never revive it.
  if (storedStatus === "canceled" || storedStatus === "expired") {
    return storedStatus;
  }

  if (now.getTime() <= currentPeriodEnd.getTime()) {
    return "active";
  }

  const graceDeadline = computeGraceDeadline(currentPeriodEnd, gracePeriodDays);
  return now.getTime() <= graceDeadline.getTime() ? "past_due" : "expired";
}

/** Whether a subscription in this state should unlock paid content. */
export function isEntitled(status: SubscriptionStatus): boolean {
  return ENTITLED_STATUSES.includes(status);
}

/** Whole days from `now` until the period ends; negative once it has passed. */
export function daysUntil(target: Date, now: Date): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  return Math.ceil((target.getTime() - now.getTime()) / MS_PER_DAY);
}
