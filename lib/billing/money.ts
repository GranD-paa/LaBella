/**
 * Money primitives for the billing/accounting system.
 *
 * Two hard rules this module exists to enforce:
 *
 * 1. **Money is never a float.** Every amount is an integer in the currency's
 *    smallest unit — cents for EUR, whole Rial for IRR. `0.1 + 0.2 !== 0.3`
 *    is a rounding bug in a lesson tracker; in a ledger it is money that
 *    silently appears or disappears.
 *
 * 2. **The charged amount is authoritative, the discount is derived.** Given a
 *    list price and a discount percentage there are two ways to compute the
 *    pair (net, discount), and for some inputs they disagree by one cent —
 *    e.g. €5.00 at 50% is either "discount 2.50→3, net 2" or "net 2.50→3".
 *    We always round the *net* (what the customer is actually charged) and
 *    define `discount = list - net`, so `list = net + discount` holds for
 *    every row in the ledger. An accounting system whose totals don't
 *    reconcile is worse than no accounting system.
 */

/** ISO codes for the currencies we can actually charge in. */
export type BillingCurrency = "EUR" | "IRR";

/**
 * Integer division rounding half away from zero, done without ever producing
 * an intermediate float. `Math.round(numerator / denominator)` would be
 * shorter but reintroduces binary-float error for exactly the .5 cases that
 * matter most here.
 */
export function divRoundHalfUp(numerator: number, denominator: number): number {
  if (denominator <= 0) {
    throw new Error("divRoundHalfUp: denominator must be positive");
  }
  if (numerator < 0) {
    return -Math.floor((-numerator * 2 + denominator) / (denominator * 2));
  }
  return Math.floor((numerator * 2 + denominator) / (denominator * 2));
}

/** Converts a euro amount like 5.99 into integer cents (599). */
export function eurToCents(amountEur: number): number {
  if (!Number.isFinite(amountEur)) {
    throw new Error("eurToCents: amount must be a finite number");
  }
  return divRoundHalfUp(Math.round(amountEur * 1000), 10);
}

/** Converts integer cents back to a euro number, for display only. */
export function centsToEur(cents: number): number {
  return cents / 100;
}

export type PriceBreakdown = {
  /** Undiscounted price, in cents. */
  listCents: number;
  /** Whole-percent discount applied. */
  discountPercent: number;
  /** Money taken off the list price, in cents. Always `listCents - netCents`. */
  discountCents: number;
  /** What the customer is actually charged, in cents. */
  netCents: number;
};

/**
 * Splits a list price into the charge and the discount.
 *
 * Both operands stay integers until a single final division, so there is no
 * accumulated float error: 599 cents at 10% is `599 * 90 = 53910`, then one
 * exact half-up division by 100 → 539.
 */
export function computePrice(
  listCents: number,
  discountPercent: number
): PriceBreakdown {
  if (!Number.isInteger(listCents) || listCents < 0) {
    throw new Error("computePrice: listCents must be a non-negative integer");
  }
  if (
    !Number.isInteger(discountPercent) ||
    discountPercent < 0 ||
    discountPercent > 100
  ) {
    throw new Error("computePrice: discountPercent must be an integer 0-100");
  }

  const netCents = divRoundHalfUp(listCents * (100 - discountPercent), 100);

  return {
    listCents,
    discountPercent,
    discountCents: listCents - netCents,
    netCents,
  };
}

// =========================================================================
// EUR -> IRR
// =========================================================================

export type IrrConversionInput = {
  /** Amount to convert, in euro cents. */
  eurCents: number;
  /** Market rate: how many Rial one euro buys. */
  rialPerEur: number;
  /**
   * Business margin added on top of the market rate, in percent. Covers the
   * spread between the rate we quote and the rate we can actually settle at,
   * plus gateway fees. 0 charges the raw market rate.
   */
  marginPercent?: number;
  /**
   * Prices are rounded *up* to a multiple of this many Rial so the amount
   * shown ends in clean zeros (Iranian storefront convention) — 10,000 Rial
   * (1,000 Toman) by default. Rounding up rather than to-nearest means a
   * rounding step can never make us undercharge.
   */
  roundToRial?: number;
};

/**
 * Converts a euro amount to the Rial amount we will actually charge.
 *
 * Returns whole Rial, because that is the unit Iranian payment gateways
 * (ZarinPal and the bank PSPs) accept. Display converts to Toman separately —
 * see `rialToToman`.
 */
export function convertEurCentsToRial({
  eurCents,
  rialPerEur,
  marginPercent = 0,
  roundToRial = 10_000,
}: IrrConversionInput): number {
  if (!Number.isInteger(eurCents) || eurCents < 0) {
    throw new Error("convertEurCentsToRial: eurCents must be a non-negative integer");
  }
  if (!Number.isFinite(rialPerEur) || rialPerEur <= 0) {
    throw new Error("convertEurCentsToRial: rialPerEur must be positive");
  }
  if (!Number.isFinite(marginPercent) || marginPercent < 0) {
    throw new Error("convertEurCentsToRial: marginPercent must be >= 0");
  }
  if (!Number.isInteger(roundToRial) || roundToRial < 1) {
    throw new Error("convertEurCentsToRial: roundToRial must be a positive integer");
  }

  const rawRial = (eurCents / 100) * rialPerEur * (1 + marginPercent / 100);
  return Math.ceil(rawRial / roundToRial) * roundToRial;
}

/**
 * Rial -> Toman for display. Iranians price everything in Toman (10 Rial)
 * even though Rial is the legal unit, so showing raw Rial reads as a 10x
 * price to a local customer.
 */
export function rialToToman(rial: number): number {
  return Math.round(rial / 10);
}

// =========================================================================
// Exchange-rate sanity guard
// =========================================================================

export type RateAcceptance =
  | { accepted: true }
  | { accepted: false; reason: "not-positive" | "deviation-too-large"; deviationPercent?: number };

/**
 * Decides whether a freshly fetched rate is safe to apply automatically.
 *
 * The failure mode this guards against is not a slightly stale rate — it's a
 * feed that starts quoting Toman instead of Rial (an instant 10x price cut),
 * returns 0, or serves a garbage/error payload that parses to a number. Any
 * of those would silently repricing the whole catalogue, so a move larger
 * than `maxDeviationPercent` is parked for a human to confirm instead.
 */
export function isRateAcceptable(
  nextRate: number,
  previousRate: number | null,
  maxDeviationPercent: number
): RateAcceptance {
  if (!Number.isFinite(nextRate) || nextRate <= 0) {
    return { accepted: false, reason: "not-positive" };
  }

  // Nothing to compare against on the very first fetch.
  if (previousRate === null || previousRate <= 0) {
    return { accepted: true };
  }

  const deviationPercent =
    (Math.abs(nextRate - previousRate) / previousRate) * 100;

  if (deviationPercent > maxDeviationPercent) {
    return { accepted: false, reason: "deviation-too-large", deviationPercent };
  }

  return { accepted: true };
}

/**
 * Parses a rate out of the strings Iranian price feeds return —
 * `"2,221,600"`, and occasionally with Persian/Arabic-Indic digits.
 */
export function parseRateString(raw: string): number | null {
  const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
  const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

  const normalized = raw
    .trim()
    .replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(ARABIC_DIGITS.indexOf(d)))
    .replace(/[,\s٬]/g, "");

  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    return null;
  }

  const value = Number(normalized);
  return Number.isFinite(value) && value > 0 ? value : null;
}
