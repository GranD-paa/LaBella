import { findPublishedQuizzesForLevel } from "@/lib/quiz-management/helpers";
import type { CurriculumLevel } from "@/lib/curriculum/types";
import type { Lesson, Quiz } from "@/types";

/**
 * A level counts as passed once the learner has attempted every published
 * checkpoint quiz ("quiz" section) tied to it. A level with no checkpoint
 * quiz configured yet can't be judged complete, so it's treated as
 * not-yet-passed rather than silently skipped.
 */
export function isLevelCompleted(
  levelQuizzes: Quiz[],
  attemptedQuizIds: ReadonlySet<string>
): boolean {
  if (levelQuizzes.length === 0) return false;
  return levelQuizzes.every((quiz) => attemptedQuizIds.has(quiz.id));
}

/** Checkpoint quizzes ("quiz" section) belonging to one course level. */
export function getLevelCheckpointQuizzes(
  languageSlug: string,
  levelSlug: string,
  lessons: Lesson[],
  quizzes: Quiz[]
): Quiz[] {
  return findPublishedQuizzesForLevel(quizzes, lessons, {
    languageSlug,
    levelSlug,
    sectionSlug: "quiz",
  });
}

/**
 * First level (in curriculum order) the learner hasn't passed yet — the
 * level their "Continue learning" action should land them on. Falls back to
 * the last level once every level is complete, so finishing the course
 * doesn't leave them with a broken destination.
 */
export function resolveNextIncompleteLevel(
  languageSlug: string,
  levels: CurriculumLevel[],
  lessons: Lesson[],
  quizzes: Quiz[],
  attemptedQuizIds: ReadonlySet<string>
): CurriculumLevel | null {
  for (const level of levels) {
    const levelQuizzes = getLevelCheckpointQuizzes(
      languageSlug,
      level.slug,
      lessons,
      quizzes
    );
    if (!isLevelCompleted(levelQuizzes, attemptedQuizIds)) {
      return level;
    }
  }
  return levels[levels.length - 1] ?? null;
}
