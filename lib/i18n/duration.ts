import type { TranslateParams } from "@/lib/i18n/types";

type Translator = (key: string, params?: TranslateParams) => string;

const MS_PER_SECOND = 1_000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 60 * SECONDS_PER_MINUTE;
const MINUTES_PER_HOUR = 60;
const MINUTES_PER_DAY = 24 * MINUTES_PER_HOUR;
const MS_PER_HOUR = SECONDS_PER_HOUR * MS_PER_SECOND;

type Unit = "day" | "hour" | "minute";

function unit(t: Translator, name: Unit, count: number): string {
  const form = count === 1 ? "One" : "Other";
  return t(`auth.duration.${name}${form}`, { count });
}

/**
 * How long is left, written the way the wait is actually experienced.
 *
 * A wait someone sits through and a wait someone comes back from are not the
 * same thing, and one format cannot serve both. Under an hour the number is a
 * countdown being watched, so it is a clock — `1:50`, ticking, unmistakably
 * moving. That is the whole message: the seconds are not information, they
 * are the proof that something is counting down rather than stuck.
 *
 * Above an hour nobody is watching. The person has closed the tab and will
 * come back, so what they need is a size they can plan around — "1 day", and
 * six hours later "18 hours and 42 minutes". Seconds there are noise
 * pretending to be precision: they change sixty times while the sentence
 * around them stays the same, and reading "64,738 seconds" costs arithmetic
 * to learn something the word "tomorrow" would have said.
 *
 * Every unit here is named for what it counts. The first version of this
 * function had `HOUR` meaning seconds in one line and minutes two lines
 * below, and turned a day into "0 hours and 1440 minutes".
 */
export function formatCountdown(msLeft: number, t: Translator): string {
  const seconds = Math.max(0, Math.ceil(msLeft / MS_PER_SECOND));

  if (seconds < SECONDS_PER_HOUR) {
    const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);
    const rest = seconds % SECONDS_PER_MINUTE;
    return `${minutes}:${String(rest).padStart(2, "0")}`;
  }

  // Rounded up, so a wait never reads as finished while it is still running.
  const totalMinutes = Math.ceil(seconds / SECONDS_PER_MINUTE);
  const days = Math.floor(totalMinutes / MINUTES_PER_DAY);
  const hours = Math.floor((totalMinutes % MINUTES_PER_DAY) / MINUTES_PER_HOUR);
  const minutes = totalMinutes % MINUTES_PER_HOUR;

  if (days > 0) {
    const whole = unit(t, "day", days);
    return hours > 0
      ? t("auth.duration.and", { first: whole, second: unit(t, "hour", hours) })
      : whole;
  }

  const whole = unit(t, "hour", hours);
  return minutes > 0
    ? t("auth.duration.and", { first: whole, second: unit(t, "minute", minutes) })
    : whole;
}

/**
 * How often the countdown above needs redrawing.
 *
 * A clock has to tick every second or it looks frozen. A wait measured in
 * hours changes once a minute at most, and waking a phone every second for a
 * day to redraw the same sentence is a battery cost with nothing on the other
 * side of it.
 */
export function countdownTickMs(msLeft: number): number {
  return msLeft < MS_PER_HOUR ? 1_000 : 30_000;
}
