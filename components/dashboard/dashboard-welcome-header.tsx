"use client";

import Link from "next/link";
import { Flame, Menu, PlayCircle, Target, User, Zap } from "lucide-react";

import { PlateFacts, PlateHead } from "@/components/layout/plate";
import { FlagIcon } from "@/components/menu/flag-icon";
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

/** A count the learner has earned, stated rather than decorated. */
function Chip({
  icon: Icon,
  children,
}: {
  icon: typeof Flame;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.8125rem] font-medium text-foreground/85">
      <Icon className="h-4 w-4 text-violet-200/70" aria-hidden />
      {children}
    </span>
  );
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
    <PlateHead
      leading={
        <Avatar className="h-12 w-12 shrink-0 rounded-xl border border-white/10 bg-white/[0.06]">
          {avatarUrl ? <AvatarImage src={avatarUrl} alt={displayName} /> : null}
          <AvatarFallback className="rounded-xl bg-transparent text-base font-semibold text-foreground/80">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>
      }
      title={t("dashboard.user.hello", { name: displayName })}
      lede={t("dashboard.user.journeySubtitle")}
      action={
        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:min-w-[15rem]">
          {/* The one filled button on the plate. Gold is what you are about to
              do, and on this screen that is exactly one thing. */}
          <Button asChild size="lg" className="h-12 w-full text-base font-semibold">
            <Link href={snapshot.continueHref}>
              <PlayCircle className="h-5 w-5" />
              {t("dashboard.user.continueLearningButton")}
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.07] hover:text-foreground"
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
              className="flex-1 border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.07] hover:text-foreground"
            >
              <Link href="/profile">
                <User className="h-4 w-4" />
                {t("dashboard.user.viewProfile")}
              </Link>
            </Button>
          </div>
        </div>
      }
    >
      <PlateFacts
        facts={[
          {
            label: t("dashboard.user.learningLabel"),
            value: (
              <>
                <span>{languageName}</span>
                <FlagIcon slug={languageSlug} className="h-4 w-6" />
              </>
            ),
          },
          {
            label: t("dashboard.user.levelLabel"),
            value: snapshot.levelCode,
          },
          {
            label: t("dashboard.user.activeCourseLabel"),
            value: activeCourseTitle,
          },
        ]}
      />

      {hasEngagementMetrics ? (
        <div className="mt-6 flex flex-wrap gap-2.5">
          {engagement.streakDays !== null ? (
            <Chip icon={Flame}>
              {t("dashboard.user.streakSummary", {
                count: engagement.streakDays,
              })}
            </Chip>
          ) : null}
          {engagement.dailyGoalProgress !== null ? (
            <Chip icon={Target}>
              {t("dashboard.user.dailyGoalSummary", {
                percent: engagement.dailyGoalProgress,
              })}
            </Chip>
          ) : null}
          {engagement.xpPoints !== null ? (
            <Chip icon={Zap}>
              {t("dashboard.user.xpSummary", { points: engagement.xpPoints })}
            </Chip>
          ) : null}
        </div>
      ) : null}
    </PlateHead>
  );
}
