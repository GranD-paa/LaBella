import { z } from "zod";

type Translator = (
  key: string,
  params?: Record<string, string | number>
) => string;

function optionalText(t: Translator, max: number) {
  return z
    .string()
    .max(max, t("validation.admin.maxChars", { max }))
    .optional()
    .or(z.literal(""));
}

export function createLessonSchema(t: Translator) {
  return z.object({
    title: z
      .string()
      .min(2, t("validation.admin.titleMin"))
      .max(150, t("validation.admin.titleMax")),
    description: optionalText(t, 2000),
    orderNumber: z
      .number({ error: t("validation.admin.orderNumber") })
      .int(t("validation.admin.orderInt"))
      .min(0, t("validation.admin.orderMin")),
  });
}

export function createVocabularySchema(t: Translator) {
  return z.object({
    lessonId: z.string().uuid(t("validation.admin.selectLesson")),
    word: z
      .string()
      .min(1, t("validation.admin.wordRequired"))
      .max(200, t("validation.admin.wordMax")),
    translation: z
      .string()
      .min(1, t("validation.admin.translationRequired"))
      .max(200, t("validation.admin.translationMax")),
    imageUrl: z
      .string()
      .url(t("validation.admin.invalidUrl"))
      .max(2000)
      .optional()
      .or(z.literal("")),
    exampleSentence: optionalText(t, 500),
  });
}

export function createGrammarRuleSchema(t: Translator) {
  return z.object({
    lessonId: z.string().uuid(t("validation.admin.selectLesson")),
    title: z
      .string()
      .min(2, t("validation.admin.titleMin"))
      .max(150, t("validation.admin.titleMax")),
    description: optionalText(t, 2000),
    example: optionalText(t, 1000),
  });
}

export function createQuizQuestionSchema(t: Translator) {
  return z
    .object({
      questionType: z.enum(["multiple_choice", "written"]),
      questionText: z.string().min(1, t("validation.admin.questionRequired")),
      optionA: z.string().optional(),
      optionB: z.string().optional(),
      optionC: z.string().optional(),
      optionD: z.string().optional(),
      correctOption: z.enum(["a", "b", "c", "d"]).optional(),
      expectedAnswer: z.string().optional(),
      explanation: optionalText(t, 1000),
    })
    .superRefine((value, ctx) => {
      if (value.questionType === "multiple_choice") {
        if (!value.optionA?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: t("validation.admin.optionARequired"),
            path: ["optionA"],
          });
        }
        if (!value.optionB?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: t("validation.admin.optionBRequired"),
            path: ["optionB"],
          });
        }
        if (!value.optionC?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: t("validation.admin.optionCRequired"),
            path: ["optionC"],
          });
        }
        if (!value.optionD?.trim()) {
          ctx.addIssue({
            code: "custom",
            message: t("validation.admin.optionDRequired"),
            path: ["optionD"],
          });
        }
        if (!value.correctOption) {
          ctx.addIssue({
            code: "custom",
            message: t("validation.admin.selectCorrect"),
            path: ["correctOption"],
          });
        }
      } else if (!value.expectedAnswer?.trim()) {
        ctx.addIssue({
          code: "custom",
          message: t("validation.admin.expectedAnswerRequired"),
          path: ["expectedAnswer"],
        });
      }
    });
}

export function createQuizTitleSchema(t: Translator) {
  return z.object({
    title: z
      .string()
      .min(2, t("validation.admin.titleMin"))
      .max(150, t("validation.admin.titleMax")),
  });
}

export function createStructuredQuizSchema(t: Translator) {
  const quizQuestionSchema = createQuizQuestionSchema(t);
  return z.object({
    lessonId: z.string().uuid(t("validation.admin.selectLesson")),
    title: z
      .string()
      .min(2, t("validation.admin.titleMin"))
      .max(150, t("validation.admin.titleMax")),
    languageSlug: z.enum(["italian", "english", "german", "turkish"]),
    levelSlug: z.string().min(1, t("validation.admin.selectLevel")),
    sectionSlug: z.enum(["grammar", "vocabulary", "visual", "quiz", "custom"]),
    status: z.enum(["draft", "published"]),
    questions: z
      .array(quizQuestionSchema)
      .min(1, t("validation.admin.minOneQuestion")),
  });
}

export function createQuizSchema(t: Translator) {
  const quizQuestionSchema = createQuizQuestionSchema(t);
  return z.object({
    lessonId: z.string().uuid(t("validation.admin.selectLesson")),
    title: z
      .string()
      .min(2, t("validation.admin.titleMin"))
      .max(150, t("validation.admin.titleMax")),
    questions: z
      .array(quizQuestionSchema)
      .min(1, t("validation.admin.minOneQuestion")),
  });
}

export type LessonValues = z.infer<ReturnType<typeof createLessonSchema>>;
export type VocabularyValues = z.infer<
  ReturnType<typeof createVocabularySchema>
>;
export type GrammarRuleValues = z.infer<
  ReturnType<typeof createGrammarRuleSchema>
>;
export type QuizQuestionValues = z.infer<
  ReturnType<typeof createQuizQuestionSchema>
>;
export type QuizTitleValues = z.infer<ReturnType<typeof createQuizTitleSchema>>;
export type StructuredQuizValues = z.infer<
  ReturnType<typeof createStructuredQuizSchema>
>;
export type QuizValues = z.infer<ReturnType<typeof createQuizSchema>>;
