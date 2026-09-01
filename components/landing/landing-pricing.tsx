"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Arrow, Check, SectionHead } from "@/components/landing/landing-bits";
import type { LandingCopy } from "@/lib/landing/content";
import type {
  LandingPriceCell,
  LandingPricingData,
} from "@/lib/landing/pricing";
import { interpolateText } from "@/lib/subscription/interpolate";
import { cn } from "@/lib/utils";
import type { BillingCurrency, BillingPeriodMonths } from "@/types";

/**
 * The landing page's pricing section: the real storefront, minus the till.
 *
 * It carries the same three choices the subscription page does — language,
 * billing period, currency — because the first question a visitor has is what
 * *their* path costs, and a page that answers it with "see the plans" has
 * asked them to sign up before telling them the price.
 *
 * The one thing it deliberately does not do is take money. Every button is a
 * link to sign-up; checkout stays behind a session, where the server can
 * recompute the price it is about to charge.
 *
 * Prices arrive as finished strings from `getLandingPricing`, so this file
 * does no arithmetic — there is no second implementation of the pricing rules
 * here to drift out of step with billing.
 */
export function LandingPricing({
  copy,
  data,
  isSignedIn,
  defaultToToman,
}: {
  copy: LandingCopy;
  data: LandingPricingData;
  isSignedIn: boolean;
  /** Persian visitors are quoted in Toman first; everyone else in euro. */
  defaultToToman: boolean;
}) {
  const [languageSlug, setLanguageSlug] = useState(
    () => data.languages[0]?.slug ?? ""
  );
  const [currency, setCurrency] = useState<BillingCurrency>(
    data.canPayInRial && defaultToToman ? "IRR" : "EUR"
  );
  const [months, setMonths] = useState<BillingPeriodMonths>(1);

  const plans = useMemo(
    () => data.plans.filter((plan) => plan.languageSlug === languageSlug),
    [data.plans, languageSlug]
  );

  const selectedLanguage = data.languages.find(
    (language) => language.slug === languageSlug
  );

  // A language whose plans all have the three-month option switched off must
  // not strand the visitor on a period nothing sells.
  const canPayQuarterly = plans.some((plan) => plan.quarterly !== null);
  const period: BillingPeriodMonths = canPayQuarterly ? months : 1;

  // The badge promises a saving, so it appears only where there is one.
  const bestSaving = plans.reduce(
    (best, plan) => Math.max(best, plan.quarterlySavingPercent),
    0
  );

  const href = isSignedIn ? "/subscription" : "/sign-up";

  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(ellipse_45%_60%_at_50%_0%,rgba(114,9,183,0.16),transparent)]"
      />

      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <SectionHead title={copy.pricing.title} sub={copy.pricing.sub} />

        {/* ------------------------------------------------------- controls */}
        <div data-reveal className="mt-12 space-y-6 lg:mt-16">
          <fieldset>
            <legend className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/35">
              {copy.pricing.languageLabel}
            </legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {data.languages.map((language) => {
                const selected = language.slug === languageSlug;
                return (
                  <button
                    key={language.slug}
                    type="button"
                    onClick={() => setLanguageSlug(language.slug)}
                    aria-pressed={selected}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2.5 rounded-full border px-5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      selected
                        ? "border-primary/45 bg-primary/[0.08] text-white"
                        : "border-white/10 text-white/55 hover:border-white/20 hover:text-white/80"
                    )}
                  >
                    <span
                      className={cn(
                        "text-[0.65rem] font-semibold tracking-[0.12em]",
                        selected ? "text-primary" : "text-white/30"
                      )}
                    >
                      {language.code}
                    </span>
                    {language.name}
                    {!language.available && (
                      <span className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[0.65rem] font-medium text-white/45">
                        {copy.languages.comingSoon}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center gap-3">
            {canPayQuarterly && (
              <Segmented label={copy.pricing.periodLabel}>
                {([1, 3] as const).map((option) => (
                  <SegmentButton
                    key={option}
                    selected={period === option}
                    onClick={() => setMonths(option)}
                  >
                    {option === 1
                      ? copy.pricing.monthly
                      : copy.pricing.quarterly}
                    {option === 3 && bestSaving > 0 && (
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[0.68rem] font-semibold",
                          period === 3
                            ? "bg-primary-foreground/15 text-primary-foreground"
                            : "bg-emerald-400/15 text-emerald-300"
                        )}
                      >
                        {interpolateText(copy.pricing.save, {
                          percent: bestSaving,
                        })}
                      </span>
                    )}
                  </SegmentButton>
                ))}
              </Segmented>
            )}

            {data.canPayInRial && (
              <Segmented label={copy.pricing.currencyLabel}>
                {(["IRR", "EUR"] as const).map((option) => (
                  <SegmentButton
                    key={option}
                    selected={currency === option}
                    onClick={() => setCurrency(option)}
                  >
                    {option === "IRR" ? copy.pricing.toman : copy.pricing.euro}
                  </SegmentButton>
                ))}
              </Segmented>
            )}
          </div>
        </div>

        {selectedLanguage && !selectedLanguage.available && (
          <p className="mt-8 flex items-center gap-2.5 text-sm text-white/45">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
            />
            {copy.pricing.comingSoonNote}
          </p>
        )}

        {/* ---------------------------------------------------------- cards */}
        <ul
          data-reveal-group
          className={cn(
            "mt-10 grid gap-4",
            plans.length >= 4
              ? "sm:grid-cols-2 xl:grid-cols-4"
              : plans.length === 3
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "sm:grid-cols-2"
          )}
        >
          {plans.map((plan) => {
            const cell =
              period === 3 && plan.quarterly ? plan.quarterly : plan.monthly;

            return (
              <li key={plan.planSlug} data-reveal-item>
                <article
                  className={cn(
                    "glass edge-light relative flex h-full flex-col overflow-hidden rounded-3xl p-7 sm:p-8",
                    plan.highlighted &&
                      "border-primary/35 bg-primary/[0.04] shadow-[0_24px_70px_-30px_rgba(251,191,36,0.35)]"
                  )}
                >
                  {plan.highlighted && (
                    <p className="mb-4 inline-flex w-fit rounded-full bg-primary/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary">
                      {copy.pricing.popular}
                    </p>
                  )}

                  <h3 className="text-xl font-bold text-white">{plan.title}</h3>

                  <Price cell={cell} currency={currency} copy={copy} />

                  {plan.description && (
                    <p className="mt-4 text-sm leading-[1.8] text-white/55">
                      {plan.description}
                    </p>
                  )}

                  {plan.features.length > 0 && (
                    <ul className="mt-6 flex-1 space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm leading-relaxed text-white/70">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link
                    href={href}
                    className={cn(
                      "group mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                      plan.highlighted
                        ? "bg-primary text-primary-foreground"
                        : "border border-white/15 text-white/80"
                    )}
                  >
                    {copy.pricing.cta}
                    <Arrow />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>

        <p data-reveal className="mt-8 text-xs leading-relaxed text-white/35">
          {currency === "IRR" ? copy.pricing.tomanNote : copy.pricing.note}
        </p>
      </div>
    </section>
  );
}

/**
 * The price block.
 *
 * Toman is the headline for a Rial visitor and the euro figure the line
 * beneath it, rather than the other way round: euro is what the ledger is
 * denominated in, but it is not the number the customer is deciding on.
 */
function Price({
  cell,
  currency,
  copy,
}: {
  cell: LandingPriceCell;
  currency: BillingCurrency;
  copy: LandingCopy;
}) {
  const showToman = currency === "IRR" && cell.toman !== null;
  const perPeriod =
    cell.months === 3 ? copy.pricing.perQuarter : copy.pricing.perMonthUnit;
  const perMonth = showToman ? cell.perMonthToman : cell.perMonthEur;

  return (
    <div className="mt-5">
      {cell.eurStrike && !showToman && (
        <p className="text-sm text-white/35 line-through" dir="ltr">
          {cell.eurStrike}
        </p>
      )}

      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-[2.1rem] font-bold leading-none tracking-tight text-white">
          {showToman ? cell.toman : <bdi dir="ltr">{cell.eur}</bdi>}
        </span>
        <span className="text-sm text-white/45">{perPeriod}</span>
      </p>

      <div className="mt-2 space-y-0.5 text-xs text-white/40">
        {showToman && (
          <p>
            <bdi dir="ltr">{cell.eur}</bdi>
          </p>
        )}
        {perMonth && (
          <p>{interpolateText(copy.pricing.perMonth, { amount: perMonth })}</p>
        )}
        {cell.discountPercent > 0 && (
          <p className="font-medium text-emerald-300">
            {interpolateText(copy.pricing.off, {
              percent: cell.discountPercent,
            })}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * What the section falls back to when there are no plans to price.
 *
 * The plans table is admin-owned and can legitimately be empty on a fresh
 * install; the database can also simply be unreachable, which is the same
 * thing from here. Either way the section says what the subscription covers
 * and sends the visitor to sign-up. Inventing a price would be worse than
 * showing none.
 */
export function LandingPricingFallback({
  copy,
  isSignedIn,
}: {
  copy: LandingCopy;
  isSignedIn: boolean;
}) {
  return (
    <section
      id="pricing"
      className="relative scroll-mt-24 py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(ellipse_45%_60%_at_50%_0%,rgba(114,9,183,0.16),transparent)]"
      />

      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <SectionHead title={copy.pricing.title} sub={copy.pricing.sub} />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12">
          <ul data-reveal-group className="lg:col-span-7">
            {copy.pricing.fallback.map((point) => (
              <li
                key={point}
                data-reveal-item
                className="flex items-center gap-4 border-b border-white/[0.07] py-5 last:border-b-0"
              >
                <Check className="h-5 w-5 shrink-0 text-primary" />
                <span className="text-base text-white/75">{point}</span>
              </li>
            ))}
          </ul>

          <div data-reveal className="lg:col-span-4 lg:col-start-9 lg:pt-4">
            <Link
              href={isSignedIn ? "/subscription" : "/sign-up"}
              className="group inline-flex min-h-13 items-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-200 hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {copy.pricing.cta}
              <Arrow />
            </Link>
            <p className="mt-4 text-xs text-white/35">{copy.pricing.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A labelled segmented control in the landing's glass idiom. */
function Segmented({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="glass inline-flex items-center gap-1 rounded-full p-1"
    >
      {children}
    </div>
  );
}

function SegmentButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        selected
          ? "bg-primary text-primary-foreground"
          : "text-white/55 hover:text-white/85"
      )}
    >
      {children}
    </button>
  );
}
