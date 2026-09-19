import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { QuizHistoryView } from "@/components/profile/quiz-history-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.quizHistory");
}

export default async function QuizHistoryPage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const [attempts, quizzes, lessons] = await Promise.all([
    repo.getAttemptsByUserId(user.id),
    repo.getQuizzes(),
    repo.getLessons(),
  ]);

  // An attempt knows which quiz it was, and a learner thinks in lessons — so
  // the row is named after the lesson the quiz belongs to, falling back to the
  // quiz's own title when the lesson is gone.
  const lessonMap = new Map(lessons.map((lesson) => [lesson.id, lesson.title]));
  const quizNameMap = new Map(
    quizzes.map((quiz) => [quiz.id, lessonMap.get(quiz.lesson_id) ?? quiz.title])
  );

  const rows = attempts
    .map((attempt) => ({
      id: attempt.id,
      quizId: attempt.quiz_id,
      score: attempt.score,
      created_at: attempt.created_at,
      lessonName: quizNameMap.get(attempt.quiz_id) ?? "",
    }))
    // Newest first: the attempt someone just finished is the one they opened
    // this page to look at.
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return <QuizHistoryView attempts={rows} />;
}
