"use server";

import { revalidateAppContent } from "@/lib/revalidate-paths";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { submitQuizSchema } from "@/lib/validations/quiz";
import type { ActionResult } from "@/lib/action-result";

export async function submitQuizAction(
  values: unknown
): Promise<ActionResult | void> {
  const parsed = submitQuizSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to submit a quiz." };
  }

  const { quizId, answers } = parsed.data;

  const { data: existingAttempt } = await supabase
    .from("user_quiz_attempts")
    .select("id")
    .eq("user_id", user.id)
    .eq("quiz_id", quizId)
    .maybeSingle();

  if (existingAttempt) {
    return { error: "You have already completed this quiz." };
  }

  const [{ data: quiz }, { data: questions }] = await Promise.all([
    supabase.from("quizzes").select("lesson_id").eq("id", quizId).single(),
    supabase
      .from("quiz_questions")
      .select("id, correct_option")
      .eq("quiz_id", quizId),
  ]);

  if (!quiz) {
    return { error: "Quiz not found." };
  }

  if (!questions || questions.length === 0) {
    return { error: "This quiz has no questions." };
  }

  for (const question of questions) {
    if (!answers[question.id]) {
      return { error: "Please answer all questions before submitting." };
    }
  }

  let correctCount = 0;
  for (const question of questions) {
    if (answers[question.id] === question.correct_option) {
      correctCount++;
    }
  }

  const score = Math.round((correctCount / questions.length) * 100);

  const { error: insertError } = await supabase.from("user_quiz_attempts").insert({
    user_id: user.id,
    quiz_id: quizId,
    score,
    answers_json: answers,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  revalidateAppContent(quiz.lesson_id);
  redirect(`/lesson/${quiz.lesson_id}`);
}
