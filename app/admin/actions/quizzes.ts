"use server";

import { createClient } from "@/lib/supabase/server";
import { quizSchema } from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

export async function createQuizWithQuestions(
  values: unknown
): Promise<ActionResult> {
  const parsed = quizSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();

  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .insert({ lesson_id: parsed.data.lessonId, title: parsed.data.title })
    .select("id")
    .single();

  if (quizError || !quiz) {
    return { error: quizError?.message ?? "Failed to create quiz" };
  }

  const { error: questionsError } = await supabase
    .from("quiz_questions")
    .insert(
      parsed.data.questions.map((q) => ({
        quiz_id: quiz.id,
        question_text: q.questionText,
        option_a: q.optionA,
        option_b: q.optionB,
        option_c: q.optionC,
        option_d: q.optionD,
        correct_option: q.correctOption,
      }))
    );

  if (questionsError) {
    await supabase.from("quizzes").delete().eq("id", quiz.id);
    return { error: questionsError.message };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function updateQuizWithQuestions(
  quizId: string,
  values: unknown
): Promise<ActionResult> {
  const parsed = quizSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();

  const { error: quizError } = await supabase
    .from("quizzes")
    .update({ lesson_id: parsed.data.lessonId, title: parsed.data.title })
    .eq("id", quizId);

  if (quizError) {
    return { error: quizError.message };
  }

  const { error: deleteError } = await supabase
    .from("quiz_questions")
    .delete()
    .eq("quiz_id", quizId);

  if (deleteError) {
    return { error: deleteError.message };
  }

  const { error: questionsError } = await supabase
    .from("quiz_questions")
    .insert(
      parsed.data.questions.map((q) => ({
        quiz_id: quizId,
        question_text: q.questionText,
        option_a: q.optionA,
        option_b: q.optionB,
        option_c: q.optionC,
        option_d: q.optionD,
        correct_option: q.correctOption,
      }))
    );

  if (questionsError) {
    return { error: questionsError.message };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function deleteQuiz(id: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: row } = await supabase
    .from("quizzes")
    .select("lesson_id")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("quizzes").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(row?.lesson_id);
  return { success: true };
}
