import { describe, expect, it } from "vitest";

import {
  isRefreshOverdue,
  lastRunAtOrBefore,
  millisecondsUntilNextRun,
  nextRunAfter,
} from "@/lib/billing/fx/schedule";

/** 13:00 Tehran is 09:30 UTC, all year. */
const RUN_UTC = "09:30:00.000Z";

describe("nextRunAfter", () => {
  it("picks today's slot when the day is still young", () => {
    expect(nextRunAfter(new Date("2026-09-18T06:00:00Z")).toISOString()).toBe(
      `2026-09-18T${RUN_UTC}`
    );
  });

  it("rolls to tomorrow once the slot has passed", () => {
    expect(nextRunAfter(new Date("2026-09-18T09:31:00Z")).toISOString()).toBe(
      `2026-09-19T${RUN_UTC}`
    );
  });

  it("treats the exact slot as already run", () => {
    expect(nextRunAfter(new Date(`2026-09-18T${RUN_UTC}`)).toISOString()).toBe(
      `2026-09-19T${RUN_UTC}`
    );
  });

  it("crosses the month boundary", () => {
    expect(nextRunAfter(new Date("2026-09-30T20:00:00Z")).toISOString()).toBe(
      `2026-10-01T${RUN_UTC}`
    );
  });

  it("stays at 09:30 UTC in both halves of the year, since Iran has no DST", () => {
    for (const day of ["2026-01-15", "2026-07-15"]) {
      expect(nextRunAfter(new Date(`${day}T00:00:00Z`)).toISOString()).toBe(
        `${day}T${RUN_UTC}`
      );
    }
  });

  it("never schedules more than a day out", () => {
    const delay = millisecondsUntilNextRun(new Date("2026-09-18T09:30:01Z"));
    expect(delay).toBeGreaterThan(0);
    expect(delay).toBeLessThanOrEqual(24 * 60 * 60 * 1000);
  });
});

describe("lastRunAtOrBefore", () => {
  it("returns yesterday's slot before today's has come round", () => {
    expect(lastRunAtOrBefore(new Date("2026-09-18T06:00:00Z")).toISOString()).toBe(
      `2026-09-17T${RUN_UTC}`
    );
  });

  it("returns today's slot once it has passed", () => {
    expect(lastRunAtOrBefore(new Date("2026-09-18T18:00:00Z")).toISOString()).toBe(
      `2026-09-18T${RUN_UTC}`
    );
  });
});

describe("isRefreshOverdue", () => {
  const now = new Date("2026-09-18T18:00:00Z");

  it("is overdue when no rate has ever been stored", () => {
    expect(isRefreshOverdue(now, null)).toBe(true);
  });

  it("is overdue when the stored rate predates today's slot", () => {
    expect(isRefreshOverdue(now, "2026-09-18T09:00:00Z")).toBe(true);
  });

  it("is not overdue when the stored rate came after today's slot", () => {
    expect(isRefreshOverdue(now, "2026-09-18T09:31:00Z")).toBe(false);
  });

  it("does not re-run on a restart loop after a successful refresh", () => {
    expect(isRefreshOverdue(now, "2026-09-18T17:59:00Z")).toBe(false);
  });

  it("is overdue when the server was down across a whole day", () => {
    expect(isRefreshOverdue(now, "2026-09-16T10:00:00Z")).toBe(true);
  });

  it("treats an unparseable timestamp as overdue rather than skipping", () => {
    expect(isRefreshOverdue(now, "not a date")).toBe(true);
  });

  it("accepts a Date as well as a string", () => {
    expect(isRefreshOverdue(now, new Date("2026-09-18T12:00:00Z"))).toBe(false);
  });
});
