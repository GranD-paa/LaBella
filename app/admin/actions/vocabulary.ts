"use server";

import {
  enforceLanguageScope,
  requireAdminPermission,
} from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { vocabularySchema } from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

export async function createVocabulary(values: unknown): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = vocabularySchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const outOfScope = await enforceLanguageScope(guard, () =>
    repo.getContentLanguage("lesson", parsed.data.lessonId)
  );
  if (outOfScope) return { error: outOfScope };

  const result = await repo.createVocabulary({
    lesson_id: parsed.data.lessonId,
    word: parsed.data.word,
    translation: parsed.data.translation,
    image_url: parsed.data.imageUrl || null,
    example_sentence: parsed.data.exampleSentence || null,
    pronunciation: null,
    status: "published",
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
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = vocabularySchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  // Both ends are checked: the word as it stands now, and the lesson it is
  // being moved to, so a scoped role can neither take one out of another
  // curriculum nor push one into it.
  const outOfScope =
    (await enforceLanguageScope(guard, () =>
      repo.getContentLanguage("vocabulary", id)
    )) ??
    (await enforceLanguageScope(guard, () =>
      repo.getContentLanguage("lesson", parsed.data.lessonId)
    ));
  if (outOfScope) return { error: outOfScope };

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
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const outOfScope = await enforceLanguageScope(guard, () =>
    repo.getContentLanguage("vocabulary", id)
  );
  if (outOfScope) return { error: outOfScope };

  const row = (await repo.getAllVocabulary()).find((item) => item.id === id);
  const result = await repo.deleteVocabulary(id);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(row?.lesson_id);
  return { success: true };
}
