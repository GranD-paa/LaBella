"use server";

import { createClient } from "@/lib/supabase/server";
import {
  quizQuestionSchema,
  quizSchema,
  quizTitleSchema,
} from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

async function getQuizLessonId(quizId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quizzes")
    .select("lesson_id")
    .eq("id", quizId)
    .single();
  return data?.lesson_id;
}

async function getQuestionLessonId(questionId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("quiz_questions")
    .select("quiz_id, quizzes(lesson_id)")
    .eq("id", questionId)
    .single();

  const quiz = data?.quizzes as { lesson_id: string } | null | undefined;
  return quiz?.lesson_id;
}

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

export async function updateQuizTitle(
  quizId: string,
  values: unknown
): Promise<ActionResult> {
  const parsed = quizTitleSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const lessonId = await getQuizLessonId(quizId);

  const { error } = await supabase
    .from("quizzes")
    .update({ title: parsed.data.title })
    .eq("id", quizId);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(lessonId);
  return { success: true };
}

export async function addQuizQuestion(
  quizId: string,
  values: unknown
): Promise<ActionResult> {
  const parsed = quizQuestionSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const lessonId = await getQuizLessonId(quizId);

  const { error } = await supabase.from("quiz_questions").insert({
    quiz_id: quizId,
    question_text: parsed.data.questionText,
    option_a: parsed.data.optionA,
    option_b: parsed.data.optionB,
    option_c: parsed.data.optionC,
    option_d: parsed.data.optionD,
    correct_option: parsed.data.correctOption,
  });

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(lessonId);
  return { success: true };
}

export async function updateQuizQuestion(
  questionId: string,
  values: unknown
): Promise<ActionResult> {
  const parsed = quizQuestionSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const lessonId = await getQuestionLessonId(questionId);

  const { error } = await supabase
    .from("quiz_questions")
    .update({
      question_text: parsed.data.questionText,
      option_a: parsed.data.optionA,
      option_b: parsed.data.optionB,
      option_c: parsed.data.optionC,
      option_d: parsed.data.optionD,
      correct_option: parsed.data.correctOption,
    })
    .eq("id", questionId);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(lessonId);
  return { success: true };
}

export async function deleteQuizQuestion(
  questionId: string
): Promise<ActionResult> {
  const supabase = await createClient();
  const lessonId = await getQuestionLessonId(questionId);

  const { error } = await supabase
    .from("quiz_questions")
    .delete()
    .eq("id", questionId);

  if (error) {
    return { error: error.message };
  }

  revalidateAppContent(lessonId);
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
