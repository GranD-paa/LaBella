"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CalendarDays, Lock, ShieldCheck, Sparkles } from "lucide-react";

import { recoverMyPendingPaymentsAction } from "@/app/actions/checkout";
import { SubscriptionLanguageTabs } from "@/components/subscription/subscription-language-tabs";
import { SubscriptionPlanCards } from "@/components/subscription/subscription-plan-cards";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import { interpolateText } from "@/lib/subscription/interpolate";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BILLING_PERIOD_MONTHS } from "@/types";
import type {
  BillingCurrency,
  BillingPeriodMonths,
  FxRate,
  PaymentProviderSlug,
  PaymentSettings,
  SubscriptionPageContentRow,
  SubscriptionPlanRow,
} from "@/types";

type SubscriptionViewProps = {
  isAdmin: boolean;
  displayName: string;
  languages: CurriculumLanguage[];
  plans: SubscriptionPlanRow[];
  pageContent: SubscriptionPageContentRow;
  settings: PaymentSettings;
  fxRate: FxRate | null;
  /** Gateways live for each currency, resolved on the server. */
  providersByCurrency: Record<BillingCurrency, PaymentProviderSlug[]>;
};

export function SubscriptionView({
  isAdmin,
  displayName,
  languages,
  plans,
  pageContent,
  settings,
  fxRate,
  providersByCurrency,
}: SubscriptionViewProps) {
  const { t, locale } = useTranslations();
  const defaultSlug =
    languages.find((language) => language.available)?.slug ??
    languages[0]?.slug ??
    "italian";
  const [selectedSlug, setSelectedSlug] = useState<string>(defaultSlug);
  const [currency, setCurrency] = useState<BillingCurrency>("EUR");
  const [periodMonths, setPeriodMonths] = useState<BillingPeriodMonths>(1);
  const router = useRouter();

  /**
   * Rescue a payment whose gateway callback never landed.
   *
   * Runs once per visit rather than only on `?checkout=…` returns, because the
   * learner this helps is precisely the one who never got redirected back and
   * so arrives here with no query string at all — they just reopened the page
   * wondering where their subscription went.
   */
  useEffect(() => {
    let cancelled = false;

    recoverMyPendingPaymentsAction()
      .then((result) => {
        if (cancelled || result.activated === 0) return;
        toast.success(t("subscription.recovered.title"), {
          description: t("subscription.recovered.description"),
        });
        router.refresh();
      })
      // Recovery is opportunistic: if it fails, the nightly job still has it.
      .catch(() => {});

    return () => {
      cancelled = true;
    };
    // Deliberately once per mount — re-running on every locale change would
    // re-hit the gateway for no reason.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rial is offered only when it is switched on *and* there is a rate to
  // price with. Showing the toggle without a usable rate would walk the
  // customer into a checkout that cannot quote them a price.
  const usableRate =
    settings.fx_source === "manual" ? settings.fx_manual_rate : (fxRate?.rate ?? null);
  const canPayInRial = settings.irr_enabled && Boolean(usableRate);
  const selectedLanguage = useMemo(
    () => languages.find((language) => language.slug === selectedSlug) ?? languages[0],
    [languages, selectedSlug]
  );

  // Plans on sale for the language in view. An inactive plan is filtered out
  // here rather than merely hidden in the card grid, so nothing downstream —
  // the period toggle, the saving badge — is computed from a plan the learner
  // cannot buy.
  const sellablePlans = useMemo(
    () =>
      plans.filter(
        (plan) =>
          plan.is_active &&
          (!selectedLanguage || plan.language_slug === selectedLanguage.slug)
      ),
    [plans, selectedLanguage]
  );

  // Offer the three-month option only where something actually sells it.
  const canPayQuarterly = sellablePlans.some((plan) => plan.quarterly_enabled);

  // The best quarterly saving on offer, for the toggle's badge. Advertising a
  // saving requires there to be one: with every quarterly discount at zero the
  // badge would promise money back that nobody gets.
  const bestQuarterlySaving = sellablePlans.reduce(
    (best, plan) =>
      plan.quarterly_enabled
        ? Math.max(best, plan.quarterly_discount_percent)
        : best,
    0
  );

  // A language whose plans all have quarterly off must not leave the learner
  // stuck on a period they cannot buy.
  const effectivePeriod: BillingPeriodMonths = canPayQuarterly ? periodMonths : 1;

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
            {pageContent.hero_title[locale]}
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            {interpolateText(pageContent.hero_subtitle[locale], { name: displayName })}
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

      <section className="space-y-4">
        <div className="space-y-1 text-center">
          <h2 className="text-lg font-semibold">
            {t("subscription.languageStepTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("subscription.languageStepHint")}
          </p>
        </div>
        <SubscriptionLanguageTabs
          languages={languages}
          selectedSlug={selectedSlug}
          onSelect={setSelectedSlug}
        />
      </section>

      <div className="flex flex-col items-center gap-3">
        {canPayInRial ? (
          <div
            className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1"
            role="group"
            aria-label={t("subscription.currencyGroupLabel")}
          >
            {(["EUR", "IRR"] as const).map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant="ghost"
                aria-pressed={currency === option}
                onClick={() => setCurrency(option)}
                className={cn(
                  "rounded-lg px-4",
                  currency === option
                    ? "bg-brand-accent/15 text-brand-accent hover:bg-brand-accent/20"
                    : "text-muted-foreground"
                )}
              >
                {option === "EUR"
                  ? t("subscription.currencyEur")
                  : t("subscription.currencyIrr")}
              </Button>
            ))}
          </div>
        ) : null}

        {canPayQuarterly ? (
          <div
            className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 p-1"
            role="group"
            aria-label={t("subscription.periodGroupLabel")}
          >
            {BILLING_PERIOD_MONTHS.map((option) => (
              <Button
                key={option}
                type="button"
                size="sm"
                variant="ghost"
                aria-pressed={effectivePeriod === option}
                onClick={() => setPeriodMonths(option)}
                className={cn(
                  "gap-2 rounded-lg px-4",
                  effectivePeriod === option
                    ? "bg-brand-accent/15 text-brand-accent hover:bg-brand-accent/20"
                    : "text-muted-foreground"
                )}
              >
                {option === 1
                  ? t("subscription.periodMonthly")
                  : t("subscription.periodQuarterly")}
                {option === 3 && bestQuarterlySaving > 0 ? (
                  <Badge className="bg-emerald-500/20 px-1.5 py-0 text-[10px] font-semibold text-emerald-300 hover:bg-emerald-500/25">
                    {t("subscription.periodSaveBadge", {
                      percent: bestQuarterlySaving,
                    })}
                  </Badge>
                ) : null}
              </Button>
            ))}
          </div>
        ) : null}
      </div>

      <SubscriptionPlanCards
        isAdmin={isAdmin}
        language={selectedLanguage}
        plans={plans}
        currency={currency}
        periodMonths={effectivePeriod}
        settings={settings}
        fxRate={fxRate}
        availableProviders={providersByCurrency[currency]}
      />

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
            {pageContent.footer_note[locale]}
          </p>
        </div>
      </section>
    </div>
  );
}
