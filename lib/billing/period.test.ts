import { describe, expect, it } from "vitest";

import {
  addBillingMonths,
  computeGraceDeadline,
  computeRenewalPeriod,
  daysUntil,
  isEntitled,
  resolveStatusFromDates,
} from "./period";

const utc = (iso: string) => new Date(iso);

describe("addBillingMonths", () => {
  it("adds a plain month", () => {
    expect(addBillingMonths(utc("2026-03-15T10:00:00Z"), 1).toISOString()).toBe(
      "2026-04-15T10:00:00.000Z"
    );
  });

  it("rolls over the year boundary", () => {
    expect(addBillingMonths(utc("2026-12-10T00:00:00Z"), 1).toISOString()).toBe(
      "2027-01-10T00:00:00.000Z"
    );
  });

  it("clamps to the last day of a shorter month", () => {
    expect(addBillingMonths(utc("2026-01-31T00:00:00Z"), 1).toISOString()).toBe(
      "2026-02-28T00:00:00.000Z"
    );
  });

  it("handles February in a leap year", () => {
    expect(addBillingMonths(utc("2028-01-31T00:00:00Z"), 1).toISOString()).toBe(
      "2028-02-29T00:00:00.000Z"
    );
  });

  it("restores the anchor day after a short month instead of drifting", () => {
    // The bug this guards: renewing from 28 Feb without an anchor would bill
    // the 28th every month from then on, silently shortening every period.
    const afterFebruary = utc("2026-02-28T00:00:00Z");
    expect(addBillingMonths(afterFebruary, 1, 31).toISOString()).toBe(
      "2026-03-31T00:00:00.000Z"
    );
  });

  it("preserves the time of day", () => {
    expect(
      addBillingMonths(utc("2026-05-01T13:45:30.500Z"), 3).toISOString()
    ).toBe("2026-08-01T13:45:30.500Z");
  });

  it("supports multi-month periods", () => {
    expect(addBillingMonths(utc("2026-01-15T00:00:00Z"), 12).toISOString()).toBe(
      "2027-01-15T00:00:00.000Z"
    );
  });
});

describe("computeRenewalPeriod", () => {
  it("stacks on the existing period when paying early", () => {
    const period = computeRenewalPeriod({
      currentPeriodEnd: utc("2026-09-01T00:00:00Z"),
      months: 1,
      now: utc("2026-08-25T00:00:00Z"),
    });

    // The week still left on the old period is not thrown away.
    expect(period.start.toISOString()).toBe("2026-09-01T00:00:00.000Z");
    expect(period.end.toISOString()).toBe("2026-10-01T00:00:00.000Z");
  });

  it("restarts from now when the subscription has lapsed", () => {
    const period = computeRenewalPeriod({
      currentPeriodEnd: utc("2026-05-01T00:00:00Z"),
      months: 1,
      now: utc("2026-08-04T00:00:00Z"),
    });

    expect(period.start.toISOString()).toBe("2026-08-04T00:00:00.000Z");
    expect(period.end.toISOString()).toBe("2026-09-04T00:00:00.000Z");
  });

  it("starts from now for a brand new subscription", () => {
    const period = computeRenewalPeriod({
      currentPeriodEnd: null,
      months: 1,
      now: utc("2026-08-04T12:00:00Z"),
    });

    expect(period.start.toISOString()).toBe("2026-08-04T12:00:00.000Z");
    expect(period.end.toISOString()).toBe("2026-09-04T12:00:00.000Z");
  });
});

describe("resolveStatusFromDates", () => {
  const gracePeriodDays = 3;

  it("stays active inside the paid period", () => {
    expect(
      resolveStatusFromDates({
        storedStatus: "active",
        currentPeriodEnd: utc("2026-09-01T00:00:00Z"),
        gracePeriodDays,
        now: utc("2026-08-20T00:00:00Z"),
      })
    ).toBe("active");
  });

  it("becomes past_due inside the grace window", () => {
    expect(
      resolveStatusFromDates({
        storedStatus: "active",
        currentPeriodEnd: utc("2026-08-01T00:00:00Z"),
        gracePeriodDays,
        now: utc("2026-08-03T00:00:00Z"),
      })
    ).toBe("past_due");
  });

  it("expires once the grace window is spent", () => {
    expect(
      resolveStatusFromDates({
        storedStatus: "past_due",
        currentPeriodEnd: utc("2026-08-01T00:00:00Z"),
        gracePeriodDays,
        now: utc("2026-08-05T00:00:00Z"),
      })
    ).toBe("expired");
  });

  it("never revives a cancelled or expired subscription from dates alone", () => {
    // Reactivation must go through a payment, not through a clock.
    expect(
      resolveStatusFromDates({
        storedStatus: "canceled",
        currentPeriodEnd: utc("2027-01-01T00:00:00Z"),
        gracePeriodDays,
        now: utc("2026-08-04T00:00:00Z"),
      })
    ).toBe("canceled");

    expect(
      resolveStatusFromDates({
        storedStatus: "expired",
        currentPeriodEnd: utc("2027-01-01T00:00:00Z"),
        gracePeriodDays,
        now: utc("2026-08-04T00:00:00Z"),
      })
    ).toBe("expired");
  });

  it("treats the exact period end as still active", () => {
    const periodEnd = utc("2026-08-01T00:00:00Z");
    expect(
      resolveStatusFromDates({
        storedStatus: "active",
        currentPeriodEnd: periodEnd,
        gracePeriodDays,
        now: periodEnd,
      })
    ).toBe("active");
  });
});

describe("computeGraceDeadline", () => {
  it("adds whole days to the period end", () => {
    expect(
      computeGraceDeadline(utc("2026-08-01T00:00:00Z"), 3).toISOString()
    ).toBe("2026-08-04T00:00:00.000Z");
  });
});

describe("isEntitled", () => {
  it("grants access while active or in grace", () => {
    expect(isEntitled("active")).toBe(true);
    expect(isEntitled("past_due")).toBe(true);
  });

  it("denies access once cancelled or expired", () => {
    expect(isEntitled("canceled")).toBe(false);
    expect(isEntitled("expired")).toBe(false);
  });
});

describe("daysUntil", () => {
  it("counts days remaining", () => {
    expect(
      daysUntil(utc("2026-08-11T00:00:00Z"), utc("2026-08-04T00:00:00Z"))
    ).toBe(7);
  });

  it("goes negative once the date has passed", () => {
    expect(
      daysUntil(utc("2026-08-01T00:00:00Z"), utc("2026-08-04T00:00:00Z"))
    ).toBe(-3);
  });
});
