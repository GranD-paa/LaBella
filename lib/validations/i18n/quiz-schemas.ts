import { z } from "zod";

type Translator = (
  key: string,
  params?: Record<string, string | number>
) => string;

export function createSubmitQuizSchema(
  t: Translator,
  questions: Array<{ id: string; question_type?: "multiple_choice" | "written" }>
) {
  const answerOptionSchema = z.enum(["a", "b", "c", "d"], {
    message: t("validation.quiz.selectAnswer"),
  });

  const answerFields = Object.fromEntries(
    questions.map((question) => {
      const schema =
        question.question_type === "written"
          ? z.string().min(1, t("validation.quiz.provideAnswer"))
          : answerOptionSchema;
      return [question.id, schema];
    })
  );

  return z.object({
    quizId: z.string().uuid(t("validation.quiz.invalidQuiz")),
    answers: z.object(answerFields),
  });
}

export function createBaseSubmitQuizSchema(t: Translator) {
  return z.object({
    quizId: z.string().uuid(t("validation.quiz.invalidQuiz")),
    answers: z.record(
      z.string().uuid(),
      z.string().min(1, t("validation.quiz.provideAnswer"))
    ),
  });
}

export type SubmitQuizValues = z.infer<
  ReturnType<typeof createBaseSubmitQuizSchema>
>;
