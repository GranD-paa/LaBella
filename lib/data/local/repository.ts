import {
  clearLocalSession,
  getLocalSessionUserId,
  setLocalSessionUserId,
} from "@/lib/auth/local-session";
import type { DataRepository } from "@/lib/data/repository";
import { createLocalId, getLocalStore } from "@/lib/data/local/store";

export function createLocalRepository(): DataRepository {
  return {
    async getAuthUser() {
      const userId = await getLocalSessionUserId();
      if (!userId) return null;
      const store = getLocalStore();
      const user = store.users.find((entry) => entry.id === userId);
      return user ? { id: user.id, email: user.email } : null;
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
      return {};
    },

    async updateLesson(id, { title, description, orderNumber }) {
      const lesson = getLocalStore().lessons.find((entry) => entry.id === id);
      if (!lesson) return { error: "Lesson not found." };
      lesson.title = title;
      lesson.description = description;
      lesson.order_number = orderNumber;
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
      return {};
    },

    async createVocabulary(input) {
      getLocalStore().vocabulary.push({
        ...input,
        id: createLocalId("vocab"),
        created_at: new Date().toISOString(),
      });
      return {};
    },

    async updateVocabulary(id, input) {
      const item = getLocalStore().vocabulary.find((entry) => entry.id === id);
      if (!item) return { error: "Vocabulary item not found." };
      Object.assign(item, input);
      return {};
    },

    async deleteVocabulary(id) {
      const store = getLocalStore();
      store.vocabulary = store.vocabulary.filter((item) => item.id !== id);
      return {};
    },

    async createGrammarRule(input) {
      getLocalStore().grammarRules.push({
        ...input,
        id: createLocalId("grammar"),
        created_at: new Date().toISOString(),
      });
      return {};
    },

    async updateGrammarRule(id, input) {
      const item = getLocalStore().grammarRules.find((entry) => entry.id === id);
      if (!item) return { error: "Grammar rule not found." };
      Object.assign(item, input);
      return {};
    },

    async deleteGrammarRule(id) {
      const store = getLocalStore();
      store.grammarRules = store.grammarRules.filter((item) => item.id !== id);
      return {};
    },

    async createQuizWithQuestions({
      lessonId,
      title,
      languageSlug = "italian",
      levelSlug = "a1-1",
      sectionSlug = "quiz",
      status = "draft",
      questions,
    }) {
      const store = getLocalStore();
      const quizId = createLocalId("quiz");
      store.quizzes.push({
        id: quizId,
        lesson_id: lessonId,
        title,
        language_slug: languageSlug,
        level_slug: levelSlug,
        section_slug: sectionSlug,
        status,
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

      return {};
    },

    async updateQuizStatus(id, status) {
      const quiz = getLocalStore().quizzes.find((entry) => entry.id === id);
      if (!quiz) return { error: "Quiz not found." };
      quiz.status = status;
      return {};
    },

    async updateQuizTitle(id, title) {
      const quiz = getLocalStore().quizzes.find((entry) => entry.id === id);
      if (!quiz) return { error: "Quiz not found." };
      quiz.title = title;
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
      return {};
    },

    async updateQuizQuestion(id, input) {
      const question = getLocalStore().quizQuestions.find(
        (entry) => entry.id === id
      );
      if (!question) return { error: "Question not found." };
      Object.assign(question, input);
      return {};
    },

    async deleteQuizQuestion(id) {
      const store = getLocalStore();
      store.quizQuestions = store.quizQuestions.filter(
        (question) => question.id !== id
      );
      return {};
    },
  };
}
