import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ProfileView } from "@/components/profile/profile-view";
import { getDataRepository } from "@/lib/data";
import { createPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata("meta.profile");
}

export default async function ProfilePage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const [profile, attempts, quizzes, lessons] = await Promise.all([
    repo.getProfileById(user.id),
    repo.getAttemptsByUserId(user.id),
    repo.getQuizzes(),
    repo.getLessons(),
  ]);

  const lessonMap = new Map(lessons.map((lesson) => [lesson.id, lesson.title]));
  const quizMap = new Map(
    quizzes.map((quiz) => [
      quiz.id,
      {
        title: quiz.title,
        lessonTitle: lessonMap.get(quiz.lesson_id) ?? quiz.title,
      },
    ])
  );

  const historyRows = attempts.map((attempt) => {
    const quiz = quizMap.get(attempt.quiz_id);
    return {
      id: attempt.id,
      quizId: attempt.quiz_id,
      score: attempt.score,
      created_at: attempt.created_at,
      lessonName: quiz?.lessonTitle ?? "",
    };
  });

  return (
    <ProfileView
      fullName={profile?.full_name}
      email={user.email ?? ""}
      historyRows={historyRows}
    />
  );
}
