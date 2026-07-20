"use client";

import { Suspense } from "react";
import {
  Award,
  CheckCircle2,
  ListChecks,
  Trophy,
} from "lucide-react";

import { AchievementsSection } from "@/components/dashboard/achievements-section";
import { ContinueLearningCard } from "@/components/dashboard/continue-learning-card";
import { DashboardWelcomeHeader } from "@/components/dashboard/dashboard-welcome-header";
import { QuizSubmittedBanner } from "@/components/dashboard/quiz-submitted-banner";
import { StatCard } from "@/components/dashboard/stat-card";
import { useTranslations } from "@/components/providers/locale-provider";
import type { UserDashboardData } from "@/lib/dashboard-data";

export function UserDashboard({
  data,
  displayName,
}: {
  data: UserDashboardData;
  displayName: string;
}) {
  const { t } = useTranslations();
  const earnedCount = data.achievements.filter((a) => a.earned).length;

  return (
    <div className="space-y-8">
      <Suspense fallback={null}>
        <QuizSubmittedBanner />
      </Suspense>

      <DashboardWelcomeHeader
        displayName={displayName}
        avatarUrl={data.profile?.avatar_url}
        snapshot={data.continueLearning}
        engagement={data.engagement}
      />

      <ContinueLearningCard snapshot={data.continueLearning} />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title={t("dashboard.user.quizzesCompleted")}
          value={data.stats.completedQuizzes}
          description={t("dashboard.user.ofTotal", {
            total: data.stats.totalQuizzes,
          })}
          icon={CheckCircle2}
        />
        <StatCard
          title={t("dashboard.user.averageScore")}
          value={`${data.stats.averageScore}%`}
          description={t("dashboard.user.acrossAttempts")}
          icon={Trophy}
        />
        <StatCard
          title={t("dashboard.user.availableQuizzes")}
          value={data.stats.availableQuizzes}
          description={t("dashboard.user.readyToTake")}
          icon={ListChecks}
        />
        <StatCard
          title={t("dashboard.user.achievements")}
          value={`${earnedCount}/${data.achievements.length}`}
          description={t("dashboard.user.milestonesUnlocked")}
          icon={Award}
          trend={
            earnedCount > 0
              ? t("dashboard.user.keepGoing")
              : t("dashboard.user.startFirstQuiz")
          }
        />
      </section>

      <AchievementsSection achievements={data.achievements} />
    </div>
  );
}
