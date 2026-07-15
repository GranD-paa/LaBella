import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { QuizBrowseLanguageView } from "@/components/quizzes/quiz-browse-language-view";
import { getLanguage } from "@/lib/curriculum/languages";
import { getDataRepository } from "@/lib/data";

type PageProps = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language } = await params;
  const languageDef = getLanguage(language);
  return {
    title: languageDef
      ? `${languageDef.name} Quizzes — LaBella`
      : "Quizzes — LaBella",
  };
}

export default async function QuizBrowseLanguagePage({ params }: PageProps) {
  const { language: languageSlug } = await params;
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const language = getLanguage(languageSlug);
  if (!language || !language.available) {
    notFound();
  }

  return <QuizBrowseLanguageView language={language} />;
}
