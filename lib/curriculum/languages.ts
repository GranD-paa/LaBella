import { ENGLISH_LEVELS } from "@/lib/curriculum/english";
import { GERMAN_LEVELS } from "@/lib/curriculum/german";
import { ITALIAN_LEVELS } from "@/lib/curriculum/italian";
import { TURKISH_LEVELS } from "@/lib/curriculum/turkish";
import type {
  CategoryDefinition,
  CategorySlug,
  CurriculumLanguage,
  LanguageSlug,
  LevelSlug,
} from "@/lib/curriculum/types";

// `available` below is only the *static default*. The actual value shown to
// learners is resolved at request time by merging this list with any
// super-admin overrides stored via `getLanguageAvailability()` — see
// `lib/curriculum/availability.ts`. This lets a super admin flip a language
// from "coming soon" to active without touching code.
export const LANGUAGES: CurriculumLanguage[] = [
  {
    slug: "italian",
    name: "Italian",
    headline: "Learn Italian Language",
    description:
      "Structured A1 pathway inspired by trusted textbooks and classroom resources.",
    flagEmoji: "🇮🇹",
    accentClass: "from-emerald-500/20 to-teal-500/10",
    available: true,
    levels: ITALIAN_LEVELS,
  },
  {
    slug: "english",
    name: "English",
    headline: "Learn English Language",
    description: "Global communication skills from beginner to advanced levels.",
    flagEmoji: "🇬🇧",
    accentClass: "from-blue-500/20 to-indigo-500/10",
    available: false,
    levels: ENGLISH_LEVELS,
  },
  {
    slug: "german",
    name: "German",
    headline: "Learn German Language",
    description: "Clear grammar progression and practical everyday vocabulary.",
    flagEmoji: "🇩🇪",
    accentClass: "from-amber-500/20 to-orange-500/10",
    available: false,
    levels: GERMAN_LEVELS,
  },
  {
    slug: "turkish",
    name: "Turkish",
    headline: "Learn Turkish Language",
    description: "Step-by-step modules for reading, speaking, and culture.",
    flagEmoji: "🇹🇷",
    accentClass: "from-rose-500/20 to-red-500/10",
    available: false,
    levels: TURKISH_LEVELS,
  },
];

export const CATEGORY_DEFINITIONS: CategoryDefinition[] = [
  {
    slug: "grammar",
    title: "Grammar",
    description: "Structured grammar lessons with clear explanations and examples.",
    href: (language, level) => `/learn/${language}/${level}/grammar`,
  },
  {
    slug: "vocabulary",
    title: "Important Vocabulary",
    description: "Essential words and phrases organized by topic.",
    href: (language, level) => `/learn/${language}/${level}/vocabulary`,
  },
  {
    slug: "visual",
    title: "Visual Learning",
    description: "Image-based lessons to improve memorization through visuals.",
    href: (language, level) => `/learn/${language}/${level}/visual`,
  },
  {
    slug: "quiz",
    title: "Quiz",
    description: "Interactive quizzes to track results and performance.",
    href: (language, level) => `/learn/${language}/${level}/quiz`,
  },
];

export function getLanguage(slug: string): CurriculumLanguage | undefined {
  return LANGUAGES.find((language) => language.slug === slug);
}

export function getLevel(
  language: CurriculumLanguage,
  levelSlug: string
) {
  return language.levels.find((level) => level.slug === levelSlug);
}

export function isLanguageSlug(value: string): value is LanguageSlug {
  return LANGUAGES.some((language) => language.slug === value);
}

export function isLevelSlug(value: string): value is LevelSlug {
  return ITALIAN_LEVELS.some((level) => level.slug === value);
}

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORY_DEFINITIONS.some((category) => category.slug === value);
}
