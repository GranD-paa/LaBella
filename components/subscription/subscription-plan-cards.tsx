"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Check, Crown, Gem, Sparkles, Sprout, Zap } from "lucide-react";
import { toast } from "sonner";

import { CheckoutDialog } from "@/components/subscription/checkout-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import {
  centsToEur,
  convertEurCentsToRial,
  divRoundHalfUp,
  resolvePlanPeriodPrice,
} from "@/lib/billing/money";
import { formatRialAsToman } from "@/lib/billing/format";
import type {
  BillingCurrency,
  BillingPeriodMonths,
  FxRate,
  PaymentProviderSlug,
  PaymentSettings,
} from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSubscriptionPlanMeta } from "@/lib/subscription/plans";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { SubscriptionPlanRow } from "@/types";
import { cn } from "@/lib/utils";

const PLAN_ICONS = {
  seedling: Sprout,
  zap: Zap,
  crown: Crown,
  gem: Gem,
} as const;

export function SubscriptionPlanCards({
  isAdmin,
  isSignedIn = true,
  language,
  plans,
  currency = "EUR",
  periodMonths = 1,
  settings,
  fxRate,
  availableProviders = [],
}: {
  isAdmin: boolean;
  /** Defaults to true so the dashboard's own use of this card is unchanged. */
  isSignedIn?: boolean;
  language?: CurriculumLanguage;
  plans: SubscriptionPlanRow[];
  currency?: BillingCurrency;
  periodMonths?: BillingPeriodMonths;
  settings?: PaymentSettings;
  fxRate?: FxRate | null;
  availableProviders?: PaymentProviderSlug[];
}) {
  const router = useRouter();
  const { t, locale } = useTranslations();
  const [checkoutPlan, setCheckoutPlan] = useState<SubscriptionPlanRow | null>(
    null
  );

  /**
   * Rial preview only. The amount actually charged is recomputed server-side
   * from the same rate and margin, so a stale page cannot lock in an old
   * price — this is here to show the customer a figure, not to set one.
   */
  function rialFor(netCents: number): number | null {
    if (!settings || !fxRate) return null;
    const rate =
      settings.fx_source === "manual" ? settings.fx_manual_rate : fxRate.rate;
    if (!rate || rate <= 0) return null;

    return convertEurCentsToRial({
      eurCents: netCents,
      rialPerEur: rate,
      marginPercent: settings.fx_margin_percent,
      roundToRial: settings.irr_rounding,
    });
  }

  function handleSubscribe(plan: SubscriptionPlanRow) {
    // A visitor reading the plans without an account: send them to sign-up
    // rather than into a checkout the server would refuse anyway. Same
    // destination the landing page's pricing gives them.
    if (!isSignedIn) {
      router.push("/sign-up?redirectedFrom=%2Fsubscription");
      return;
    }

    // Admins previewing the storefront should not be able to buy from it.
    if (isAdmin) {
      toast.info(t("subscription.paymentSoon"), {
        description: t("subscription.checkoutSoon", { plan: plan.title[locale] }),
      });
      return;
    }
    setCheckoutPlan(plan);
  }

  const sortedPlans = plans
    .filter(
      (plan) =>
        // A plan switched off for this language must not appear at all — not
        // greyed out, not "coming soon". The reserved fourth slot ships this
        // way, so it is invisible until an admin turns it on.
        plan.is_active && (!language || plan.language_slug === language.slug)
    )
    .sort((a, b) => a.order_number - b.order_number);

  /**
   * Price for one plan over the selected period. A plan with the quarterly
   * option switched off stays on monthly pricing even while the toggle says
   * three months, which matches what checkout will accept for it.
   */
  function pricingFor(plan: SubscriptionPlanRow) {
    const months: BillingPeriodMonths =
      periodMonths === 3 && plan.quarterly_enabled ? 3 : 1;
    return { months, price: resolvePlanPeriodPrice(plan, months) };
  }

  return (
    <div className="space-y-4">
      {language ? (
        <p className="text-center text-sm text-muted-foreground">
          {t("subscription.plansForLanguage", { language: language.name })}
        </p>
      ) : null}
      <div
        className={cn(
          "grid gap-6 sm:grid-cols-2",
          // Four cards side by side would be too narrow to read at lg, so the
          // fourth slot being switched on widens the grid a breakpoint later
          // instead of squeezing the existing three.
          sortedPlans.length >= 4
            ? "lg:grid-cols-2 xl:grid-cols-4"
            : "sm:grid-cols-1 lg:grid-cols-3"
        )}
      >
        {sortedPlans.map((plan) => {
          const meta = getSubscriptionPlanMeta(plan.plan_slug);
          const PlanIcon = PLAN_ICONS[meta.icon];
          const planName = plan.title[locale];
          // Mirrors the server's rounding exactly, so the figures shown here
          // are the ones the gateway will ask for.
          const { months, price } = pricingFor(plan);
          const hasDiscount = price.discountPercent > 0;
          const rialPreview = rialFor(price.netCents);

          return (
            <Card
              key={plan.plan_slug}
              className={cn(
                "brand-surface relative flex flex-col overflow-hidden transition-transform hover:-translate-y-0.5",
                meta.highlighted &&
                  "border-brand-accent shadow-brand ring-1 ring-brand-accent/35 lg:scale-[1.02]"
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b opacity-80",
                  meta.accentClass
                )}
              />
              {hasDiscount ? (
                <div
                  className="absolute -left-12 top-6 z-10 w-40 -rotate-45 bg-gradient-to-r from-rose-600 to-red-500 py-1 text-center text-xs font-bold text-white shadow-lg"
                  aria-hidden="true"
                >
                  {t("subscription.discountRibbon", { percent: plan.discount_percent })}
                </div>
              ) : null}
              {meta.highlighted ? (
                <Badge className="absolute start-1/2 top-4 z-10 -translate-x-1/2 gap-1 bg-primary text-primary-foreground hover:bg-primary/90 rtl:translate-x-1/2">
                  <Sparkles className="h-3 w-3" />
                  {t("subscription.mostPopular")}
                </Badge>
              ) : null}
              <CardHeader className="relative space-y-4 pb-2 pt-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                  <PlanIcon className="h-6 w-6 text-brand-accent" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-xl">{planName}</CardTitle>
                  <div className="flex flex-col items-center gap-1">
                    {hasDiscount ? (
                      <span className="text-sm text-muted-foreground line-through">
                        €{centsToEur(price.listCents).toFixed(2)}
                      </span>
                    ) : null}
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-4xl font-bold tracking-tight">
                        €{centsToEur(price.netCents).toFixed(2)}
                      </span>
                      <span className="pb-1 text-sm text-muted-foreground">
                        /{" "}
                        {months === 3
                          ? t("subscription.billingPeriodQuarterly")
                          : t("subscription.billingPeriod")}
                      </span>
                    </div>
                    {months === 3 ? (
                      <p className="text-xs text-muted-foreground">
                        {t("subscription.perMonthEquivalent", {
                          amount: `€${centsToEur(
                            divRoundHalfUp(price.netCents, 3)
                          ).toFixed(2)}`,
                        })}
                      </p>
                    ) : null}
                    {currency === "IRR" && rialPreview !== null ? (
                      <p className="text-sm font-medium text-brand-accent">
                        {t("subscription.approxRial", {
                          amount: formatRialAsToman(rialPreview, locale),
                        })}
                      </p>
                    ) : null}
                  </div>
                  <CardDescription>{plan.description[locale]}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="relative flex-1">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                      <span>{feature[locale]}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="relative">
                <Button
                  className="w-full"
                  variant={meta.highlighted ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan)}
                >
                  {isAdmin
                    ? t("subscription.adminPreviewCta", { plan: planName })
                    : t("subscription.getPlanCta", { plan: planName })}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {checkoutPlan ? (
        <CheckoutDialog
          open
          onOpenChange={(next) => {
            if (!next) setCheckoutPlan(null);
          }}
          planSlug={checkoutPlan.plan_slug}
          planName={checkoutPlan.title[locale]}
          languageSlug={checkoutPlan.language_slug}
          currency={currency}
          periodMonths={pricingFor(checkoutPlan).months}
          amountEurCents={pricingFor(checkoutPlan).price.netCents}
          amountRial={rialFor(pricingFor(checkoutPlan).price.netCents)}
          providers={availableProviders}
        />
      ) : null}
    </div>
  );
}
