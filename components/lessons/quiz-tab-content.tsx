"use client";

import Link from "next/link";
import { CheckCircle2, ListChecks, PlayCircle } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { Quiz, UserQuizAttempt } from "@/types";

export function QuizTabContent({
  quiz,
  attempt,
  browseHref,
}: {
  quiz: Quiz | null;
  attempt: UserQuizAttempt | null;
  browseHref?: string;
}) {
  const { t } = useTranslations();

  if (!quiz) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
        <ListChecks className="h-8 w-8" />
        <p>{t("quiz.lesson.noQuiz")}</p>
      </div>
    );
  }

  if (attempt) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border bg-card px-6 py-12 text-center shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <div className="space-y-1">
          <p className="text-lg font-semibold">{t("quiz.alreadyCompleted")}</p>
          <p className="text-muted-foreground">
            {t("quiz.yourScore", { score: attempt.score })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border bg-card px-6 py-12 text-center shadow-sm">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{quiz.title}</h3>
        <p className="text-muted-foreground">{t("quiz.lesson.ready")}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button size="lg" className="gap-2 px-8" asChild>
          <Link href={`/quiz/${quiz.id}`}>
            <PlayCircle className="h-5 w-5" />
            {t("dashboard.user.startQuiz")}
          </Link>
        </Button>
        {browseHref ? (
          <Button size="lg" variant="outline" asChild>
            <Link href={browseHref}>{t("quiz.lesson.browseAll")}</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
