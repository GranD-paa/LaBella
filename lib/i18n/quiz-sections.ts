import type { QuizSectionSlug } from "@/lib/quiz-management/types";

const SECTION_SLUGS: QuizSectionSlug[] = [
  "grammar",
  "vocabulary",
  "visual",
  "quiz",
  "custom",
];

export function isQuizSectionSlug(slug: string): slug is QuizSectionSlug {
  return SECTION_SLUGS.includes(slug as QuizSectionSlug);
}

export function getQuizSectionTitleKey(slug: string) {
  return isQuizSectionSlug(slug)
    ? (`admin.quizzes.sections.${slug}.title` as const)
    : null;
}

export function getQuizSectionDescriptionKey(slug: string) {
  return isQuizSectionSlug(slug)
    ? (`admin.quizzes.sections.${slug}.description` as const)
    : null;
}
