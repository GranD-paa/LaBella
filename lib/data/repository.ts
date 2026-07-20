import type {
  GrammarRule,
  Lesson,
  Profile,
  Quiz,
  QuizQuestion,
  UserLearningState,
  UserQuizAttempt,
  VideoLesson,
  Vocabulary,
} from "@/types";
import type { Json } from "@/types/database.types";

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
  createQuizAttempt(input: {
    userId: string;
    quizId: string;
    score: number;
    answersJson: Json;
  }): Promise<{ error?: string; code?: number }>;

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

  createGrammarRule(
    input: Omit<GrammarRule, "id" | "created_at">
  ): Promise<{ error?: string }>;
  updateGrammarRule(
    id: string,
    input: Partial<Omit<GrammarRule, "id" | "created_at">>
  ): Promise<{ error?: string }>;
  deleteGrammarRule(id: string): Promise<{ error?: string }>;

  createVideoLesson(
    input: Omit<VideoLesson, "id" | "created_at">
  ): Promise<{ error?: string }>;

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
}
