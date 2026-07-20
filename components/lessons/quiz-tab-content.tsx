"use client";

import Link from "next/link";
import { CheckCircle2, ListChecks, PlayCircle } from "lucide-react";

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
import { CATEGORY_ACCENTS } from "@/lib/curriculum/category-theme";
import { cn } from "@/lib/utils";
import type { Quiz, UserQuizAttempt } from "@/types";

function QuizCard({
  quiz,
  attempt,
}: {
  quiz: Quiz;
  attempt: UserQuizAttempt | null;
}) {
  const { t } = useTranslations();
  const isCompleted = Boolean(attempt);

  return (
    <Card className="brand-surface group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/35 hover:shadow-brand">
      <div className={cn("h-1 bg-gradient-to-r", CATEGORY_ACCENTS.quiz)} />
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
            {isCompleted ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <ListChecks className="h-5 w-5" />
            )}
          </div>
          {isCompleted ? (
            <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
              {t("quiz.yourScore", { score: attempt?.score ?? 0 })}
            </Badge>
          ) : null}
        </div>
        <div className="space-y-2 text-start">
          <CardTitle className="text-xl">{quiz.title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {isCompleted
              ? t("quiz.alreadyCompleted")
              : t("quiz.lesson.ready")}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {isCompleted ? (
          <Button variant="outline" asChild>
            <Link href={`/quiz/${quiz.id}`}>{t("quiz.reviewAttempt")}</Link>
          </Button>
        ) : (
          <Button
            size="lg"
            className="gap-2 bg-primary font-semibold text-primary-foreground shadow-brand hover:bg-primary/90"
            asChild
          >
            <Link href={`/quiz/${quiz.id}`}>
              <PlayCircle className="h-5 w-5" />
              {t("dashboard.user.startQuiz")}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
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
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/5 py-16 text-center text-muted-foreground">
        <ListChecks className="h-10 w-10 text-brand-accent/70" />
        <p>{t("quiz.lesson.noQuiz")}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
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
