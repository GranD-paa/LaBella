"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Figure, FigureRail } from "@/components/layout/figure";
import {
  Plate,
  PlateHead,
  PlateHorizon,
  PlateZone,
  PlateZoneHead,
} from "@/components/layout/plate";
import {
  QuizHistoryTable,
  type QuizAttemptHistoryRow,
} from "@/components/profile/quiz-history-table";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";

export function QuizHistoryView({
  attempts,
}: {
  attempts: QuizAttemptHistoryRow[];
}) {
  const { t } = useTranslations();

  const count = attempts.length;
  const average =
    count === 0
      ? 0
      : Math.round(
          attempts.reduce((total, attempt) => total + attempt.score, 0) / count
        );
  const best = count === 0 ? 0 : Math.max(...attempts.map((a) => a.score));

  return (
    <Plate>
      <PlateHead
        eyebrow={t("quizHistory.badge")}
        title={t("quizHistory.title")}
        lede={t("quizHistory.subtitle")}
        action={
          <Button
            variant="outline"
            className="border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.07] hover:text-foreground"
            asChild
          >
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t("quizHistory.backToDashboard")}
            </Link>
          </Button>
        }
      />

      <PlateHorizon />

      {/* Nothing taken yet means nothing to summarise: three readings of zero
          above a line that says there is no history reads as a broken page,
          not an empty one. The table's own empty state does the talking. */}
      {count > 0 ? (
        <FigureRail>
          <Figure
            label={t("quizHistory.attempts")}
            value={count}
            note={t("quizHistory.attemptsNote")}
          />
          <Figure
            label={t("quizHistory.average")}
            value={average}
            suffix="%"
            note={t("quizHistory.averageNote")}
          />
          <Figure
            label={t("quizHistory.best")}
            value={best}
            suffix="%"
            note={t("quizHistory.bestNote")}
          />
        </FigureRail>
      ) : null}

      <PlateZone groove well>
        <PlateZoneHead
          title={t("quizHistory.allAttempts")}
          hint={t("quizHistory.allAttemptsHint")}
        />
        <QuizHistoryTable attempts={attempts} />
      </PlateZone>
    </Plate>
  );
}
