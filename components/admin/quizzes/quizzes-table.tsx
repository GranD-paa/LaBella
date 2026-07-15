"use client";

import { ListChecks } from "lucide-react";

import { deleteQuiz } from "@/app/admin/actions/quizzes";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { QuizEditDialog } from "@/components/admin/quizzes/quiz-edit-dialog";
import { QuizFormDialog } from "@/components/admin/quizzes/quiz-form-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Lesson, Quiz, QuizQuestion } from "@/types";

function pluralize(
  count: number,
  singular: string,
  plural: string
) {
  return count === 1 ? singular : plural;
}

export function QuizzesTable({
  lessons,
  quizzes,
  quizQuestions,
}: {
  lessons: Lesson[];
  quizzes: Quiz[];
  quizQuestions: QuizQuestion[];
}) {
  const { t } = useTranslations();

  const sortedLessons = [...lessons].sort(
    (a, b) => a.order_number - b.order_number
  );

  const groupedLessons = sortedLessons
    .map((lesson) => ({
      lesson,
      quizzes: quizzes
        .filter((quiz) => quiz.lesson_id === lesson.id)
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
    }))
    .filter((group) => group.quizzes.length > 0);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>{t("admin.quizzes.allQuizzes")}</CardTitle>
          <CardDescription>
            {t("admin.quizzes.tableSummary", {
              quizCount: quizzes.length,
              lessonCount: groupedLessons.length,
            })}
          </CardDescription>
        </div>
        <QuizFormDialog lessons={lessons} />
      </CardHeader>
      <CardContent>
        {groupedLessons.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <ListChecks className="h-8 w-8" />
            <p>{t("admin.quizzes.empty")}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedLessons.map(({ lesson, quizzes: lessonQuizzes }) => (
              <div key={lesson.id} className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <Badge variant="outline">
                    {lessonQuizzes.length}{" "}
                    {pluralize(
                      lessonQuizzes.length,
                      t("admin.quizzes.quizSingular"),
                      t("admin.quizzes.quizPlural")
                    )}
                  </Badge>
                </div>
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("admin.quizzes.quizTitle")}</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          {t("admin.quizzes.questionsColumn")}
                        </TableHead>
                        <TableHead className="w-40 text-right">
                          {t("common.actions")}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lessonQuizzes.map((quiz) => {
                        const questions = quizQuestions.filter(
                          (question) => question.quiz_id === quiz.id
                        );

                        return (
                          <TableRow key={quiz.id}>
                            <TableCell className="font-medium">
                              {quiz.title}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <Badge variant="secondary">
                                {questions.length}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                <QuizEditDialog
                                  quiz={quiz}
                                  questions={questions}
                                />
                                <DeleteConfirmDialog
                                  title={t("admin.quizzes.deleteQuizTitle")}
                                  description={t(
                                    "admin.quizzes.deleteQuizDescription",
                                    { title: quiz.title }
                                  )}
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
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
