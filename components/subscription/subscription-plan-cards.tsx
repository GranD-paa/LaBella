"use client";

import { useState } from "react";
import { Check, Crown, Sparkles, Sprout, Zap } from "lucide-react";
import { toast } from "sonner";

import { CheckoutDialog } from "@/components/subscription/checkout-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import {
  computePrice,
  convertEurCentsToRial,
  eurToCents,
} from "@/lib/billing/money";
import { formatRialAsToman } from "@/lib/billing/format";
import type {
  BillingCurrency,
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
} as const;

function discountedPrice(priceEur: number, discountPercent: number) {
  return priceEur * (1 - discountPercent / 100);
}

export function SubscriptionPlanCards({
  isAdmin,
  language,
  plans,
  currency = "EUR",
  settings,
  fxRate,
  availableProviders = [],
}: {
  isAdmin: boolean;
  language?: CurriculumLanguage;
  plans: SubscriptionPlanRow[];
  currency?: BillingCurrency;
  settings?: PaymentSettings;
  fxRate?: FxRate | null;
  availableProviders?: PaymentProviderSlug[];
}) {
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
    .filter((plan) => !language || plan.language_slug === language.slug)
    .sort((a, b) => a.order_number - b.order_number);

  return (
    <div className="space-y-4">
      {language ? (
        <p className="text-center text-sm text-muted-foreground">
          {t("subscription.plansForLanguage", { language: language.name })}
        </p>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-3">
        {sortedPlans.map((plan) => {
          const meta = getSubscriptionPlanMeta(plan.plan_slug);
          const PlanIcon = PLAN_ICONS[meta.icon];
          const planName = plan.title[locale];
          const hasDiscount = plan.discount_percent > 0;
          const finalPrice = discountedPrice(plan.price_eur, plan.discount_percent);
          // Mirrors the server's rounding exactly, so the Rial figure shown
          // here is the one the gateway will ask for.
          const netCents = computePrice(
            eurToCents(plan.price_eur),
            plan.discount_percent
          ).netCents;
          const rialPreview = rialFor(netCents);

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
                        €{plan.price_eur.toFixed(2)}
                      </span>
                    ) : null}
                    <div className="flex items-end justify-center gap-1">
                      <span className="text-4xl font-bold tracking-tight">
                        €{finalPrice.toFixed(2)}
                      </span>
                      <span className="pb-1 text-sm text-muted-foreground">
                        / {t("subscription.billingPeriod")}
                      </span>
                    </div>
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
          amountEurCents={
            computePrice(
              eurToCents(checkoutPlan.price_eur),
              checkoutPlan.discount_percent
            ).netCents
          }
          amountRial={rialFor(
            computePrice(
              eurToCents(checkoutPlan.price_eur),
              checkoutPlan.discount_percent
            ).netCents
          )}
          providers={availableProviders}
        />
      ) : null}
    </div>
  );
}
