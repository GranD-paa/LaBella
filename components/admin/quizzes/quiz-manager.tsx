"use client";

import { QuizzesTable } from "@/components/admin/quizzes/quizzes-table";
import { useTranslations } from "@/components/providers/locale-provider";
import type { Lesson, Quiz, QuizQuestion } from "@/types";

export function QuizManager({
  lessons,
  quizzes,
  quizQuestions,
}: {
  lessons: Lesson[];
  quizzes: Quiz[];
  quizQuestions: QuizQuestion[];
}) {
  const { t } = useTranslations();

  if (lessons.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
        {t("admin.quizzes.createLessonFirst")}
      </div>
    );
  }

  return (
    <QuizzesTable
      lessons={lessons}
      quizzes={quizzes}
      quizQuestions={quizQuestions}
    />
  );
}
