import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LearnCategoryView } from "@/components/learn/learn-category-view";
import { getLanguageWithAvailability } from "@/lib/curriculum/availability";
import { getLevel, isCategorySlug } from "@/lib/curriculum/languages";
import { resolveLessonForLevel } from "@/lib/curriculum/resolve-lesson";
import { getDataRepository } from "@/lib/data";
import { findPublishedQuizzesForLevel } from "@/lib/quiz-management/helpers";
import { getServerTranslator } from "@/lib/i18n/server-locale";

type PageProps = {
  params: Promise<{ language: string; level: string; category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language, level, category } = await params;
  const languageDef = await getLanguageWithAvailability(getDataRepository(), language);
  const levelDef = languageDef ? getLevel(languageDef, level) : undefined;

  const { t } = await getServerTranslator();

  return {
    title:
      levelDef && languageDef
        ? `${t(`learn.categories.${category}.title`)} — ${levelDef.code} — LaBella`
        : t("meta.lessonCategory"),
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { language: languageSlug, level: levelSlug, category } = await params;

  if (!isCategorySlug(category)) {
    notFound();
  }

  const repo = getDataRepository();
  const language = await getLanguageWithAvailability(repo, languageSlug);
  if (!language || !language.available) {
    notFound();
  }

  const level = getLevel(language, levelSlug);
  if (!level) {
    notFound();
  }

  const user = await repo.getAuthUser();
  const { lesson } = await resolveLessonForLevel(repo, languageSlug, levelSlug);

  if (user) {
    try {
      await repo.upsertLearningState(user.id, {
        languageSlug: language.slug,
        levelSlug: level.slug,
        lessonId: lesson?.id ?? null,
        sectionSlug: category,
      });
    } catch {
      // Persisting the resume position is best-effort and must never block
      // rendering the learning content itself.
    }
  }

  let vocabulary: import("@/types").Vocabulary[] = [];
  let grammarRules: import("@/types").GrammarRule[] = [];
  let levelQuizzes: import("@/types").Quiz[] = [];
  let quizAttempts: import("@/types").UserQuizAttempt[] = [];

  const [lessons, allQuizzes, allQuestions] = await Promise.all([
    repo.getLessons(),
    repo.getQuizzes(),
    repo.getAllQuizQuestions(),
  ]);

  const questionCountByQuiz = allQuestions.reduce<Record<string, number>>(
    (counts, question) => {
      counts[question.quiz_id] = (counts[question.quiz_id] ?? 0) + 1;
      return counts;
    },
    {}
  );

  levelQuizzes = findPublishedQuizzesForLevel(allQuizzes, lessons, {
    languageSlug: language.slug,
    levelSlug: level.slug,
    sectionSlug: "quiz",
    lessonId: lesson?.id ?? null,
  }).filter((entry) => (questionCountByQuiz[entry.id] ?? 0) > 0);

  if (user && levelQuizzes.length > 0) {
    const attempts = await repo.getAttemptsByUserId(user.id);
    const quizIds = new Set(levelQuizzes.map((entry) => entry.id));
    quizAttempts = attempts.filter((attempt) => quizIds.has(attempt.quiz_id));
  }

  if (lesson) {
    const [vocabularyData, grammarData] = await Promise.all([
      repo.getVocabularyByLessonId(lesson.id),
      repo.getGrammarRulesByLessonId(lesson.id),
    ]);

    vocabulary = vocabularyData.filter((item) => item.status === "published");
    grammarRules = grammarData.filter((item) => item.status === "published");
  }

  return (
    <LearnCategoryView
      language={language}
      level={level}
      category={category}
      lesson={lesson}
      vocabulary={vocabulary}
      grammarRules={grammarRules}
      quizzes={levelQuizzes}
      quizAttempts={quizAttempts}
    />
  );
}
