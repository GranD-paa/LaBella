"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LevelCategoryGrid } from "@/components/learn/level-category-grid";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { CurriculumLanguage, CurriculumLevel } from "@/lib/curriculum/types";

type LearnLevelViewProps = {
  language: CurriculumLanguage;
  level: CurriculumLevel;
};

export function LearnLevelView({ language, level }: LearnLevelViewProps) {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
        <Link href={`/learn/${language.slug}`}>
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("learn.backToLevels", { name: language.name })}
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
