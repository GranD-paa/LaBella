"use server";

import { revalidatePath } from "next/cache";

import { requireAdminPermission } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import {
  quizQuestionSchema,
  quizSchema,
  quizTitleSchema,
  structuredQuizSchema,
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

export async function createStructuredQuiz(
  values: unknown
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageQuizzes");
  if (!guard.ok) return { error: guard.error };

  const parsed = structuredQuizSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.createQuizWithQuestions({
    lessonId: parsed.data.lessonId,
    title: parsed.data.title,
    languageSlug: parsed.data.languageSlug,
    levelSlug: parsed.data.levelSlug,
    sectionSlug: parsed.data.sectionSlug,
    status: parsed.data.status,
    questions: parsed.data.questions,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  revalidateQuizPaths();
  return { success: true };
}

export async function updateQuizStatusAction(
  quizId: string,
  status: "draft" | "published"
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageQuizzes");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();

  if (status === "published") {
    const questions = await repo.getQuizQuestionsByQuizId(quizId);
    if (questions.length === 0) {
      return { error: "actions.errors.quizNoQuestions" };
    }
  }

  const lessonId = await getQuizLessonId(quizId);
  const result = await repo.updateQuizStatus(quizId, status);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(lessonId);
  revalidateQuizPaths();
  return { success: true };
}

function revalidateQuizPaths() {
  revalidatePath("/admin/quizzes");
  revalidatePath("/learn", "layout");
  revalidatePath("/dashboard");
}

export async function createQuizWithQuestions(
  values: unknown
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageQuizzes");
  if (!guard.ok) return { error: guard.error };

  const parsed = quizSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.createQuizWithQuestions({
    lessonId: parsed.data.lessonId,
    title: parsed.data.title,
    status: "published",
    questions: parsed.data.questions,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  revalidateQuizPaths();
  return { success: true };
}

export async function updateQuizTitle(
  quizId: string,
  values: unknown
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageQuizzes");
  if (!guard.ok) return { error: guard.error };

  const parsed = quizTitleSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const lessonId = await getQuizLessonId(quizId);
  const result = await repo.updateQuizTitle(quizId, parsed.data.title);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(lessonId);
  return { success: true };
}

export async function addQuizQuestion(
  quizId: string,
  values: unknown
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageQuizzes");
  if (!guard.ok) return { error: guard.error };

  const parsed = quizQuestionSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const lessonId = await getQuizLessonId(quizId);
  const questionType = parsed.data.questionType ?? "multiple_choice";
  const result = await repo.addQuizQuestion(quizId, {
    question_text: parsed.data.questionText,
    option_a: questionType === "written" ? "-" : (parsed.data.optionA ?? "-"),
    option_b: questionType === "written" ? "-" : (parsed.data.optionB ?? "-"),
    option_c: questionType === "written" ? "-" : (parsed.data.optionC ?? "-"),
    option_d: questionType === "written" ? "-" : (parsed.data.optionD ?? "-"),
    correct_option:
      questionType === "written" ? "a" : (parsed.data.correctOption ?? "a"),
    question_type: questionType,
    expected_answer: parsed.data.expectedAnswer ?? null,
    explanation: parsed.data.explanation ?? null,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(lessonId);
  return { success: true };
}

export async function updateQuizQuestion(
  questionId: string,
  values: unknown
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageQuizzes");
  if (!guard.ok) return { error: guard.error };

  const parsed = quizQuestionSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const lessonId = await getQuestionLessonId(questionId);
  const questionType = parsed.data.questionType ?? "multiple_choice";
  const result = await repo.updateQuizQuestion(questionId, {
    question_text: parsed.data.questionText,
    option_a: questionType === "written" ? "-" : (parsed.data.optionA ?? "-"),
    option_b: questionType === "written" ? "-" : (parsed.data.optionB ?? "-"),
    option_c: questionType === "written" ? "-" : (parsed.data.optionC ?? "-"),
    option_d: questionType === "written" ? "-" : (parsed.data.optionD ?? "-"),
    correct_option:
      questionType === "written" ? "a" : (parsed.data.correctOption ?? "a"),
    question_type: questionType,
    expected_answer: parsed.data.expectedAnswer ?? null,
    explanation: parsed.data.explanation ?? null,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(lessonId);
  return { success: true };
}

export async function deleteQuizQuestion(
  questionId: string
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageQuizzes");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const lessonId = await getQuestionLessonId(questionId);
  const result = await repo.deleteQuizQuestion(questionId);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(lessonId);
  return { success: true };
}

export async function deleteQuiz(id: string): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageQuizzes");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const quiz = await repo.getQuizById(id);
  const result = await repo.deleteQuiz(id);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(quiz?.lesson_id);
  return { success: true };
}
