import type { GrammarPage, GrammarPageSummary } from "@/lib/grammar/types";

import type {
  AccountingSnapshot,
  Banner,
  BillingCurrency,
  BillingPeriodMonths,
  FxRate,
  GrammarRule,
  Lesson,
  LocalizedText,
  Payment,
  PaymentProviderSlug,
  PaymentSettings,
  Profile,
  Quiz,
  QuizQuestion,
  Subscription,
  SubscriptionEvent,
  SubscriptionPageContentRow,
  SubscriptionPlanRow,
  SubscriptionTier,
  UserLearningState,
  UserQuizAttempt,
  VideoLesson,
  Vocabulary,
} from "@/types";
import type { Json } from "@/types/database.types";
import type { CurriculumLevelOverrideRow } from "@/lib/curriculum/level-overrides";
import type {
  BlogCategory,
  BlogPost,
  BlogPostInput,
} from "@/lib/blog/types";

export type AuthUser = {
  id: string;
  email: string;
};

export type LocalAuthUser = AuthUser & {
  password: string;
};

export type ProfileSummary = Pick<
  Profile,
  | "id"
  | "full_name"
  | "avatar_url"
  | "email"
  | "is_admin"
  | "role"
  | "status"
  | "created_at"
>;

export type QuizAttemptWithRelations = UserQuizAttempt & {
  quizTitle?: string;
  lessonTitle?: string;
  userName?: string;
};

export type QuizWithLessonTitle = Quiz & {
  lessonTitle?: string;
};

export interface DataRepository {
  // Auth
  getAuthUser(): Promise<AuthUser | null>;
  signInWithPassword(
    email: string,
    password: string
  ): Promise<{ error?: string }>;
  signOut(): Promise<void>;

  // Profiles
  getProfileById(userId: string): Promise<ProfileSummary | null>;
  getAllProfiles(): Promise<ProfileSummary[]>;
  updateUserAdminStatus(userId: string, isAdmin: boolean): Promise<{ error?: string }>;
  updateUserRole(userId: string, role: Profile["role"]): Promise<{ error?: string }>;
  updateUserStatus(
    userId: string,
    status: Profile["status"]
  ): Promise<{ error?: string }>;
  sendPasswordResetEmail(email: string): Promise<{ error?: string }>;

  // Language availability — super-admin overrides for which languages are
  // open ("active") vs. "coming soon". Returned as a sparse map; a missing
  // key means "use the static default" (see lib/curriculum/languages.ts).
  getLanguageAvailability(): Promise<Record<string, boolean>>;
  setLanguageAvailability(
    languageSlug: string,
    enabled: boolean
  ): Promise<{ error?: string }>;

  // Landing page showcase — which languages appear in the 3D stage on `/`.
  // Deliberately separate from `language_settings` above: a language can be
  // shown on the landing page as a teaser while its course is still closed,
  // and a language with no curriculum at all (French, Spanish) has a landmark
  // built but stays hidden until a super admin reveals it. Sparse map; a
  // missing key means "use `defaultVisible` from lib/landing/languages.ts".
  getLandingLanguageVisibility(): Promise<Record<string, boolean>>;
  setLandingLanguageVisibility(
    languageSlug: string,
    visible: boolean
  ): Promise<{ error?: string }>;

