/**
 * When the exchange-rate refresh is due.
 *
 * Pure date arithmetic, no I/O, so the timing rules can be tested without
 * waiting a day for a timer to fire.
 */

/**
 * Iran sits at UTC+3:30 all year — daylight saving was abolished in 2022, so a
 * fixed offset is correct rather than a convenient approximation.
 */
const TEHRAN_OFFSET_MINUTES = 3 * 60 + 30;

/** 13:00 Tehran, chosen because the free-market rate is set earlier in the day. */
export const REFRESH_HOUR_TEHRAN = 13;
export const REFRESH_MINUTE_TEHRAN = 0;

const DAY_MS = 24 * 60 * 60 * 1000;

/** The run instant for the Tehran day that `now` falls in. */
function runInstantForSameDay(now: Date): number {
  const tehranNow = new Date(now.getTime() + TEHRAN_OFFSET_MINUTES * 60_000);

  const tehranMidnightUtcMs = Date.UTC(
    tehranNow.getUTCFullYear(),
    tehranNow.getUTCMonth(),
    tehranNow.getUTCDate()
  );

  return (
    tehranMidnightUtcMs -
    TEHRAN_OFFSET_MINUTES * 60_000 +
    REFRESH_HOUR_TEHRAN * 60 * 60_000 +
    REFRESH_MINUTE_TEHRAN * 60_000
  );
}

/** The next run strictly after `now`. */
export function nextRunAfter(now: Date): Date {
  const candidate = runInstantForSameDay(now);
  return new Date(candidate > now.getTime() ? candidate : candidate + DAY_MS);
}

/** The most recent run at or before `now`. */
export function lastRunAtOrBefore(now: Date): Date {
  const candidate = runInstantForSameDay(now);
  return new Date(candidate <= now.getTime() ? candidate : candidate - DAY_MS);
}

export function millisecondsUntilNextRun(now: Date): number {
  return nextRunAfter(now).getTime() - now.getTime();
}

/**
 * Whether a refresh was missed and should run now instead of waiting.
 *
 * A container that is redeployed or restarted loses its in-memory timer, so
 * without this a deploy at 12:59 would skip that day's rate entirely. Comparing
 * against the stored timestamp rather than a flag means a restart loop cannot
 * hammer the source: once today's rate is in, the answer is no.
 */
export function isRefreshOverdue(
  now: Date,
  lastFetchedAt: string | Date | null
): boolean {
  if (!lastFetchedAt) return true;

  const fetched =
    lastFetchedAt instanceof Date ? lastFetchedAt : new Date(lastFetchedAt);
  if (Number.isNaN(fetched.getTime())) return true;

  return fetched.getTime() < lastRunAtOrBefore(now).getTime();
}
