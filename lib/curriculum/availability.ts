import { LANGUAGES } from "@/lib/curriculum/languages";
import { mergeLevelOverrides } from "@/lib/curriculum/level-overrides";
import type { CurriculumLanguage, LanguageSlug } from "@/lib/curriculum/types";
import type { DataRepository } from "@/lib/data/repository";

/**
 * Returns the full language list with each `available` flag and `levels`
 * list resolved from the persisted super-admin overrides (falling back to
 * the static defaults in `lib/curriculum/languages.ts` when no override
 * exists yet). This is what every learner-facing page should use so that
 * renamed or newly added levels show up immediately.
 */
export async function getLanguagesWithAvailability(
  repo: DataRepository
): Promise<CurriculumLanguage[]> {
  const [availabilityOverrides, levelOverrides] = await Promise.all([
    repo.getLanguageAvailability(),
    repo.getCurriculumLevelOverrides(),
  ]);

  return LANGUAGES.map((language) => ({
    ...language,
    available: availabilityOverrides[language.slug] ?? language.available,
    levels: mergeLevelOverrides(
      language.levels,
      levelOverrides.filter((row) => row.languageSlug === language.slug)
    ),
  }));
}

/** Same as `getLanguagesWithAvailability`, scoped to a single language slug. */
export async function getLanguageWithAvailability(
  repo: DataRepository,
  slug: string
): Promise<CurriculumLanguage | undefined> {
  const languages = await getLanguagesWithAvailability(repo);
  return languages.find((language) => language.slug === slug);
}

export type LanguageToggle = {
  slug: LanguageSlug;
  name: string;
  flagEmoji: string;
  available: boolean;
  /** Italian ships with real content and can't be turned off from the UI. */
  locked: boolean;
};

/** Toggle list for the admin "Language Management" panel. */
export async function getLanguageToggles(
  repo: DataRepository
): Promise<LanguageToggle[]> {
  const languages = await getLanguagesWithAvailability(repo);
  return languages.map((language) => ({
    slug: language.slug,
    name: language.name,
    flagEmoji: language.flagEmoji,
    available: language.available,
    locked: language.slug === "italian",
  }));
}
