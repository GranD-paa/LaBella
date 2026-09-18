"use client";

import { Suspense } from "react";

import { AchievementsSection } from "@/components/dashboard/achievements-section";
import { ContinueLearningCard } from "@/components/dashboard/continue-learning-card";
import { DashboardWelcomeHeader } from "@/components/dashboard/dashboard-welcome-header";
import { QuizSubmittedBanner } from "@/components/dashboard/quiz-submitted-banner";
import { Figure, FigureRail } from "@/components/layout/figure";
import { Plate, PlateHorizon } from "@/components/layout/plate";
import { useTranslations } from "@/components/providers/locale-provider";
import {
  MySubscriptionsCard,
  type MySubscriptionEntry,
} from "@/components/subscription/my-subscriptions-card";
import type { UserDashboardData } from "@/lib/dashboard-data";

export function UserDashboard({
  data,
  displayName,
  subscriptions = [],
}: {
  data: UserDashboardData;
  displayName: string;
  subscriptions?: MySubscriptionEntry[];
}) {
  const { t } = useTranslations();
  const earnedCount = data.achievements.filter((a) => a.earned).length;

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <QuizSubmittedBanner />
      </Suspense>

      <Plate>
        <DashboardWelcomeHeader
          displayName={displayName}
          avatarUrl={data.profile?.avatar_url}
          snapshot={data.continueLearning}
          engagement={data.engagement}
        />

        <PlateHorizon />

        <FigureRail>
          <Figure
            label={t("dashboard.user.quizzesCompleted")}
            value={data.stats.completedQuizzes}
            note={t("dashboard.user.ofTotal", {
              total: data.stats.totalQuizzes,
            })}
          />
          <Figure
            label={t("dashboard.user.averageScore")}
            value={data.stats.averageScore}
            suffix="%"
            note={t("dashboard.user.acrossAttempts")}
          />
          <Figure
            label={t("dashboard.user.availableQuizzes")}
            value={data.stats.availableQuizzes}
            note={t("dashboard.user.readyToTake")}
          />
          {/* The count climbs the earned half; the total it is out of holds
              still, because it is not something the learner is earning. */}
          <Figure
            label={t("dashboard.user.achievements")}
            value={earnedCount}
            suffix={`/${data.achievements.length}`}
            note={
              earnedCount > 0
                ? t("dashboard.user.keepGoing")
                : t("dashboard.user.startFirstQuiz")
            }
          />
        </FigureRail>

        <ContinueLearningCard snapshot={data.continueLearning} />

        <AchievementsSection achievements={data.achievements} />
      </Plate>

      {/*
        What the learner paid for. Still on the older card idiom — the
        subscription surfaces move to the plate together, so that this and
        /subscription never disagree about what a plan looks like.
      */}
      <MySubscriptionsCard entries={subscriptions} />
    </div>
  );
}
