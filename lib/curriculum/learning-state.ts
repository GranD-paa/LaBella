import { getLevel, isCategorySlug, LANGUAGES } from "@/lib/curriculum/languages";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { UserLearningState } from "@/types";

const DEFAULT_PATH = "/menu";

/**
 * Resolves where to send a learner right after login based on their
 * persisted learning state. Falls back to the Main Menu (language
 * selection) whenever any part of the saved state is missing or no longer
 * valid — e.g. the language was disabled or the level/section was removed.
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
  languages: CurriculumLanguage[] = LANGUAGES
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
