import type { DataRepository } from "@/lib/data/repository";
import { getLanguage, getLevel } from "@/lib/curriculum/languages";

export async function resolveLessonForLevel(
  repo: DataRepository,
  languageSlug: string,
  levelSlug: string
) {
  const language = getLanguage(languageSlug);
  if (!language) {
    return { lesson: null, levelTitle: "", levelCode: "" };
  }

  const level = getLevel(language, levelSlug);
  if (!level) {
    return { lesson: null, levelTitle: "", levelCode: "" };
  }

  const lesson = await repo.getLessonByOrderNumber(level.orderNumber);

  return {
    lesson,
    levelTitle: level.title,
    levelCode: level.code,
  };
}
