import type { Database } from "@/types/database.types";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Lesson = Database["public"]["Tables"]["lessons"]["Row"];
export type Vocabulary = Database["public"]["Tables"]["vocabulary"]["Row"];
export type GrammarRule =
  Database["public"]["Tables"]["grammar_rules"]["Row"];
export type VideoLesson =
  Database["public"]["Tables"]["video_lessons"]["Row"];
export type Quiz = Database["public"]["Tables"]["quizzes"]["Row"];
export type QuizQuestion =
  Database["public"]["Tables"]["quiz_questions"]["Row"];
export type UserQuizAttempt =
  Database["public"]["Tables"]["user_quiz_attempts"]["Row"];
export type UserLearningState =
  Database["public"]["Tables"]["user_learning_state"]["Row"];
export type Banner = Database["public"]["Tables"]["banners"]["Row"];

export type LocalizedText = { fa: string; en: string; it: string };

export type SubscriptionPlanRow = Omit<
  Database["public"]["Tables"]["subscription_plans"]["Row"],
  "title" | "description" | "features"
> & {
  title: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
};

export type SubscriptionPageContentRow = Omit<
  Database["public"]["Tables"]["subscription_page_content"]["Row"],
  "hero_title" | "hero_subtitle" | "footer_note"
> & {
  hero_title: LocalizedText;
  hero_subtitle: LocalizedText;
  footer_note: LocalizedText;
};
