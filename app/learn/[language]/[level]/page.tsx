import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LearnLevelView } from "@/components/learn/learn-level-view";
import { getLanguage, getLevel } from "@/lib/curriculum/languages";
import { getServerTranslator } from "@/lib/i18n/server-locale";

type PageProps = {
  params: Promise<{ language: string; level: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language: languageSlug, level: levelSlug } = await params;
  const language = getLanguage(languageSlug);
  const level = language ? getLevel(language, levelSlug) : undefined;
  const { t } = await getServerTranslator();

  return {
    title: level
      ? `${level.code} — ${language?.name ?? t("locale.label")} — LaBella`
      : t("meta.level"),
  };
}

export default async function LevelPage({ params }: PageProps) {
  const { language: languageSlug, level: levelSlug } = await params;
  const language = getLanguage(languageSlug);

  if (!language || !language.available) {
    notFound();
  }

  const level = getLevel(language, levelSlug);
  if (!level) {
    notFound();
  }

  return <LearnLevelView language={language} level={level} />;
}
