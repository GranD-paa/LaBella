"use client";

import Link from "next/link";
import {
  BookOpen,
  CalendarClock,
  Clapperboard,
  Crown,
  Gem,
  GraduationCap,
  ImageIcon,
  RotateCcw,
  Sparkles,
  Sprout,
  Zap,
} from "lucide-react";

import { FlagIcon } from "@/components/menu/flag-icon";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSubscriptionPlanMeta } from "@/lib/subscription/plans";
import { cn } from "@/lib/utils";
import type { LanguageSlug } from "@/lib/curriculum/types";
import type { LocalizedText, Subscription, SubscriptionTier } from "@/types";

const PLAN_ICONS = {
  seedling: Sprout,
  zap: Zap,
  crown: Crown,
  gem: Gem,
} as const;

export type MySubscriptionEntry = {
  subscription: Subscription;
  tier: SubscriptionTier | null;
  planTitle: LocalizedText | null;
  languageName: string;
};

/** Whole days left in the paid period, floored at zero. */
function daysRemaining(periodEnd: string): number {
  const ms = new Date(periodEnd).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

/**
 * The learner's active subscriptions, on their dashboard.
 *
 * This exists so that paying for something changes what the app looks like.
 * A subscription that only manifests as content silently not being blocked is
 * invisible: the learner has no way to tell what they bought, what it covers,
 * or when it renews. So the card names the plan, paints itself in that plan's
 * accent, lists what the tier actually unlocks, and counts down the period.
 */
export function MySubscriptionsCard({
  entries,
}: {
  entries: MySubscriptionEntry[];
}) {
  const { t, locale, formatDate } = useTranslations();

  if (entries.length === 0) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-brand-accent" aria-hidden="true" />
        <h2 className="text-lg font-semibold">
          {t("subscription.mine.title")}
        </h2>
      </div>

      <div
        className={cn(
          "grid gap-4",
          entries.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"
        )}
      >
        {entries.map(({ subscription, tier, planTitle, languageName }) => {
          const meta = getSubscriptionPlanMeta(subscription.plan_slug);
          const PlanIcon = PLAN_ICONS[meta.icon];
          const planName = planTitle?.[locale] ?? subscription.plan_slug;
          const remaining = daysRemaining(subscription.current_period_end);
          const isGrace = subscription.status === "past_due";

          const perks = [
            tier?.unlocks_vocabulary && {
              icon: ImageIcon,
              label: t("subscription.mine.perkVocabulary"),
            },
            tier?.unlocks_grammar && {
              icon: BookOpen,
              label: t("subscription.mine.perkGrammar"),
            },
            tier?.unlocks_video && {
              icon: Clapperboard,
              label: t("subscription.mine.perkVideo"),
            },
            tier?.unlocks_level_exam && {
              icon: GraduationCap,
              label: t("subscription.mine.perkLevelExam"),
            },
            {
              icon: RotateCcw,
              label:
                tier?.quiz_retake_limit === null
                  ? t("subscription.mine.perkRetakesUnlimited")
                  : t("subscription.mine.perkRetakes", {
                      count: tier?.quiz_retake_limit ?? 0,
                    }),
            },
          ].filter(Boolean) as Array<{
            icon: typeof BookOpen;
            label: string;
          }>;

          return (
            <Card
              key={subscription.id}
              className="brand-surface relative overflow-hidden"
            >
              {/* The plan's own accent, so each tier reads as a distinct thing. */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b opacity-80",
                  meta.accentClass
                )}
                aria-hidden="true"
              />

              <CardHeader className="relative space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                      <PlanIcon
                        className="h-5 w-5 text-brand-accent"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{planName}</CardTitle>
                      <CardDescription className="flex items-center gap-1.5">
                        <FlagIcon
                          slug={subscription.language_slug as LanguageSlug}
                          className="h-3.5 w-5"
                        />
                        {languageName}
                      </CardDescription>
                    </div>
                  </div>

                  <Badge
                    className={cn(
                      "shrink-0",
                      isGrace
                        ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                        : "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                    )}
                  >
                    {isGrace
                      ? t("subscription.mine.statusPastDue")
                      : t("subscription.mine.statusActive")}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="relative space-y-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarClock className="h-4 w-4" aria-hidden="true" />
                    {subscription.cancel_at_period_end
                      ? t("subscription.mine.endsOn", {
                          date: formatDate(subscription.current_period_end),
                        })
                      : t("subscription.mine.renewsOn", {
                          date: formatDate(subscription.current_period_end),
                        })}
                  </span>
                  <span
                    className={cn(
                      "font-semibold",
                      remaining <= 3 ? "text-amber-300" : "text-brand-accent"
                    )}
                  >
                    {t("subscription.mine.daysLeft", { count: remaining })}
                  </span>
                </div>

                <ul className="grid gap-2 sm:grid-cols-2">
                  {perks.map((perk) => (
                    <li
                      key={perk.label}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <perk.icon
                        className="h-4 w-4 shrink-0 text-brand-accent"
                        aria-hidden="true"
                      />
                      {perk.label}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  <Button asChild size="sm" variant="outline" className="border-white/20">
                    <Link href={`/learn/${subscription.language_slug}`}>
                      {t("subscription.mine.continueLearning")}
                    </Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link
                      href={`/subscription?language=${subscription.language_slug}`}
                    >
                      {t("subscription.mine.managePlan")}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
