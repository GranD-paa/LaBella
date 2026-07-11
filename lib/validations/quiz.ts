import { z } from "zod";

const answerOptionSchema = z.enum(["a", "b", "c", "d"], {
  message: "Please select an answer",
});

export const submitQuizSchema = z.object({
  quizId: z.string().uuid("Invalid quiz"),
  answers: z.record(z.string().uuid(), answerOptionSchema),
});

export type SubmitQuizValues = z.infer<typeof submitQuizSchema>;

export function createSubmitQuizSchema(questionIds: string[]) {
  const answerFields = Object.fromEntries(
    questionIds.map((id) => [id, answerOptionSchema])
  );

  return z.object({
    quizId: z.string().uuid("Invalid quiz"),
    answers: z.object(answerFields),
  });
}
