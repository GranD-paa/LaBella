"use client";

import { QuizzesTable } from "@/components/admin/quizzes/quizzes-table";
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
  if (lessons.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
        Create a lesson first in the Lessons tab before adding quizzes.
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
