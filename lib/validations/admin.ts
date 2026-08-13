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
  sectionSlug: z.enum([
    "grammar",
    "vocabulary",
    "visual",
    "quiz",
    // The comprehensive level exam — same question shape, paid entitlement.
    "level-exam",
    "custom",
  ]),
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

export const bannerSchema = z.object({
  title: optionalText(150),
  linkHref: z
    .string()
    .url("Must be a valid URL")
    .max(2000)
    .refine((value) => /^https?:\/\//i.test(value), {
      message: "Link must start with http:// or https://",
    })
    .optional()
    .or(z.literal("")),
  status: z.enum(["draft", "published"]).default("draft"),
});

const localizedTextSchema = z.object({
  fa: z.string().min(1, "Persian text is required").max(500),
  en: z.string().min(1, "English text is required").max(500),
  it: z.string().min(1, "Italian text is required").max(500),
});

const localizedLongTextSchema = z.object({
  fa: z.string().min(1, "Persian text is required").max(2000),
  en: z.string().min(1, "English text is required").max(2000),
  it: z.string().min(1, "Italian text is required").max(2000),
});

export const subscriptionPlanSchema = z.object({
  priceEur: z
    .number({ error: "Price must be a number" })
    .min(0, "Price can't be negative")
    .max(999.99, "Price is too high"),
  discountPercent: z
    .number({ error: "Discount must be a number" })
    .int("Discount must be a whole number")
    .min(0, "Discount can't be negative")
    .max(95, "Discount can't exceed 95%"),
  title: localizedTextSchema,
  description: localizedLongTextSchema,
  features: z
    .array(localizedTextSchema)
    .min(1, "Add at least one feature")
    .max(12, "Too many features"),
  /** Whether this tier is sold for this language at all. */
  isActive: z.boolean(),
  quarterlyEnabled: z.boolean(),
  quarterlyDiscountPercent: z
    .number({ error: "Quarterly discount must be a number" })
    .int("Quarterly discount must be a whole number")
    .min(0, "Quarterly discount can't be negative")
    .max(95, "Quarterly discount can't exceed 95%"),
});

export type SubscriptionPlanValues = z.infer<typeof subscriptionPlanSchema>;

/**
 * What one tier unlocks. Global per tier rather than per language, matching
 * `subscription_tiers`.
 */
export const subscriptionTierSchema = z.object({
  tierRank: z
    .number({ error: "Rank must be a number" })
    .int("Rank must be a whole number")
    .min(0, "Rank can't be negative")
    .max(99, "Rank is too high"),
  unlocksVocabulary: z.boolean(),
  unlocksGrammar: z.boolean(),
  unlocksVideo: z.boolean(),
  unlocksLevelExam: z.boolean(),
  /**
   * Retakes past the first free attempt. `null` is unlimited, which is why
   * this is nullable rather than using a sentinel like -1.
   */
  quizRetakeLimit: z
    .number({ error: "Retake limit must be a number" })
    .int("Retake limit must be a whole number")
    .min(0, "Retake limit can't be negative")
    .max(99, "Retake limit is too high")
    .nullable(),
});

export type SubscriptionTierValues = z.infer<typeof subscriptionTierSchema>;

/** Platform-wide content-gating settings. */
export const entitlementSettingsSchema = z.object({
  enforceEntitlements: z.boolean(),
  freeCefrBands: z
    .array(z.enum(["A1", "A2", "B1", "B2", "C1", "C2"]))
    .max(6, "Too many bands"),
  freeQuizRetakeLimit: z
    .number({ error: "Retake limit must be a number" })
    .int("Retake limit must be a whole number")
    .min(0, "Retake limit can't be negative")
    .max(99, "Retake limit is too high"),
});

export type EntitlementSettingsValues = z.infer<
  typeof entitlementSettingsSchema
>;

export type BannerValues = z.infer<typeof bannerSchema>;

// -------------------------------------------------------------------------
// Billing & accounting
// -------------------------------------------------------------------------

export const billingSettingsSchema = z.object({
  irrEnabled: z.boolean(),
  fxSource: z.enum(["tgju", "navasan", "manual"]),
  fxMarginPercent: z
    .number({ error: "Margin must be a number" })
    .min(0, "Margin can't be negative")
    .max(100, "Margin can't exceed 100%"),
  // Rial prices are rounded up to a multiple of this. 1 means "don't round".
  irrRounding: z
    .number({ error: "Rounding must be a number" })
    .int("Rounding must be a whole number")
    .min(1, "Rounding must be at least 1")
    .max(1_000_000, "Rounding step is too large"),
  fxManualRate: z
    .number({ error: "Rate must be a number" })
    .positive("Rate must be positive")
    .max(1_000_000_000, "Rate is implausibly high")
    .nullable(),
  // Below ~5% normal daily movement would be rejected constantly; above ~90%
  // the guard would no longer catch a Rial/Toman unit switch.
  fxMaxDeviationPercent: z
    .number({ error: "Deviation must be a number" })
    .min(1, "Deviation limit is too tight")
    .max(90, "Deviation limit is too loose to catch a unit change"),
  stripeEnabled: z.boolean(),
  zarinpalEnabled: z.boolean(),
  manualEnabled: z.boolean(),
  gracePeriodDays: z
    .number({ error: "Grace period must be a number" })
    .int("Grace period must be a whole number")
    .min(0, "Grace period can't be negative")
    .max(60, "Grace period is too long"),
});

export type BillingSettingsValues = z.infer<typeof billingSettingsSchema>;

export const manualPaymentSchema = z.object({
  userId: z.string().min(1, "Select a learner"),
  planSlug: z.string().min(1, "Select a plan"),
  languageSlug: z.enum(["italian", "english", "german", "turkish"]),
  currency: z.enum(["EUR", "IRR"]),
  reference: z.string().max(120).optional(),
});

export type ManualPaymentValues = z.infer<typeof manualPaymentSchema>;

export const refundSchema = z.object({
  paymentId: z.string().min(1),
  // In cents, and strictly positive: a zero refund is a no-op that would
  // still put a misleading line in the ledger.
  amountEurCents: z
    .number({ error: "Amount must be a number" })
    .int("Amount must be a whole number of cents")
    .positive("Amount must be greater than zero"),
  reason: z.string().max(500).optional(),
});

export type RefundValues = z.infer<typeof refundSchema>;
