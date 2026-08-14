"use client";

import { CalendarRange, EyeOff, Percent, Tag } from "lucide-react";

import { PlanActiveToggle } from "@/components/admin/subscription/plan-active-toggle";
import { SubscriptionPlanEditDialog } from "@/components/admin/subscription/subscription-plan-edit-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SubscriptionPlanRow } from "@/types";

function discountedPrice(priceEur: number, discountPercent: number) {
  return priceEur * (1 - discountPercent / 100);
}

export function SubscriptionPlanList({ plans }: { plans: SubscriptionPlanRow[] }) {
  const { t, locale } = useTranslations();
  const sorted = [...plans].sort((a, b) => a.order_number - b.order_number);
  const otherLocales = (["fa", "en", "it"] as const).filter((code) => code !== locale);

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center gap-2">
          <Tag className="h-5 w-5 text-brand-accent" />
          {t("admin.subscription.plansTitle")}
        </CardTitle>
        <CardDescription>{t("admin.subscription.plansDescription")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {sorted.map((plan) => {
          const hasDiscount = plan.discount_percent > 0;
          const finalPrice = discountedPrice(plan.price_eur, plan.discount_percent);

          return (
            <div
              key={`${plan.plan_slug}-${plan.language_slug}`}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-muted/10 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{plan.title[locale]}</p>
                  <span className="text-xs text-muted-foreground">
                    ({otherLocales.map((code) => plan.title[code]).join(" / ")})
                  </span>
                  {hasDiscount ? (
                    <Badge className="gap-1 border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
                      <Percent className="h-3 w-3" />
                      {t("admin.subscription.discountBadge", {
                        percent: plan.discount_percent,
                      })}
                    </Badge>
                  ) : null}
                  {/*
                    Called out prominently: a plan being off sale is the single
                    most consequential thing about this row, and it is the only
                    reason the reserved fourth slot is invisible to learners.
                  */}
                  {plan.is_active ? null : (
                    <Badge className="gap-1 border-white/20 bg-white/10 text-muted-foreground">
                      <EyeOff className="h-3 w-3" />
                      {t("admin.subscription.notOnSaleBadge")}
                    </Badge>
                  )}
                  {plan.is_active && plan.quarterly_enabled ? (
                    <Badge className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      <CalendarRange className="h-3 w-3" />
                      {plan.quarterly_discount_percent > 0
                        ? t("admin.subscription.quarterlyBadgeWithDiscount", {
                            percent: plan.quarterly_discount_percent,
                          })
                        : t("admin.subscription.quarterlyBadge")}
                    </Badge>
                  ) : null}
                </div>
                <p className="truncate text-sm text-muted-foreground">
                  {plan.description[locale]}
                </p>
                <div className="flex items-baseline gap-2">
                  {hasDiscount ? (
                    <span className="text-sm text-muted-foreground line-through">
                      €{plan.price_eur.toFixed(2)}
                    </span>
                  ) : null}
                  <span className="text-lg font-bold text-brand-accent">
                    €{finalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    / {t("subscription.billingPeriod")}
                  </span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <PlanActiveToggle plan={plan} />
                <SubscriptionPlanEditDialog plan={plan} />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
