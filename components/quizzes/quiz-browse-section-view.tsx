"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ListChecks,
  PlayCircle,
} from "lucide-react";

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
import type { CurriculumLanguage, CurriculumLevel } from "@/lib/curriculum/types";
import { getQuizSectionTitleKey } from "@/lib/i18n/quiz-sections";
import type { EnrichedQuiz } from "@/lib/quiz-management/data";
import type { Lesson, UserQuizAttempt } from "@/types";

export function QuizBrowseSectionView({
  language,
  level,
  sectionSlug,
  lesson,
  quizzes,
  attempts,
  completedQuizId,
  completedScore,
}: {
  language: CurriculumLanguage;
  level: CurriculumLevel;
  sectionSlug: string;
  lesson: Lesson | null;
  quizzes: EnrichedQuiz[];
  attempts: UserQuizAttempt[];
  completedQuizId?: string;
  completedScore?: string;
}) {
  const { t } = useTranslations();

  const sectionTitleKey = getQuizSectionTitleKey(sectionSlug);
  const sectionTitle = sectionTitleKey ? t(sectionTitleKey) : sectionSlug;

  const completedQuiz = completedQuizId
    ? quizzes.find((quiz) => quiz.id === completedQuizId)
    : undefined;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
          <Link href={`/quizzes/browse/${language.slug}/${level.slug}`}>
            <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
            {t("quiz.browse.backToSections")}
          </Link>
        </Button>
        <div className="space-y-2">
          <Badge variant="outline" className="border-brand-accent/30 text-brand-accent">
            <ListChecks className="me-1 h-3 w-3" />
            {t("quiz.browse.stepAvailable")}
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight">{sectionTitle}</h1>
          <p className="text-muted-foreground">
            {language.name} · {level.code}
            {lesson ? ` · ${lesson.title}` : ""}
          </p>
        </div>
      </div>

      {completedQuiz && completedScore ? (
        <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="font-semibold">{t("quiz.browse.completed")}</p>
            <p className="text-sm text-muted-foreground">
              {t("quiz.browse.scored", {
                score: completedScore,
                title: completedQuiz.title,
              })}
            </p>
          </div>
        </div>
      ) : null}

      {quizzes.length === 0 ? (
        <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          <ListChecks className="mx-auto mb-3 h-8 w-8" />
          <p>{t("quiz.browse.noPublished")}</p>
          <p className="mt-1 text-sm">{t("quiz.browse.checkBack")}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {quizzes.map((quiz) => {
            const attempt = attempts.find((entry) => entry.quiz_id === quiz.id);
            const completedAttempt = Boolean(attempt);

            return (
              <Card
                key={quiz.id}
                className="brand-surface animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                  <div className="space-y-1">
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>
                      {quiz.lessonTitle} · {quiz.sectionLabel}
                    </CardDescription>
                  </div>
                  {completedAttempt ? (
                    <Badge variant="secondary">
                      {t("quiz.browse.completedBadge", {
                        score: attempt?.score ?? 0,
                      })}
                    </Badge>
                  ) : (
                    <Badge className="bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
                      {t("common.new")}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  {completedAttempt ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      {t("quiz.browse.alreadyDone")}
                    </div>
                  ) : (
                    <Button
                      asChild
                      className="bg-brand-accent font-semibold text-brand-accent-foreground hover:bg-brand-accent/90"
                    >
                      <Link href={`/quiz/${quiz.id}`}>
                        <PlayCircle className="h-4 w-4" />
                        {t("quiz.browse.startQuiz")}
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
