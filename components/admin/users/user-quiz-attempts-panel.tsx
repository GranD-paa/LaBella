"use client";

import { useEffect, useState, useTransition } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, XCircle } from "lucide-react";

import {
  getUserQuizAttemptsForAdminAction,
  type AdminQuizAttemptSummary,
} from "@/app/actions/admin-quiz-attempts";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function UserQuizAttemptsPanel({ userId }: { userId: string }) {
  const { t, formatDate } = useTranslations();
  const [attempts, setAttempts] = useState<AdminQuizAttemptSummary[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await getUserQuizAttemptsForAdminAction(userId);
        setAttempts(data);
        setError(null);
      } catch {
        setError(t("admin.users.profileDialog.quizAttemptsLoadError"));
      }
    });
  }, [t, userId]);

  if (isPending && attempts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("admin.users.profileDialog.quizAttemptsLoading")}
      </p>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">{error}</p>;
  }

  if (attempts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t("admin.users.profileDialog.quizAttemptsEmpty")}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {attempts.map((attempt) => {
        const isExpanded = expandedId === attempt.id;
        const breakdown = attempt.breakdown;

        return (
          <div
            key={attempt.id}
            className="overflow-hidden rounded-lg border border-white/10"
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-3 p-3 text-start hover:bg-white/5"
              onClick={() =>
                setExpandedId((current) =>
                  current === attempt.id ? null : attempt.id
                )
              }
            >
              <div className="min-w-0 space-y-1">
                <p className="font-medium">{attempt.quizTitle}</p>
                <p className="text-xs text-muted-foreground">
                  {attempt.lessonTitle}
                  {attempt.levelSlug ? ` · ${attempt.levelSlug.toUpperCase()}` : ""}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(attempt.createdAt, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Badge variant="outline">{attempt.score}%</Badge>
                {breakdown ? (
                  <Badge variant="secondary">
                    {t("admin.users.profileDialog.quizChecklistSummary", {
                      correct: breakdown.correctCount,
                      total: breakdown.totalQuestions,
                    })}
                  </Badge>
                ) : null}
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </button>

            {isExpanded ? (
              <div className="space-y-3 border-t border-white/10 bg-white/[0.02] p-3">
                {breakdown ? (
                  <>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge className="bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/15">
                        {t("admin.users.profileDialog.correctCount", {
                          count: breakdown.correctCount,
                        })}
                      </Badge>
                      <Badge className="bg-rose-500/15 text-rose-300 hover:bg-rose-500/15">
                        {t("admin.users.profileDialog.incorrectCount", {
                          count: breakdown.incorrectCount,
                        })}
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {breakdown.items.map((item, index) => (
                        <li
                          key={item.questionId}
                          className={cn(
                            "rounded-md border px-3 py-2 text-sm",
                            item.isCorrect
                              ? "border-emerald-500/30 bg-emerald-500/5"
                              : "border-rose-500/30 bg-rose-500/5"
                          )}
                        >
                          <div className="flex items-start gap-2">
                            {item.isCorrect ? (
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                            ) : (
                              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                            )}
                            <div className="min-w-0 space-y-1">
                              <p className="font-medium">
                                {index + 1}. {item.questionText}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {t("admin.users.profileDialog.userAnswer")}:{" "}
                                <span className="text-foreground">
                                  {item.userAnswerLabel}
                                </span>
                              </p>
                              {!item.isCorrect ? (
                                <p className="text-xs text-muted-foreground">
                                  {t("admin.users.profileDialog.correctAnswer")}:{" "}
                                  <span className="text-foreground">
                                    {item.correctAnswer}
                                  </span>
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {t("admin.users.profileDialog.quizChecklistUnavailable")}
                  </p>
                )}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
