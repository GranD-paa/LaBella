"use server";

import { revalidateAppContent } from "@/lib/revalidate-paths";
import { redirect } from "next/navigation";

import { getDataRepository } from "@/lib/data";
import { advanceLearningAfterQuiz } from "@/lib/quiz/advance-learning";
import { buildQuizAttemptAnswersJson } from "@/lib/quiz/attempt-payload";
import { gradeAnswer } from "@/lib/quiz/grading";
import { submitQuizSchema } from "@/lib/validations/quiz";
import type { ActionResult } from "@/lib/action-result";

export async function submitQuizAction(
  values: unknown
): Promise<ActionResult | void> {
  const parsed = submitQuizSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidSubmission" };
  }

  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    return { error: "actions.errors.mustSignIn" };
  }

  const { quizId, answers } = parsed.data;

  const existingAttempt = await repo.getAttemptByUserAndQuiz(user.id, quizId);
  if (existingAttempt) {
    return {
      error: "actions.errors.alreadyAttempted",
      code: 409,
    };
  }

  const [quiz, questions, profile] = await Promise.all([
    repo.getQuizById(quizId),
    repo.getQuizQuestionsByQuizId(quizId),
    repo.getProfileById(user.id),
  ]);

  if (!quiz) {
    return { error: "actions.errors.quizNotFound" };
  }

  if (!profile?.is_admin && quiz.status !== "published") {
    return { error: "actions.errors.quizUnavailable" };
  }

  if (questions.length === 0) {
    return { error: "actions.errors.quizNoQuestions" };
  }

  for (const question of questions) {
    if (!answers[question.id]?.trim()) {
      return { error: "actions.errors.answerAll" };
    }
  }

  let correctCount = 0;
  for (const question of questions) {
    if (gradeAnswer(question, answers[question.id])) {
      correctCount++;
    }
  }

  const score = Math.round((correctCount / questions.length) * 100);
  const answersJson = buildQuizAttemptAnswersJson(questions, answers);

  const result = await repo.createQuizAttempt({
    userId: user.id,
    quizId,
    score,
    answersJson,
  });

  if (result.error) {
    return {
      error: "actions.errors.generic",
      code: result.code,
    };
  }

  await advanceLearningAfterQuiz(repo, user.id, quiz);

  revalidateAppContent(quiz.lesson_id);
  redirect(`/dashboard?quizSubmitted=1&score=${score}`);
}
