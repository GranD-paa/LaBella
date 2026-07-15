"use client";

import { History } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type QuizAttemptHistoryRow = {
  id: string;
  score: number;
  created_at: string;
  lessonName: string;
};

export function QuizHistoryTable({ attempts }: { attempts: QuizAttemptHistoryRow[] }) {
  const { t, formatDate } = useTranslations();

  if (attempts.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
        <History className="h-8 w-8" />
        <p>{t("profile.noAttempts")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("profile.lessonName")}</TableHead>
            <TableHead>{t("profile.score")}</TableHead>
            <TableHead>{t("profile.date")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attempts.map((attempt) => (
            <TableRow key={attempt.id}>
              <TableCell className="font-medium">
                {attempt.lessonName || t("profile.unknownLesson")}
              </TableCell>
              <TableCell>{attempt.score}%</TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(attempt.created_at, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
