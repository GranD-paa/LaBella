import type { DataRepository } from "@/lib/data/repository";
import { enrichQuiz, filterQuizzes, withQuizDefaults } from "@/lib/quiz-management/helpers";
import type { QuizPathFilter } from "@/lib/quiz-management/types";

export type EnrichedQuiz = ReturnType<typeof enrichQuiz>;

export async function fetchEnrichedQuizzes(
  repo: DataRepository,
  filter?: QuizPathFilter
) {
  const [quizzes, lessons] = await Promise.all([
    repo.getQuizzes(),
    repo.getLessons(),
  ]);

  const extended = quizzes.map((quiz) =>
    enrichQuiz(withQuizDefaults(quiz, lessons), lessons)
  );

  return filter ? extended.filter((quiz) => filterQuizzes([quiz], filter).length > 0) : extended;
}

export async function fetchQuizManagementStats(repo: DataRepository) {
  const [quizzes, attempts, questions] = await Promise.all([
    repo.getQuizzes(),
    repo.getAllAttempts(),
    repo.getAllQuizQuestions(),
  ]);

  const published = quizzes.filter((quiz) => quiz.status === "published").length;
  const drafts = quizzes.filter((quiz) => quiz.status === "draft").length;
  const averageScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce((sum, attempt) => sum + attempt.score, 0) /
            attempts.length
        )
      : 0;

  return {
    totalQuizzes: quizzes.length,
    publishedQuizzes: published,
    draftQuizzes: drafts,
    totalQuestions: questions.length,
    totalAttempts: attempts.length,
    averageScore,
  };
}

export function groupQuizzesByPath(quizzes: EnrichedQuiz[]) {
  const groups = new Map<string, EnrichedQuiz[]>();

  for (const quiz of quizzes) {
    const key = `${quiz.language_slug}/${quiz.level_slug}/${quiz.section_slug}`;
    const existing = groups.get(key) ?? [];
    existing.push(quiz);
    groups.set(key, existing);
  }

  return groups;
}

export function getQuizAttemptStats(
  quizId: string,
  attempts: Awaited<ReturnType<DataRepository["getAllAttempts"]>>
) {
  const quizAttempts = attempts.filter((attempt) => attempt.quiz_id === quizId);
  const averageScore =
    quizAttempts.length > 0
      ? Math.round(
          quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) /
            quizAttempts.length
        )
      : 0;

  return {
    attemptCount: quizAttempts.length,
    averageScore,
  };
}

export function isQuizAccessible(
  quiz: { status: "draft" | "published" },
  isAdmin: boolean
) {
  return isAdmin || quiz.status === "published";
}
