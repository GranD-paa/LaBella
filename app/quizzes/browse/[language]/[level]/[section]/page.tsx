import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { QuizBrowseSectionView } from "@/components/quizzes/quiz-browse-section-view";
import { getLanguage, getLevel } from "@/lib/curriculum/languages";
import { resolveLessonForLevel } from "@/lib/curriculum/resolve-lesson";
import { getDataRepository } from "@/lib/data";
import { fetchEnrichedQuizzes } from "@/lib/quiz-management/data";
import { getSectionLabel } from "@/lib/quiz-management/types";

type PageProps = {
  params: Promise<{ language: string; level: string; section: string }>;
  searchParams: Promise<{ completed?: string; score?: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language, level, section } = await params;
  const languageDef = getLanguage(language);
  const levelDef = languageDef ? getLevel(languageDef, level) : undefined;
  return {
    title:
      levelDef && languageDef
        ? `${getSectionLabel(section)} — ${levelDef.code} — LaBella`
        : "Quizzes — LaBella",
  };
}

export default async function QuizBrowseSectionPage({
  params,
  searchParams,
}: PageProps) {
  const { language: languageSlug, level: levelSlug, section: sectionSlug } =
    await params;
  const { completed, score } = await searchParams;

  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const language = getLanguage(languageSlug);
  if (!language || !language.available) {
    notFound();
  }

  const level = getLevel(language, levelSlug);
  if (!level) {
    notFound();
  }

  const { lesson } = await resolveLessonForLevel(repo, languageSlug, levelSlug);

  const [quizzes, attempts] = await Promise.all([
    fetchEnrichedQuizzes(repo, {
      languageSlug,
      levelSlug,
      sectionSlug,
      status: "published",
    }),
    repo.getAttemptsByUserId(user.id),
  ]);

  return (
    <QuizBrowseSectionView
      language={language}
      level={level}
      sectionSlug={sectionSlug}
      lesson={lesson}
      quizzes={quizzes}
      attempts={attempts}
      completedQuizId={completed}
      completedScore={score}
    />
  );
}
