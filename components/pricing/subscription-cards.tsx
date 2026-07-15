"use client";

import { Check, Sparkles } from "lucide-react";
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
import { cn } from "@/lib/utils";

const PLAN_CONFIG = [
  {
    id: "free" as const,
    price: "$0",
    highlighted: false,
    action: "current" as const,
    featureKeys: [
      "pricing.plans.free.features.lessons",
      "pricing.plans.free.features.flashcards",
      "pricing.plans.free.features.grammar",
      "pricing.plans.free.features.quizAttempt",
    ],
  },
  {
    id: "monthly" as const,
    price: "$9",
    highlighted: true,
    action: "subscribe" as const,
    featureKeys: [
      "pricing.plans.monthly.features.allFree",
      "pricing.plans.monthly.features.unlimited",
      "pricing.plans.monthly.features.analytics",
      "pricing.plans.monthly.features.offline",
      "pricing.plans.monthly.features.support",
    ],
  },
  {
    id: "yearly" as const,
    price: "$79",
    highlighted: false,
    action: "subscribe" as const,
    featureKeys: [
      "pricing.plans.yearly.features.allMonthly",
      "pricing.plans.yearly.features.save",
      "pricing.plans.yearly.features.bonus",
      "pricing.plans.yearly.features.certificate",
      "pricing.plans.yearly.features.earlyAccess",
    ],
  },
];

export function SubscriptionCards() {
  const { t } = useTranslations();

  function handleSubscribe(planName: string) {
    toast.info(t("pricing.paymentSoon"), {
      description: t("pricing.checkoutSoon", { plan: planName }),
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {PLAN_CONFIG.map((plan) => {
        const planKey = `pricing.plans.${plan.id}` as const;
        const planName = t(`${planKey}.name`);

        return (
          <Card
            key={plan.id}
            className={cn(
              "brand-surface relative flex flex-col",
              plan.highlighted &&
                "border-brand-accent shadow-brand ring-1 ring-brand-accent/30"
            )}
          >
            {plan.highlighted ? (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gap-1 bg-primary text-primary-foreground hover:bg-primary/90">
                <Sparkles className="h-3 w-3" />
                {t("pricing.mostPopular")}
              </Badge>
            ) : null}
            <CardHeader className="space-y-3 text-center">
              <CardTitle className="text-xl">{planName}</CardTitle>
              <div>
                <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                <span className="ml-1 text-sm text-muted-foreground">
                  / {t(`${planKey}.period`)}
                </span>
              </div>
              <CardDescription>{t(`${planKey}.description`)}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {plan.featureKeys.map((featureKey) => (
                  <li key={featureKey} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-accent" />
                    <span>{t(featureKey)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.action === "current" ? (
                <Button variant="outline" className="w-full" disabled>
                  {t(`${planKey}.cta`)}
                </Button>
              ) : (
                <Button
                  className="w-full"
                  variant={plan.highlighted ? "default" : "outline"}
                  onClick={() => handleSubscribe(planName)}
                >
                  {t(`${planKey}.cta`)}
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
