"use server";

import { getDataRepository } from "@/lib/data";
import { parseAttemptBreakdown } from "@/lib/quiz/attempt-payload";
import { requireAdmin } from "@/lib/supabase/admin-guard";

export type AdminQuizAttemptSummary = {
  id: string;
  score: number;
  createdAt: string;
  quizTitle: string;
  lessonTitle: string;
  levelSlug: string;
  breakdown: ReturnType<typeof parseAttemptBreakdown>;
};

export async function getUserQuizAttemptsForAdminAction(
  userId: string
): Promise<AdminQuizAttemptSummary[]> {
  await requireAdmin();

  const repo = getDataRepository();
  const [attempts, quizzes, lessons] = await Promise.all([
    repo.getAttemptsByUserId(userId),
    repo.getQuizzes(),
    repo.getLessons(),
  ]);

  const quizMap = new Map(quizzes.map((quiz) => [quiz.id, quiz]));
  const lessonMap = new Map(lessons.map((lesson) => [lesson.id, lesson]));

  return attempts
    .map((attempt) => {
      const quiz = quizMap.get(attempt.quiz_id);
      const lesson = quiz ? lessonMap.get(quiz.lesson_id) : undefined;

      return {
        id: attempt.id,
        score: attempt.score,
        createdAt: attempt.created_at,
        quizTitle: quiz?.title ?? "Unknown quiz",
        lessonTitle: lesson?.title ?? "Unknown lesson",
        levelSlug: quiz?.level_slug ?? "",
        breakdown: parseAttemptBreakdown(attempt.answers_json),
      };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
