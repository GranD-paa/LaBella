"use client";

import { ListChecks } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { deleteQuiz } from "@/app/admin/actions/quizzes";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { QuizFormDialog } from "@/components/admin/quizzes/quiz-form-dialog";
import type { Lesson, Quiz, QuizQuestion } from "@/types";

export function QuizzesList({
  quizzes,
  quizQuestions,
  lessons,
}: {
  quizzes: Quiz[];
  quizQuestions: QuizQuestion[];
  lessons: Lesson[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quizzes for this lesson</CardTitle>
        <CardDescription>{quizzes.length} quizzes</CardDescription>
      </CardHeader>
      <CardContent>
        {quizzes.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center text-muted-foreground">
            <ListChecks className="h-8 w-8" />
            <p>No quizzes for this lesson yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {quizzes.map((quiz) => {
              const questions = quizQuestions.filter(
                (q) => q.quiz_id === quiz.id
              );
              return (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{quiz.title}</p>
                    <Badge variant="secondary">
                      {questions.length}{" "}
                      {questions.length === 1 ? "question" : "questions"}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <QuizFormDialog
                      lessons={lessons}
                      quiz={quiz}
                      initialQuestions={questions}
                    />
                    <DeleteConfirmDialog
                      title="Delete this quiz?"
                      description={`This will permanently delete "${quiz.title}" and all of its questions.`}
                      successMessage="Quiz deleted"
                      onConfirm={() => deleteQuiz(quiz.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
