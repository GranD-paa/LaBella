"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Eye,
  Filter,
  Loader2,
  RotateCcw,
} from "lucide-react";
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
import { LANGUAGES } from "@/lib/curriculum/languages";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { getQuizAttemptStats } from "@/lib/quiz-management/data";
import type { EnrichedQuiz } from "@/lib/quiz-management/data";
import type { QuizQuestion, UserQuizAttempt } from "@/types";
import { cn } from "@/lib/utils";

function QuizRowActions({
  quiz,
  questions,
  isUpdating,
  onToggleStatus,
  t,
}: {
  quiz: EnrichedQuiz;
  questions: QuizQuestion[];
  isUpdating: boolean;
  onToggleStatus: () => void;
  t: ReturnType<typeof useTranslations>["t"];
}) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-1">
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
        onClick={onToggleStatus}
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
  );
}

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
  const router = useRouter();
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

  const publishedCount = useMemo(
    () => filtered.filter((quiz) => quiz.status === "published").length,
    [filtered]
  );

  const draftCount = useMemo(
    () => filtered.filter((quiz) => quiz.status === "draft").length,
    [filtered]
  );

  const filtersActive = languageFilter !== "all" || statusFilter !== "all";

  function resetFilters() {
    setLanguageFilter("all");
    setStatusFilter("all");
  }

  function toggleStatus(
    quizId: string,
    current: "draft" | "published",
    questionCount: number
  ) {
    const next = current === "published" ? "draft" : "published";

    if (next === "published" && questionCount === 0) {
      toast.error(t("admin.quizzes.cannotPublishWithoutQuestions"));
      return;
    }

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
      router.refresh();
    });
  }

  function statusLabel(status: "draft" | "published") {
    return status === "published"
      ? t("admin.quizzes.statusPublished")
      : t("admin.quizzes.statusDraft");
  }

  function renderQuizMeta(quiz: EnrichedQuiz, questions: QuizQuestion[]) {
    const mcCount = questions.filter(
      (question) => question.question_type === "multiple_choice"
    ).length;
    const writtenCount = questions.filter(
      (question) => question.question_type === "written"
    ).length;

    return (
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
        <span>
          {t("admin.quizzes.questionCountLesson", {
            count: questions.length,
            lesson: quiz.lessonTitle,
          })}
        </span>
        {questions.length > 0 ? (
          <span className="hidden sm:inline">
            ·{" "}
            {t("admin.quizzes.questionTypeBreakdown", {
              mc: mcCount,
              written: writtenCount,
            })}
          </span>
        ) : (
          <Badge variant="destructive" className="text-[10px]">
            {t("admin.quizzes.noQuestionsHidden")}
          </Badge>
        )}
      </div>
    );
  }

  function renderStats(quizId: string) {
    const stats = getQuizAttemptStats(quizId, attempts);

    return (
      <div className="flex items-center gap-2 text-sm">
        <BarChart3 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span>{t("admin.quizzes.attemptCount", { count: stats.attemptCount })}</span>
        {stats.attemptCount > 0 ? (
          <span className="text-muted-foreground">
            {t("admin.quizzes.avgScore", { score: stats.averageScore })}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <Card className="brand-surface overflow-hidden">
      <CardHeader className="space-y-6 border-b border-white/10 pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <BookOpen className="h-5 w-5 shrink-0 text-brand-accent" />
              {t("admin.quizzes.allQuizzes")}
            </CardTitle>
            <CardDescription className="max-w-2xl text-pretty">
              {t("admin.quizzes.allQuizzesHint")}
            </CardDescription>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-white/15 bg-background/40 px-3 py-1 text-sm font-normal"
            >
              {t("admin.quizzes.showingResults", {
                count: filtered.length,
                total: quizzes.length,
              })}
            </Badge>
            <Badge
              variant="default"
              className="px-3 py-1 text-sm font-normal"
            >
              {t("admin.quizzes.publishedShort", { count: publishedCount })}
            </Badge>
            <Badge
              variant="secondary"
              className="px-3 py-1 text-sm font-normal"
            >
              {t("admin.quizzes.draftShort", { count: draftCount })}
            </Badge>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-muted/20 p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4 shrink-0 text-brand-accent" />
              {t("admin.quizzes.filtersLabel")}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">
                  {t("admin.quizzes.filterLanguage")}
                </p>
                <Select value={languageFilter} onValueChange={setLanguageFilter}>
                  <SelectTrigger className="w-full min-w-[9rem] sm:w-40">
                    <SelectValue placeholder={t("admin.quizzes.filterLanguage")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("admin.quizzes.allLanguages")}
                    </SelectItem>
                    {LANGUAGES.map((language) => (
                      <SelectItem key={language.slug} value={language.slug}>
                        {language.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">
                  {t("admin.quizzes.filterStatus")}
                </p>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full min-w-[9rem] sm:w-36">
                    <SelectValue placeholder={t("admin.quizzes.filterStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("admin.quizzes.allStatus")}
                    </SelectItem>
                    <SelectItem value="published">
                      {t("admin.quizzes.statusPublished")}
                    </SelectItem>
                    <SelectItem value="draft">
                      {t("admin.quizzes.statusDraft")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {filtersActive ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-white/20"
                  onClick={resetFilters}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {t("admin.quizzes.resetFilters")}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 sm:p-6 sm:pt-6">
        {filtered.length === 0 ? (
          <div className="mx-4 my-6 rounded-xl border border-dashed border-white/15 bg-muted/10 px-6 py-14 text-center sm:mx-0">
            <p className="text-sm font-medium text-foreground">
              {t("admin.quizzes.noFilterMatch")}
            </p>
            {filtersActive ? (
              <Button
                type="button"
                variant="link"
                className="mt-2 text-brand-accent"
                onClick={resetFilters}
              >
                {t("admin.quizzes.resetFilters")}
              </Button>
            ) : null}
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full caption-bottom text-sm">
                <thead className="border-b border-white/10 bg-muted/20 [&_tr]:border-b">
                  <tr>
                    <th className="h-11 px-4 text-start align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t("admin.quizzes.quizColumn")}
                    </th>
                    <th className="h-11 px-4 text-start align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t("admin.quizzes.pathColumn")}
                    </th>
                    <th className="h-11 px-4 text-center align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t("admin.quizzes.statusColumn")}
                    </th>
                    <th className="h-11 px-4 text-start align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t("admin.quizzes.statsColumn")}
                    </th>
                    <th className="h-11 px-4 text-end align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {t("common.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filtered.map((quiz) => {
                    const questions = quizQuestions.filter(
                      (question) => question.quiz_id === quiz.id
                    );
                    const isUpdating = isPending && pendingId === quiz.id;

                    return (
                      <tr
                        key={quiz.id}
                        className="border-b border-white/5 transition-colors hover:bg-muted/20"
                      >
                        <td className="px-4 py-4 align-middle">
                          <p className="font-medium leading-snug">{quiz.title}</p>
                          {renderQuizMeta(quiz, questions)}
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <div className="flex flex-wrap gap-1.5">
                            <Badge variant="outline" className="font-normal">
                              {quiz.languageName}
                            </Badge>
                            <Badge variant="secondary" className="font-normal">
                              {quiz.levelCode}
                            </Badge>
                          </div>
                          <p className="mt-1.5 text-xs text-muted-foreground">
                            {quiz.sectionLabel}
                          </p>
                        </td>
                        <td className="px-4 py-4 text-center align-middle">
                          <Badge
                            variant={
                              quiz.status === "published" ? "default" : "secondary"
                            }
                          >
                            {statusLabel(quiz.status)}
                          </Badge>
                        </td>
                        <td className="px-4 py-4 align-middle">
                          {renderStats(quiz.id)}
                        </td>
                        <td className="px-4 py-4 align-middle">
                          <QuizRowActions
                            quiz={quiz}
                            questions={questions}
                            isUpdating={isUpdating}
                            onToggleStatus={() =>
                              toggleStatus(quiz.id, quiz.status, questions.length)
                            }
                            t={t}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 p-4 md:hidden">
              {filtered.map((quiz) => {
                const questions = quizQuestions.filter(
                  (question) => question.quiz_id === quiz.id
                );
                const isUpdating = isPending && pendingId === quiz.id;

                return (
                  <article
                    key={quiz.id}
                    className={cn(
                      "rounded-xl border border-white/10 bg-muted/10 p-4",
                      "space-y-4"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 space-y-1">
                        <h3 className="font-medium leading-snug">{quiz.title}</h3>
                        {renderQuizMeta(quiz, questions)}
                      </div>
                      <Badge
                        variant={
                          quiz.status === "published" ? "default" : "secondary"
                        }
                        className="shrink-0"
                      >
                        {statusLabel(quiz.status)}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <Badge variant="outline" className="font-normal">
                        {quiz.languageName}
                      </Badge>
                      <Badge variant="secondary" className="font-normal">
                        {quiz.levelCode}
                      </Badge>
                      <span className="self-center text-xs text-muted-foreground">
                        {quiz.sectionLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                      {renderStats(quiz.id)}
                      <QuizRowActions
                        quiz={quiz}
                        questions={questions}
                        isUpdating={isUpdating}
                        onToggleStatus={() =>
                          toggleStatus(quiz.id, quiz.status, questions.length)
                        }
                        t={t}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
