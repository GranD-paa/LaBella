import { createClient } from "@/lib/supabase/server";
import type { DataRepository } from "@/lib/data/repository";
import { buildAccountingSnapshot } from "@/lib/billing/accounting";
import {
  DEFAULT_PAYMENT_SETTINGS,
  DEFAULT_SUBSCRIPTION_TIERS,
} from "@/lib/billing/defaults";
import { validateBannerImage } from "@/lib/data/banner-image";
import { deriveQuizMetadataFromLesson } from "@/lib/quiz-management/helpers";
import {
  DEFAULT_SUBSCRIPTION_PAGE_CONTENT,
  DEFAULT_SUBSCRIPTION_PLANS,
} from "@/lib/subscription/default-content";
import type { Database } from "@/types/database.types";
import type {
  LocalizedText,
  Payment,
  SubscriptionPageContentRow,
  SubscriptionPlanRow,
} from "@/types";

export function createSupabaseRepository(): DataRepository {
  return {
    async getAuthUser() {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user?.email ? { id: user.id, email: user.email } : null;
    },

    async signInWithPassword(email, password) {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { error: error.message };

      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("status")
          .eq("id", data.user.id)
          .single();

        if (profile?.status === "suspended") {
          await supabase.auth.signOut();
          return {
            error:
              "Your account has been suspended. Contact an administrator.",
          };
        }
      }

      return {};
    },

    async signOut() {
      const supabase = await createClient();
      await supabase.auth.signOut();
    },

    async getProfileById(userId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, email, is_admin, role, status, created_at")
        .eq("id", userId)
        .single();
      return data;
    },

    async getAllProfiles() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, email, is_admin, role, status, created_at")
        .order("created_at", { ascending: false });
      return data ?? [];
    },

    async updateUserAdminStatus(userId, isAdmin) {
      const supabase = await createClient();
      const authUser = await this.getAuthUser();
      if (!authUser) return { error: "You must be signed in." };

      const currentProfile = await this.getProfileById(authUser.id);
      if (!currentProfile?.is_admin) {
        return { error: "Only admins can manage user roles." };
      }

      if (userId === authUser.id && !isAdmin) {
        return { error: "You cannot remove your own admin access." };
      }

      const { data: targetProfile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      const nextRole = isAdmin
        ? targetProfile?.role === "learner" || !targetProfile?.role
          ? "admin"
          : targetProfile.role
        : "learner";

      const { error } = await supabase
        .from("profiles")
        .update({ is_admin: isAdmin, role: nextRole })
        .eq("id", userId);

      return error ? { error: error.message } : {};
    },

    async updateUserRole(userId, role) {
      const supabase = await createClient();
      const authUser = await this.getAuthUser();
      if (!authUser) return { error: "You must be signed in." };

      const currentProfile = await this.getProfileById(authUser.id);
      if (!currentProfile?.is_admin) {
        return { error: "Only admins can manage user roles." };
      }

      if (userId === authUser.id && role === "learner") {
        return { error: "You cannot remove your own admin access." };
      }

      const { error } = await supabase
        .from("profiles")
        .update({ role, is_admin: role !== "learner" })
        .eq("id", userId);

      return error ? { error: error.message } : {};
    },

    async updateUserStatus(userId, status) {
      const supabase = await createClient();
      const authUser = await this.getAuthUser();
      if (!authUser) return { error: "You must be signed in." };

      const currentProfile = await this.getProfileById(authUser.id);
      if (!currentProfile?.is_admin) {
        return { error: "Only admins can manage user status." };
      }

      if (userId === authUser.id && status === "suspended") {
        return { error: "You cannot suspend your own account." };
      }

      const { error } = await supabase
        .from("profiles")
        .update({ status })
        .eq("id", userId);

      return error ? { error: error.message } : {};
    },

    async sendPasswordResetEmail(email) {
      const supabase = await createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return error ? { error: error.message } : {};
    },

    async getLanguageAvailability() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("language_settings")
        .select("language_slug, enabled");

      const overrides: Record<string, boolean> = {};
      for (const row of data ?? []) {
        overrides[row.language_slug] = row.enabled;
      }
      return overrides;
    },

    // The landing page shipped after the move to self-hosted Postgres, so the
    // Supabase tables never got `landing_language_settings`. Returning an
    // empty map leaves the landing page on its static defaults rather than
    // erroring, which is the right behaviour for this legacy path.
    async getLandingLanguageVisibility() {
      return {};
    },

    async setLandingLanguageVisibility() {
      return { error: "Landing page settings require the Postgres data source." };
    },

    // The blog shipped after the move to self-hosted Postgres and its tables
    // were never created in Supabase. Reads come back empty and writes refuse,
    // rather than throwing against tables that do not exist.
    async getBlogCategories() {
      return [];
    },

    async getPublishedBlogPosts() {
      return { posts: [], total: 0 };
    },

    async getPublishedBlogPostBySlug() {
      return null;
    },

    async getBlogPostsForAdmin() {
      return [];
    },

    async getBlogPostById() {
      return null;
    },

    async upsertBlogPost() {
      return { error: "The blog requires the Postgres data source." };
    },

    async deleteBlogPost() {
      return { error: "The blog requires the Postgres data source." };
    },

    async setLanguageAvailability(languageSlug, enabled) {
      const supabase = await createClient();
      const { error } = await supabase
        .from("language_settings")
        .upsert(
          {
            language_slug: languageSlug,
            enabled,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "language_slug" }
        );
      return error ? { error: error.message } : {};
    },

    async getCurriculumLevelOverrides() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("curriculum_level_overrides")
        .select("language_slug, slug, code, title, description, order_number, is_custom")
        .order("order_number", { ascending: true });

      return (data ?? []).map((row) => ({
        languageSlug: row.language_slug,
        slug: row.slug,
        code: row.code,
        title: row.title,
        description: row.description,
        orderNumber: row.order_number,
        isCustom: row.is_custom,
      }));
    },

    async upsertCurriculumLevelOverride(row) {
      const supabase = await createClient();
      const { error } = await supabase.from("curriculum_level_overrides").upsert(
        {
          language_slug: row.languageSlug,
          slug: row.slug,
          code: row.code,
          title: row.title,
          description: row.description,
          order_number: row.orderNumber,
          is_custom: row.isCustom,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "language_slug,slug" }
      );
      return error ? { error: error.message } : {};
    },

    async deleteCurriculumLevelOverride(languageSlug, slug) {
      const supabase = await createClient();
      const { error } = await supabase
        .from("curriculum_level_overrides")
        .delete()
        .eq("language_slug", languageSlug)
        .eq("slug", slug);
      return error ? { error: error.message } : {};
    },

    async getLearningState(userId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("user_learning_state")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      return data ?? null;
    },

    async upsertLearningState(
      userId,
      { languageSlug, levelSlug, lessonId = null, sectionSlug = null }
    ) {
      const supabase = await createClient();
      const { error } = await supabase.from("user_learning_state").upsert(
        {
          user_id: userId,
          language_slug: languageSlug,
          level_slug: levelSlug,
          lesson_id: lessonId,
          section_slug: sectionSlug,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" }
      );
      return error ? { error: error.message } : {};
    },

    async getLessons() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("lessons")
        .select("*")
        .order("order_number", { ascending: true });
      return data ?? [];
    },

    async getLessonById(id) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", id)
        .single();
      return data;
    },

    async getLessonByOrderNumber(orderNumber) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("lessons")
        .select("*")
        .eq("order_number", orderNumber)
        .order("created_at")
        .limit(1)
        .maybeSingle();
      return data;
    },

    async getVocabularyByLessonId(lessonId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("vocabulary")
        .select("*")
        .eq("lesson_id", lessonId)
        .order("created_at");
      return data ?? [];
    },

    async getAllVocabulary() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("vocabulary")
        .select("*")
        .order("created_at", { ascending: false });
      return data ?? [];
    },

    async getGrammarRulesByLessonId(lessonId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("grammar_rules")
        .select("*")
        .eq("lesson_id", lessonId)
        .order("created_at");
      return data ?? [];
    },

    async getAllGrammarRules() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("grammar_rules")
        .select("*")
        .order("created_at", { ascending: false });
      return data ?? [];
    },

    async getVideoLessonsByLessonId(lessonId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("video_lessons")
        .select("*")
        .eq("lesson_id", lessonId)
        .order("created_at");
      return data ?? [];
    },

    async getAllVideoLessons() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("video_lessons")
        .select("*")
        .order("created_at", { ascending: false });
      return data ?? [];
    },

    async getQuizzes() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("quizzes")
        .select("*")
        .order("created_at");
      return data ?? [];
    },

    async getQuizById(id) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("quizzes")
        .select("*")
        .eq("id", id)
        .single();
      return data;
    },

    async getQuizQuestionsByQuizId(quizId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("quiz_id", quizId)
        .order("created_at");
      return data ?? [];
    },

    async getAllQuizQuestions() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("quiz_questions")
        .select("*")
        .order("created_at");
      return data ?? [];
    },

    async getQuizQuestionAnswers(quizId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("quiz_questions")
        .select("id, correct_option, question_type, expected_answer")
        .eq("quiz_id", quizId);
      return (data ?? []).map((row) => ({
        id: row.id,
        correct_option: row.correct_option,
        question_type: (row.question_type ?? "multiple_choice") as
          | "multiple_choice"
          | "written",
        expected_answer: row.expected_answer ?? null,
      }));
    },

    async getAttemptsByUserId(userId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("user_quiz_attempts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      return data ?? [];
    },

    async getAttemptByUserAndQuiz(userId, quizId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("user_quiz_attempts")
        .select("*")
        .eq("user_id", userId)
        .eq("quiz_id", quizId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data;
    },

    async getAllAttempts() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("user_quiz_attempts")
        .select("*");
      return data ?? [];
    },

    async createQuizAttempt({ quizId, score, answersJson }) {
      const supabase = await createClient();

      // Routed through the RPC rather than a direct insert because the retake
      // allowance is a paid entitlement: counting attempts client-side and
      // trusting the count would hand out retakes for free. The function reads
      // the caller from auth.uid(), so userId is not passed.
      const { data, error } = await supabase.rpc("record_quiz_attempt", {
        p_quiz_id: quizId,
        p_score: score,
        p_answers: answersJson,
      });

      if (error) return { error: error.message };

      const result = data as {
        ok: boolean;
        reason?: string;
        attempt_number?: number;
        retake_limit?: number | null;
      } | null;

      if (!result?.ok) {
        return {
          error: "You have no retakes left for this quiz.",
          code: 403,
          retakeLimit: result?.retake_limit ?? 0,
        };
      }

      return {
        attemptNumber: result.attempt_number,
        retakeLimit: result.retake_limit ?? null,
      };
    },

    async createLesson({ title, description, orderNumber }) {
      const supabase = await createClient();
      const { error } = await supabase.from("lessons").insert({
        title,
        description,
        order_number: orderNumber,
      });
      return error ? { error: error.message } : {};
    },

    async updateLesson(id, { title, description, orderNumber }) {
      const supabase = await createClient();
      const { error } = await supabase
        .from("lessons")
        .update({
          title,
          description,
          order_number: orderNumber,
        })
        .eq("id", id);
      return error ? { error: error.message } : {};
    },

    async deleteLesson(id) {
      const supabase = await createClient();
      const { error } = await supabase.from("lessons").delete().eq("id", id);
      return error ? { error: error.message } : {};
    },

    async createVocabulary(input) {
      const supabase = await createClient();
      const { error } = await supabase.from("vocabulary").insert(input);
      return error ? { error: error.message } : {};
    },

    async updateVocabulary(id, input) {
      const supabase = await createClient();
      const { error } = await supabase
        .from("vocabulary")
        .update(input)
        .eq("id", id);
      return error ? { error: error.message } : {};
    },

    async deleteVocabulary(id) {
      const supabase = await createClient();
      const { error } = await supabase.from("vocabulary").delete().eq("id", id);
      return error ? { error: error.message } : {};
    },

    async createGrammarRule(input) {
      const supabase = await createClient();
      const { error } = await supabase.from("grammar_rules").insert(input);
      return error ? { error: error.message } : {};
    },

    async updateGrammarRule(id, input) {
      const supabase = await createClient();
      const { error } = await supabase
        .from("grammar_rules")
        .update(input)
        .eq("id", id);
      return error ? { error: error.message } : {};
    },

    async deleteGrammarRule(id) {
      const supabase = await createClient();
      const { error } = await supabase
        .from("grammar_rules")
        .delete()
        .eq("id", id);
      return error ? { error: error.message } : {};
    },

    // Grammar documents shipped after the move to self-hosted Postgres and
    // their tables were never created in Supabase. Reads come back empty and
    // writes refuse, rather than throwing against tables that do not exist.
    async getGrammarPages() {
      return [];
    },

    async getGrammarPageSummaries() {
      return [];
    },

    async getGrammarDocuments() {
      return [];
    },

    async appendGrammarPages() {
      return { error: "Grammar documents require the Postgres data source." };
    },

    async removeGrammarDocument() {
      return {
        objectKeys: [],
        error: "Grammar documents require the Postgres data source.",
      };
    },

    async getGrammarPageKeys() {
      return [];
    },

    async saveGrammarReadingProgress() {
      return { error: "Grammar documents require the Postgres data source." };
    },

    async createVideoLesson(input) {
      const supabase = await createClient();
      const { error } = await supabase.from("video_lessons").insert(input);
      return error ? { error: error.message } : {};
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
      const supabase = await createClient();
      const { data: lesson } = await supabase
        .from("lessons")
        .select("*")
        .eq("id", lessonId)
        .maybeSingle();

      const derived = lesson
        ? deriveQuizMetadataFromLesson(lesson)
        : {
            language_slug: "italian" as const,
            level_slug: "a1-1" as const,
            section_slug: "quiz" as const,
          };

      const { data: quiz, error: quizError } = await supabase
        .from("quizzes")
        .insert({
          lesson_id: lessonId,
          title,
          language_slug: languageSlug ?? derived.language_slug,
          level_slug: levelSlug ?? derived.level_slug,
          section_slug: sectionSlug ?? derived.section_slug,
          status: status ?? "published",
        })
        .select("id")
        .single();

      if (quizError || !quiz) {
        return { error: quizError?.message ?? "Failed to create quiz." };
      }

      const rows = questions.map((question) => {
        const questionType = question.questionType ?? "multiple_choice";
        return {
          quiz_id: quiz.id,
          question_text: question.questionText,
          option_a: questionType === "written" ? "-" : (question.optionA ?? "-"),
          option_b: questionType === "written" ? "-" : (question.optionB ?? "-"),
          option_c: questionType === "written" ? "-" : (question.optionC ?? "-"),
          option_d: questionType === "written" ? "-" : (question.optionD ?? "-"),
          correct_option:
            questionType === "written" ? "a" : (question.correctOption ?? "a"),
          question_type: questionType,
          expected_answer: question.expectedAnswer ?? null,
          explanation: question.explanation ?? null,
        };
      });

      const { error } = await supabase.from("quiz_questions").insert(rows);
      return error ? { error: error.message } : {};
    },

    async updateQuizStatus(id, status) {
      const supabase = await createClient();
      const { error } = await supabase
        .from("quizzes")
        .update({ status })
        .eq("id", id);
      return error ? { error: error.message } : {};
    },

    async updateQuizTitle(id, title) {
      const supabase = await createClient();
      const { error } = await supabase
        .from("quizzes")
        .update({ title })
        .eq("id", id);
      return error ? { error: error.message } : {};
    },

    async deleteQuiz(id) {
      const supabase = await createClient();
      const { error } = await supabase.from("quizzes").delete().eq("id", id);
      return error ? { error: error.message } : {};
    },

    async addQuizQuestion(quizId, input) {
      const supabase = await createClient();
      const { error } = await supabase.from("quiz_questions").insert({
        quiz_id: quizId,
        ...input,
      });
      return error ? { error: error.message } : {};
    },

    async updateQuizQuestion(id, input) {
      const supabase = await createClient();
      const { error } = await supabase
        .from("quiz_questions")
        .update(input)
        .eq("id", id);
      return error ? { error: error.message } : {};
    },

    async deleteQuizQuestion(id) {
      const supabase = await createClient();
      const { error } = await supabase
        .from("quiz_questions")
        .delete()
        .eq("id", id);
      return error ? { error: error.message } : {};
    },

    async getActiveBanners() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("banners")
        .select("*")
        .eq("status", "published")
        .order("order_number");
      return data ?? [];
    },

    async getAllBanners() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("banners")
        .select("*")
        .order("order_number");
      return data ?? [];
    },

    async uploadBannerImage(file) {
      const validated = await validateBannerImage(file);
      if (!validated.ok) return { error: validated.error };

      const supabase = await createClient();
      const objectPath = `${crypto.randomUUID()}.${validated.extension}`;
      const { error } = await supabase.storage
        .from("banners")
        .upload(objectPath, validated.bytes, {
          contentType: file.type,
          upsert: false,
        });
      if (error) return { error: error.message };

      const { data } = supabase.storage.from("banners").getPublicUrl(objectPath);
      return { url: data.publicUrl };
    },

    async createBanner({ imageUrl, title, linkHref, status }) {
      const supabase = await createClient();
      const { data: existing } = await supabase
        .from("banners")
        .select("order_number")
        .order("order_number", { ascending: false })
        .limit(1)
        .maybeSingle();

      const { error } = await supabase.from("banners").insert({
        image_url: imageUrl,
        title,
        link_href: linkHref,
        status,
        order_number: (existing?.order_number ?? 0) + 1,
      });
      return error ? { error: error.message } : {};
    },

    async updateBanner(id, input) {
      const supabase = await createClient();
      const update: Database["public"]["Tables"]["banners"]["Update"] = {};
      if (input.imageUrl !== undefined) update.image_url = input.imageUrl;
      if (input.title !== undefined) update.title = input.title;
      if (input.linkHref !== undefined) update.link_href = input.linkHref;
      if (input.status !== undefined) update.status = input.status;

      const { error } = await supabase
        .from("banners")
        .update(update)
        .eq("id", id);
      return error ? { error: error.message } : {};
    },

    async deleteBanner(id) {
      const supabase = await createClient();
      const { data: banner } = await supabase
        .from("banners")
        .select("image_url")
        .eq("id", id)
        .maybeSingle();

      const { error } = await supabase.from("banners").delete().eq("id", id);
      if (error) return { error: error.message };

      const marker = "/object/public/banners/";
      const markerIndex = banner?.image_url.indexOf(marker) ?? -1;
      if (banner && markerIndex !== -1) {
        const objectPath = banner.image_url.slice(markerIndex + marker.length);
        const { error: removeError } = await supabase.storage
          .from("banners")
          .remove([objectPath]);
        if (removeError) {
          console.error("Failed to remove banner storage object:", objectPath, removeError);
        }
      }

      return {};
    },

    async reorderBanner(id, direction) {
      const supabase = await createClient();
      const { data: banners } = await supabase
        .from("banners")
        .select("id, order_number")
        .order("order_number");
      if (!banners) return { error: "Banner not found." };

      const index = banners.findIndex((banner) => banner.id === id);
      if (index === -1) return { error: "Banner not found." };

      const swapIndex = direction === "up" ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= banners.length) {
        return {};
      }

      const current = banners[index];
      const target = banners[swapIndex];

      // A single RPC call swaps both order_number values in one Postgres
      // transaction, so a mid-swap failure can't leave the two banners with
      // inconsistent ordering the way two separate client-side updates could.
      const { error } = await supabase.rpc("swap_banner_order", {
        banner_id_a: current.id,
        banner_id_b: target.id,
      });

      return error ? { error: error.message } : {};
    },

    async getSubscriptionPlans() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("subscription_plans")
        .select("*")
        .order("order_number");

      if (!data || data.length === 0) return DEFAULT_SUBSCRIPTION_PLANS;

      return data.map((row) => ({
        ...row,
        title: row.title as unknown as LocalizedText,
        description: row.description as unknown as LocalizedText,
        features: row.features as unknown as LocalizedText[],
      })) satisfies SubscriptionPlanRow[];
    },

    async updateSubscriptionPlan(planSlug, languageSlug, input) {
      const supabase = await createClient();
      const update: Database["public"]["Tables"]["subscription_plans"]["Update"] = {};
      if (input.priceEur !== undefined) update.price_eur = input.priceEur;
      if (input.discountPercent !== undefined) update.discount_percent = input.discountPercent;
      if (input.title !== undefined) update.title = input.title;
      if (input.description !== undefined) update.description = input.description;
      if (input.features !== undefined) update.features = input.features;
      if (input.isActive !== undefined) update.is_active = input.isActive;
      if (input.quarterlyEnabled !== undefined)
        update.quarterly_enabled = input.quarterlyEnabled;
      if (input.quarterlyDiscountPercent !== undefined)
        update.quarterly_discount_percent = input.quarterlyDiscountPercent;
      update.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from("subscription_plans")
        .update(update)
        .eq("plan_slug", planSlug)
        .eq("language_slug", languageSlug);
      return error ? { error: error.message } : {};
    },

    async getSubscriptionTiers() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("subscription_tiers")
        .select("*")
        .order("tier_rank");

      // Falling back keeps the storefront and the learn routes working if the
      // entitlement migration has not been applied yet.
      return data && data.length > 0 ? data : DEFAULT_SUBSCRIPTION_TIERS;
    },

    async updateSubscriptionTier(planSlug, input) {
      const supabase = await createClient();
      const update: Database["public"]["Tables"]["subscription_tiers"]["Update"] = {};
      if (input.tierRank !== undefined) update.tier_rank = input.tierRank;
      if (input.unlocksVocabulary !== undefined)
        update.unlocks_vocabulary = input.unlocksVocabulary;
      if (input.unlocksGrammar !== undefined)
        update.unlocks_grammar = input.unlocksGrammar;
      if (input.unlocksVideo !== undefined) update.unlocks_video = input.unlocksVideo;
      if (input.unlocksLevelExam !== undefined)
        update.unlocks_level_exam = input.unlocksLevelExam;
      if (input.quizRetakeLimit !== undefined)
        update.quiz_retake_limit = input.quizRetakeLimit;
      update.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from("subscription_tiers")
        .update(update)
        .eq("plan_slug", planSlug);
      return error ? { error: error.message } : {};
    },

    async getSubscriptionPageContent() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("subscription_page_content")
        .select("*")
        .eq("id", "default")
        .maybeSingle();

      if (!data) return DEFAULT_SUBSCRIPTION_PAGE_CONTENT;

      return {
        ...data,
        hero_title: data.hero_title as unknown as LocalizedText,
        hero_subtitle: data.hero_subtitle as unknown as LocalizedText,
        footer_note: data.footer_note as unknown as LocalizedText,
      } satisfies SubscriptionPageContentRow;
    },

    async updateSubscriptionPageContent(input) {
      const supabase = await createClient();
      const update: Database["public"]["Tables"]["subscription_page_content"]["Update"] = {};
      if (input.heroTitle !== undefined) update.hero_title = input.heroTitle;
      if (input.heroSubtitle !== undefined) update.hero_subtitle = input.heroSubtitle;
      if (input.footerNote !== undefined) update.footer_note = input.footerNote;
      update.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from("subscription_page_content")
        .update(update)
        .eq("id", "default");
      return error ? { error: error.message } : {};
    },

    // ---------------------------------------------------------------------
    // Billing & accounting
    // ---------------------------------------------------------------------

    async getPaymentSettings() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("payment_settings")
        .select("*")
        .eq("id", "default")
        .maybeSingle();

      // Falling back keeps the storefront rendering if the billing migration
      // has not been applied yet, rather than 500-ing the subscription page.
      return data ?? DEFAULT_PAYMENT_SETTINGS;
    },

    async updatePaymentSettings(input) {
      const supabase = await createClient();
      const update: Database["public"]["Tables"]["payment_settings"]["Update"] = {};
      if (input.irrEnabled !== undefined) update.irr_enabled = input.irrEnabled;
      if (input.fxSource !== undefined) update.fx_source = input.fxSource;
      if (input.fxMarginPercent !== undefined)
        update.fx_margin_percent = input.fxMarginPercent;
      if (input.irrRounding !== undefined) update.irr_rounding = input.irrRounding;
      if (input.fxManualRate !== undefined) update.fx_manual_rate = input.fxManualRate;
      if (input.fxMaxDeviationPercent !== undefined)
        update.fx_max_deviation_percent = input.fxMaxDeviationPercent;
      if (input.stripeEnabled !== undefined) update.stripe_enabled = input.stripeEnabled;
      if (input.zarinpalEnabled !== undefined)
        update.zarinpal_enabled = input.zarinpalEnabled;
      if (input.manualEnabled !== undefined) update.manual_enabled = input.manualEnabled;
      if (input.gracePeriodDays !== undefined)
        update.grace_period_days = input.gracePeriodDays;
      if (input.enforceEntitlements !== undefined)
        update.enforce_entitlements = input.enforceEntitlements;
      if (input.freeCefrBands !== undefined)
        // Normalised on the way in so the band comparison never has to worry
        // about "a1" versus "A1".
        update.free_cefr_bands = input.freeCefrBands.map((band) =>
          band.trim().toUpperCase()
        );
      if (input.freeQuizRetakeLimit !== undefined)
        update.free_quiz_retake_limit = input.freeQuizRetakeLimit;
      if (input.pendingPaymentTimeoutMinutes !== undefined)
        update.pending_payment_timeout_minutes = input.pendingPaymentTimeoutMinutes;
      update.updated_at = new Date().toISOString();

      const { error } = await supabase
        .from("payment_settings")
        .update(update)
        .eq("id", "default");
      return error ? { error: error.message } : {};
    },

    async getLatestFxRate() {
      const supabase = await createClient();
      const { data } = await supabase
        .from("fx_rates")
        .select("*")
        .eq("base_currency", "EUR")
        .eq("quote_currency", "IRR")
        .eq("accepted", true)
        .order("fetched_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data ?? null;
    },

    async getFxRateHistory(limit = 50) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("fx_rates")
        .select("*")
        .order("fetched_at", { ascending: false })
        .limit(limit);
      return data ?? [];
    },

    async recordFxRate(input) {
      const supabase = await createClient();
      const { error } = await supabase.from("fx_rates").insert({
        rate: input.rate,
        source: input.source,
        accepted: input.accepted,
        rejection_reason: input.rejectionReason ?? null,
      });
      return error ? { error: error.message } : {};
    },

    async getSubscriptionsForUser(userId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      return data ?? [];
    },

    async getEntitlingSubscription(userId, languageSlug) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("language_slug", languageSlug)
        .in("status", ["active", "past_due"])
        .maybeSingle();
      return data ?? null;
    },

    async cancelSubscription(subscriptionId) {
      const supabase = await createClient();
      const { error } = await supabase.rpc("cancel_my_subscription", {
        p_subscription_id: subscriptionId,
      });
      return error ? { error: error.message } : {};
    },

    async createPendingPayment(input) {
      const supabase = await createClient();
      // The amount is computed inside the function from the plan table — the
      // client only ever names a plan.
      const { data, error } = await supabase.rpc("create_pending_payment", {
        p_plan_slug: input.planSlug,
        p_language_slug: input.languageSlug,
        p_provider: input.provider,
        p_currency: input.currency,
        p_period_months: input.periodMonths ?? 1,
      });
      if (error) return { error: error.message };
      return { paymentId: data as string };
    },

    async getMyPendingPayments() {
      const supabase = await createClient();
      const { data } = await supabase.rpc("list_my_pending_payments");
      return (data as Payment[] | null) ?? [];
    },

    async attachCheckoutReference(paymentId, reference) {
      const supabase = await createClient();
      const { error } = await supabase.rpc("attach_checkout_reference", {
        p_payment_id: paymentId,
        p_reference: reference,
      });
      return error ? { error: error.message } : {};
    },

    async getPaymentById(paymentId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("payments")
        .select("*")
        .eq("id", paymentId)
        .maybeSingle();
      return data ?? null;
    },

    async getPaymentsForUser(userId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      return data ?? [];
    },

    async getSubscriptionEvents(subscriptionId) {
      const supabase = await createClient();
      const { data } = await supabase
        .from("subscription_events")
        .select("*")
        .eq("subscription_id", subscriptionId)
        .order("created_at", { ascending: false });
      return data ?? [];
    },

    async getAccountingSnapshot() {
      const supabase = await createClient();

      // `payments.user_id` points at auth.users rather than profiles, so
      // PostgREST cannot embed the learner automatically — the two sides are
      // fetched in parallel and stitched together below.
      //
      // Rows are capped rather than streamed: once the ledger outgrows this,
      // the aggregation belongs in a materialised view, not in the app.
      const LEDGER_ROW_CAP = 10_000;

      const [
        paymentsRes,
        refundsRes,
        subscriptionsRes,
        profilesRes,
        settings,
        fxRate,
      ] = await Promise.all([
        supabase
          .from("payments")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(LEDGER_ROW_CAP),
        supabase
          .from("refunds")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(LEDGER_ROW_CAP),
        supabase
          .from("subscriptions")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(LEDGER_ROW_CAP),
        supabase.from("profiles").select("id, email, full_name"),
        this.getPaymentSettings(),
        this.getLatestFxRate(),
      ]);

      const profileById = new Map(
        (profilesRes.data ?? []).map((profile) => [profile.id, profile])
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
        payments: (paymentsRes.data ?? []).map(withUser),
        refunds: refundsRes.data ?? [],
        subscriptions: (subscriptionsRes.data ?? []).map(withUser),
        settings,
        fxRate,
        now: new Date(),
      });
    },

    async recordManualPayment(input) {
      const supabase = await createClient();

      // Reuses the same server-side pricing path as a gateway checkout, so a
      // hand-entered payment is priced identically to an online one.
      const { data: paymentId, error: createError } = await supabase.rpc(
        "create_pending_payment",
        {
          p_plan_slug: input.planSlug,
          p_language_slug: input.languageSlug,
          p_provider: "manual",
          p_currency: input.currency,
        }
      );
      if (createError) return { error: createError.message };

      const { error: settleError } = await supabase.rpc("settle_payment", {
        p_payment_id: paymentId as string,
        p_provider_payment_id: `manual-${paymentId}`,
        p_provider_ref: input.reference ?? null,
      });
      return settleError ? { error: settleError.message } : {};
    },

    async refundPayment(input) {
      const supabase = await createClient();
      const { data: user } = await supabase.auth.getUser();

      const { error: refundError } = await supabase.from("refunds").insert({
        payment_id: input.paymentId,
        amount_eur_cents: input.amountEurCents,
        reason: input.reason ?? null,
        created_by: user.user?.id ?? null,
      });
      if (refundError) return { error: refundError.message };

      // The payment row is flagged, but never edited to remove the money —
      // the refund is its own ledger entry.
      const { error: statusError } = await supabase
        .from("payments")
        .update({ status: "refunded", updated_at: new Date().toISOString() })
        .eq("id", input.paymentId);
      return statusError ? { error: statusError.message } : {};
    },
  };
}
