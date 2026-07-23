"use server";

import { requireAdminPermission } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import {
  contentGrammarSchema,
  contentVocabularySchema,
  videoLessonSchema,
} from "@/lib/validations/admin";

export async function createContentGrammar(values: unknown): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = contentGrammarSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.createGrammarRule({
    lesson_id: parsed.data.lessonId,
    title: parsed.data.title,
    description: parsed.data.description || null,
    example: parsed.data.example || null,
    status: parsed.data.status,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function createContentVocabulary(
  values: unknown
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = contentVocabularySchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.createVocabulary({
    lesson_id: parsed.data.lessonId,
    word: parsed.data.word,
    translation: parsed.data.translation,
    image_url: parsed.data.imageUrl,
    example_sentence: parsed.data.exampleSentence || null,
    pronunciation: parsed.data.pronunciation || null,
    status: parsed.data.status,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function createContentVideo(values: unknown): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = videoLessonSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.createVideoLesson({
    lesson_id: parsed.data.lessonId,
    language_slug: parsed.data.languageSlug,
    level_slug: parsed.data.levelSlug,
    title: parsed.data.title,
    description: parsed.data.description || null,
    video_url: parsed.data.videoUrl,
    thumbnail_url: parsed.data.thumbnailUrl || null,
    status: parsed.data.status,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}
