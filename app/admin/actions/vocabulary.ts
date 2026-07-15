"use server";

import { getDataRepository } from "@/lib/data";
import { vocabularySchema } from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

export async function createVocabulary(values: unknown): Promise<ActionResult> {
  const parsed = vocabularySchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.createVocabulary({
    lesson_id: parsed.data.lessonId,
    word: parsed.data.word,
    translation: parsed.data.translation,
    image_url: parsed.data.imageUrl || null,
    example_sentence: parsed.data.exampleSentence || null,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function updateVocabulary(
  id: string,
  values: unknown
): Promise<ActionResult> {
  const parsed = vocabularySchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.updateVocabulary(id, {
    lesson_id: parsed.data.lessonId,
    word: parsed.data.word,
    translation: parsed.data.translation,
    image_url: parsed.data.imageUrl || null,
    example_sentence: parsed.data.exampleSentence || null,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function deleteVocabulary(id: string): Promise<ActionResult> {
  const repo = getDataRepository();
  const row = (await repo.getAllVocabulary()).find((item) => item.id === id);
  const result = await repo.deleteVocabulary(id);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(row?.lesson_id);
  return { success: true };
}
