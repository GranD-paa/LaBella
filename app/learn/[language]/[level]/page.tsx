import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { LevelCategoryGrid } from "@/components/learn/level-category-grid";
import { Button } from "@/components/ui/button";
import { getLanguage, getLevel } from "@/lib/curriculum/languages";

type PageProps = {
  params: Promise<{ language: string; level: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { language: languageSlug, level: levelSlug } = await params;
  const language = getLanguage(languageSlug);
  const level = language ? getLevel(language, levelSlug) : undefined;

  return {
    title: level
      ? `${level.code} — ${language?.name ?? "Language"} — LaBella`
      : "Level — LaBella",
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

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
        <Link href={`/learn/${language.slug}`}>
          <ArrowLeft className="h-4 w-4" />
          Back to {language.name} levels
        </Link>
      </Button>

      <LevelCategoryGrid
        language={language.slug}
        level={level.slug}
        levelCode={level.code}
        levelTitle={level.title}
      />
    </div>
  );
}
