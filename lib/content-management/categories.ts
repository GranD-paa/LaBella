import type { LucideIcon } from "lucide-react";
import { BookOpen, Clapperboard, ImageIcon, ListChecks } from "lucide-react";

import type { LanguageSlug, LevelSlug } from "@/lib/curriculum/types";

export type ContentCategorySlug = "grammar" | "vocabulary" | "video" | "quiz";

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
];
