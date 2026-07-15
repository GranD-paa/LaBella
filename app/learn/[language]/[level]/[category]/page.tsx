import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LearnCategoryView } from "@/components/learn/learn-category-view";
import {
  getLanguage,
  getLevel,
  isCategorySlug,
} from "@/lib/curriculum/languages";
import { resolveLessonForLevel } from "@/lib/curriculum/resolve-lesson";
import { getDataRepository } from "@/lib/data";
import { getServerTranslator } from "@/lib/i18n/server-locale";

type PageProps = {
  params: Promise<{ language: string; level: string; category: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language, level, category } = await params;
  const languageDef = getLanguage(language);
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

  const language = getLanguage(languageSlug);
  if (!language || !language.available) {
    notFound();
  }

  const level = getLevel(language, levelSlug);
  if (!level) {
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
    quiz =
      quizzes.find(
        (entry) =>
          entry.lesson_id === lesson.id &&
          entry.status === "published" &&
          entry.section_slug === "quiz"
      ) ?? null;

    if (quiz && user) {
      quizAttempt = await repo.getAttemptByUserAndQuiz(user.id, quiz.id);
    }
  }

  return (
    <LearnCategoryView
      languageName={language.name}
      languageSlug={language.slug}
      levelCode={level.code}
      levelSlug={level.slug}
      levelOrderNumber={level.orderNumber}
      category={category}
      lesson={lesson}
      vocabulary={vocabulary}
      grammarRules={grammarRules}
      quiz={quiz}
      quizAttempt={quizAttempt}
    />
  );
}
