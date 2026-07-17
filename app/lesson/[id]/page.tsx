import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LessonView } from "@/components/lessons/lesson-view";
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

  const [vocabularyData, grammarData, quizzes] = await Promise.all([
    repo.getVocabularyByLessonId(id),
    repo.getGrammarRulesByLessonId(id),
    repo.getQuizzes(),
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

  return (
    <LessonView
      lesson={lesson}
      vocabulary={vocabulary}
      grammarRules={grammarRules}
      quiz={quiz}
      quizAttempt={quizAttempt}
    />
  );
}
