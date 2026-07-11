import { z } from "zod";

// Accept an empty string from the form and normalize it to undefined so
// `.optional()` / `.url()` behave as expected.
const optionalText = (max: number) =>
  z
    .string()
    .max(max, `Must be ${max} characters or fewer`)
    .optional()
    .or(z.literal(""));

export const lessonSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(150, "Title is too long"),
  description: optionalText(2000),
  orderNumber: z
    .number({ error: "Order must be a number" })
    .int("Order must be a whole number")
    .min(0, "Order must be 0 or greater"),
});

export type LessonValues = z.infer<typeof lessonSchema>;

export const vocabularySchema = z.object({
  lessonId: z.string().uuid("Please select a lesson"),
  word: z
    .string()
    .min(1, "Word is required")
    .max(200, "Word is too long"),
  translation: z
    .string()
    .min(1, "Translation is required")
    .max(200, "Translation is too long"),
  imageUrl: z
    .string()
    .url("Must be a valid URL")
    .max(2000)
    .optional()
    .or(z.literal("")),
  exampleSentence: optionalText(500),
});

export type VocabularyValues = z.infer<typeof vocabularySchema>;

export const grammarRuleSchema = z.object({
  lessonId: z.string().uuid("Please select a lesson"),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(150, "Title is too long"),
  description: optionalText(2000),
  example: optionalText(1000),
});

export type GrammarRuleValues = z.infer<typeof grammarRuleSchema>;

export const quizQuestionSchema = z.object({
  questionText: z.string().min(1, "Question text is required"),
  optionA: z.string().min(1, "Option A is required"),
  optionB: z.string().min(1, "Option B is required"),
  optionC: z.string().min(1, "Option C is required"),
  optionD: z.string().min(1, "Option D is required"),
  correctOption: z.enum(["a", "b", "c", "d"], {
    message: "Select the correct answer",
  }),
});

export type QuizQuestionValues = z.infer<typeof quizQuestionSchema>;

export const quizSchema = z.object({
  lessonId: z.string().uuid("Please select a lesson"),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(150, "Title is too long"),
  questions: z
    .array(quizQuestionSchema)
    .min(1, "Add at least one question"),
});

export type QuizValues = z.infer<typeof quizSchema>;
