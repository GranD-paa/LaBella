"use client";

import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Flame,
  ListChecks,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import { ContinueLearningCard } from "@/components/dashboard/continue-learning-card";
import { DashboardWelcomeHeader } from "@/components/dashboard/dashboard-welcome-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UserDashboardData } from "@/lib/dashboard-data";
import { ACHIEVEMENT_MESSAGE_KEYS } from "@/lib/i18n/content-keys";
import { cn } from "@/lib/utils";

const ACHIEVEMENT_ICONS = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  target: Target,
  flame: Flame,
};

export function UserDashboard({
  data,
  displayName,
}: {
  data: UserDashboardData;
  displayName: string;
}) {
  const { t, formatDate } = useTranslations();
  const earnedCount = data.achievements.filter((a) => a.earned).length;

  return (
    <div className="space-y-8">
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

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            {t("dashboard.user.achievementsTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("dashboard.user.achievementsHint")}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.achievements.map((achievement) => {
            const Icon = ACHIEVEMENT_ICONS[achievement.icon];
            const messageKey = ACHIEVEMENT_MESSAGE_KEYS[achievement.id];
            return (
              <div
                key={achievement.id}
                className={cn(
                  "brand-surface flex items-start gap-3 p-4 transition-all",
                  achievement.earned
                    ? "border-brand-accent/30"
                    : "opacity-60 grayscale"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    achievement.earned
                      ? "bg-brand-accent/15 text-brand-accent"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">
                    {messageKey
                      ? t(`${messageKey}.title`)
                      : achievement.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {messageKey
                      ? t(`${messageKey}.description`)
                      : achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            {t("dashboard.user.activityHistory")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("dashboard.user.activityHint")}
          </p>
        </div>
        {data.completedQuizDetails.length > 0 ? (
          <div className="grid gap-3">
            {data.completedQuizDetails.slice(0, 6).map((quiz) => (
              <div
                key={quiz.attemptId}
                className="brand-surface flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div>
                  <p className="font-medium">{quiz.quizTitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {quiz.lessonTitle} ·{" "}
                    {formatDate(quiz.completedAt, { dateStyle: "medium" })}
                  </p>
                </div>
                <Badge className="bg-primary/15 text-primary hover:bg-primary/20">
                  {quiz.score}%
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-12 text-center text-muted-foreground">
            <p>{t("dashboard.user.noActivity")}</p>
            <Button className="mt-4" asChild>
              <Link href="/learn/italian">{t("dashboard.user.goToItalian")}</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
