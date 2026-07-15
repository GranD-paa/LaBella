"use server";

import { revalidateAppContent } from "@/lib/revalidate-paths";
import { redirect } from "next/navigation";

import { getDataRepository } from "@/lib/data";
import { submitQuizSchema } from "@/lib/validations/quiz";
import type { ActionResult } from "@/lib/action-result";

export async function submitQuizAction(
  values: unknown
): Promise<ActionResult | void> {
  const parsed = submitQuizSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid submission" };
  }

  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    return { error: "You must be signed in to submit a quiz." };
  }

  const { quizId, answers } = parsed.data;

  const existingAttempt = await repo.getAttemptByUserAndQuiz(user.id, quizId);
  if (existingAttempt) {
    return {
      error: "You have already attempted this quiz.",
      code: 409,
    };
  }

  const [quiz, questions] = await Promise.all([
    repo.getQuizById(quizId),
    repo.getQuizQuestionAnswers(quizId),
  ]);

  if (!quiz) {
    return { error: "Quiz not found." };
  }

  if (questions.length === 0) {
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

  const result = await repo.createQuizAttempt({
    userId: user.id,
    quizId,
    score,
    answersJson: answers,
  });

  if (result.error) {
    return {
      error: result.error,
      code: result.code,
    };
  }

  revalidateAppContent(quiz.lesson_id);
  redirect(`/lesson/${quiz.lesson_id}`);
}
