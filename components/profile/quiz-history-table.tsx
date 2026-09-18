"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type QuizAttemptHistoryRow = {
  id: string;
  quizId: string;
  score: number;
  created_at: string;
  lessonName: string;
};

function scoreToneClassName(score: number) {
  if (score >= 80) {
    return "text-emerald-300";
  }
  if (score >= 50) {
    return "text-amber-300";
  }
  return "text-rose-300";
}

export function QuizHistoryTable({
  attempts,
}: {
  attempts: QuizAttemptHistoryRow[];
}) {
  const { t, formatDate } = useTranslations();

  if (attempts.length === 0) {
    return (
      <p className="px-6 pb-14 pt-4 text-center text-sm text-muted-foreground sm:px-10">
        {t("profile.noAttempts")}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto pb-2">
      <Table>
        <TableHeader>
          <TableRow className="border-white/[0.06] hover:bg-transparent">
            {[
              t("profile.lessonName"),
              t("profile.score"),
              t("profile.date"),
              t("common.actions"),
            ].map((heading, index) => (
              <TableHead
                key={heading}
                className={cn(
                  "h-auto py-3 text-[0.75rem] font-medium text-muted-foreground/70",
                  index === 0 ? "ps-6 text-start sm:ps-10" : "text-center",
                  index === 3 && "pe-6 sm:pe-10"
                )}
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {attempts.map((attempt) => (
            <TableRow
              key={attempt.id}
              className="border-white/[0.04] hover:bg-white/[0.025]"
            >
              <TableCell className="max-w-[16rem] py-3.5 ps-6 align-middle text-sm font-medium text-foreground sm:ps-10">
                {attempt.lessonName || t("profile.unknownLesson")}
              </TableCell>
              {/* The score is the one number in the row, so it is set as one:
                  tabular, in the same metal as every other reading. */}
              <TableCell className="py-3.5 text-center align-middle">
                <span
                  className={cn(
                    "text-[0.9375rem] font-semibold tabular-nums",
                    scoreToneClassName(attempt.score)
                  )}
                >
                  {attempt.score}%
                </span>
              </TableCell>
              <TableCell className="py-3.5 text-center align-middle text-[0.8125rem] font-medium text-muted-foreground/75">
                {formatDate(attempt.created_at, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </TableCell>
              <TableCell className="py-3.5 pe-6 text-center align-middle sm:pe-10">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-2 border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.07] hover:text-foreground"
                >
                  <Link href={`/quiz/${attempt.quizId}`}>
                    <Eye className="h-4 w-4" />
                    {t("quiz.reviewAttempt")}
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
