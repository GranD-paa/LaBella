"use client";

import { CalendarDays, Lock, ShieldCheck, Sparkles } from "lucide-react";

import { SubscriptionPlanCards } from "@/components/subscription/subscription-plan-cards";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";

type SubscriptionViewProps = {
  isAdmin: boolean;
  displayName: string;
};

export function SubscriptionView({ isAdmin, displayName }: SubscriptionViewProps) {
  const { t } = useTranslations();

  return (
    <div className="space-y-10 pb-4">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-10">
        <div className="absolute inset-0 bg-brand-gradient opacity-20" />
        <div className="relative mx-auto max-w-3xl space-y-5 text-center">
          <Badge
            variant="outline"
            className="gap-1.5 border-brand-accent/40 bg-white/5 px-3 py-1 text-brand-accent"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            {t("subscription.monthlyBadge")}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("subscription.title")}
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            {t("subscription.subtitle", { name: displayName })}
          </p>
        </div>
      </section>

      {isAdmin ? (
        <section className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 sm:p-5">
          <div className="flex gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            <div className="space-y-1">
              <p className="font-semibold text-amber-100">
                {t("subscription.adminBannerTitle")}
              </p>
              <p className="text-sm text-amber-100/80">
                {t("subscription.adminBannerDescription")}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <SubscriptionPlanCards isAdmin={isAdmin} />

      <section className="grid gap-4 sm:grid-cols-3">
        {(
          [
            "subscription.trust.secure",
            "subscription.trust.flexible",
            "subscription.trust.instant",
          ] as const
        ).map((key) => (
          <div
            key={key}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center"
          >
            <Sparkles className="mx-auto mb-2 h-5 w-5 text-brand-accent" />
            <p className="text-sm font-medium">{t(key)}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t("subscription.footerNote")}
          </p>
        </div>
      </section>
    </div>
  );
}
