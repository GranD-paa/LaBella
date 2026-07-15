"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { BarChart3, Eye, Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  deleteQuiz,
  updateQuizStatusAction,
} from "@/app/admin/actions/quizzes";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { QuizEditDialog } from "@/components/admin/quizzes/quiz-edit-dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LANGUAGES } from "@/lib/curriculum/languages";
import { getQuizAttemptStats } from "@/lib/quiz-management/data";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import type { EnrichedQuiz } from "@/lib/quiz-management/data";
import type { QuizQuestion, UserQuizAttempt } from "@/types";

export function QuizManagementTable({
  quizzes,
  quizQuestions,
  attempts,
}: {
  quizzes: EnrichedQuiz[];
  quizQuestions: QuizQuestion[];
  attempts: UserQuizAttempt[];
}) {
  const { t } = useTranslations();
  const [languageFilter, setLanguageFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return quizzes.filter((quiz) => {
      if (languageFilter !== "all" && quiz.language_slug !== languageFilter) {
        return false;
      }
      if (statusFilter !== "all" && quiz.status !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [languageFilter, quizzes, statusFilter]);

  function toggleStatus(quizId: string, current: "draft" | "published") {
    const next = current === "published" ? "draft" : "published";
    setPendingId(quizId);
    startTransition(async () => {
      const result = await updateQuizStatusAction(quizId, next);
      setPendingId(null);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(
        next === "published"
          ? t("admin.quizzes.quizPublished")
          : t("admin.quizzes.movedToDraft")
      );
    });
  }

  function statusLabel(status: "draft" | "published") {
    return status === "published"
      ? t("admin.quizzes.statusPublished")
      : t("admin.quizzes.statusDraft");
  }

  return (
    <Card className="brand-surface">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>{t("admin.quizzes.allQuizzes")}</CardTitle>
          <CardDescription>
            {t("admin.quizzes.managementSummary", {
              filtered: filtered.length,
              total: quizzes.length,
            })}
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={languageFilter} onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder={t("admin.quizzes.filterLanguage")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("admin.quizzes.allLanguages")}</SelectItem>
              {LANGUAGES.map((language) => (
                <SelectItem key={language.slug} value={language.slug}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder={t("admin.quizzes.filterStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("admin.quizzes.allStatus")}</SelectItem>
              <SelectItem value="published">
                {t("admin.quizzes.statusPublished")}
              </SelectItem>
              <SelectItem value="draft">{t("admin.quizzes.statusDraft")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed py-12 text-center text-muted-foreground">
            {t("admin.quizzes.noFilterMatch")}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("admin.quizzes.quizColumn")}</TableHead>
                  <TableHead>{t("admin.quizzes.pathColumn")}</TableHead>
                  <TableHead>{t("admin.quizzes.statusColumn")}</TableHead>
                  <TableHead className="text-right">
                    {t("admin.quizzes.statsColumn")}
                  </TableHead>
                  <TableHead className="w-48 text-right">
                    {t("common.actions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((quiz) => {
                  const questions = quizQuestions.filter(
                    (question) => question.quiz_id === quiz.id
                  );
                  const stats = getQuizAttemptStats(quiz.id, attempts);
                  const isUpdating = isPending && pendingId === quiz.id;

                  return (
                    <TableRow key={quiz.id}>
                      <TableCell>
                        <p className="font-medium">{quiz.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {t("admin.quizzes.questionCountLesson", {
                            count: questions.length,
                            lesson: quiz.lessonTitle,
                          })}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm">
                          <p>{quiz.languageName}</p>
                          <p className="text-muted-foreground">
                            {quiz.levelCode} · {quiz.sectionLabel}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            quiz.status === "published" ? "default" : "secondary"
                          }
                        >
                          {statusLabel(quiz.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex items-center gap-1 text-sm">
                          <BarChart3 className="h-3.5 w-3.5 text-muted-foreground" />
                          {t("admin.quizzes.attemptCount", {
                            count: stats.attemptCount,
                          })}
                          {stats.attemptCount > 0 ? (
                            <span className="text-muted-foreground">
                              {t("admin.quizzes.avgScore", {
                                score: stats.averageScore,
                              })}
                            </span>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-1">
                          {quiz.status === "published" ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              asChild
                              aria-label={t("admin.quizzes.previewQuizAria")}
                            >
                              <Link href={`/quiz/${quiz.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          ) : null}
                          <QuizEditDialog quiz={quiz} questions={questions} />
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={isUpdating}
                            onClick={() => toggleStatus(quiz.id, quiz.status)}
                          >
                            {isUpdating ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : quiz.status === "published" ? (
                              t("admin.quizzes.unpublish")
                            ) : (
                              t("admin.quizzes.publish")
                            )}
                          </Button>
                          <DeleteConfirmDialog
                            title={t("admin.quizzes.deleteQuizTitle")}
                            description={t("admin.quizzes.deleteQuizDescription", {
                              title: quiz.title,
                            })}
                            successMessage={t("admin.quizzes.quizDeleted")}
                            onConfirm={() => deleteQuiz(quiz.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
