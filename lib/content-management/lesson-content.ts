import type { ContentCategorySlug } from "@/lib/content-management/categories";

/**
 * One thing already filed under a lesson, flattened enough that the panel can
 * list grammar titles, words, videos and quizzes the same way.
 */
export type LessonContentItem = {
  id: string;
  /** The line a person recognizes it by: a title, or the word itself. */
  label: string;
  /** Secondary text that carries no translation of its own — a meaning. */
  note: string | null;
  /** Pages for a grammar title, questions for a quiz, null for the rest. */
  count: number | null;
  status: "draft" | "published";
};

/** What a lesson holds, grouped the way the creation wizard asks for it. */
export type LessonContent = Record<ContentCategorySlug, LessonContentItem[]>;

export function emptyLessonContent(): LessonContent {
  return {
    grammar: [],
    vocabulary: [],
    video: [],
    quiz: [],
    "level-exam": [],
  };
}
