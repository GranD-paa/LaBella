"use client";

import Link from "next/link";
import { CheckCircle2, ListChecks, PlayCircle } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { Quiz, UserQuizAttempt } from "@/types";

function QuizCard({
  quiz,
  attempt,
}: {
  quiz: Quiz;
  attempt: UserQuizAttempt | null;
}) {
  const { t } = useTranslations();

  if (attempt) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border bg-card px-6 py-10 text-center shadow-sm">
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <div className="space-y-1">
          <p className="text-lg font-semibold">{quiz.title}</p>
          <p className="text-muted-foreground">{t("quiz.alreadyCompleted")}</p>
          <p className="text-sm text-muted-foreground">
            {t("quiz.yourScore", { score: attempt.score })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border bg-card px-6 py-10 text-center shadow-sm">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{quiz.title}</h3>
        <p className="text-muted-foreground">{t("quiz.lesson.ready")}</p>
      </div>
      <Button size="lg" className="gap-2 px-8" asChild>
        <Link href={`/quiz/${quiz.id}`}>
          <PlayCircle className="h-5 w-5" />
          {t("dashboard.user.startQuiz")}
        </Link>
      </Button>
    </div>
  );
}

export function QuizTabContent({
  quiz,
  quizzes,
  attempts = [],
}: {
  quiz?: Quiz | null;
  quizzes?: Quiz[];
  attempts?: UserQuizAttempt[];
}) {
  const { t } = useTranslations();
  const items = quizzes ?? (quiz ? [quiz] : []);
  const attemptByQuizId = new Map(
    attempts.map((attempt) => [attempt.quiz_id, attempt])
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
        <ListChecks className="h-8 w-8" />
        <p>{t("quiz.lesson.noQuiz")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((entry) => (
        <QuizCard
          key={entry.id}
          quiz={entry}
          attempt={attemptByQuizId.get(entry.id) ?? null}
        />
      ))}
    </div>
  );
}
