import type { AppLocale } from "@/lib/i18n/types";
import { rialToToman } from "@/lib/billing/money";

/**
 * Money formatting for display.
 *
 * Two things worth stating explicitly:
 *
 *  * Amounts arrive as integer minor units. Nothing here ever does arithmetic
 *    on them beyond the single divide needed to render — the maths happened
 *    upstream in `lib/billing/money.ts`.
 *  * Rial is stored but Toman is shown. Rial is the legal unit and what the
 *    gateways take, but Iranians price everything in Toman (10 Rial), so a raw
 *    Rial figure reads as a 10x price to a local customer.
 */

const LOCALE_TAGS: Record<AppLocale, string> = {
  fa: "fa-IR",
  en: "en-GB",
  it: "it-IT",
};

export function formatEurCents(cents: number, locale: AppLocale = "en"): string {
  return new Intl.NumberFormat(LOCALE_TAGS[locale], {
    style: "currency",
    currency: "EUR",
    // Persian number formatting defaults to Persian digits, which is right
    // for a Persian-speaking admin reading a euro figure.
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/** Formats a whole-Rial amount as Toman, the unit customers actually think in. */
export function formatRialAsToman(
  rial: number,
  locale: AppLocale = "fa"
): string {
  const toman = rialToToman(rial);
  const formatted = new Intl.NumberFormat(LOCALE_TAGS[locale], {
    maximumFractionDigits: 0,
  }).format(toman);

  const suffix = locale === "fa" ? "تومان" : "Toman";
  return `${formatted} ${suffix}`;
}

/** Plain grouped number, used for exchange rates. */
export function formatNumber(value: number, locale: AppLocale = "en"): string {
  return new Intl.NumberFormat(LOCALE_TAGS[locale], {
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Renders a payment in whatever currency it was actually taken in.
 *
 * The euro figure is what reporting aggregates on, but showing a Rial payer a
 * euro amount hides what they were really charged.
 */
export function formatPaidAmount(
  payment: { paid_currency: "EUR" | "IRR"; paid_amount: number },
  locale: AppLocale = "en"
): string {
  return payment.paid_currency === "IRR"
    ? formatRialAsToman(payment.paid_amount, locale)
    : formatEurCents(payment.paid_amount, locale);
}

/** Short month label for the revenue chart's x-axis, e.g. "Aug". */
export function formatMonthLabel(
  monthKey: string,
  locale: AppLocale = "en"
): string {
  return new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
    month: "short",
    timeZone: "UTC",
  }).format(new Date(monthKey));
}
