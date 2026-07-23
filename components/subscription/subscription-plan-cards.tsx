"use client";

import { Check, Crown, Sparkles, Sprout, Zap } from "lucide-react";
import { toast } from "sonner";

import { useTranslations } from "@/components/providers/locale-provider";
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
import {
  SUBSCRIPTION_PLANS,
  type SubscriptionPlan,
} from "@/lib/subscription/plans";
import { cn } from "@/lib/utils";

const PLAN_ICONS = {
  seedling: Sprout,
  zap: Zap,
  crown: Crown,
} as const;

export function SubscriptionPlanCards({ isAdmin }: { isAdmin: boolean }) {
  const { t } = useTranslations();

  function handleSubscribe(plan: SubscriptionPlan) {
    const planName = t(`subscription.plans.${plan.id}.name`);
    toast.info(t("subscription.paymentSoon"), {
      description: t("subscription.checkoutSoon", { plan: planName }),
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {SUBSCRIPTION_PLANS.map((plan) => {
        const PlanIcon = PLAN_ICONS[plan.icon];
        const planKey = `subscription.plans.${plan.id}` as const;
        const planName = t(`${planKey}.name`);

        return (
          <Card
            key={plan.id}
            className={cn(
              "brand-surface relative flex flex-col overflow-hidden transition-transform hover:-translate-y-0.5",
              plan.highlighted &&
                "border-brand-accent shadow-brand ring-1 ring-brand-accent/35 lg:scale-[1.02]"
            )}
          >
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b opacity-80",
                plan.accentClass
              )}
            />
            {plan.highlighted ? (
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
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.priceLabel}
                  </span>
                  <span className="pb-1 text-sm text-muted-foreground">
                    / {t("subscription.billingPeriod")}
                  </span>
                </div>
                <CardDescription>{t(`${planKey}.description`)}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="relative flex-1">
              <ul className="space-y-3">
                {plan.featureKeys.map((featureKey) => (
                  <li key={featureKey} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                    <span>{t(featureKey)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="relative">
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                onClick={() => handleSubscribe(plan)}
              >
                {isAdmin
                  ? t("subscription.adminPreviewCta", { plan: planName })
                  : t(`${planKey}.cta`)}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
