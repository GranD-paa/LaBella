"use server";

import { createClient } from "@/lib/supabase/server";
import { vocabularySchema } from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

export async function createVocabulary(values: unknown): Promise<ActionResult> {
  const parsed = vocabularySchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("vocabulary").insert({
    lesson_id: parsed.data.lessonId,
    word: parsed.data.word,
    translation: parsed.data.translation,
    image_url: parsed.data.imageUrl || null,
    example_sentence: parsed.data.exampleSentence || null,
  });

  if (error) {
    return { error: error.message };
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
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("vocabulary")
    .update({
      lesson_id: parsed.data.lessonId,
      word: parsed.data.word,
      translation: parsed.data.translation,
      image_url: parsed.data.imageUrl || null,
      example_sentence: parsed.data.exampleSentence || null,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function deleteVocabulary(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: row } = await supabase
    .from("vocabulary")
    .select("lesson_id")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("vocabulary").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(row?.lesson_id);
  return { success: true };
}
