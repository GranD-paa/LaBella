import { createClient } from "@/lib/supabase/server";
import type { DataRepository } from "@/lib/data/repository";
import { deriveQuizMetadataFromLesson } from "@/lib/quiz-management/helpers";

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

    async createQuizAttempt({ userId, quizId, score, answersJson }) {
      const supabase = await createClient();
      const { error } = await supabase.from("user_quiz_attempts").insert({
        user_id: userId,
        quiz_id: quizId,
        score,
        answers_json: answersJson,
      });

      if (error) {
        if (error.code === "23505") {
          return {
            error: "You have already attempted this quiz.",
            code: 409,
          };
        }
        return { error: error.message };
      }

      return {};
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
  };
}
