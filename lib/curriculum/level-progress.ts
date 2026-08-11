import { findPublishedQuizzesForLevel } from "@/lib/quiz-management/helpers";
import type { CurriculumLevel } from "@/lib/curriculum/types";
import type { Lesson, Quiz } from "@/types";

/**
 * Whether the learner has demonstrably passed a level: it has at least one
 * published checkpoint quiz and they have attempted every one.
 *
 * A level with **no** checkpoint quiz is deliberately not passed. Absence of a
 * quiz is absence of evidence, not evidence of completion — treating the two
 * as the same is what previously sent a brand-new learner, who had done
 * nothing at all, straight to the final level: every earlier level happened to
 * have no quiz configured yet, so all of them counted as "already passed".
 *
 * Not being passed does not make a level a wall, either. `resolveNextIncompleteLevel`
 * navigates from the last level actually passed rather than stopping at the
 * first unpassed one, so a quiz-less level in the middle of the course never
 * strands anyone.
 */
export function isLevelPassed(
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
 * Where "Continue learning" should send the learner: the level immediately
 * after the furthest one they have actually passed.
 *
 * Driving this from the last *passed* level rather than the first *unpassed*
 * one is what keeps both failure modes away at once — a learner who has done
 * nothing lands on the first level, and a quiz-less level partway through the
 * course is stepped over rather than becoming a permanent stopping point.
 *
 * Falls back to the final level once everything has been passed, so finishing
 * the course does not produce a broken destination.
 */
export function resolveNextIncompleteLevel(
  languageSlug: string,
  levels: CurriculumLevel[],
  lessons: Lesson[],
  quizzes: Quiz[],
  attemptedQuizIds: ReadonlySet<string>
): CurriculumLevel | null {
  let lastPassedIndex = -1;

  levels.forEach((level, index) => {
    const levelQuizzes = getLevelCheckpointQuizzes(
      languageSlug,
      level.slug,
      lessons,
      quizzes
    );
    if (isLevelPassed(levelQuizzes, attemptedQuizIds)) {
      lastPassedIndex = index;
    }
  });

  return levels[lastPassedIndex + 1] ?? levels[levels.length - 1] ?? null;
}
