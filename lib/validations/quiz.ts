import { z } from "zod";

const answerOptionSchema = z.enum(["a", "b", "c", "d"], {
  message: "Please select an answer",
});

export const submitQuizSchema = z.object({
  quizId: z.string().uuid("Invalid quiz"),
  answers: z.record(z.string().uuid(), z.string().min(1, "Please provide an answer")),
});

export type SubmitQuizValues = z.infer<typeof submitQuizSchema>;

export function createSubmitQuizSchema(
  questions: Array<{ id: string; question_type?: "multiple_choice" | "written" }>
) {
  const answerFields = Object.fromEntries(
    questions.map((question) => {
      const schema =
        question.question_type === "written"
          ? z.string().min(1, "Please provide an answer")
          : answerOptionSchema;
      return [question.id, schema];
    })
  );

  return z.object({
    quizId: z.string().uuid("Invalid quiz"),
    answers: z.object(answerFields),
  });
}
