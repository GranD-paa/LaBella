"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LevelCategoryGrid } from "@/components/learn/level-category-grid";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { getLocalizedLanguageName } from "@/lib/curriculum/localize";
import type { CurriculumLanguage, CurriculumLevel } from "@/lib/curriculum/types";

type LearnLevelViewProps = {
  language: CurriculumLanguage;
  level: CurriculumLevel;
};

export function LearnLevelView({ language, level }: LearnLevelViewProps) {
  const { t } = useTranslations();
  const languageLabel = getLocalizedLanguageName(language.slug, t);

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="-ms-2 w-fit text-muted-foreground hover:text-foreground"
      >
        <Link href={`/learn/${language.slug}`}>
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("learn.backToLevels", { name: languageLabel })}
        </Link>
      </Button>

      <LevelCategoryGrid language={language} level={level} />
    </div>
  );
}
