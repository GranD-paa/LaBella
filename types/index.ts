import type { Database } from "@/types/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
export type Vocabulary = Database["public"]["Tables"]["vocabulary"]["Row"];
export type GrammarRule =
  Database["public"]["Tables"]["grammar_rules"]["Row"];
export type Quiz = Database["public"]["Tables"]["quizzes"]["Row"];
export type QuizQuestion =
  Database["public"]["Tables"]["quiz_questions"]["Row"];
export type UserQuizAttempt =
  Database["public"]["Tables"]["user_quiz_attempts"]["Row"];
