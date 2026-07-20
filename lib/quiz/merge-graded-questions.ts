import type { GradedQuizQuestion } from "@/lib/quiz/grading";
import type { QuizQuestion } from "@/types";

export function mergeGradedQuestions(
  questions: QuizQuestion[],
  answerKey: Array<{
    id: string;
    correct_option: string;
    question_type: "multiple_choice" | "written";
    expected_answer: string | null;
  }>
): GradedQuizQuestion[] {
  const answerMap = new Map(answerKey.map((entry) => [entry.id, entry]));

  return questions.map((question) => {
    const answers = answerMap.get(question.id);

    return {
      id: question.id,
      question_text: question.question_text,
      option_a: question.option_a,
      option_b: question.option_b,
      option_c: question.option_c,
      option_d: question.option_d,
      question_type: question.question_type,
      correct_option:
        (answers?.correct_option as GradedQuizQuestion["correct_option"]) ??
        question.correct_option,
      expected_answer: answers?.expected_answer ?? question.expected_answer,
      explanation: question.explanation,
    };
  });
}
