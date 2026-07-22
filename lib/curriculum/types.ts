export type LanguageSlug = "italian" | "english" | "german" | "turkish";

// Historically a fixed union of the 10 Italian A1 slugs. Super admins can now
// extend any language's curriculum with new CEFR stages (A2, B1, B2...) from
// the admin panel, so this is intentionally widened to `string` — see
// `lib/curriculum/level-overrides.ts` for how those custom levels are merged
// in at request time.
export type LevelSlug = string;

export type CategorySlug = "grammar" | "vocabulary" | "visual" | "quiz";

// The six standard CEFR proficiency stages. Every language starts with A1
// only; super admins can add levels for the later stages as new content is
// ready.
export const CEFR_BANDS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
export type CefrBand = (typeof CEFR_BANDS)[number];

export type CurriculumLevel = {
  slug: LevelSlug;
  code: string;
  title: string;
  description: string;
  orderNumber: number;
  /**
   * True when this level was added by a super admin from the Language
   * Management page rather than shipped as part of the static curriculum
   * defaults in `lib/curriculum/{italian,english,german,turkish}.ts`.
   * Absent (or false) for the original defaults.
   */
  isCustom?: boolean;
};

export type CurriculumLanguage = {
  slug: LanguageSlug;
  name: string;
  headline: string;
  description: string;
  flagEmoji: string;
  accentClass: string;
  available: boolean;
  levels: CurriculumLevel[];
};

export type CategoryDefinition = {
  slug: CategorySlug;
  title: string;
  description: string;
  href: (language: LanguageSlug, level: LevelSlug) => string;
};
