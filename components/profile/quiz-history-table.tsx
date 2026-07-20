"use client";

import Link from "next/link";
import { Eye, History } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
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

function getScoreBadgeClass(score: number) {
  if (score >= 80) {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  }
  if (score >= 50) {
    return "border-amber-500/30 bg-amber-500/10 text-amber-300";
  }
  return "border-rose-500/30 bg-rose-500/10 text-rose-300";
}

export function QuizHistoryTable({ attempts }: { attempts: QuizAttemptHistoryRow[] }) {
  const { t, formatDate } = useTranslations();

  if (attempts.length === 0) {
    return (
      <div className="brand-surface flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center text-muted-foreground">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
          <History className="h-7 w-7" />
        </div>
        <p className="max-w-sm text-sm leading-relaxed">{t("profile.noAttempts")}</p>
      </div>
    );
  }

  return (
    <div className="brand-surface overflow-hidden rounded-2xl border border-white/10 shadow-brand">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("profile.lessonName")}
              </TableHead>
              <TableHead className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("profile.score")}
              </TableHead>
              <TableHead className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("profile.date")}
              </TableHead>
              <TableHead className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("common.actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attempts.map((attempt) => (
              <TableRow
                key={attempt.id}
                className="border-white/10 hover:bg-white/[0.03]"
              >
                <TableCell className="px-4 py-4 text-center align-middle">
                  <p className="mx-auto max-w-[220px] font-medium leading-snug">
                    {attempt.lessonName || t("profile.unknownLesson")}
                  </p>
                </TableCell>
                <TableCell className="px-4 py-4 text-center align-middle">
                  <Badge
                    variant="outline"
                    className={cn(
                      "min-w-[4.5rem] justify-center px-3 py-1 text-sm font-semibold",
                      getScoreBadgeClass(attempt.score)
                    )}
                  >
                    {attempt.score}%
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-4 text-center align-middle text-sm text-muted-foreground">
                  {formatDate(attempt.created_at, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </TableCell>
                <TableCell className="px-4 py-4 text-center align-middle">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="gap-2 border-brand-accent/30 bg-brand-accent/5 hover:bg-brand-accent/10"
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
    </div>
  );
}
