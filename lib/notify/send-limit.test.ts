import { describe, expect, it } from "vitest";

import {
  decideEmail,
  decideSms,
  subnetOf,
  type Counts,
} from "./send-limit";

/**
 * What is under test here is the arithmetic: the ladder, the ceilings, and
 * which one gets the blame.
 *
 * What is NOT under test, and cannot be from here, is the part that made the
 * previous version wrong. `claimSend` used to run every SELECT and then every
 * INSERT with nothing in between, so twenty simultaneous requests all read
 * zero and all passed — "one per minute" defeated by sending at once. The fix
 * is a transaction plus two advisory locks, and only a real Postgres can
 * demonstrate a lock. Faking one here would test the fake.
 *
 * So: the numbers are covered by these tests, the serialisation is covered by
 * the database, and the end-to-end check is in the manual pass — three resends
 * in a row must be made to wait 60s, then 5m, then 30m.
 */

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

const quiet: Counts = {
  recipientDay: 0,
  msSinceRecipientLast: null,
  ipHour: 0,
  ipDistinctHour: 0,
  subnetHour: 0,
  globalHour: 0,
  globalDay: 0,
};

const counts = (overrides: Partial<Counts>): Counts => ({ ...quiet, ...overrides });

describe("decideSms — the ladder", () => {
  it("lets the first code through with no wait", () => {
    expect(decideSms(quiet, false)).toEqual({ allowed: true, nextGapMs: MINUTE });
  });

  it.each([
    [1, MINUTE, 5 * MINUTE],
    [2, 5 * MINUTE, 30 * MINUTE],
    [3, 30 * MINUTE, 2 * HOUR],
  ])(
    "after %i codes, waits %i ms and then promises the next gap",
    (sent, requiredGap, nextGap) => {
      const tooSoon = decideSms(
        counts({ recipientDay: sent, msSinceRecipientLast: requiredGap - 1000 }),
        false
      );
      expect(tooSoon).toMatchObject({ allowed: false, reason: "cooldown" });

      const longEnough = decideSms(
        counts({ recipientDay: sent, msSinceRecipientLast: requiredGap }),
        false
      );
      expect(longEnough).toEqual({ allowed: true, nextGapMs: nextGap });
    }
  );

  it("reports how much of the wait is left, not the whole gap", () => {
    const decision = decideSms(
      counts({ recipientDay: 1, msSinceRecipientLast: 20_000 }),
      false
    );
    expect(decision).toEqual({
      allowed: false,
      reason: "cooldown",
      retryAfterMs: 40_000,
    });
  });

  it("stops at five in a day however long the wait was", () => {
    expect(
      decideSms(counts({ recipientDay: 5, msSinceRecipientLast: 10 * HOUR }), false)
    ).toMatchObject({ allowed: false, reason: "daily" });
  });
});

describe("decideSms — where the request came from", () => {
  it("refuses an IP asking about too many different numbers", () => {
    expect(decideSms(counts({ ipDistinctHour: 10 }), false)).toEqual({
      allowed: false,
      reason: "origin",
    });
  });

  it("tolerates an IP sending a lot to few numbers, which is what a NAT looks like", () => {
    expect(decideSms(counts({ ipHour: 19, ipDistinctHour: 2 }), false)).toMatchObject({
      allowed: true,
    });
  });

  it("refuses a whole /24 that is busy even when one IP is not", () => {
    expect(decideSms(counts({ ipHour: 1, subnetHour: 40 }), false)).toEqual({
      allowed: false,
      reason: "origin",
    });
  });
});

describe("decideSms — the global ceiling", () => {
  it("refuses a stranger once the day's ceiling is reached", () => {
    expect(decideSms(counts({ globalDay: 300 }), false)).toEqual({
      allowed: false,
      reason: "capacity",
    });
  });

  it("refuses a stranger on the hourly burst too", () => {
    expect(decideSms(counts({ globalHour: 200 }), false)).toEqual({
      allowed: false,
      reason: "capacity",
    });
  });

  /**
   * The point of the whole rule: a flood is an attack on the budget, and a
   * ceiling that also locks out paying customers hands the attacker a second
   * win. An existing account is never refused for capacity.
   */
  it("still lets an existing customer in when the ceiling is burnt", () => {
    expect(
      decideSms(counts({ globalDay: 100_000, globalHour: 100_000 }), true)
    ).toMatchObject({ allowed: true });
  });

  it("still applies the per-number ladder to an existing customer", () => {
    expect(
      decideSms(
        counts({ recipientDay: 1, msSinceRecipientLast: 1000, globalDay: 0 }),
        true
      )
    ).toMatchObject({ allowed: false, reason: "cooldown" });
  });
});

describe("decideEmail", () => {
  it("allows the first message and asks for a minute before the next", () => {
    expect(decideEmail(quiet)).toEqual({ allowed: true, nextGapMs: MINUTE });
  });

  it("holds an address to one a minute", () => {
    expect(
      decideEmail(counts({ recipientDay: 1, msSinceRecipientLast: 30_000 }))
    ).toMatchObject({ allowed: false, reason: "cooldown" });
  });

  it("stops at three a day", () => {
    expect(
      decideEmail(counts({ recipientDay: 3, msSinceRecipientLast: 10 * HOUR }))
    ).toMatchObject({ allowed: false, reason: "daily" });
  });
});

describe("subnetOf", () => {
  it("takes the /24 of an IPv4 address", () => {
    expect(subnetOf("5.160.12.44")).toBe("5.160.12.0/24");
  });

  it("takes the /64 of an IPv6 address", () => {
    expect(subnetOf("2001:0db8:85a3:0000:1234:5678:9abc:def0")).toBe(
      "2001:0db8:85a3:0000::/64"
    );
  });

  it("has nothing to say about a hostname", () => {
    expect(subnetOf("unknown")).toBeNull();
  });
});
