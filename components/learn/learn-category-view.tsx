"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { GrammarRulesList } from "@/components/lessons/grammar-rules-list";
import { QuizTabContent } from "@/components/lessons/quiz-tab-content";
import { VocabularyFlashcards } from "@/components/lessons/vocabulary-flashcards";
import { VisualLearningGrid } from "@/components/learn/visual-learning-grid";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { CATEGORY_MESSAGE_KEYS } from "@/lib/i18n/content-keys";
import type { CategorySlug } from "@/lib/curriculum/types";
import type { GrammarRule, Lesson, Quiz, UserQuizAttempt, Vocabulary } from "@/types";

export function LearnCategoryView({
  languageName,
  languageSlug,
  levelCode,
  levelSlug,
  levelOrderNumber,
  category,
  lesson,
  vocabulary,
  grammarRules,
  quiz,
  quizAttempt,
}: {
  languageName: string;
  languageSlug: string;
  levelCode: string;
  levelSlug: string;
  levelOrderNumber: number;
  category: CategorySlug;
  lesson: Lesson | null;
  vocabulary: Vocabulary[];
  grammarRules: GrammarRule[];
  quiz: Quiz | null;
  quizAttempt: UserQuizAttempt | null;
}) {
  const { t } = useTranslations();
  const messageKey = CATEGORY_MESSAGE_KEYS[category];

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
        <Link href={`/learn/${languageSlug}/${levelSlug}`}>
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("learn.backToCategories", { code: levelCode })}
        </Link>
      </Button>

      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-accent">
          {languageName} · {levelCode}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          {t(`${messageKey}.title`)}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {t(`${messageKey}.description`)}
        </p>
        {lesson?.description ? (
          <p className="text-sm text-muted-foreground">{lesson.description}</p>
        ) : null}
      </div>

      {!lesson ? (
        <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          <p>
            {t("learn.contentPreparing", {
              code: levelCode,
              order: levelOrderNumber,
            })}
          </p>
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
            <QuizTabContent
              quiz={quiz}
              attempt={quizAttempt}
              browseHref={`/quizzes/browse/${languageSlug}/${levelSlug}/quiz`}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
