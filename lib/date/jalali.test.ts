import { describe, expect, it } from "vitest";

import {
  gregorianToJalali,
  isJalaliLeapYear,
  isValidJalaliDate,
  isoDateToJalali,
  jalaliMonthLength,
  jalaliToGregorian,
  jalaliToISODate,
} from "./jalali";

/**
 * An independent second opinion. Node ships the Persian calendar in `Intl`,
 * which knows nothing about the arithmetic in `jalali.ts`, so agreeing with it
 * across thousands of dates is a much stronger claim than a handful of
 * anchors a transcription error could survive.
 */
const persian = new Intl.DateTimeFormat("en-u-ca-persian", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  timeZone: "UTC",
});

function jalaliViaIntl(date: Date): { jy: number; jm: number; jd: number } {
  const parts = persian.formatToParts(date);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { jy: get("year"), jm: get("month"), jd: get("day") };
}

describe("gregorianToJalali", () => {
  it("agrees with the Persian calendar in Intl across forty years of dates", () => {
    const start = Date.UTC(1990, 0, 1);
    const end = Date.UTC(2030, 0, 1);
    const disagreements: string[] = [];

    for (let t = start; t < end; t += 24 * 60 * 60 * 1000) {
      const date = new Date(t);
      const ours = gregorianToJalali(
        date.getUTCFullYear(),
        date.getUTCMonth() + 1,
        date.getUTCDate()
      );
      const theirs = jalaliViaIntl(date);
      if (ours.jy !== theirs.jy || ours.jm !== theirs.jm || ours.jd !== theirs.jd) {
        disagreements.push(
          `${date.toISOString().slice(0, 10)}: ours ${ours.jy}/${ours.jm}/${ours.jd}, Intl ${theirs.jy}/${theirs.jm}/${theirs.jd}`
        );
      }
    }

    expect(disagreements.slice(0, 5)).toEqual([]);
  });

  it("puts Nowruz where the calendar does", () => {
    expect(gregorianToJalali(2025, 3, 21)).toEqual({ jy: 1404, jm: 1, jd: 1 });
    expect(gregorianToJalali(2024, 3, 20)).toEqual({ jy: 1403, jm: 1, jd: 1 });
  });
});

describe("jalaliToGregorian", () => {
  it("is the exact inverse across forty years", () => {
    const start = Date.UTC(1990, 0, 1);
    const end = Date.UTC(2030, 0, 1);

    for (let t = start; t < end; t += 24 * 60 * 60 * 1000) {
      const date = new Date(t);
      const gy = date.getUTCFullYear();
      const gm = date.getUTCMonth() + 1;
      const gd = date.getUTCDate();
      const { jy, jm, jd } = gregorianToJalali(gy, gm, gd);
      expect(jalaliToGregorian(jy, jm, jd)).toEqual({ gy, gm, gd });
    }
  });

  it("handles the last day of a leap Esfand", () => {
    expect(isJalaliLeapYear(1403)).toBe(true);
    expect(jalaliToGregorian(1403, 12, 30)).toEqual({ gy: 2025, gm: 3, gd: 20 });
  });

  it("handles the last day of a common Esfand", () => {
    expect(isJalaliLeapYear(1404)).toBe(false);
    expect(jalaliToGregorian(1404, 12, 29)).toEqual({ gy: 2026, gm: 3, gd: 20 });
  });
});

describe("jalaliMonthLength", () => {
  it("gives 31 days to the first six months", () => {
    for (let jm = 1; jm <= 6; jm += 1) {
      expect(jalaliMonthLength(1403, jm)).toBe(31);
    }
  });

  it("gives 30 days to Mehr through Bahman", () => {
    for (let jm = 7; jm <= 11; jm += 1) {
      expect(jalaliMonthLength(1403, jm)).toBe(30);
    }
  });

  it("gives Esfand 30 days only in a leap year", () => {
    expect(jalaliMonthLength(1403, 12)).toBe(30);
    expect(jalaliMonthLength(1404, 12)).toBe(29);
  });
});

describe("isValidJalaliDate", () => {
  it("refuses the thirtieth of a common Esfand", () => {
    expect(isValidJalaliDate(1404, 12, 30)).toBe(false);
    expect(isValidJalaliDate(1403, 12, 30)).toBe(true);
  });

  it.each([
    [1404, 0, 1],
    [1404, 13, 1],
    [1404, 1, 0],
    [1404, 1, 32],
    [1100, 1, 1],
    [1404.5, 1, 1],
  ])("refuses %i/%i/%i", (jy, jm, jd) => {
    expect(isValidJalaliDate(jy, jm, jd)).toBe(false);
  });
});

describe("jalaliToISODate", () => {
  it("pads to the shape a Postgres date column takes", () => {
    expect(jalaliToISODate(1375, 5, 12)).toBe("1996-08-02");
    expect(jalaliToISODate(1404, 1, 1)).toBe("2025-03-21");
  });
});

describe("isoDateToJalali", () => {
  it("reads back what was stored", () => {
    expect(isoDateToJalali("1996-08-02")).toEqual({ jy: 1375, jm: 5, jd: 12 });
  });

  it("ignores a time suffix", () => {
    expect(isoDateToJalali("1996-08-02T00:00:00.000Z")).toEqual({
      jy: 1375,
      jm: 5,
      jd: 12,
    });
  });

  it("returns null for something that is not a date", () => {
    expect(isoDateToJalali("nope")).toBeNull();
  });
});
