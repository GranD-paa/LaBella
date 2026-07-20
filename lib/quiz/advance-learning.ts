import { ITALIAN_LEVELS } from "@/lib/curriculum/italian";
import { resolveLessonForLevel } from "@/lib/curriculum/resolve-lesson";
import type { DataRepository } from "@/lib/data/repository";
import type { Quiz } from "@/types";

export function getNextLevelSlug(levelSlug: string): string | null {
  const index = ITALIAN_LEVELS.findIndex((level) => level.slug === levelSlug);
  if (index === -1) {
    return null;
  }

  return ITALIAN_LEVELS[index + 1]?.slug ?? null;
}

export async function advanceLearningAfterQuiz(
  repo: DataRepository,
  userId: string,
  quiz: Pick<Quiz, "language_slug" | "level_slug" | "lesson_id">
): Promise<string> {
  const nextLevelSlug = getNextLevelSlug(quiz.level_slug) ?? quiz.level_slug;
  const { lesson } = await resolveLessonForLevel(
    repo,
    quiz.language_slug,
    nextLevelSlug
  );

  await repo.upsertLearningState(userId, {
    languageSlug: quiz.language_slug,
    levelSlug: nextLevelSlug,
    lessonId: lesson?.id ?? quiz.lesson_id,
    sectionSlug: "grammar",
  });

  return nextLevelSlug;
}
