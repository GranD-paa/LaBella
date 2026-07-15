"use server";

import { getDataRepository } from "@/lib/data";
import { grammarRuleSchema } from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

export async function createGrammarRule(values: unknown): Promise<ActionResult> {
  const parsed = grammarRuleSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const repo = getDataRepository();
  const result = await repo.createGrammarRule({
    lesson_id: parsed.data.lessonId,
    title: parsed.data.title,
    description: parsed.data.description || null,
    example: parsed.data.example || null,
  });

  if (result.error) {
    return { error: result.error };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function updateGrammarRule(
  id: string,
  values: unknown
): Promise<ActionResult> {
  const parsed = grammarRuleSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const repo = getDataRepository();
  const result = await repo.updateGrammarRule(id, {
    lesson_id: parsed.data.lessonId,
    title: parsed.data.title,
    description: parsed.data.description || null,
    example: parsed.data.example || null,
  });

  if (result.error) {
    return { error: result.error };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function deleteGrammarRule(id: string): Promise<ActionResult> {
  const repo = getDataRepository();
  const row = (await repo.getAllGrammarRules()).find((item) => item.id === id);
  const result = await repo.deleteGrammarRule(id);

  if (result.error) {
    return { error: result.error };
  }

  revalidateAppContent(row?.lesson_id);
  return { success: true };
}
