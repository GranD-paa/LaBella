"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";

import { FlagIcon } from "@/components/menu/flag-icon";
import { SubscriptionPlanList } from "@/components/admin/subscription/subscription-plan-list";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LANGUAGES } from "@/lib/curriculum/languages";
import { cn } from "@/lib/utils";
import type { SubscriptionPlanRow } from "@/types";

export function AdminSubscriptionPageView({
  displayName,
  plans,
}: {
  displayName: string;
  plans: SubscriptionPlanRow[];
}) {
  const { t } = useTranslations();
  const [selectedSlug, setSelectedSlug] = useState(LANGUAGES[0].slug);

  const plansForLanguage = useMemo(
    () => plans.filter((plan) => plan.language_slug === selectedSlug),
    [plans, selectedSlug]
  );

  return (
    <div className="space-y-8">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
              <CreditCard className="me-1 h-3 w-3" />
              {t("admin.subscription.pageBadge")}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("admin.subscription.pageHello", { name: displayName })}
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              {t("admin.subscription.pageSubtitle")}
            </p>
          </div>
          <Button variant="outline" className="border-white/20" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t("admin.subscription.backToDashboard")}
            </Link>
          </Button>
        </div>
      </section>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          {t("admin.subscription.languageSelectorLabel")}
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LANGUAGES.map((language) => {
            const isSelected = language.slug === selectedSlug;
            return (
              <button
                key={language.slug}
                type="button"
                onClick={() => setSelectedSlug(language.slug)}
                aria-pressed={isSelected}
                className={cn(
                  "flex items-center gap-2 rounded-xl border p-3 text-start transition-colors hover:border-brand-accent/50",
                  isSelected
                    ? "border-brand-accent bg-brand-accent/10"
                    : "border-white/10 bg-white/5"
                )}
              >
                <FlagIcon slug={language.slug} className="h-6 w-9 shrink-0" />
                <span className="truncate text-sm font-semibold">{language.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <SubscriptionPlanList plans={plansForLanguage} />
    </div>
  );
}
