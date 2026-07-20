import { z } from "zod";

import { entityIdRecordSchema, entityIdSchema } from "@/lib/validations/entity-id";

const answerOptionSchema = z.enum(["a", "b", "c", "d"], {
  message: "Please select an answer",
});

export const submitQuizSchema = z.object({
  quizId: entityIdSchema("Invalid quiz"),
  answers: entityIdRecordSchema("Please provide an answer"),
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
    quizId: entityIdSchema("Invalid quiz"),
    answers: z.object(answerFields),
  });
}
