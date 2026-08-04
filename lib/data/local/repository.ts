import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  clearLocalSession,
  getLocalSessionUserId,
  setLocalSessionUserId,
} from "@/lib/auth/local-session";
import type { DataRepository } from "@/lib/data/repository";
import { buildAccountingSnapshot } from "@/lib/billing/accounting";
import {
  computePrice,
  convertEurCentsToRial,
  eurToCents,
} from "@/lib/billing/money";
import { computeRenewalPeriod, isEntitled } from "@/lib/billing/period";
import { createLocalId, getLocalStore, persistLocalStore } from "@/lib/data/local/store";
import { matchesImageSignature } from "@/lib/data/image-signature";
import { deriveQuizMetadataFromLesson } from "@/lib/quiz-management/helpers";

const BANNER_UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "banners");
const ALLOWED_IMAGE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export function createLocalRepository(): DataRepository {
  function commitStore() {
    persistLocalStore();
  }

  return {
    async getAuthUser() {
      const userId = await getLocalSessionUserId();
      if (!userId) return null;
      const store = getLocalStore();
      const user = store.users.find((entry) => entry.id === userId);
      if (!user) return null;

      const profile = store.profiles.find((entry) => entry.id === userId);
      if (profile?.status === "suspended") {
        await clearLocalSession();
        return null;
      }

      return { id: user.id, email: user.email };
    },

    async signInWithPassword(email, password) {
      const store = getLocalStore();
      const user = store.users.find(
        (entry) =>
          entry.email.toLowerCase() === email.toLowerCase() &&
          entry.password === password
      );

      if (!user) {
        return { error: "Invalid login credentials" };
      }

      const profile = store.profiles.find((entry) => entry.id === user.id);
      if (profile?.status === "suspended") {
        return {
          error:
            "Your account has been suspended. Contact an administrator.",
        };
      }

      await setLocalSessionUserId(user.id);
      return {};
    },

    async signOut() {
      await clearLocalSession();
    },

    async getProfileById(userId) {
      return getLocalStore().profiles.find((profile) => profile.id === userId) ?? null;
    },

    async getAllProfiles() {
      return [...getLocalStore().profiles].sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
      );
    },

    async updateUserAdminStatus(userId, isAdmin) {
      const authUser = await this.getAuthUser();
      if (!authUser) return { error: "You must be signed in." };

      const currentProfile = await this.getProfileById(authUser.id);
      if (!currentProfile?.is_admin) {
        return { error: "Only admins can manage user roles." };
      }

      if (userId === authUser.id && !isAdmin) {
        return { error: "You cannot remove your own admin access." };
      }

      const store = getLocalStore();
      const profile = store.profiles.find((entry) => entry.id === userId);
      if (!profile) return { error: "User not found." };
      profile.is_admin = isAdmin;
      profile.role = isAdmin
        ? profile.role === "learner"
          ? "admin"
          : profile.role
        : "learner";
      commitStore();
      return {};
    },

    async updateUserRole(userId, role) {
      const authUser = await this.getAuthUser();
      if (!authUser) return { error: "You must be signed in." };

      const currentProfile = await this.getProfileById(authUser.id);
      if (!currentProfile?.is_admin) {
        return { error: "Only admins can manage user roles." };
      }

      if (userId === authUser.id && role === "learner") {
        return { error: "You cannot remove your own admin access." };
      }

      const store = getLocalStore();
      const profile = store.profiles.find((entry) => entry.id === userId);
      if (!profile) return { error: "User not found." };
      profile.role = role;
      profile.is_admin = role !== "learner";
      commitStore();
      return {};
    },

    async updateUserStatus(userId, status) {
      const authUser = await this.getAuthUser();
      if (!authUser) return { error: "You must be signed in." };

      const currentProfile = await this.getProfileById(authUser.id);
      if (!currentProfile?.is_admin) {
        return { error: "Only admins can manage user status." };
      }

      if (userId === authUser.id && status === "suspended") {
        return { error: "You cannot suspend your own account." };
      }

      const store = getLocalStore();
      const profile = store.profiles.find((entry) => entry.id === userId);
      if (!profile) return { error: "User not found." };
      profile.status = status;
      commitStore();
      return {};
    },

    async sendPasswordResetEmail() {
      // Local dev mode has no email provider; treat as a successful no-op so
      // the UI can surface a "simulated" confirmation toast.
      return {};
    },

    async getLanguageAvailability() {
      return { ...getLocalStore().languageSettings };
    },

    async setLanguageAvailability(languageSlug, enabled) {
      const authUser = await this.getAuthUser();
      if (!authUser) return { error: "You must be signed in." };

      const currentProfile = await this.getProfileById(authUser.id);
      if (!currentProfile?.is_admin) {
        return { error: "Only admins can manage language availability." };
      }

      const store = getLocalStore();
      store.languageSettings[languageSlug] = enabled;
      commitStore();
      return {};
    },

    async getCurriculumLevelOverrides() {
      return [...getLocalStore().curriculumLevelOverrides];
    },

    async upsertCurriculumLevelOverride(row) {
      const store = getLocalStore();
      const index = store.curriculumLevelOverrides.findIndex(
        (entry) =>
          entry.languageSlug === row.languageSlug && entry.slug === row.slug
      );

      if (index >= 0) {
        store.curriculumLevelOverrides[index] = row;
      } else {
        store.curriculumLevelOverrides.push(row);
      }

      commitStore();
      return {};
    },

    async deleteCurriculumLevelOverride(languageSlug, slug) {
      const store = getLocalStore();
      store.curriculumLevelOverrides = store.curriculumLevelOverrides.filter(
        (entry) => !(entry.languageSlug === languageSlug && entry.slug === slug)
      );
      commitStore();
      return {};
    },

    async getLearningState(userId) {
      return (
        getLocalStore().learningStates.find(
          (entry) => entry.user_id === userId
        ) ?? null
      );
    },

    async upsertLearningState(
      userId,
      { languageSlug, levelSlug, lessonId = null, sectionSlug = null }
    ) {
      const store = getLocalStore();
      const existing = store.learningStates.find(
        (entry) => entry.user_id === userId
      );
      const updatedAt = new Date().toISOString();

      if (existing) {
        existing.language_slug = languageSlug;
        existing.level_slug = levelSlug;
        existing.lesson_id = lessonId;
        existing.section_slug = sectionSlug;
        existing.updated_at = updatedAt;
      } else {
        store.learningStates.push({
          user_id: userId,
          language_slug: languageSlug,
          level_slug: levelSlug,
          lesson_id: lessonId,
          section_slug: sectionSlug,
          updated_at: updatedAt,
        });
      }

      commitStore();
      return {};
    },

    async getLessons() {
      return [...getLocalStore().lessons].sort(
        (a, b) => a.order_number - b.order_number
      );
    },

    async getLessonById(id) {
      return getLocalStore().lessons.find((lesson) => lesson.id === id) ?? null;
    },

    async getLessonByOrderNumber(orderNumber) {
      return (
        getLocalStore().lessons.find(
          (lesson) => lesson.order_number === orderNumber
        ) ?? null
      );
    },

    async getVocabularyByLessonId(lessonId) {
      return getLocalStore()
        .vocabulary.filter((item) => item.lesson_id === lessonId)
        .sort((a, b) => a.created_at.localeCompare(b.created_at));
    },

    async getAllVocabulary() {
      return [...getLocalStore().vocabulary].sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
      );
    },

    async getGrammarRulesByLessonId(lessonId) {
      return getLocalStore()
        .grammarRules.filter((item) => item.lesson_id === lessonId)
        .sort((a, b) => a.created_at.localeCompare(b.created_at));
    },

    async getAllGrammarRules() {
      return [...getLocalStore().grammarRules].sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
      );
    },

    async getVideoLessonsByLessonId(lessonId) {
      return getLocalStore()
        .videoLessons.filter((item) => item.lesson_id === lessonId)
        .sort((a, b) => a.created_at.localeCompare(b.created_at));
    },

    async getAllVideoLessons() {
      return [...getLocalStore().videoLessons].sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
      );
    },

    async getQuizzes() {
      return [...getLocalStore().quizzes].sort((a, b) =>
        a.created_at.localeCompare(b.created_at)
      );
    },

    async getQuizById(id) {
      return getLocalStore().quizzes.find((quiz) => quiz.id === id) ?? null;
    },

    async getQuizQuestionsByQuizId(quizId) {
      return getLocalStore()
        .quizQuestions.filter((question) => question.quiz_id === quizId)
        .sort((a, b) => a.created_at.localeCompare(b.created_at));
    },

    async getAllQuizQuestions() {
      return [...getLocalStore().quizQuestions].sort((a, b) =>
        a.created_at.localeCompare(b.created_at)
      );
    },

    async getQuizQuestionAnswers(quizId) {
      return getLocalStore()
        .quizQuestions.filter((question) => question.quiz_id === quizId)
        .map((question) => ({
          id: question.id,
          correct_option: question.correct_option,
          question_type: question.question_type ?? "multiple_choice",
          expected_answer: question.expected_answer ?? null,
        }));
    },

    async getAttemptsByUserId(userId) {
      return getLocalStore()
        .userQuizAttempts.filter((attempt) => attempt.user_id === userId)
        .sort((a, b) => b.created_at.localeCompare(a.created_at));
    },

    async getAttemptByUserAndQuiz(userId, quizId) {
      return (
        getLocalStore().userQuizAttempts.find(
          (attempt) =>
            attempt.user_id === userId && attempt.quiz_id === quizId
        ) ?? null
      );
    },

    async getAllAttempts() {
      return [...getLocalStore().userQuizAttempts];
    },

    async createQuizAttempt({ userId, quizId, score, answersJson }) {
      const store = getLocalStore();
      const existing = store.userQuizAttempts.find(
        (attempt) => attempt.user_id === userId && attempt.quiz_id === quizId
      );

      if (existing) {
        return { error: "You have already attempted this quiz.", code: 409 };
      }

      store.userQuizAttempts.push({
        id: createLocalId("attempt"),
        user_id: userId,
        quiz_id: quizId,
        score,
        answers_json: answersJson,
        created_at: new Date().toISOString(),
      });

      commitStore();
      return {};
    },

    async createLesson({ title, description, orderNumber }) {
      const store = getLocalStore();
      store.lessons.push({
        id: createLocalId("lesson"),
        title,
        description,
        order_number: orderNumber,
        created_at: new Date().toISOString(),
      });
      commitStore();
      return {};
    },

    async updateLesson(id, { title, description, orderNumber }) {
      const lesson = getLocalStore().lessons.find((entry) => entry.id === id);
      if (!lesson) return { error: "Lesson not found." };
      lesson.title = title;
      lesson.description = description;
      lesson.order_number = orderNumber;
      commitStore();
      return {};
    },

    async deleteLesson(id) {
      const store = getLocalStore();
      store.lessons = store.lessons.filter((lesson) => lesson.id !== id);
      store.vocabulary = store.vocabulary.filter((item) => item.lesson_id !== id);
      store.grammarRules = store.grammarRules.filter(
        (item) => item.lesson_id !== id
      );
      const quizIds = store.quizzes
        .filter((quiz) => quiz.lesson_id === id)
        .map((quiz) => quiz.id);
      store.quizzes = store.quizzes.filter((quiz) => quiz.lesson_id !== id);
      store.quizQuestions = store.quizQuestions.filter(
        (question) => !quizIds.includes(question.quiz_id)
      );
      commitStore();
      return {};
    },

    async createVocabulary(input) {
      getLocalStore().vocabulary.push({
        ...input,
        pronunciation: input.pronunciation ?? null,
        status: input.status ?? "published",
        id: createLocalId("vocab"),
        created_at: new Date().toISOString(),
      });
      commitStore();
      return {};
    },

    async updateVocabulary(id, input) {
      const item = getLocalStore().vocabulary.find((entry) => entry.id === id);
      if (!item) return { error: "Vocabulary item not found." };
      Object.assign(item, input);
      commitStore();
      return {};
    },

    async deleteVocabulary(id) {
      const store = getLocalStore();
      store.vocabulary = store.vocabulary.filter((item) => item.id !== id);
      commitStore();
      return {};
    },

    async createGrammarRule(input) {
      getLocalStore().grammarRules.push({
        ...input,
        status: input.status ?? "published",
        id: createLocalId("grammar"),
        created_at: new Date().toISOString(),
      });
      commitStore();
      return {};
    },

    async updateGrammarRule(id, input) {
      const item = getLocalStore().grammarRules.find((entry) => entry.id === id);
      if (!item) return { error: "Grammar rule not found." };
      Object.assign(item, input);
      commitStore();
      return {};
    },

    async deleteGrammarRule(id) {
      const store = getLocalStore();
      store.grammarRules = store.grammarRules.filter((item) => item.id !== id);
      commitStore();
      return {};
    },

    async createVideoLesson(input) {
      getLocalStore().videoLessons.push({
        ...input,
        status: input.status ?? "draft",
        id: createLocalId("video"),
        created_at: new Date().toISOString(),
      });
      commitStore();
      return {};
    },

    async createQuizWithQuestions({
      lessonId,
      title,
      languageSlug,
      levelSlug,
      sectionSlug,
      status,
      questions,
    }) {
      const store = getLocalStore();
      const lesson = store.lessons.find((entry) => entry.id === lessonId);
      const derived = lesson
        ? deriveQuizMetadataFromLesson(lesson)
        : {
            language_slug: "italian" as const,
            level_slug: "a1-1" as const,
            section_slug: "quiz" as const,
          };

      const quizId = createLocalId("quiz");
      store.quizzes.push({
        id: quizId,
        lesson_id: lessonId,
        title,
        language_slug: languageSlug ?? derived.language_slug,
        level_slug: levelSlug ?? derived.level_slug,
        section_slug: sectionSlug ?? derived.section_slug,
        status: status ?? "published",
        created_at: new Date().toISOString(),
      });

      for (const question of questions) {
        const questionType = question.questionType ?? "multiple_choice";
        store.quizQuestions.push({
          id: createLocalId("question"),
          quiz_id: quizId,
          question_text: question.questionText,
          option_a: questionType === "written" ? "-" : (question.optionA ?? "-"),
          option_b: questionType === "written" ? "-" : (question.optionB ?? "-"),
          option_c: questionType === "written" ? "-" : (question.optionC ?? "-"),
          option_d: questionType === "written" ? "-" : (question.optionD ?? "-"),
          correct_option: questionType === "written" ? "a" : (question.correctOption ?? "a"),
          question_type: questionType,
          expected_answer: question.expectedAnswer ?? null,
          explanation: question.explanation ?? null,
          created_at: new Date().toISOString(),
        });
      }

      commitStore();
      return {};
    },

    async updateQuizStatus(id, status) {
      const quiz = getLocalStore().quizzes.find((entry) => entry.id === id);
      if (!quiz) return { error: "Quiz not found." };
      quiz.status = status;
      commitStore();
      return {};
    },

    async updateQuizTitle(id, title) {
      const quiz = getLocalStore().quizzes.find((entry) => entry.id === id);
      if (!quiz) return { error: "Quiz not found." };
      quiz.title = title;
      commitStore();
      return {};
    },

    async deleteQuiz(id) {
      const store = getLocalStore();
      store.quizzes = store.quizzes.filter((quiz) => quiz.id !== id);
      store.quizQuestions = store.quizQuestions.filter(
        (question) => question.quiz_id !== id
      );
      store.userQuizAttempts = store.userQuizAttempts.filter(
        (attempt) => attempt.quiz_id !== id
      );
      commitStore();
      return {};
    },

    async addQuizQuestion(quizId, input) {
      getLocalStore().quizQuestions.push({
        id: createLocalId("question"),
        quiz_id: quizId,
        question_text: input.question_text,
        option_a: input.option_a,
        option_b: input.option_b,
        option_c: input.option_c,
        option_d: input.option_d,
        correct_option: input.correct_option,
        question_type: input.question_type ?? "multiple_choice",
        expected_answer: input.expected_answer ?? null,
        explanation: input.explanation ?? null,
        created_at: new Date().toISOString(),
      });
      commitStore();
      return {};
    },

    async updateQuizQuestion(id, input) {
      const question = getLocalStore().quizQuestions.find(
        (entry) => entry.id === id
      );
      if (!question) return { error: "Question not found." };
      Object.assign(question, input);
      commitStore();
      return {};
    },

    async deleteQuizQuestion(id) {
      const store = getLocalStore();
      store.quizQuestions = store.quizQuestions.filter(
        (question) => question.id !== id
      );
      commitStore();
      return {};
    },

    async getActiveBanners() {
      return getLocalStore()
        .banners.filter((banner) => banner.status === "published")
        .sort((a, b) => a.order_number - b.order_number);
    },

    async getAllBanners() {
      return [...getLocalStore().banners].sort(
        (a, b) => a.order_number - b.order_number
      );
    },

    async uploadBannerImage(file) {
      const extension = ALLOWED_IMAGE_EXTENSIONS[file.type];
      if (!extension) {
        return { error: "Please upload a JPEG, PNG, WebP, or GIF image." };
      }
      if (file.size > 5 * 1024 * 1024) {
        return { error: "Image must be smaller than 5MB." };
      }

      const bytes = Buffer.from(await file.arrayBuffer());
      if (!matchesImageSignature(file.type, bytes)) {
        return { error: "This file's contents don't match a valid image." };
      }

      const filename = `${crypto.randomUUID()}.${extension}`;
      await mkdir(BANNER_UPLOAD_DIR, { recursive: true });
      await writeFile(path.join(BANNER_UPLOAD_DIR, filename), bytes);

      return { url: `/uploads/banners/${filename}` };
    },

    async createBanner({ imageUrl, title, linkHref, status }) {
      const store = getLocalStore();
      const maxOrder = store.banners.reduce(
        (max, banner) => Math.max(max, banner.order_number),
        0
      );
      store.banners.push({
        id: createLocalId("banner"),
        image_url: imageUrl,
        title,
        link_href: linkHref,
        order_number: maxOrder + 1,
        status,
        created_at: new Date().toISOString(),
      });
      commitStore();
      return {};
    },

    async updateBanner(id, input) {
      const banner = getLocalStore().banners.find((entry) => entry.id === id);
      if (!banner) return { error: "Banner not found." };
      if (input.imageUrl !== undefined) banner.image_url = input.imageUrl;
      if (input.title !== undefined) banner.title = input.title;
      if (input.linkHref !== undefined) banner.link_href = input.linkHref;
      if (input.status !== undefined) banner.status = input.status;
      commitStore();
      return {};
    },

    async deleteBanner(id) {
      const store = getLocalStore();
      const banner = store.banners.find((entry) => entry.id === id);
      store.banners = store.banners.filter((entry) => entry.id !== id);
      commitStore();

      if (banner?.image_url.startsWith("/uploads/banners/")) {
        const filename = banner.image_url.slice("/uploads/banners/".length);
        await unlink(path.join(BANNER_UPLOAD_DIR, filename)).catch(() => {});
      }

      return {};
    },

    async reorderBanner(id, direction) {
      const store = getLocalStore();
      const sorted = [...store.banners].sort(
        (a, b) => a.order_number - b.order_number
      );
      const index = sorted.findIndex((banner) => banner.id === id);
      if (index === -1) return { error: "Banner not found." };

      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= sorted.length) {
        return {};
      }

      const current = sorted[index];
      const target = sorted[swapIndex];
      const temp = current.order_number;
      current.order_number = target.order_number;
      target.order_number = temp;
      commitStore();
      return {};
    },

    async getSubscriptionPlans() {
      return [...getLocalStore().subscriptionPlans].sort(
        (a, b) => a.order_number - b.order_number
      );
    },

    async updateSubscriptionPlan(planSlug, languageSlug, input) {
      const store = getLocalStore();
      const plan = store.subscriptionPlans.find(
        (entry) => entry.plan_slug === planSlug && entry.language_slug === languageSlug
      );
      if (!plan) return { error: "Subscription plan not found." };

      if (input.priceEur !== undefined) plan.price_eur = input.priceEur;
      if (input.discountPercent !== undefined) plan.discount_percent = input.discountPercent;
      if (input.title !== undefined) plan.title = input.title;
      if (input.description !== undefined) plan.description = input.description;
      if (input.features !== undefined) plan.features = input.features;
      plan.updated_at = new Date().toISOString();

      commitStore();
      return {};
    },

    async getSubscriptionPageContent() {
      return getLocalStore().subscriptionPageContent;
    },

    async updateSubscriptionPageContent(input) {
      const store = getLocalStore();
      const content = store.subscriptionPageContent;

      if (input.heroTitle !== undefined) content.hero_title = input.heroTitle;
      if (input.heroSubtitle !== undefined) content.hero_subtitle = input.heroSubtitle;
      if (input.footerNote !== undefined) content.footer_note = input.footerNote;
      content.updated_at = new Date().toISOString();

      commitStore();
      return {};
    },

    // ---------------------------------------------------------------------
    // Billing & accounting
    //
    // Mirrors the SQL in supabase/migrations/20260804120000_billing_accounting.sql
    // closely enough that the admin dashboard and checkout flow behave the
    // same in local mode. Both sides share lib/billing/{money,period}.ts, so
    // the pricing and period maths cannot drift between them.
    // ---------------------------------------------------------------------

    async getPaymentSettings() {
      return getLocalStore().paymentSettings;
    },

    async updatePaymentSettings(input) {
      const settings = getLocalStore().paymentSettings;
      if (input.irrEnabled !== undefined) settings.irr_enabled = input.irrEnabled;
      if (input.fxSource !== undefined) settings.fx_source = input.fxSource;
      if (input.fxMarginPercent !== undefined)
        settings.fx_margin_percent = input.fxMarginPercent;
      if (input.irrRounding !== undefined) settings.irr_rounding = input.irrRounding;
      if (input.fxManualRate !== undefined) settings.fx_manual_rate = input.fxManualRate;
      if (input.fxMaxDeviationPercent !== undefined)
        settings.fx_max_deviation_percent = input.fxMaxDeviationPercent;
      if (input.stripeEnabled !== undefined) settings.stripe_enabled = input.stripeEnabled;
      if (input.zarinpalEnabled !== undefined)
        settings.zarinpal_enabled = input.zarinpalEnabled;
      if (input.manualEnabled !== undefined) settings.manual_enabled = input.manualEnabled;
      if (input.gracePeriodDays !== undefined)
        settings.grace_period_days = input.gracePeriodDays;
      settings.updated_at = new Date().toISOString();

      commitStore();
      return {};
    },

    async getLatestFxRate() {
      const accepted = getLocalStore()
        .fxRates.filter((rate) => rate.accepted)
        .sort(
          (a, b) =>
            new Date(b.fetched_at).getTime() - new Date(a.fetched_at).getTime()
        );
      return accepted[0] ?? null;
    },

    async getFxRateHistory(limit = 50) {
      return getLocalStore()
        .fxRates.slice()
        .sort(
          (a, b) =>
            new Date(b.fetched_at).getTime() - new Date(a.fetched_at).getTime()
        )
        .slice(0, limit);
    },

    async recordFxRate(input) {
      const store = getLocalStore();
      store.fxRates.push({
        id: createLocalId("fx"),
        base_currency: "EUR",
        quote_currency: "IRR",
        rate: input.rate,
        source: input.source,
        accepted: input.accepted,
        rejection_reason: input.rejectionReason ?? null,
        fetched_at: new Date().toISOString(),
      });
      commitStore();
      return {};
    },

    async getSubscriptionsForUser(userId) {
      return getLocalStore()
        .subscriptions.filter((entry) => entry.user_id === userId)
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    },

    async getEntitlingSubscription(userId, languageSlug) {
      return (
        getLocalStore().subscriptions.find(
          (entry) =>
            entry.user_id === userId &&
            entry.language_slug === languageSlug &&
            isEntitled(entry.status)
        ) ?? null
      );
    },

    async cancelSubscription(subscriptionId) {
      const store = getLocalStore();
      const userId = await getLocalSessionUserId();
      const subscription = store.subscriptions.find(
        (entry) => entry.id === subscriptionId
      );
      if (!subscription) return { error: "Subscription not found." };
      // Same ownership check the security-definer function enforces in SQL.
      if (!userId || subscription.user_id !== userId) {
        return { error: "Subscription not found." };
      }

      const now = new Date().toISOString();
      subscription.cancel_at_period_end = true;
      subscription.canceled_at = now;
      subscription.updated_at = now;
      store.subscriptionEvents.push({
        id: createLocalId("evt"),
        subscription_id: subscriptionId,
        user_id: subscription.user_id,
        type: "canceled",
        payload: { effective_at: subscription.current_period_end },
        created_at: now,
      });

      commitStore();
      return {};
    },

    async createPendingPayment(input) {
      const store = getLocalStore();
      const userId = await getLocalSessionUserId();
      if (!userId) return { error: "Not authenticated." };

      const plan = store.subscriptionPlans.find(
        (entry) =>
          entry.plan_slug === input.planSlug &&
          entry.language_slug === input.languageSlug
      );
      if (!plan) return { error: "Subscription plan not found." };

      const settings = store.paymentSettings;
      const price = computePrice(
        eurToCents(plan.price_eur),
        plan.discount_percent
      );

      let paidAmount = price.netCents;
      let fxRate: number | null = null;
      let fxSource: string | null = null;

      if (input.currency === "IRR") {
        if (!settings.irr_enabled) return { error: "IRR payments are disabled." };

        const latest =
          settings.fx_source === "manual"
            ? settings.fx_manual_rate
            : store.fxRates
                .filter((rate) => rate.accepted)
                .sort(
                  (a, b) =>
                    new Date(b.fetched_at).getTime() -
                    new Date(a.fetched_at).getTime()
                )[0]?.rate;

        if (!latest || latest <= 0) return { error: "No usable EUR/IRR rate." };

        fxRate = latest;
        fxSource = settings.fx_source === "manual" ? "manual" : "tgju";
        paidAmount = convertEurCentsToRial({
          eurCents: price.netCents,
          rialPerEur: latest,
          marginPercent: settings.fx_margin_percent,
          roundToRial: settings.irr_rounding,
        });
      }

      const paymentId = createLocalId("pay");
      const now = new Date().toISOString();
      store.payments.push({
        id: paymentId,
        user_id: userId,
        subscription_id: null,
        plan_slug: input.planSlug,
        language_slug: input.languageSlug,
        period_months: 1,
        plan_title: plan.title.en,
        list_price_eur_cents: price.listCents,
        discount_percent: price.discountPercent,
        discount_eur_cents: price.discountCents,
        amount_eur_cents: price.netCents,
        paid_currency: input.currency,
        paid_amount: paidAmount,
        fx_rate: fxRate,
        fx_source: fxSource,
        provider: input.provider,
        provider_payment_id: null,
        provider_ref: null,
        status: "pending",
        failure_reason: null,
        paid_at: null,
        created_at: now,
        updated_at: now,
        metadata: {},
      });

      commitStore();
      return { paymentId };
    },

    async getPaymentById(paymentId) {
      return (
        getLocalStore().payments.find((entry) => entry.id === paymentId) ?? null
      );
    },

    async getPaymentsForUser(userId) {
      return getLocalStore()
        .payments.filter((entry) => entry.user_id === userId)
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    },

    async getSubscriptionEvents(subscriptionId) {
      return getLocalStore()
        .subscriptionEvents.filter(
          (entry) => entry.subscription_id === subscriptionId
        )
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    },

    async getAccountingSnapshot() {
      const store = getLocalStore();
      const profileById = new Map(
        store.profiles.map((profile) => [profile.id, profile])
      );
      const withUser = <T extends { user_id: string }>(row: T) => {
        const profile = profileById.get(row.user_id);
        return {
          ...row,
          user_email: profile?.email ?? null,
          user_name: profile?.full_name ?? null,
        };
      };

      return buildAccountingSnapshot({
        payments: store.payments.map(withUser),
        refunds: store.refunds,
        subscriptions: store.subscriptions.map(withUser),
        settings: store.paymentSettings,
        fxRate: await this.getLatestFxRate(),
        now: new Date(),
      });
    },

    async recordManualPayment(input) {
      const store = getLocalStore();
      const plan = store.subscriptionPlans.find(
        (entry) =>
          entry.plan_slug === input.planSlug &&
          entry.language_slug === input.languageSlug
      );
      if (!plan) return { error: "Subscription plan not found." };

      const price = computePrice(
        eurToCents(plan.price_eur),
        plan.discount_percent
      );
      const now = new Date();
      const nowIso = now.toISOString();
      const paymentId = createLocalId("pay");

      store.payments.push({
        id: paymentId,
        user_id: input.userId,
        subscription_id: null,
        plan_slug: input.planSlug,
        language_slug: input.languageSlug,
        period_months: 1,
        plan_title: plan.title.en,
        list_price_eur_cents: price.listCents,
        discount_percent: price.discountPercent,
        discount_eur_cents: price.discountCents,
        amount_eur_cents: price.netCents,
        paid_currency: "EUR",
        paid_amount: price.netCents,
        fx_rate: null,
        fx_source: null,
        provider: "manual",
        provider_payment_id: `manual-${paymentId}`,
        provider_ref: input.reference ?? null,
        status: "pending",
        failure_reason: null,
        paid_at: null,
        created_at: nowIso,
        updated_at: nowIso,
        metadata: {},
      });

      commitStore();
      return settleLocalPayment(paymentId);
    },

    async refundPayment(input) {
      const store = getLocalStore();
      const payment = store.payments.find((entry) => entry.id === input.paymentId);
      if (!payment) return { error: "Payment not found." };

      store.refunds.push({
        id: createLocalId("refund"),
        payment_id: input.paymentId,
        amount_eur_cents: input.amountEurCents,
        reason: input.reason ?? null,
        created_by: (await getLocalSessionUserId()) ?? null,
        created_at: new Date().toISOString(),
      });
      payment.status = "refunded";
      payment.updated_at = new Date().toISOString();

      commitStore();
      return {};
    },
  };
}

