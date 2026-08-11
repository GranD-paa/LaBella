import { getLevel, isCategorySlug, LANGUAGES } from "@/lib/curriculum/languages";
import {
  getLevelCheckpointQuizzes,
  isLevelPassed,
  resolveNextIncompleteLevel,
} from "@/lib/curriculum/level-progress";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { Lesson, Quiz, UserLearningState } from "@/types";

const DEFAULT_PATH = "/menu";

/** Quiz/lesson data needed to tell whether the learner's saved level is
 *  already finished, so "continue learning" can advance past it instead of
 *  sending them back into a lesson they've already passed. Optional so
 *  callers without this data still get the un-adjusted resume position. */
export type ContinueLearningProgress = {
  lessons: Lesson[];
  quizzes: Quiz[];
  attemptedQuizIds: ReadonlySet<string>;
};

/**
 * Resolves where to send a learner right after login based on their
 * persisted learning state. Falls back to the Main Menu (language
 * selection) whenever any part of the saved state is missing or no longer
 * valid — e.g. the language was disabled or the level/section was removed.
 *
 * When `progress` is supplied and the saved level's checkpoint quiz(zes)
 * have all been attempted, this advances to the next not-yet-completed
 * level instead of resuming the finished one — so a returning learner who
 * already passed e.g. A1-3 lands on A1-4, not back on A1-3.
 *
 * This works for any language slug (Italian, English, German, Turkish, ...)
 * since it only depends on the generic `LANGUAGES` curriculum registry.
 *
 * `languages` defaults to the static registry, but callers should pass the
 * super-admin-resolved list (see `getLanguagesWithAvailability`) so a
 * recently unlocked language is honored immediately.
 */
export function resolveContinueLearningPath(
  state: UserLearningState | null,
  languages: CurriculumLanguage[] = LANGUAGES,
  progress?: ContinueLearningProgress
): string {
  if (!state) {
    return DEFAULT_PATH;
  }

  const language = languages.find((entry) => entry.slug === state.language_slug);
  if (!language || !language.available) {
    return DEFAULT_PATH;
  }

  if (!state.level_slug) {
    return `/learn/${language.slug}`;
  }

  const level = getLevel(language, state.level_slug);
  if (!level) {
    return `/learn/${language.slug}`;
  }

  if (progress) {
    const levelQuizzes = getLevelCheckpointQuizzes(
      language.slug,
      level.slug,
      progress.lessons,
      progress.quizzes
    );

    if (isLevelPassed(levelQuizzes, progress.attemptedQuizIds)) {
      const nextLevel = resolveNextIncompleteLevel(
        language.slug,
        language.levels,
        progress.lessons,
        progress.quizzes,
        progress.attemptedQuizIds
      );

      if (nextLevel && nextLevel.slug !== level.slug) {
        return `/learn/${language.slug}/${nextLevel.slug}`;
      }

      return `/learn/${language.slug}/${level.slug}`;
    }
  }

  if (state.section_slug && isCategorySlug(state.section_slug)) {
    return `/learn/${language.slug}/${level.slug}/${state.section_slug}`;
  }

  return `/learn/${language.slug}/${level.slug}`;
}

/** Whether the learner has ever selected an active learning language. */
export function hasActiveLearningLanguage(
  state: UserLearningState | null
): boolean {
  return Boolean(state?.language_slug);
}
