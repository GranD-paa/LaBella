import { describe, expect, it } from "vitest";

import { countdownTickMs, formatCountdown } from "@/lib/i18n/duration";
import { messages } from "@/lib/i18n/messages";
import { createTranslator } from "@/lib/i18n/translate";

/**
 * The real translator against the real strings, not a stub.
 *
 * A missing key does not throw here — it renders as its own path, so
 * `auth.duration.hourOther` would sit on the screen looking like a bug in
 * someone else's code. Asserting the finished sentence is what catches that.
 */
const t = createTranslator(messages.en);
const fa = createTranslator(messages.fa);

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

describe("formatCountdown — a wait being watched", () => {
  it.each([
    [0, "0:00"],
    [1 * SECOND, "0:01"],
    [9 * SECOND, "0:09"],
    [110 * SECOND, "1:50"],
    [2 * MINUTE, "2:00"],
    [59 * MINUTE + 59 * SECOND, "59:59"],
  ])("writes %i ms as a clock: %s", (ms, expected) => {
    expect(formatCountdown(ms, t)).toBe(expected);
  });

  it("pads the seconds so the width never jumps", () => {
    expect(formatCountdown(61 * SECOND, t)).toBe("1:01");
  });
});

describe("formatCountdown — a wait being come back from", () => {
  it("drops to whole units at the hour, where nobody is watching", () => {
    expect(formatCountdown(HOUR, t)).toBe("1 hour");
  });

  it("says the day plainly", () => {
    expect(formatCountdown(DAY, t)).toBe("1 day");
  });

  it("reads back the remainder six hours later", () => {
    expect(formatCountdown(18 * HOUR + 42 * MINUTE, t)).toBe(
      "18 hours and 42 minutes"
    );
  });

  it("keeps the hours when a day and a bit are left", () => {
    expect(formatCountdown(DAY + 3 * HOUR, t)).toBe("1 day and 3 hours");
  });

  it("says no seconds anywhere above the hour", () => {
    const text = formatCountdown(23 * HOUR + 30 * MINUTE, t);
    expect(text).not.toMatch(/:/);
    expect(text).toBe("23 hours and 30 minutes");
  });

  /**
   * Rounding up carries: a second short of a day is a day, not "23 hours and
   * 60 minutes". Worth pinning, because the carry is the part that breaks.
   */
  it("carries the rounding instead of writing sixty minutes", () => {
    expect(formatCountdown(DAY - SECOND, t)).toBe("1 day");
  });

  it("rounds up, so a live wait never reads as finished", () => {
    expect(formatCountdown(HOUR + 1, t)).toBe("1 hour and 1 minute");
  });

  it("writes Persian without borrowing English plurals", () => {
    expect(fa("auth.duration.dayOne", { count: 1 })).toBe("1 روز");
    expect(formatCountdown(DAY, fa)).toBe("1 روز");
    expect(formatCountdown(18 * HOUR + 42 * MINUTE, fa)).toBe(
      "18 ساعت و 42 دقیقه"
    );
  });
});

describe("countdownTickMs", () => {
  it("ticks every second while the clock is on screen", () => {
    expect(countdownTickMs(90 * SECOND)).toBe(1_000);
  });

  it("slows down once the text stops changing every second", () => {
    expect(countdownTickMs(DAY)).toBe(30_000);
  });
});
