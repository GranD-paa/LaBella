import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LessonView } from "@/components/lessons/lesson-view";
import { getLanguagesWithAvailability } from "@/lib/curriculum/availability";
import { resolveLessonNavigation } from "@/lib/curriculum/resolve-navigation";
import { getDataRepository } from "@/lib/data";
import { getServerTranslator } from "@/lib/i18n/server-locale";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const repo = getDataRepository();
  const lesson = await repo.getLessonById(id);

  const { t } = await getServerTranslator();

  return {
    title: lesson ? `${lesson.title} — LaBella` : t("meta.lesson"),
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { id } = await params;
  const repo = getDataRepository();
  const user = await repo.getAuthUser();
  const lesson = await repo.getLessonById(id);

  if (!lesson) {
    notFound();
  }

  const [vocabularyData, grammarData, quizzes, languages, learningState] =
    await Promise.all([
      repo.getVocabularyByLessonId(id),
      repo.getGrammarRulesByLessonId(id),
      repo.getQuizzes(),
      getLanguagesWithAvailability(repo),
      user ? repo.getLearningState(user.id) : Promise.resolve(null),
    ]);

  const vocabulary = vocabularyData.filter((item) => item.status === "published");
  const grammarRules = grammarData.filter((item) => item.status === "published");
  const quiz =
    quizzes.find(
      (entry) => entry.lesson_id === id && entry.status === "published"
    ) ?? null;

  let quizAttempt = null;
  if (quiz && user) {
    quizAttempt = await repo.getAttemptByUserAndQuiz(user.id, quiz.id);
  }

  const { backHref, languageSlug } = resolveLessonNavigation({
    lesson,
    languages,
    quizzes,
    learningState,
  });

  return (
    <LessonView
      lesson={lesson}
      vocabulary={vocabulary}
      grammarRules={grammarRules}
      quiz={quiz}
      quizAttempt={quizAttempt}
      backHref={backHref}
      languageSlug={languageSlug}
    />
  );
}
