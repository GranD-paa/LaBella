import { describe, expect, it } from "vitest";

import {
  computePrice,
  convertEurCentsToRial,
  centsToEur,
  divRoundHalfUp,
  eurToCents,
  isRateAcceptable,
  parseRateString,
  resolvePlanDiscountPercent,
  resolvePlanPeriodPrice,
  rialToToman,
} from "./money";

describe("divRoundHalfUp", () => {
  it("rounds halves away from zero", () => {
    expect(divRoundHalfUp(250, 100)).toBe(3);
    expect(divRoundHalfUp(350, 100)).toBe(4);
    expect(divRoundHalfUp(150, 100)).toBe(2);
  });

  it("rounds non-halves normally", () => {
    expect(divRoundHalfUp(53910, 100)).toBe(539);
    expect(divRoundHalfUp(59925, 100)).toBe(599);
    expect(divRoundHalfUp(149, 100)).toBe(1);
  });

  it("handles negatives symmetrically", () => {
    expect(divRoundHalfUp(-250, 100)).toBe(-3);
  });

  it("rejects a non-positive denominator", () => {
    expect(() => divRoundHalfUp(100, 0)).toThrow();
  });
});

describe("eurToCents", () => {
  it("converts plain amounts", () => {
    expect(eurToCents(5.99)).toBe(599);
    expect(eurToCents(0)).toBe(0);
    expect(eurToCents(12)).toBe(1200);
  });

  it("survives amounts that are not exactly representable in binary float", () => {
    // The classic case: 1.005 * 100 === 100.49999999999999 in IEEE-754.
    expect(eurToCents(1.005)).toBe(101);
    expect(eurToCents(8.115)).toBe(812);
  });

  it("round-trips through centsToEur", () => {
    expect(centsToEur(eurToCents(7.99))).toBe(7.99);
  });
});

describe("computePrice", () => {
  it("reproduces the prices already shown in the subscription UI", () => {
    // Basic: €5.99 at 10% off is displayed as €5.39.
    expect(computePrice(599, 10).netCents).toBe(539);
    // Pro: €7.99 at 25% off is displayed as €5.99.
    expect(computePrice(799, 25).netCents).toBe(599);
  });

  it("passes the list price through untouched at 0%", () => {
    const price = computePrice(599, 0);
    expect(price.netCents).toBe(599);
    expect(price.discountCents).toBe(0);
  });

  it("charges nothing at 100%", () => {
    const price = computePrice(599, 100);
    expect(price.netCents).toBe(0);
    expect(price.discountCents).toBe(599);
  });

  it("keeps list = net + discount for every percentage", () => {
    // This is the invariant the whole ledger reconciles against, so it is
    // checked exhaustively rather than on a few hand-picked values.
    for (let listCents = 0; listCents <= 2000; listCents += 7) {
      for (let percent = 0; percent <= 100; percent += 1) {
        const price = computePrice(listCents, percent);
        expect(price.netCents + price.discountCents).toBe(listCents);
        expect(price.netCents).toBeGreaterThanOrEqual(0);
        expect(price.netCents).toBeLessThanOrEqual(listCents);
      }
    }
  });

  it("rounds the charged amount, not the discount", () => {
    // 5 cents at 50% is a case where the two orderings genuinely disagree:
    // rounding the discount half-up gives 3 off / 2 charged, rounding the
    // charge gives 3 charged / 2 off. We define the charge as authoritative,
    // so the customer pays 3 and the ledger records 2 of discount.
    const price = computePrice(5, 50);
    expect(price.netCents).toBe(3);
    expect(price.discountCents).toBe(2);
  });

  it("rejects malformed input rather than silently coercing it", () => {
    expect(() => computePrice(5.5, 10)).toThrow();
    expect(() => computePrice(-100, 10)).toThrow();
    expect(() => computePrice(599, 101)).toThrow();
    expect(() => computePrice(599, -1)).toThrow();
  });
});

describe("convertEurCentsToRial", () => {
  // Real free-market rate observed on the TGJU feed, Aug 2026.
  const rialPerEur = 2_221_600;

  it("converts at the raw market rate when there is no margin", () => {
    // 5.99 EUR * 2,221,600 = 13,307,384 Rial, rounded up to a clean 10,000.
    expect(
      convertEurCentsToRial({ eurCents: 599, rialPerEur, marginPercent: 0 })
    ).toBe(13_310_000);
  });

  it("applies the business margin on top of the market rate", () => {
    expect(
      convertEurCentsToRial({ eurCents: 599, rialPerEur, marginPercent: 2.5 })
    ).toBe(13_650_000);
  });

  it("always rounds up, so a rounding step can never undercharge", () => {
    const exact = (599 / 100) * rialPerEur;
    const charged = convertEurCentsToRial({ eurCents: 599, rialPerEur });
    expect(charged).toBeGreaterThanOrEqual(exact);
  });

  it("lands on a multiple of the rounding step", () => {
    for (const step of [1_000, 10_000, 50_000]) {
      const charged = convertEurCentsToRial({
        eurCents: 799,
        rialPerEur,
        roundToRial: step,
      });
      expect(charged % step).toBe(0);
    }
  });

  it("converts a free plan to zero rather than to one rounding step", () => {
    expect(convertEurCentsToRial({ eurCents: 0, rialPerEur })).toBe(0);
  });

  it("charges the exact converted amount when rounding is switched off", () => {
    // roundToRial: 1 is how an admin asks for an exact price. The result is
    // still a whole number, because Rial is the smallest unit the gateways
    // accept — but it is not nudged up to a tidy figure.
    const charged = convertEurCentsToRial({
      eurCents: 499,
      rialPerEur,
      roundToRial: 1,
    });

    expect(charged).toBe(Math.ceil((499 / 100) * rialPerEur));
    // Nothing about it lands on a "clean" boundary.
    expect(charged % 10_000).not.toBe(0);
  });

  it("keeps the margin applied when rounding is switched off", () => {
    // Removing rounding must not quietly remove the business margin with it.
    const withMargin = convertEurCentsToRial({
      eurCents: 499,
      rialPerEur,
      marginPercent: 2.5,
      roundToRial: 1,
    });
    const withoutMargin = convertEurCentsToRial({
      eurCents: 499,
      rialPerEur,
      roundToRial: 1,
    });

    expect(withMargin).toBeGreaterThan(withoutMargin);
  });

  it("rejects a non-positive rate instead of producing a free subscription", () => {
    expect(() => convertEurCentsToRial({ eurCents: 599, rialPerEur: 0 })).toThrow();
    expect(() => convertEurCentsToRial({ eurCents: 599, rialPerEur: -5 })).toThrow();
  });
});

