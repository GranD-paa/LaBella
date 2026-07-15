import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { QuizBrowseLevelView } from "@/components/quizzes/quiz-browse-level-view";
import { getLanguage, getLevel } from "@/lib/curriculum/languages";
import { resolveLessonForLevel } from "@/lib/curriculum/resolve-lesson";
import { getDataRepository } from "@/lib/data";

type PageProps = {
  params: Promise<{ language: string; level: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language, level } = await params;
  const languageDef = getLanguage(language);
  const levelDef = languageDef ? getLevel(languageDef, level) : undefined;
  return {
    title:
      levelDef && languageDef
        ? `${levelDef.code} Quizzes — LaBella`
        : "Quizzes — LaBella",
  };
}

export default async function QuizBrowseLevelPage({ params }: PageProps) {
  const { language: languageSlug, level: levelSlug } = await params;
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

  return (
    <QuizBrowseLevelView language={language} level={level} lesson={lesson} />
  );
}
