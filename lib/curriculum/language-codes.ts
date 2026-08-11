import { LANGUAGES } from "@/lib/curriculum/languages";
import type { LanguageSlug } from "@/lib/curriculum/types";

/**
 * Two-letter code shown on a language's flag.
 *
 * Kept as plain data, separate from the SVG flag component, because it is the
 * part that has to stay in step with the curriculum: adding a language means
 * adding a code here and a drawing there, and only this half is worth
 * asserting on in a test.
 *
 * Note these are *language* codes as the product presents them, not strict
 * ISO country codes — German is "DE" rather than the ISO 639 "de", and
 * English is "EN" rather than tying it to any one country.
 */
export const LANGUAGE_CODES: Record<LanguageSlug, string> = {
  italian: "IT",
  english: "EN",
  german: "DE",
  turkish: "TR",
};

/**
 * Falls back to the first two letters of the slug so a language added to the
 * curriculum before it is listed here still renders something readable
 * instead of an empty box.
 */
export function getLanguageCode(slug: LanguageSlug): string {
  return LANGUAGE_CODES[slug] ?? slug.slice(0, 2).toUpperCase();
}

/** Slugs in the curriculum that have no curated code yet. */
export function getLanguagesMissingCodes(): string[] {
  return LANGUAGES.filter((language) => !LANGUAGE_CODES[language.slug]).map(
    (language) => language.slug
  );
}