describe("rialToToman", () => {
  it("divides by ten", () => {
    expect(rialToToman(13_310_000)).toBe(1_331_000);
  });
});

describe("isRateAcceptable", () => {
  const MAX_DEVIATION = 20;

  it("accepts the first rate with nothing to compare against", () => {
    expect(isRateAcceptable(2_221_600, null, MAX_DEVIATION)).toEqual({
      accepted: true,
    });
  });

  it("accepts ordinary day-to-day movement", () => {
    expect(isRateAcceptable(2_300_000, 2_221_600, MAX_DEVIATION).accepted).toBe(
      true
    );
  });

  it("catches a feed that switches from Rial to Toman", () => {
    // The real hazard: a 10x drop that would reprice the entire catalogue to
    // a tenth of its value without anyone noticing.
    const result = isRateAcceptable(222_160, 2_221_600, MAX_DEVIATION);
    expect(result.accepted).toBe(false);
    expect(result).toMatchObject({ reason: "deviation-too-large" });
  });

  it("rejects zero and non-finite rates", () => {
    expect(isRateAcceptable(0, 2_221_600, MAX_DEVIATION)).toMatchObject({
      accepted: false,
      reason: "not-positive",
    });
    expect(isRateAcceptable(Number.NaN, 2_221_600, MAX_DEVIATION)).toMatchObject({
      accepted: false,
      reason: "not-positive",
    });
  });

  it("accepts a move sitting exactly on the threshold", () => {
    expect(isRateAcceptable(1_200, 1_000, 20).accepted).toBe(true);
    expect(isRateAcceptable(1_201, 1_000, 20).accepted).toBe(false);
  });
});

describe("parseRateString", () => {
  it("parses the comma-grouped form the TGJU feed returns", () => {
    expect(parseRateString("2,221,600")).toBe(2_221_600);
  });

  it("parses Persian and Arabic-Indic digits", () => {
    expect(parseRateString("۲,۲۲۱,۶۰۰")).toBe(2_221_600);
    expect(parseRateString("٢٢٢١٦٠٠")).toBe(2_221_600);
  });

  it("parses decimals and surrounding whitespace", () => {
    expect(parseRateString("  1234.5 ")).toBe(1234.5);
  });

  it("returns null for anything that is not a number", () => {
    expect(parseRateString("")).toBeNull();
    expect(parseRateString("N/A")).toBeNull();
    expect(parseRateString("0")).toBeNull();
    expect(parseRateString("<html>error</html>")).toBeNull();
  });
});

describe("resolvePlanDiscountPercent", () => {
  const plan = { discount_percent: 10, quarterly_discount_percent: 15 };

  it("ignores the quarterly discount on a one-month purchase", () => {
    expect(resolvePlanDiscountPercent(plan, 1)).toBe(10);
  });

  it("stacks the quarterly discount on top of the plan's own", () => {
    expect(resolvePlanDiscountPercent(plan, 3)).toBe(25);
  });

  it("caps the stack so a plan can never become free", () => {
    // A 90% promotion plus a 20% quarterly incentive must not reach 110%,
    // which would make computePrice throw and hand out a negative charge.
    expect(
      resolvePlanDiscountPercent(
        { discount_percent: 90, quarterly_discount_percent: 20 },
        3
      )
    ).toBe(95);
  });
});

describe("resolvePlanPeriodPrice", () => {
  const plan = {
    price_eur: 4.99,
    discount_percent: 0,
    quarterly_discount_percent: 0,
  };

  it("charges the monthly price for one month", () => {
    expect(resolvePlanPeriodPrice(plan, 1).netCents).toBe(499);
  });

  it("lists three months as three times the monthly price", () => {
    const price = resolvePlanPeriodPrice(plan, 3);
    expect(price.listCents).toBe(1497);
    expect(price.netCents).toBe(1497);
  });

  it("applies the quarterly discount to the whole period", () => {
    const price = resolvePlanPeriodPrice(
      { ...plan, quarterly_discount_percent: 10 },
      3
    );
    expect(price.listCents).toBe(1497);
    // 1497 * 90% = 1347.3, rounded half-up to 1347.
    expect(price.netCents).toBe(1347);
    // The ledger invariant list = net + discount has to survive the period
    // multiplication, not just the single-month case.
    expect(price.netCents + price.discountCents).toBe(price.listCents);
  });

  it("keeps list = net + discount for an awkward price and stacked discounts", () => {
    const price = resolvePlanPeriodPrice(
      { price_eur: 3.33, discount_percent: 7, quarterly_discount_percent: 13 },
      3
    );
    expect(price.listCents).toBe(999);
    expect(price.discountPercent).toBe(20);
    expect(price.netCents).toBe(799);
    expect(price.netCents + price.discountCents).toBe(price.listCents);
  });
});
