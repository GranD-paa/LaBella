"use server";

import { getDataRepository } from "@/lib/data";
import {
  quizQuestionSchema,
  quizSchema,
  quizTitleSchema,
} from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";

async function getQuizLessonId(quizId: string) {
  const repo = getDataRepository();
  const quiz = await repo.getQuizById(quizId);
  return quiz?.lesson_id;
}

async function getQuestionLessonId(questionId: string) {
  const repo = getDataRepository();
  const question = (await repo.getAllQuizQuestions()).find(
    (entry) => entry.id === questionId
  );
  if (!question) return undefined;
  return getQuizLessonId(question.quiz_id);
}

export async function createQuizWithQuestions(
  values: unknown
): Promise<ActionResult> {
  const parsed = quizSchema.safeParse(values);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const repo = getDataRepository();
  const result = await repo.createQuizWithQuestions({
    lessonId: parsed.data.lessonId,
    title: parsed.data.title,
    questions: parsed.data.questions,
  });

  if (result.error) {
    return { error: result.error };
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

  const repo = getDataRepository();
  const lessonId = await getQuizLessonId(quizId);
  const result = await repo.updateQuizTitle(quizId, parsed.data.title);

  if (result.error) {
    return { error: result.error };
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

  const repo = getDataRepository();
  const lessonId = await getQuizLessonId(quizId);
  const result = await repo.addQuizQuestion(quizId, {
    question_text: parsed.data.questionText,
    option_a: parsed.data.optionA,
    option_b: parsed.data.optionB,
    option_c: parsed.data.optionC,
    option_d: parsed.data.optionD,
    correct_option: parsed.data.correctOption,
  });

  if (result.error) {
    return { error: result.error };
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

  const repo = getDataRepository();
  const lessonId = await getQuestionLessonId(questionId);
  const result = await repo.updateQuizQuestion(questionId, {
    question_text: parsed.data.questionText,
    option_a: parsed.data.optionA,
    option_b: parsed.data.optionB,
    option_c: parsed.data.optionC,
    option_d: parsed.data.optionD,
    correct_option: parsed.data.correctOption,
  });

  if (result.error) {
    return { error: result.error };
  }

  revalidateAppContent(lessonId);
  return { success: true };
}

export async function deleteQuizQuestion(
  questionId: string
): Promise<ActionResult> {
  const repo = getDataRepository();
  const lessonId = await getQuestionLessonId(questionId);
  const result = await repo.deleteQuizQuestion(questionId);

  if (result.error) {
    return { error: result.error };
  }

  revalidateAppContent(lessonId);
  return { success: true };
}

export async function deleteQuiz(id: string): Promise<ActionResult> {
  const repo = getDataRepository();
  const quiz = await repo.getQuizById(id);
  const result = await repo.deleteQuiz(id);

  if (result.error) {
    return { error: result.error };
  }

  revalidateAppContent(quiz?.lesson_id);
  return { success: true };
}
