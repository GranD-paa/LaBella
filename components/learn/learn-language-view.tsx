"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import {
  ComingSoonLanguage,
  CourseLevelAccordion,
} from "@/components/learn/course-level-accordion";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { CURRICULUM_MESSAGE_KEYS } from "@/lib/i18n/content-keys";
import type { CurriculumLanguage } from "@/lib/curriculum/types";

export function LearnLanguageView({ language }: { language: CurriculumLanguage }) {
  const { t } = useTranslations();
  const contentKey = CURRICULUM_MESSAGE_KEYS[language.slug];
  const headline = contentKey ? t(`${contentKey}.headline`) : language.headline;
  const description = contentKey
    ? t(`${contentKey}.description`)
    : language.description;

  return (
    <div className="space-y-8">
      <Button variant="ghost" size="sm" asChild className="-ms-2 w-fit">
        <Link href="/menu">
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
          {t("learn.backToMenu")}
        </Link>
      </Button>

      {language.available ? (
        <>
          <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
            <div className="absolute inset-0 bg-brand-gradient opacity-20" />
            <div className="relative space-y-3">
              <span className="text-4xl">{language.flagEmoji}</span>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {headline}
              </h1>
              <p className="max-w-2xl text-muted-foreground">{description}</p>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{t("learn.courseLevels")}</h2>
              <p className="text-sm text-muted-foreground">
                {t("learn.courseLevelsHint")}
              </p>
            </div>
            <CourseLevelAccordion language={language} />
          </section>
        </>
      ) : (
        <ComingSoonLanguage language={language} />
      )}
    </div>
  );
}
