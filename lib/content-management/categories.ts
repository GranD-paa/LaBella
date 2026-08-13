import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Clapperboard,
  GraduationCap,
  ImageIcon,
  ListChecks,
} from "lucide-react";

import type { LanguageSlug, LevelSlug } from "@/lib/curriculum/types";

export type ContentCategorySlug =
  | "grammar"
  | "vocabulary"
  | "video"
  | "quiz"
  | "level-exam";

export type ContentWizardContext = {
  languageSlug: LanguageSlug;
  levelSlug: LevelSlug;
  lessonId: string;
  category: ContentCategorySlug;
};

export type ContentStatus = "draft" | "published";

export const CONTENT_CATEGORIES: Array<{
  slug: ContentCategorySlug;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  featuresKey: string;
}> = [
  {
    slug: "grammar",
    icon: BookOpen,
    titleKey: "admin.content.categories.grammar.title",
    descriptionKey: "admin.content.categories.grammar.description",
    featuresKey: "admin.content.categories.grammar.features",
  },
  {
    slug: "vocabulary",
    icon: ImageIcon,
    titleKey: "admin.content.categories.vocabulary.title",
    descriptionKey: "admin.content.categories.vocabulary.description",
    featuresKey: "admin.content.categories.vocabulary.features",
  },
  {
    slug: "video",
    icon: Clapperboard,
    titleKey: "admin.content.categories.video.title",
    descriptionKey: "admin.content.categories.video.description",
    featuresKey: "admin.content.categories.video.features",
  },
  {
    slug: "quiz",
    icon: ListChecks,
    titleKey: "admin.content.categories.quiz.title",
    descriptionKey: "admin.content.categories.quiz.description",
    featuresKey: "admin.content.categories.quiz.features",
  },
  /**
   * The comprehensive exam for a whole CEFR level.
   *
   * Its own content type rather than a checkbox on the quiz form, because it is
   * a different product: per-lesson quizzes are free for everyone, this one is
   * gated on `subscription_tiers.unlocks_level_exam`.
   */
  {
    slug: "level-exam",
    icon: GraduationCap,
    titleKey: "admin.content.categories.levelExam.title",
    descriptionKey: "admin.content.categories.levelExam.description",
    featuresKey: "admin.content.categories.levelExam.features",
  },
];
