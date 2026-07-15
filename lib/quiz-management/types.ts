import type { LanguageSlug, LevelSlug } from "@/lib/curriculum/types";
import type { Quiz, QuizQuestion } from "@/types";

export type QuizSectionSlug =
  | "grammar"
  | "vocabulary"
  | "visual"
  | "quiz"
  | "custom";

export type QuizStatus = "draft" | "published";

export type QuestionType = "multiple_choice" | "written";

export type QuizMetadata = {
  language_slug: LanguageSlug;
  level_slug: LevelSlug;
  section_slug: QuizSectionSlug;
  status: QuizStatus;
};

export type ExtendedQuiz = Quiz & QuizMetadata;

export type ExtendedQuizQuestion = QuizQuestion & {
  question_type: QuestionType;
  expected_answer: string | null;
  explanation: string | null;
};

export type QuizPathFilter = {
  languageSlug?: string;
  levelSlug?: string;
  sectionSlug?: string;
  lessonId?: string;
  status?: QuizStatus;
};

export type StructuredQuizInput = {
  lessonId: string;
  title: string;
  languageSlug: LanguageSlug;
  levelSlug: LevelSlug;
  sectionSlug: QuizSectionSlug;
  status: QuizStatus;
  questions: Array<{
    questionType: QuestionType;
    questionText: string;
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    correctOption?: "a" | "b" | "c" | "d";
    expectedAnswer?: string;
    explanation?: string;
  }>;
};

export const QUIZ_SECTIONS: Array<{
  slug: QuizSectionSlug;
  title: string;
  description: string;
}> = [
  {
    slug: "grammar",
    title: "Grammar",
    description: "Grammar-focused assessments",
  },
  {
    slug: "vocabulary",
    title: "Vocabulary",
    description: "Vocabulary and phrase checks",
  },
  {
    slug: "visual",
    title: "Visual Learning",
    description: "Image and visual recall quizzes",
  },
  {
    slug: "quiz",
    title: "General Quiz",
    description: "Mixed section checkpoint",
  },
  {
    slug: "custom",
    title: "Custom Section",
    description: "Other specialized content",
  },
];

export function getSectionLabel(slug: string) {
  return QUIZ_SECTIONS.find((section) => section.slug === slug)?.title ?? slug;
}

export function orderNumberToLevelSlug(orderNumber: number): LevelSlug {
  return `a1-${orderNumber}` as LevelSlug;
}

export function normalizeAnswer(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function scoreWrittenAnswer(
  userAnswer: string,
  expectedAnswer: string | null
) {
  if (!expectedAnswer) return false;
  return normalizeAnswer(userAnswer) === normalizeAnswer(expectedAnswer);
}
