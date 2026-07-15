export type LanguageSlug = "italian" | "english" | "german" | "turkish";

export type LevelSlug =
  | "a1-1"
  | "a1-2"
  | "a1-3"
  | "a1-4"
  | "a1-5"
  | "a1-6"
  | "a1-7"
  | "a1-8"
  | "a1-9"
  | "a1-10";

export type CategorySlug = "grammar" | "vocabulary" | "visual" | "quiz";

export type CurriculumLevel = {
  slug: LevelSlug;
  code: string;
  title: string;
  description: string;
  orderNumber: number;
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
