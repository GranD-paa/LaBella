"use server";

import { revalidatePath } from "next/cache";

import { requireAdminPermission } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { structuredQuizSchema } from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

export async function createStructuredQuiz(
  values: unknown
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageQuizzes");
  if (!guard.ok) return { error: guard.error };

  const parsed = structuredQuizSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.createQuizWithQuestions({
    lessonId: parsed.data.lessonId,
    title: parsed.data.title,
    languageSlug: parsed.data.languageSlug,
    levelSlug: parsed.data.levelSlug,
    sectionSlug: parsed.data.sectionSlug,
    status: parsed.data.status,
    questions: parsed.data.questions,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  revalidateQuizPaths();
  return { success: true };
}

function revalidateQuizPaths() {
  revalidatePath("/admin/quizzes");
  revalidatePath("/learn", "layout");
  revalidatePath("/dashboard");
}
