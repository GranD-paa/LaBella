import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LearnLanguageView } from "@/components/learn/learn-language-view";
import { getLanguage } from "@/lib/curriculum/languages";
import { CURRICULUM_MESSAGE_KEYS } from "@/lib/i18n/content-keys";
import { getServerTranslator } from "@/lib/i18n/server-locale";

type PageProps = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language: languageSlug } = await params;
  const language = getLanguage(languageSlug);
  const { t } = await getServerTranslator();
  const contentKey = language
    ? CURRICULUM_MESSAGE_KEYS[language.slug]
    : undefined;

  return {
    title: contentKey
      ? `${t(`${contentKey}.headline`)} — LaBella`
      : t("meta.languageCourse"),
  };
}

export default async function LanguageCoursePage({ params }: PageProps) {
  const { language: languageSlug } = await params;
  const language = getLanguage(languageSlug);

  if (!language) {
    notFound();
  }

  return <LearnLanguageView language={language} />;
}
