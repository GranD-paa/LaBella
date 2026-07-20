import { scoreWrittenAnswer } from "@/lib/quiz-management/types";
import type { QuizQuestion } from "@/types";

export type GradedQuizQuestion = Pick<
  QuizQuestion,
  | "id"
  | "question_text"
  | "option_a"
  | "option_b"
  | "option_c"
  | "option_d"
  | "question_type"
  | "correct_option"
  | "expected_answer"
  | "explanation"
>;

const OPTION_FIELDS = {
  a: "option_a",
  b: "option_b",
  c: "option_c",
  d: "option_d",
} as const;

export function gradeAnswer(
  question: GradedQuizQuestion,
  userAnswer: string
): boolean {
  if (question.question_type === "written") {
    return scoreWrittenAnswer(userAnswer, question.expected_answer);
  }

  return userAnswer === question.correct_option;
}

export function getCorrectAnswerLabel(question: GradedQuizQuestion): string {
  if (question.question_type === "written") {
    return question.expected_answer?.trim() || "—";
  }

  const field =
    OPTION_FIELDS[question.correct_option as keyof typeof OPTION_FIELDS];
  const text = field ? question[field] : "";
  return `${question.correct_option.toUpperCase()}. ${text}`;
}
