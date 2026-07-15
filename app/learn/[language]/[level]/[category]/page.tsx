import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { GrammarRulesList } from "@/components/lessons/grammar-rules-list";
import { QuizTabContent } from "@/components/lessons/quiz-tab-content";
import { VocabularyFlashcards } from "@/components/lessons/vocabulary-flashcards";
import { VisualLearningGrid } from "@/components/learn/visual-learning-grid";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_DEFINITIONS,
  getLanguage,
  getLevel,
  isCategorySlug,
} from "@/lib/curriculum/languages";
import { resolveLessonForLevel } from "@/lib/curriculum/resolve-lesson";
import { getDataRepository } from "@/lib/data";

type PageProps = {
  params: Promise<{ language: string; level: string; category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language, level, category } = await params;
  const categoryDef = CATEGORY_DEFINITIONS.find((item) => item.slug === category);
  const languageDef = getLanguage(language);
  const levelDef = languageDef ? getLevel(languageDef, level) : undefined;

  return {
    title:
      categoryDef && levelDef
        ? `${categoryDef.title} — ${levelDef.code} — LaBella`
        : "Lesson Category — LaBella",
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { language: languageSlug, level: levelSlug, category } = await params;

  if (!isCategorySlug(category)) {
    notFound();
  }

  const language = getLanguage(languageSlug);
  if (!language || !language.available) {
    notFound();
  }

  const level = getLevel(language, levelSlug);
  if (!level) {
    notFound();
  }

  const categoryDef = CATEGORY_DEFINITIONS.find((item) => item.slug === category);
  if (!categoryDef) {
    notFound();
  }

  const repo = getDataRepository();
  const user = await repo.getAuthUser();
  const { lesson } = await resolveLessonForLevel(repo, languageSlug, levelSlug);

  let vocabulary: import("@/types").Vocabulary[] = [];
  let grammarRules: import("@/types").GrammarRule[] = [];
  let quiz: import("@/types").Quiz | null = null;
  let quizAttempt: import("@/types").UserQuizAttempt | null = null;

  if (lesson) {
    const [vocabularyData, grammarData, quizzes] = await Promise.all([
      repo.getVocabularyByLessonId(lesson.id),
      repo.getGrammarRulesByLessonId(lesson.id),
      repo.getQuizzes(),
    ]);

    vocabulary = vocabularyData;
    grammarRules = grammarData;
    quiz = quizzes.find((entry) => entry.lesson_id === lesson.id) ?? null;

    if (quiz && user) {
      quizAttempt = await repo.getAttemptByUserAndQuiz(user.id, quiz.id);
    }
  }

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href={`/learn/${language.slug}/${level.slug}`}>
          <ArrowLeft className="h-4 w-4" />
          Back to {level.code} categories
        </Link>
      </Button>

      <div className="space-y-2">
        <p className="text-sm font-medium text-brand-accent">
          {language.name} · {level.code}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          {categoryDef.title}
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          {categoryDef.description}
        </p>
        {lesson?.description ? (
          <p className="text-sm text-muted-foreground">{lesson.description}</p>
        ) : null}
      </div>

      {!lesson ? (
        <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          <p>
            Content for {level.code} is being prepared. Check back soon or ask
            an admin to add lesson {level.orderNumber} in the admin panel.
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
            <QuizTabContent quiz={quiz} attempt={quizAttempt} />
          ) : null}
        </>
      )}
    </div>
  );
}
