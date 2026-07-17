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

export const contentGrammarSchema = grammarRuleSchema.extend({
  status: z.enum(["draft", "published"]).default("draft"),
});

export const contentVocabularySchema = vocabularySchema.extend({
  imageUrl: z.string().url("Must be a valid URL").max(2000),
  pronunciation: optionalText(200),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type ContentVocabularyValues = z.infer<typeof contentVocabularySchema>;

export const videoLessonSchema = z.object({
  lessonId: z.string().uuid("Please select a lesson"),
  languageSlug: z.enum(["italian", "english", "german", "turkish"]),
  levelSlug: z.string().min(1, "Select a course level"),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(150, "Title is too long"),
  description: optionalText(2000),
  videoUrl: z.string().url("Must be a valid URL").max(2000),
  thumbnailUrl: optionalText(2000),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type VideoLessonValues = z.infer<typeof videoLessonSchema>;

export const quizQuestionSchema = z
  .object({
    questionType: z.enum(["multiple_choice", "written"]),
    questionText: z.string().min(1, "Question text is required"),
    optionA: z.string().optional(),
    optionB: z.string().optional(),
    optionC: z.string().optional(),
    optionD: z.string().optional(),
    correctOption: z.enum(["a", "b", "c", "d"]).optional(),
    expectedAnswer: z.string().optional(),
    explanation: optionalText(1000),
  })
  .superRefine((value, ctx) => {
    if (value.questionType === "multiple_choice") {
      if (!value.optionA?.trim()) {
        ctx.addIssue({ code: "custom", message: "Option A is required", path: ["optionA"] });
      }
      if (!value.optionB?.trim()) {
        ctx.addIssue({ code: "custom", message: "Option B is required", path: ["optionB"] });
      }
      if (!value.optionC?.trim()) {
        ctx.addIssue({ code: "custom", message: "Option C is required", path: ["optionC"] });
      }
      if (!value.optionD?.trim()) {
        ctx.addIssue({ code: "custom", message: "Option D is required", path: ["optionD"] });
      }
      if (!value.correctOption) {
        ctx.addIssue({
          code: "custom",
          message: "Select the correct answer",
          path: ["correctOption"],
        });
      }
    } else if (!value.expectedAnswer?.trim()) {
      ctx.addIssue({
        code: "custom",
        message: "Expected answer is required",
        path: ["expectedAnswer"],
      });
    }
  });

export type QuizQuestionValues = z.infer<typeof quizQuestionSchema>;

export const quizTitleSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(150, "Title is too long"),
});

export type QuizTitleValues = z.infer<typeof quizTitleSchema>;

export const structuredQuizSchema = z.object({
  lessonId: z.string().uuid("Please select a lesson"),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(150, "Title is too long"),
  languageSlug: z.enum(["italian", "english", "german", "turkish"]),
  levelSlug: z.string().min(1, "Select a course level"),
  sectionSlug: z.enum(["grammar", "vocabulary", "visual", "quiz", "custom"]),
  status: z.enum(["draft", "published"]),
  questions: z.array(quizQuestionSchema).min(1, "Add at least one question"),
});

export type StructuredQuizValues = z.infer<typeof structuredQuizSchema>;

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
