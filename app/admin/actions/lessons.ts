"use server";

import { createClient } from "@/lib/supabase/server";
import { lessonSchema } from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

// Row Level Security (see supabase/schema.sql) is the ultimate enforcement
// point: only profiles with is_admin = true can write to `lessons`. If a
// non-admin somehow calls these actions, Postgres rejects the write and we
// surface its error message below.

export async function createLesson(values: unknown): Promise<ActionResult> {
  const parsed = lessonSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("lessons").insert({
    title: parsed.data.title,
    description: parsed.data.description || null,
    order_number: parsed.data.orderNumber,
  });

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent();
  return { success: true };
}

export async function updateLesson(
  id: string,
  values: unknown
): Promise<ActionResult> {
  const parsed = lessonSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("lessons")
    .update({
      title: parsed.data.title,
      description: parsed.data.description || null,
      order_number: parsed.data.orderNumber,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(id);
  return { success: true };
}

export async function deleteLesson(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("lessons").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(id);
  return { success: true };
}
