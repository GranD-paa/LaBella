"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LessonPicker } from "@/components/admin/lesson-picker";
import { QuizFormDialog } from "@/components/admin/quizzes/quiz-form-dialog";
import { QuizzesList } from "@/components/admin/quizzes/quizzes-list";
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
  const sortedLessons = [...lessons].sort(
    (a, b) => a.order_number - b.order_number
  );
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>(
    sortedLessons[0]?.id
  );

  if (lessons.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-10 text-center text-muted-foreground">
        Create a lesson first in the Lessons tab before adding quizzes.
      </div>
    );
  }

  const filteredQuizzes = quizzes.filter(
    (quiz) => quiz.lesson_id === selectedLessonId
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Manage quizzes</CardTitle>
          <QuizFormDialog lessons={lessons} defaultLessonId={selectedLessonId} />
        </CardHeader>
        <CardContent>
          <div className="max-w-sm space-y-2">
            <p className="text-sm font-medium">Lesson</p>
            <LessonPicker
              lessons={lessons}
              value={selectedLessonId}
              onChange={setSelectedLessonId}
            />
          </div>
        </CardContent>
      </Card>

      <QuizzesList
        quizzes={filteredQuizzes}
        quizQuestions={quizQuestions}
        lessons={lessons}
      />
    </div>
  );
}
