/**
 * Tehran time, in one place.
 *
 * Iran is UTC+3:30 and has observed no daylight saving since 2022, so the
 * offset is a constant rather than a lookup — the same reasoning
 * `app/api/cron/fx-rate/route.ts` already spells out for the currency job.
 *
 * This matters more than it looks. `blog_topics.scheduled_for` is a
 * `timestamptz`, the container's clock is UTC, and ArvanCloud's CronJobs are
 * Kubernetes CronJobs, which are also UTC. Three UTC surfaces and one human
 * who thinks in Tehran time is exactly the arrangement that publishes a post
 * at half past nine in the morning and nobody can say why.
 */

/** Minutes Tehran runs ahead of UTC. Fixed: no DST since 2022. */
const TEHRAN_OFFSET_MINUTES = 3 * 60 + 30;

/** The hour the blog publishes, Tehran time. */
export const PUBLISH_HOUR_TEHRAN = 13;
export const PUBLISH_MINUTE_TEHRAN = 0;

/**
 * The instant that a given Tehran wall-clock time falls on.
 *
 * `year`/`month`/`day` are read as Tehran calendar values; the returned Date
 * is the same instant expressed in UTC, which is what the database stores.
 */
export function tehranTimeToInstant(
  year: number,
  month: number,
  day: number,
  hour = PUBLISH_HOUR_TEHRAN,
  minute = PUBLISH_MINUTE_TEHRAN
): Date {
  return new Date(
    Date.UTC(year, month - 1, day, hour, minute) -
      TEHRAN_OFFSET_MINUTES * 60_000
  );
}

/**
 * The cron expression that fires at a Tehran wall-clock time.
 *
 * 13:00 Tehran is 09:30 UTC, so the answer for the blog's slot is
 * `30 9 * * *` — not the `0 13 * * *` that reads correctly and runs three and
 * a half hours late.
 */
export function tehranDailyCron(
  hour = PUBLISH_HOUR_TEHRAN,
  minute = PUBLISH_MINUTE_TEHRAN
): string {
  const total = hour * 60 + minute - TEHRAN_OFFSET_MINUTES;
  // Rolling backwards past midnight is normal for anything before 03:30
  // Tehran, and the day-of-month field stays `*` either way: a daily job that
  // fires at 22:30 UTC still fires once every 24 hours.
  const wrapped = ((total % 1440) + 1440) % 1440;
  return `${wrapped % 60} ${Math.floor(wrapped / 60)} * * *`;
}

/**
 * Slots for a run of consecutive days, starting tomorrow.
 *
 * Used when the author pastes a month of subjects and wants them spread one
 * per day without typing thirty dates. Starting tomorrow rather than today
 * because a list pasted at four in the afternoon would otherwise have its
 * first slot already in the past, and the agent would publish two posts on
 * its next tick.
 */
export function dailySlots(count: number, from = new Date()): Date[] {
  const slots: Date[] = [];
  for (let index = 1; index <= count; index += 1) {
    const day = new Date(from);
    day.setUTCDate(day.getUTCDate() + index);
    slots.push(
      tehranTimeToInstant(
        day.getUTCFullYear(),
        day.getUTCMonth() + 1,
        day.getUTCDate()
      )
    );
  }
  return slots;
}

/**
 * The Tehran calendar day an instant falls on.
 *
 * The panel schedules by day, and "the day after the last queued subject"
 * has to be counted in Tehran days: a slot at 01:00 Tehran is still the
 * previous day in UTC.
 */
export function tehranCalendarDay(instant: Date): {
  year: number;
  month: number;
  day: number;
} {
  const shifted = new Date(instant.getTime() + TEHRAN_OFFSET_MINUTES * 60_000);
  return {
    year: shifted.getUTCFullYear(),
    month: shifted.getUTCMonth() + 1,
    day: shifted.getUTCDate(),
  };
}
