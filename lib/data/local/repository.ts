import {
  clearLocalSession,
  getLocalSessionUserId,
  setLocalSessionUserId,
} from "@/lib/auth/local-session";
import type { DataRepository } from "@/lib/data/repository";
import { createLocalId, getLocalStore, persistLocalStore } from "@/lib/data/local/store";
import { deriveQuizMetadataFromLesson } from "@/lib/quiz-management/helpers";

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
  };
}
