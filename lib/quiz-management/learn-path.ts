import type { Quiz } from "@/types";

export function getLearnQuizHref(
  quiz: Pick<Quiz, "language_slug" | "level_slug">
) {
  return `/learn/${quiz.language_slug ?? "italian"}/${quiz.level_slug ?? "a1-1"}/quiz`;
}
