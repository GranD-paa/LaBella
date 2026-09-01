import type { DataRepository } from "@/lib/data/repository";
import {
  LANDING_LANGUAGES,
  type LandingLanguageDefinition,
} from "@/lib/landing/languages";

/**
 * Resolves which languages the landing rail shows, merging the static defaults
 * with the super-admin overrides in `landing_language_settings`.
 *
 * The copy for every language ships either way — the toggle only decides what
 * reaches the page, so revealing French is a checkbox in the admin panel
 * rather than a deploy.
 *
 * A missing or unreachable table falls back to the defaults rather than
 * throwing: the home page must render even on an install whose migrations
 * have not been run.
 */
export async function getVisibleLandingLanguages(
  repo: DataRepository
): Promise<LandingLanguageDefinition[]> {
  const overrides: Record<string, boolean> = await repo
    .getLandingLanguageVisibility()
    .catch(() => ({}));

  const visible = LANDING_LANGUAGES.filter(
    (language) => overrides[language.slug] ?? language.defaultVisible
  );

  // If an admin somehow hides everything, fall back to the languages that
  // ship with content — an empty rail is worse than an over-full one.
  return visible.length > 0
    ? visible
    : LANDING_LANGUAGES.filter((language) => language.defaultVisible);
}

export type LandingLanguageToggle = {
  slug: string;
  nativeName: string;
  landmark: string;
  visible: boolean;
  /** True when no curriculum exists behind it yet. */
  teaserOnly: boolean;
};

/** Toggle list for the admin "Landing page" panel. */
export async function getLandingLanguageToggles(
  repo: DataRepository
): Promise<LandingLanguageToggle[]> {
  const overrides: Record<string, boolean> = await repo
    .getLandingLanguageVisibility()
    .catch(() => ({}));

  return LANDING_LANGUAGES.map((language) => ({
    slug: language.slug,
    nativeName: language.nativeName,
    landmark: language.landmark,
    visible: overrides[language.slug] ?? language.defaultVisible,
    teaserOnly: language.href === null,
  }));
}
