import {
  getCorrectAnswerLabel,
  gradeAnswer,
  type GradedQuizQuestion,
} from "@/lib/quiz/grading";
import type { Json } from "@/types/database.types";

export const QUIZ_ATTEMPT_BREAKDOWN_KEY = "__breakdown";

export type QuizAttemptBreakdownItem = {
  questionId: string;
  questionText: string;
  questionType: "multiple_choice" | "written";
  userAnswer: string;
  userAnswerLabel: string;
  correctAnswer: string;
  isCorrect: boolean;
};

export type QuizAttemptBreakdown = {
  version: 1;
  correctCount: number;
  incorrectCount: number;
  totalQuestions: number;
  items: QuizAttemptBreakdownItem[];
};

const OPTION_FIELDS = {
  a: "option_a",
  b: "option_b",
  c: "option_c",
  d: "option_d",
} as const;

function formatUserAnswerLabel(
  question: GradedQuizQuestion,
  userAnswer: string
): string {
  if (question.question_type === "written") {
    return userAnswer.trim() || "—";
  }

  const field = OPTION_FIELDS[userAnswer as keyof typeof OPTION_FIELDS];
  if (!field) {
    return userAnswer.toUpperCase();
  }

  return `${userAnswer.toUpperCase()}. ${question[field]}`;
}

export function buildQuizAttemptAnswersJson(
  questions: GradedQuizQuestion[],
  answers: Record<string, string>
): Json {
  const items: QuizAttemptBreakdownItem[] = [];
  let correctCount = 0;

  for (const question of questions) {
    const userAnswer = answers[question.id]?.trim() ?? "";
    const isCorrect = gradeAnswer(question, userAnswer);
    if (isCorrect) {
      correctCount++;
    }

    items.push({
      questionId: question.id,
      questionText: question.question_text,
      questionType:
        question.question_type === "written" ? "written" : "multiple_choice",
      userAnswer,
      userAnswerLabel: formatUserAnswerLabel(question, userAnswer),
      correctAnswer: getCorrectAnswerLabel(question),
      isCorrect,
    });
  }

  const breakdown: QuizAttemptBreakdown = {
    version: 1,
    correctCount,
    incorrectCount: questions.length - correctCount,
    totalQuestions: questions.length,
    items,
  };

  const payload: Record<string, Json> = { ...answers };
  payload[QUIZ_ATTEMPT_BREAKDOWN_KEY] = breakdown as unknown as Json;
  return payload;
}

export function parseStoredAnswers(answersJson: Json): Record<string, string> {
  if (
    typeof answersJson !== "object" ||
    answersJson === null ||
    Array.isArray(answersJson)
  ) {
    return {};
  }

  const record = answersJson as Record<string, Json>;
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(record)) {
    if (key === QUIZ_ATTEMPT_BREAKDOWN_KEY) {
      continue;
    }
    if (typeof value === "string") {
      result[key] = value;
    }
  }

  return result;
}

export function parseAttemptBreakdown(
  answersJson: Json
): QuizAttemptBreakdown | null {
  if (
    typeof answersJson !== "object" ||
    answersJson === null ||
    Array.isArray(answersJson)
  ) {
    return null;
  }

  const record = answersJson as Record<string, Json>;
  const raw = record[QUIZ_ATTEMPT_BREAKDOWN_KEY];

  if (
    typeof raw !== "object" ||
    raw === null ||
    Array.isArray(raw) ||
    !("items" in raw) ||
    !Array.isArray((raw as QuizAttemptBreakdown).items)
  ) {
    return null;
  }

  return raw as QuizAttemptBreakdown;
}
