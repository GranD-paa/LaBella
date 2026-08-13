"use client";

import Link from "next/link";
import { CheckCircle2, GraduationCap, Lock } from "lucide-react";

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
import { cn } from "@/lib/utils";
import type { LocalizedText, Quiz, UserQuizAttempt } from "@/types";

export type BandExamCard = {
  band: string;
  quizzes: Quiz[];
  /** True when the learner's plan does not include the level exam. */
  locked: boolean;
};

/**
 * The comprehensive exams for a language, one card per CEFR band.
 *
 * Lives on the language page rather than inside a level, because a band exam
 * covers all ten sub-levels of that band and belongs to none of them. Putting
 * it here also means there is exactly one place a learner looks for it.
 */
export function BandExamsSection({
  exams,
  attempts,
  requiredPlanTitle,
  languageSlug,
}: {
  exams: BandExamCard[];
  attempts: UserQuizAttempt[];
  /** Cheapest plan that unlocks the exam, for the upsell. */
  requiredPlanTitle: LocalizedText | null;
  languageSlug: string;
}) {
  const { t, locale } = useTranslations();

  if (exams.length === 0) return null;

  const attemptedIds = new Set(attempts.map((attempt) => attempt.quiz_id));
  const bestScoreFor = (quizIds: string[]) => {
    const scores = attempts
      .filter((attempt) => quizIds.includes(attempt.quiz_id))
      .map((attempt) => attempt.score);
    return scores.length > 0 ? Math.max(...scores) : null;
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <GraduationCap className="h-5 w-5 text-brand-accent" aria-hidden="true" />
          {t("learn.bandExams.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("learn.bandExams.hint")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {exams.map((exam) => {
          const quizIds = exam.quizzes.map((quiz) => quiz.id);
          const taken = quizIds.some((id) => attemptedIds.has(id));
          const best = bestScoreFor(quizIds);
          // One exam per band is the norm; more than one means the admin split
          // it into papers, so the learner is pointed at the first.
          const entryQuizId = quizIds[0]!;

          return (
            <Card
              key={exam.band}
              className={cn(
                "brand-surface relative overflow-hidden",
                exam.locked && "opacity-95"
              )}
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-brand-accent/15 to-transparent"
                aria-hidden="true"
              />
              <CardHeader className="relative space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle className="text-lg">
                    {t("learn.bandExams.cardTitle", { band: exam.band })}
                  </CardTitle>
                  {exam.locked ? (
                    <Badge className="shrink-0 gap-1 border-white/20 bg-white/10 text-muted-foreground">
                      <Lock className="h-3 w-3" aria-hidden="true" />
                      {t("learn.bandExams.lockedBadge")}
                    </Badge>
                  ) : taken ? (
                    <Badge className="shrink-0 gap-1 border-emerald-500/40 bg-emerald-500/15 text-emerald-300">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      {best !== null
                        ? t("learn.bandExams.scoreBadge", { score: best })
                        : t("learn.bandExams.takenBadge")}
                    </Badge>
                  ) : null}
                </div>
                <CardDescription>
                  {t("learn.bandExams.cardDescription", { band: exam.band })}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative">
                {exam.locked ? (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {requiredPlanTitle
                        ? t("learn.locked.description", {
                            plan: requiredPlanTitle[locale],
                          })
                        : t("learn.locked.descriptionGeneric")}
                    </p>
                    <Button asChild size="sm">
                      <Link href={`/subscription?language=${languageSlug}`}>
                        {t("learn.locked.cta")}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button asChild size="sm">
                    <Link href={`/quiz/${entryQuizId}`}>
                      {taken
                        ? t("learn.bandExams.retake")
                        : t("learn.bandExams.start")}
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