  // Blog. The public reads only published posts; the admin panel reads
  // everything, including drafts.
  getBlogCategories(): Promise<BlogCategory[]>;
  getPublishedBlogPosts(options?: {
    categorySlug?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ posts: BlogPost[]; total: number }>;
  getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getBlogPostsForAdmin(): Promise<BlogPost[]>;
  getBlogPostById(id: string): Promise<BlogPost | null>;
  upsertBlogPost(input: BlogPostInput): Promise<{ error?: string; id?: string }>;
  deleteBlogPost(id: string): Promise<{ error?: string }>;

  // Curriculum level customization — super-admin renames of default levels
  // and brand-new levels (e.g. A2/B1/B2) added on top of the static
  // defaults in lib/curriculum/{italian,english,german,turkish}.ts.
  getCurriculumLevelOverrides(): Promise<CurriculumLevelOverrideRow[]>;
  upsertCurriculumLevelOverride(
    row: CurriculumLevelOverrideRow
  ): Promise<{ error?: string }>;
  deleteCurriculumLevelOverride(
    languageSlug: string,
    slug: string
  ): Promise<{ error?: string }>;

  // Learning state — the learner's last active language, level, lesson, and
  // section. Used to restore navigation position after login. Works for any
  // current or future language since it is keyed by slug, not a fixed enum.
  getLearningState(userId: string): Promise<UserLearningState | null>;
  upsertLearningState(
    userId: string,
    input: {
      languageSlug: string;
      levelSlug: string;
      lessonId?: string | null;
      sectionSlug?: string | null;
    }
  ): Promise<{ error?: string }>;

  // Lessons & content
  getLessons(): Promise<Lesson[]>;
  getLessonById(id: string): Promise<Lesson | null>;
  getLessonByOrderNumber(orderNumber: number): Promise<Lesson | null>;
  getVocabularyByLessonId(lessonId: string): Promise<Vocabulary[]>;
  getAllVocabulary(): Promise<Vocabulary[]>;
  getGrammarRulesByLessonId(lessonId: string): Promise<GrammarRule[]>;
  getAllGrammarRules(): Promise<GrammarRule[]>;
  getVideoLessonsByLessonId(lessonId: string): Promise<VideoLesson[]>;
  getAllVideoLessons(): Promise<VideoLesson[]>;
  getQuizzes(): Promise<Quiz[]>;
  getQuizById(id: string): Promise<Quiz | null>;
  getQuizQuestionsByQuizId(quizId: string): Promise<QuizQuestion[]>;
  getAllQuizQuestions(): Promise<QuizQuestion[]>;
  getQuizQuestionAnswers(quizId: string): Promise<
    Array<{
      id: string;
      correct_option: string;
      question_type: "multiple_choice" | "written";
      expected_answer: string | null;
    }>
  >;

  // Quiz attempts
  getAttemptsByUserId(userId: string): Promise<UserQuizAttempt[]>;
  getAttemptByUserAndQuiz(
    userId: string,
    quizId: string
  ): Promise<UserQuizAttempt | null>;
  getAllAttempts(): Promise<UserQuizAttempt[]>;
  /**
   * Records one attempt at a quiz.
   *
   * The retake allowance is a paid entitlement, so it is enforced by the
   * database rather than here — see `record_quiz_attempt`. A learner who has
   * run out of retakes gets `code: 403` back.
   */
  createQuizAttempt(input: {
    userId: string;
    quizId: string;
    score: number;
    answersJson: Json;
  }): Promise<{
    error?: string;
    code?: number;
    attemptNumber?: number;
    /** Retakes allowed past the first attempt; `null` means unlimited. */
    retakeLimit?: number | null;
  }>;

  // Admin content mutations
  createLesson(input: {
    title: string;
    description: string | null;
    orderNumber: number;
  }): Promise<{ error?: string }>;
  updateLesson(
    id: string,
    input: {
      title: string;
      description: string | null;
      orderNumber: number;
    }
  ): Promise<{ error?: string }>;
  deleteLesson(id: string): Promise<{ error?: string }>;

  createVocabulary(input: Omit<Vocabulary, "id" | "created_at">): Promise<{ error?: string }>;
  updateVocabulary(
    id: string,
    input: Partial<Omit<Vocabulary, "id" | "created_at">>
  ): Promise<{ error?: string }>;
  deleteVocabulary(id: string): Promise<{ error?: string }>;

  /** Returns the new row's id, so the caller can attach a document to it. */
  createGrammarRule(
    input: Omit<GrammarRule, "id" | "created_at">
  ): Promise<{ error?: string; id?: string }>;
  updateGrammarRule(
    id: string,
    input: Partial<Omit<GrammarRule, "id" | "created_at">>
  ): Promise<{ error?: string }>;
  deleteGrammarRule(id: string): Promise<{ error?: string }>;

  // ------------------------------------------------------- grammar documents
  /** Every page of a title, in reading order. */
  getGrammarPages(ruleId: string): Promise<GrammarPage[]>;
  /** Page counts, and where this learner stopped, for a lesson's whole tab. */
  getGrammarPageSummaries(
    lessonId: string,
    userId: string | null
  ): Promise<GrammarPageSummary[]>;
  /** Appends a rendered document's pages after whatever is already there. */
  appendGrammarPages(
    ruleId: string,
    sourceDocument: string,
    pages: Array<{
      objectKey: string;
      width: number;
      height: number;
      sourcePage: number;
    }>
  ): Promise<{ error?: string }>;
  /** Object keys for every page of a title, for cleanup before deleting it. */
  getGrammarPageKeys(ruleId: string): Promise<string[]>;
  saveGrammarReadingProgress(
    userId: string,
    ruleId: string,
    pageNumber: number
  ): Promise<{ error?: string }>;

  createVideoLesson(
    input: Omit<VideoLesson, "id" | "created_at">
  ): Promise<{ error?: string }>;
  deleteVideoLesson(id: string): Promise<{ error?: string }>;

  createQuizWithQuestions(input: {
    lessonId: string;
    title: string;
    languageSlug?: string;
    levelSlug?: string;
    sectionSlug?: string;
    status?: "draft" | "published";
    questions: Array<{
      questionType?: "multiple_choice" | "written";
      questionText: string;
      optionA?: string;
      optionB?: string;
      optionC?: string;
      optionD?: string;
      correctOption?: "a" | "b" | "c" | "d";
      expectedAnswer?: string;
      explanation?: string;
    }>;
  }): Promise<{ error?: string }>;
  updateQuizStatus(
    id: string,
    status: "draft" | "published"
  ): Promise<{ error?: string }>;
  updateQuizTitle(id: string, title: string): Promise<{ error?: string }>;
  deleteQuiz(id: string): Promise<{ error?: string }>;
  addQuizQuestion(
    quizId: string,
    input: Omit<QuizQuestion, "id" | "quiz_id" | "created_at">
  ): Promise<{ error?: string }>;
  updateQuizQuestion(
    id: string,
    input: Partial<Omit<QuizQuestion, "id" | "quiz_id" | "created_at">>
  ): Promise<{ error?: string }>;
  deleteQuizQuestion(id: string): Promise<{ error?: string }>;

  // Banners — super-admin managed promotional slides shown at the top of
  // the learner Main Menu.
  getActiveBanners(): Promise<Banner[]>;
  getAllBanners(): Promise<Banner[]>;
  uploadBannerImage(
    file: File
  ): Promise<{ url?: string; error?: string }>;
  createBanner(input: {
    imageUrl: string;
    title: string | null;
    linkHref: string | null;
    status: "draft" | "published";
  }): Promise<{ error?: string }>;
  updateBanner(
    id: string,
    input: Partial<{
      imageUrl: string;
      title: string | null;
      linkHref: string | null;
      status: "draft" | "published";
    }>
  ): Promise<{ error?: string }>;
  deleteBanner(id: string): Promise<{ error?: string }>;
  reorderBanner(id: string, direction: "up" | "down"): Promise<{ error?: string }>;

  // Subscription management — super-admin editable pricing, discounts, and
  // localized copy for each (plan, learning-language) pair, plus the
  // subscription page's hero/footer text.
  getSubscriptionPlans(): Promise<SubscriptionPlanRow[]>;
  updateSubscriptionPlan(
    planSlug: string,
    languageSlug: string,
    input: Partial<{
      priceEur: number;
      discountPercent: number;
      title: LocalizedText;
      description: LocalizedText;
      features: LocalizedText[];
      /** Whether this tier is sold for this language at all. */
      isActive: boolean;
      quarterlyEnabled: boolean;
      quarterlyDiscountPercent: number;
    }>
  ): Promise<{ error?: string }>;

  /** What each tier unlocks. Global per tier, not per language. */
  getSubscriptionTiers(): Promise<SubscriptionTier[]>;
  updateSubscriptionTier(
    planSlug: string,
    input: Partial<{
      tierRank: number;
      unlocksVocabulary: boolean;
      unlocksGrammar: boolean;
      unlocksVideo: boolean;
      unlocksLevelExam: boolean;
      /** `null` means unlimited retakes. */
      quizRetakeLimit: number | null;
    }>
  ): Promise<{ error?: string }>;
  getSubscriptionPageContent(): Promise<SubscriptionPageContentRow>;
  updateSubscriptionPageContent(
    input: Partial<{
      heroTitle: LocalizedText;
      heroSubtitle: LocalizedText;
      footerNote: LocalizedText;
    }>
  ): Promise<{ error?: string }>;

  // -----------------------------------------------------------------------
  // Billing & accounting
  // -----------------------------------------------------------------------

  /** Non-secret billing configuration (FX source, margin, gateway toggles). */
  getPaymentSettings(): Promise<PaymentSettings>;
  updatePaymentSettings(
    input: Partial<{
      irrEnabled: boolean;
      fxSource: PaymentSettings["fx_source"];
      fxMarginPercent: number;
      irrRounding: number;
      fxManualRate: number | null;
      fxMaxDeviationPercent: number;
      stripeEnabled: boolean;
      zarinpalEnabled: boolean;
      manualEnabled: boolean;
      gracePeriodDays: number;
      /** Master switch for content gating. */
      enforceEntitlements: boolean;
      /** CEFR bands that are free for everyone, e.g. `["A1"]`. */
      freeCefrBands: string[];
      freeQuizRetakeLimit: number;
      pendingPaymentTimeoutMinutes: number;
    }>
  ): Promise<{ error?: string }>;

  /** Most recent accepted EUR->IRR rate, or null before the first fetch. */
  getLatestFxRate(): Promise<FxRate | null>;
  /** Recent rate history, newest first — including rejected samples. */
  getFxRateHistory(limit?: number): Promise<FxRate[]>;
  recordFxRate(input: {
    rate: number;
    source: string;
    accepted: boolean;
    rejectionReason?: string;
  }): Promise<{ error?: string }>;

  /** Every live or historical subscription belonging to one learner. */
  getSubscriptionsForUser(userId: string): Promise<Subscription[]>;
  /**
   * The subscription that currently entitles a learner to a language, or null.
   * Used on the learn/lesson routes to gate paid content.
   */
  getEntitlingSubscription(
    userId: string,
    languageSlug: string
  ): Promise<Subscription | null>;
  cancelSubscription(subscriptionId: string): Promise<{ error?: string }>;

  /**
   * Opens a checkout. Returns the id of a `pending` payment row whose amount
   * was computed server-side from the plan — the caller never supplies a
   * price.
   */
  createPendingPayment(input: {
    planSlug: string;
    languageSlug: string;
    provider: PaymentProviderSlug;
    currency: BillingCurrency;
    /** 1 or 3. Anything else is rejected server-side. */
    periodMonths?: BillingPeriodMonths;
  }): Promise<{ paymentId?: string; error?: string }>;
  getPaymentById(paymentId: string): Promise<Payment | null>;
  getPaymentsForUser(userId: string): Promise<Payment[]>;

  /**
   * The caller's own payments still sitting at `pending`.
   *
   * Lets the subscription page recover a payment whose browser callback never
   * landed, without waiting for the nightly reconciliation job.
   */
  getMyPendingPayments(): Promise<Payment[]>;

  /**
   * Records the gateway's handle on a checkout attempt (ZarinPal authority,
   * Stripe session id) so an abandoned payment can be verified later.
   *
   * Best-effort: a failure here must not break the handoff the customer is in
   * the middle of.
   */
  attachCheckoutReference(
    paymentId: string,
    reference: string
  ): Promise<{ error?: string }>;

  /** Audit timeline for one subscription. */
  getSubscriptionEvents(subscriptionId: string): Promise<SubscriptionEvent[]>;

  /** Everything the admin accounting dashboard needs, in one pass. */
  getAccountingSnapshot(): Promise<AccountingSnapshot>;

  /**
   * Records a payment received outside any gateway (bank transfer, card to
   * card) and activates the subscription. Admin-only.
   */
  recordManualPayment(input: {
    userId: string;
    planSlug: string;
    languageSlug: string;
    currency: BillingCurrency;
    reference?: string;
  }): Promise<{ error?: string }>;

  refundPayment(input: {
    paymentId: string;
    amountEurCents: number;
    reason?: string;
  }): Promise<{ error?: string }>;
}
