import { formatRialAsToman } from "@/lib/billing/format";
import {
  centsToEur,
  convertEurCentsToRial,
  divRoundHalfUp,
  resolvePlanPeriodPrice,
} from "@/lib/billing/money";
import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
import { getLanguageCode } from "@/lib/curriculum/language-codes";
import { LANGUAGES } from "@/lib/curriculum/languages";
import type { DataRepository } from "@/lib/data/repository";
import type { AppLocale } from "@/lib/i18n/types";
import { getSubscriptionPlanMeta } from "@/lib/subscription/plans";
import type { BillingPeriodMonths, SubscriptionPlanRow } from "@/types";

/**
 * The real storefront, resolved for the public landing page.
 *
 * Everything here is computed on the server and shipped as finished strings.
 * That is not only about hydration: the Rial figure is built from the exchange
 * rate *and the business margin on top of it*, and `payment_settings` has no
 * business reaching an anonymous visitor's browser. The subscription page can
 * hand the client its settings because that page is behind a session; this one
 * cannot, so the conversion happens here and only the price crosses over.
 *
 * The numbers match what checkout will ask for because they come from the same
 * `resolvePlanPeriodPrice` / `convertEurCentsToRial` pair the paid flow uses.
 * They are still a quote, not a lock — the server recomputes at checkout.
 */

/** One plan at one billing period, in both currencies, ready to render. */
export type LandingPriceCell = {
  months: BillingPeriodMonths;
  /** Net price, e.g. "€24.00". */
  eur: string;
  /** List price to strike through, or null when nothing is discounted. */
  eurStrike: string | null;
  /** Per-month equivalent, quarterly only. */
  perMonthEur: string | null;
  /** Net price in Toman, or null when Rial is not on sale. */
  toman: string | null;
  perMonthToman: string | null;
  discountPercent: number;
};

export type LandingPricingPlan = {
  planSlug: string;
  languageSlug: string;
  title: string;
  description: string;
  features: string[];
  highlighted: boolean;
  monthly: LandingPriceCell;
  /** Absent when this plan does not sell a three-month period. */
  quarterly: LandingPriceCell | null;
  /** The quarterly incentive, for the period toggle's badge. */
  quarterlySavingPercent: number;
};

export type LandingPricingLanguage = {
  slug: string;
  name: string;
  /** Two-letter code shown on the tab, e.g. "IT". */
  code: string;
  /** False for a path that is priced but has not opened yet. */
  available: boolean;
};

export type LandingPricingData = {
  languages: LandingPricingLanguage[];
  plans: LandingPricingPlan[];
  /** False hides the currency toggle: there is no usable rate to quote with. */
  canPayInRial: boolean;
};

function formatEur(cents: number): string {
  return `\u20AC${centsToEur(cents).toFixed(2)}`;
}

/**
 * Resolves the pricing section, or null when there is nothing honest to show.
 *
 * Null is the signal to fall back to the copy-only block: an install with no
 * plans, or one where the database could not be reached, must not render an
 * empty price grid. Every read is caught individually so one missing table
 * cannot take the whole home page down with it.
 */
export async function getLandingPricing(
  repo: DataRepository,
  locale: AppLocale
): Promise<LandingPricingData | null> {
  const [languages, planRows, settings, fxRate] = await Promise.all([
    getLanguagesWithAvailability(repo).catch(() => LANGUAGES),
    repo.getSubscriptionPlans().catch(() => [] as SubscriptionPlanRow[]),
    repo.getPaymentSettings().catch(() => null),
    repo.getLatestFxRate().catch(() => null),
  ]);

  const activePlans = planRows.filter((row) => row.is_active);
  if (activePlans.length === 0) return null;

  // Rial is quoted only when it is switched on *and* there is a rate behind
  // it. A toggle with no rate would show a price we cannot actually charge.
  const usableRate = settings
    ? settings.fx_source === "manual"
      ? settings.fx_manual_rate
      : (fxRate?.rate ?? null)
    : null;
  const canPayInRial = Boolean(
    settings?.irr_enabled && usableRate && usableRate > 0
  );

  function toToman(netCents: number): string | null {
    if (!settings || !usableRate || usableRate <= 0) return null;
    return formatRialAsToman(
      convertEurCentsToRial({
        eurCents: netCents,
        rialPerEur: usableRate,
        marginPercent: settings.fx_margin_percent,
        roundToRial: settings.irr_rounding,
      }),
      locale
    );
  }

  function buildCell(
    plan: SubscriptionPlanRow,
    months: BillingPeriodMonths
  ): LandingPriceCell {
    const price = resolvePlanPeriodPrice(plan, months);
    const perMonthCents =
      months === 3 ? divRoundHalfUp(price.netCents, 3) : null;

    return {
      months,
      eur: formatEur(price.netCents),
      eurStrike: price.discountPercent > 0 ? formatEur(price.listCents) : null,
      perMonthEur: perMonthCents === null ? null : formatEur(perMonthCents),
      toman: canPayInRial ? toToman(price.netCents) : null,
      perMonthToman:
        canPayInRial && perMonthCents !== null ? toToman(perMonthCents) : null,
      discountPercent: price.discountPercent,
    };
  }

  // Every priced language gets a tab, open or not, because "what will German
  // cost me" is a question this section exists to answer. The ones that have
  // not opened yet are flagged rather than hidden — a visitor comparing paths
  // should see the price *and* that it is not on sale today. Open paths sort
  // first so the tab selected on arrival is one they can actually buy.
  const pricedSlugs = new Set(activePlans.map((row) => row.language_slug));
  const shown = languages
    .filter((language) => pricedSlugs.has(language.slug))
    .sort((a, b) => Number(b.available) - Number(a.available));

  if (shown.length === 0) return null;

  const shownSlugs = new Set<string>(shown.map((language) => language.slug));

  const plans: LandingPricingPlan[] = activePlans
    .filter((row) => shownSlugs.has(row.language_slug))
    .sort((a, b) => a.order_number - b.order_number)
    .map((row) => ({
      planSlug: row.plan_slug,
      languageSlug: row.language_slug,
      title: row.title?.[locale] ?? row.title?.fa ?? row.plan_slug,
      description: row.description?.[locale] ?? row.description?.fa ?? "",
      features: (row.features ?? [])
        .map((feature) => feature?.[locale] ?? feature?.fa ?? "")
        .filter(Boolean),
      highlighted: getSubscriptionPlanMeta(row.plan_slug).highlighted,
      monthly: buildCell(row, 1),
      quarterly: row.quarterly_enabled ? buildCell(row, 3) : null,
      quarterlySavingPercent: row.quarterly_enabled
        ? row.quarterly_discount_percent
        : 0,
    }));

  if (plans.length === 0) return null;

  return {
    canPayInRial,
    languages: shown.map((language) => ({
      slug: language.slug,
      name: language.name,
      code: getLanguageCode(language.slug),
      available: language.available,
    })),
    plans,
  };
}