/**
 * Local-mode equivalent of the `settle_payment` SQL function: marks a pending
 * payment paid and creates or extends the matching subscription.
 *
 * Idempotent for the same reason the SQL is — a re-delivered gateway callback
 * must not buy the customer a second month.
 */
export function settleLocalPayment(paymentId: string): { error?: string } {
  const store = getLocalStore();
  const payment = store.payments.find((entry) => entry.id === paymentId);
  if (!payment) return { error: "Payment not found." };
  if (payment.status === "succeeded") return {};
  if (payment.status !== "pending") {
    return { error: `Payment is ${payment.status} and cannot be settled.` };
  }

  const now = new Date();
  const nowIso = now.toISOString();

  const existing = store.subscriptions.find(
    (entry) =>
      entry.user_id === payment.user_id &&
      entry.language_slug === payment.language_slug &&
      isEntitled(entry.status)
  );

  const anchorDay = existing?.anchor_day ?? now.getUTCDate();
  const period = computeRenewalPeriod({
    currentPeriodEnd: existing ? new Date(existing.current_period_end) : null,
    months: payment.period_months,
    anchorDay,
    now,
  });

  let subscription = existing;
  if (subscription) {
    subscription.status = "active";
    subscription.plan_slug = payment.plan_slug;
    subscription.current_period_start = period.start.toISOString();
    subscription.current_period_end = period.end.toISOString();
    subscription.cancel_at_period_end = false;
    subscription.updated_at = nowIso;
  } else {
    subscription = {
      id: createLocalId("sub"),
      user_id: payment.user_id,
      plan_slug: payment.plan_slug,
      language_slug: payment.language_slug,
      status: "active",
      current_period_start: period.start.toISOString(),
      current_period_end: period.end.toISOString(),
      anchor_day: anchorDay,
      period_months: payment.period_months,
      cancel_at_period_end: false,
      started_at: nowIso,
      canceled_at: null,
      ended_at: null,
      created_at: nowIso,
      updated_at: nowIso,
    };
    store.subscriptions.push(subscription);
  }

  payment.status = "succeeded";
  payment.subscription_id = subscription.id;
  payment.paid_at = nowIso;
  payment.updated_at = nowIso;

  store.subscriptionEvents.push({
    id: createLocalId("evt"),
    subscription_id: subscription.id,
    user_id: payment.user_id,
    type: existing ? "renewed" : "created",
    payload: {
      payment_id: paymentId,
      plan_slug: payment.plan_slug,
      language_slug: payment.language_slug,
      amount_eur_cents: payment.amount_eur_cents,
      paid_currency: payment.paid_currency,
      paid_amount: payment.paid_amount,
      period_end: period.end.toISOString(),
    },
    created_at: nowIso,
  });

  persistLocalStore();
  return {};
}

/** Local-mode equivalent of the `fail_payment` SQL function. */
export function failLocalPayment(
  paymentId: string,
  reason?: string
): { error?: string } {
  const store = getLocalStore();
  const payment = store.payments.find((entry) => entry.id === paymentId);
  if (!payment) return { error: "Payment not found." };
  // Never walk back a settled payment.
  if (payment.status !== "pending") return {};

  payment.status = "failed";
  payment.failure_reason = reason ?? null;
  payment.updated_at = new Date().toISOString();
  store.subscriptionEvents.push({
    id: createLocalId("evt"),
    subscription_id: null,
    user_id: payment.user_id,
    type: "payment_failed",
    payload: { payment_id: paymentId, reason: reason ?? null },
    created_at: new Date().toISOString(),
  });

  persistLocalStore();
  return {};
}
