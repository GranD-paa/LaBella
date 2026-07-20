"use client";

import {
  LearnCategoryBackLink,
  LearnCategoryHero,
} from "@/components/learn/learn-category-hero";
import { VisualLearningGrid } from "@/components/learn/visual-learning-grid";
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
  Quiz,
  UserQuizAttempt,
  Vocabulary,
} from "@/types";

export function LearnCategoryView({
  language,
  level,
  category,
  lesson,
  vocabulary,
  grammarRules,
  quizzes = [],
  quizAttempts = [],
}: {
  language: CurriculumLanguage;
  level: CurriculumLevel;
  category: CategorySlug;
  lesson: Lesson | null;
  vocabulary: Vocabulary[];
  grammarRules: GrammarRule[];
  quizzes?: Quiz[];
  quizAttempts?: UserQuizAttempt[];
}) {
  const { t } = useTranslations();

  const contentCount =
    category === "quiz"
      ? quizzes.length
      : category === "grammar"
        ? grammarRules.length
        : category === "vocabulary" || category === "visual"
          ? vocabulary.length
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

      {!lesson && category !== "quiz" ? (
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
            <VisualLearningGrid vocabulary={vocabulary} />
          ) : null}
          {category === "quiz" ? (
            <QuizTabContent quizzes={quizzes} attempts={quizAttempts} />
          ) : null}
        </>
      )}
    </div>
  );
}
