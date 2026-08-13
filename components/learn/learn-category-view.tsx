"use client";

import {
  LearnCategoryBackLink,
  LearnCategoryHero,
} from "@/components/learn/learn-category-hero";
import { LockedContentNotice } from "@/components/learn/locked-content-notice";
import { VideoLessonsGrid } from "@/components/learn/video-lessons-grid";
import { GrammarRulesList } from "@/components/lessons/grammar-rules-list";
import { QuizTabContent } from "@/components/lessons/quiz-tab-content";
import { VocabularyFlashcards } from "@/components/lessons/vocabulary-flashcards";
import { useTranslations } from "@/components/providers/locale-provider";
import type {
  CategorySlug,
  CurriculumLanguage,
  CurriculumLevel,
} from "@/lib/curriculum/types";
import type {
  GrammarRule,
  Lesson,
  LocalizedText,
  Quiz,
  UserQuizAttempt,
  VideoLesson,
  Vocabulary,
} from "@/types";

export function LearnCategoryView({
  language,
  level,
  category,
  lesson,
  vocabulary,
  grammarRules,
  videoLessons = [],
  quizzes = [],
  quizAttempts = [],
  locked = false,
  requiredPlanTitle = null,
}: {
  language: CurriculumLanguage;
  level: CurriculumLevel;
  category: CategorySlug;
  lesson: Lesson | null;
  vocabulary: Vocabulary[];
  grammarRules: GrammarRule[];
  videoLessons?: VideoLesson[];
  quizzes?: Quiz[];
  quizAttempts?: UserQuizAttempt[];
  /** True when the learner's plan does not cover this category. */
  locked?: boolean;
  /**
   * Admin-authored title of the cheapest plan that unlocks this category.
   * Passed as stored copy rather than a translation key so the upsell always
   * names the plan by the name the admin gave it.
   */
  requiredPlanTitle?: LocalizedText | null;
}) {
  const { t, locale } = useTranslations();

  // A locked category has no items to count, and showing "0 words" there would
  // read as "this level is empty" rather than "you cannot see this yet".
  const contentCount = locked
    ? undefined
    : category === "quiz"
      ? quizzes.length
      : category === "grammar"
        ? grammarRules.length
        : category === "vocabulary"
          ? vocabulary.length
          : category === "visual"
            ? videoLessons.length
            : undefined;

  return (
    <div className="space-y-6">
      <LearnCategoryBackLink
        languageSlug={language.slug}
        levelSlug={level.slug}
        levelCode={level.code}
      />

      <LearnCategoryHero
        language={language}
        level={level}
        category={category}
        itemCount={contentCount}
      />

      {locked ? (
        <LockedContentNotice
          planName={requiredPlanTitle?.[locale] ?? null}
          contentLabel={t(`learn.categories.${category}.title`)}
          languageSlug={language.slug}
        />
      ) : !lesson && category !== "quiz" ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 py-16 text-center text-muted-foreground">
          <p>
            {t("learn.contentPreparing", {
              code: level.code,
              order: level.orderNumber,
            })}
          </p>
        </div>
      ) : category === "quiz" && quizzes.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 py-16 text-center text-muted-foreground">
          <p>{t("quiz.lesson.noQuiz")}</p>
        </div>
      ) : (
        <>
          {category === "grammar" ? (
            <GrammarRulesList rules={grammarRules} />
          ) : null}
          {category === "vocabulary" ? (
            <VocabularyFlashcards vocabulary={vocabulary} />
          ) : null}
          {category === "visual" ? (
            <VideoLessonsGrid videos={videoLessons} />
          ) : null}
          {category === "quiz" ? (
            <QuizTabContent quizzes={quizzes} attempts={quizAttempts} />
          ) : null}
        </>
      )}

    </div>
  );
}
