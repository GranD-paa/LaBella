"use server";

import { createClient } from "@/lib/supabase/server";
import { grammarRuleSchema } from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

export async function createGrammarRule(values: unknown): Promise<ActionResult> {
  const parsed = grammarRuleSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("grammar_rules").insert({
    lesson_id: parsed.data.lessonId,
    title: parsed.data.title,
    description: parsed.data.description || null,
    example: parsed.data.example || null,
  });

  if (error) {
    return { error: error.message };
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

  const supabase = await createClient();
  const { error } = await supabase
    .from("grammar_rules")
    .update({
      lesson_id: parsed.data.lessonId,
      title: parsed.data.title,
      description: parsed.data.description || null,
      example: parsed.data.example || null,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function deleteGrammarRule(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: row } = await supabase
    .from("grammar_rules")
    .select("lesson_id")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("grammar_rules")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(row?.lesson_id);
  return { success: true };
}
