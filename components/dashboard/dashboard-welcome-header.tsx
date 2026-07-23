"use client";

import Link from "next/link";
import { Flame, Menu, PlayCircle, Target, User, Zap } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type {
  ContinueLearningSnapshot,
  LearnerEngagementMetrics,
} from "@/lib/dashboard/continue-learning";
import {
  getLocalizedLanguageName,
  getLocalizedLevel,
} from "@/lib/curriculum/localize";
import type { LanguageSlug } from "@/lib/curriculum/types";

type DashboardWelcomeHeaderProps = {
  displayName: string;
  avatarUrl?: string | null;
  snapshot: ContinueLearningSnapshot;
  engagement: LearnerEngagementMetrics;
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function DashboardWelcomeHeader({
  displayName,
  avatarUrl,
  snapshot,
  engagement,
}: DashboardWelcomeHeaderProps) {
  const { t } = useTranslations();
  const languageSlug = snapshot.languageSlug as LanguageSlug;
  const languageName = getLocalizedLanguageName(languageSlug, t);
  const activeCourseTitle = getLocalizedLevel(
    languageSlug,
    {
      slug: snapshot.levelSlug,
      code: snapshot.levelCode,
      title: snapshot.activeCourseTitle,
      description: "",
      orderNumber: 0,
    },
    t
  ).title;

  const hasEngagementMetrics =
    engagement.streakDays !== null ||
    engagement.dailyGoalProgress !== null ||
    engagement.xpPoints !== null;

  return (
    <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
      <div className="absolute inset-0 bg-brand-gradient opacity-15" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1 space-y-5">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14 rounded-2xl border border-white/15 bg-white/10 shadow-brand">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={displayName} />
              ) : null}
              <AvatarFallback className="rounded-2xl bg-white/10 text-lg font-semibold text-brand-accent">
                {getInitials(displayName)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 space-y-1">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {t("dashboard.user.hello", { name: displayName })}
              </h1>
              <p className="text-base text-muted-foreground sm:text-lg">
                {t("dashboard.user.journeySubtitle")}
              </p>
            </div>
          </div>

          <dl className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("dashboard.user.learningLabel")}
              </dt>
              <dd className="flex items-center gap-2 text-base font-semibold sm:text-lg">
                <span>{languageName}</span>
                <span aria-hidden>{snapshot.flagEmoji}</span>
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("dashboard.user.levelLabel")}
              </dt>
              <dd className="text-base font-semibold sm:text-lg">
                {snapshot.levelCode}
              </dd>
            </div>
            <div className="space-y-1 sm:col-span-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {t("dashboard.user.activeCourseLabel")}
              </dt>
              <dd className="text-base font-semibold sm:text-lg">
                {activeCourseTitle}
              </dd>
            </div>
          </dl>

          {hasEngagementMetrics ? (
            <div className="flex flex-wrap gap-3">
              {engagement.streakDays !== null ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm">
                  <Flame className="h-4 w-4 text-primary" />
                  <span>
                    {t("dashboard.user.streakSummary", {
                      count: engagement.streakDays,
                    })}
                  </span>
                </div>
              ) : null}
              {engagement.dailyGoalProgress !== null ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm">
                  <Target className="h-4 w-4 text-primary" />
                  <span>
                    {t("dashboard.user.dailyGoalSummary", {
                      percent: engagement.dailyGoalProgress,
                    })}
                  </span>
                </div>
              ) : null}
              {engagement.xpPoints !== null ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>
                    {t("dashboard.user.xpSummary", {
                      points: engagement.xpPoints,
                    })}
                  </span>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex w-full shrink-0 flex-col gap-3 lg:w-auto lg:min-w-[220px]">
          <Button
            asChild
            size="lg"
            className="h-12 w-full bg-primary text-base font-semibold text-primary-foreground shadow-brand hover:bg-primary/90"
          >
            <Link href={snapshot.continueHref}>
              <PlayCircle className="h-5 w-5" />
              {t("dashboard.user.continueLearningButton")}
            </Link>
          </Button>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 border-white/15 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            >
              <Link href="/menu">
                <Menu className="h-4 w-4" />
                {t("dashboard.user.mainMenu")}
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 border-white/15 bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
            >
              <Link href="/profile">
                <User className="h-4 w-4" />
                {t("dashboard.user.viewProfile")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
