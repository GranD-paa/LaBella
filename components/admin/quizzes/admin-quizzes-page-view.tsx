"use client";

import Link from "next/link";
import { ArrowLeft, ListChecks, ShieldCheck } from "lucide-react";

import { QuizCreationWizard } from "@/components/admin/quizzes/quiz-creation-wizard";
import { QuizManagementTable } from "@/components/admin/quizzes/quiz-management-table";
import { useTranslations } from "@/components/providers/locale-provider";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EnrichedQuiz } from "@/lib/quiz-management/data";
import type { Lesson, QuizQuestion, UserQuizAttempt } from "@/types";

type QuizManagementStats = {
  totalQuizzes: number;
  publishedQuizzes: number;
  draftQuizzes: number;
  totalQuestions: number;
  totalAttempts: number;
  averageScore: number;
};

export function AdminQuizzesPageView({
  displayName,
  stats,
  quizzes,
  quizQuestions,
  attempts,
  lessons,
}: {
  displayName: string;
  stats: QuizManagementStats;
  quizzes: EnrichedQuiz[];
  quizQuestions: QuizQuestion[];
  attempts: UserQuizAttempt[];
  lessons: Lesson[];
}) {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
              <ShieldCheck className="me-1 h-3 w-3" />
              {t("admin.quizzes.pageBadge")}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("admin.quizzes.pageHello", { name: displayName })}
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              {t("admin.quizzes.pageSubtitle")}
            </p>
          </div>
          <Button variant="outline" className="border-white/20" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t("admin.quizzes.fullAdminPanel")}
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title={t("admin.quizzes.statTotalQuizzes")}
          value={stats.totalQuizzes}
          description={t("admin.quizzes.statPublishedDrafts", {
            published: stats.publishedQuizzes,
            drafts: stats.draftQuizzes,
          })}
          icon={ListChecks}
        />
        <StatCard
          title={t("admin.quizzes.statQuestions")}
          value={stats.totalQuestions}
          description={t("admin.quizzes.statQuestionsDesc")}
          icon={ListChecks}
        />
        <StatCard
          title={t("admin.quizzes.statAttempts")}
          value={stats.totalAttempts}
          description={t("admin.quizzes.statAttemptsDesc")}
          icon={ListChecks}
        />
        <StatCard
          title={t("admin.quizzes.statAverageScore")}
          value={`${stats.averageScore}%`}
          description={t("admin.quizzes.statAverageScoreDesc")}
          icon={ListChecks}
        />
      </section>

      <QuizCreationWizard lessons={lessons} />

      <QuizManagementTable
        quizzes={quizzes}
        quizQuestions={quizQuestions}
        attempts={attempts}
      />
    </div>
  );
}
