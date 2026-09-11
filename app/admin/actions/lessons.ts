"use server";

import {
  enforceLanguageScope,
  requireAdminPermission,
} from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { lessonSchema } from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

export async function createLesson(values: unknown): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = lessonSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const outOfScope = await enforceLanguageScope(guard, async () =>
    parsed.data.languageSlug
  );
  if (outOfScope) return { error: outOfScope };

  const repo = getDataRepository();
  const result = await repo.createLesson({
    title: parsed.data.title,
    description: parsed.data.description || null,
    languageSlug: parsed.data.languageSlug,
    orderNumber: parsed.data.orderNumber,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}

export async function updateLesson(
  id: string,
  values: unknown
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = lessonSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();

  // Checked against the language the lesson already has, not the one in the
  // payload — otherwise a teacher could claim a lesson by submitting their own
  // language with it. `updateLesson` never writes the column for that reason.
  const outOfScope = await enforceLanguageScope(guard, () =>
    repo.getContentLanguage("lesson", id)
  );
  if (outOfScope) return { error: outOfScope };

  const result = await repo.updateLesson(id, {
    title: parsed.data.title,
    description: parsed.data.description || null,
    orderNumber: parsed.data.orderNumber,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(id);
  return { success: true };
}

export async function deleteLesson(id: string): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const outOfScope = await enforceLanguageScope(guard, () =>
    repo.getContentLanguage("lesson", id)
  );
  if (outOfScope) return { error: outOfScope };

  const result = await repo.deleteLesson(id);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}
