"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CATEGORY_ICON_BG,
  CATEGORY_ICONS,
} from "@/lib/curriculum/category-theme";
import {
  getLocalizedLanguageName,
  getLocalizedLevel,
} from "@/lib/curriculum/localize";
import { CATEGORY_MESSAGE_KEYS } from "@/lib/i18n/content-keys";
import type {
  CategorySlug,
  CurriculumLanguage,
  CurriculumLevel,
} from "@/lib/curriculum/types";

export function LearnCategoryHero({
  language,
  level,
  category,
  itemCount,
}: {
  language: CurriculumLanguage;
  level: CurriculumLevel;
  category: CategorySlug;
  itemCount?: number;
}) {
  const { t } = useTranslations();
  const messageKey = CATEGORY_MESSAGE_KEYS[category];
  const Icon = CATEGORY_ICONS[category];
  const languageLabel = getLocalizedLanguageName(language.slug, t);
  const localizedLevel = getLocalizedLevel(language.slug, level, t);

  return (
    <section className="brand-surface relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-8">
      <div className="absolute inset-0 bg-brand-gradient opacity-20" />
      <div className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-brand-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 start-8 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />

      <div className="relative space-y-6">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-3xl sm:text-4xl" aria-hidden>
            {language.flagEmoji}
          </span>
          <Badge
            variant="outline"
            className="border-white/15 bg-white/5 text-foreground"
          >
            {languageLabel}
          </Badge>
          <Badge className="border-brand-accent/30 bg-brand-accent/15 text-brand-accent hover:bg-brand-accent/15">
            {level.code}
          </Badge>
          <Badge variant="secondary" className="border-white/10 bg-white/5">
            {t(`${messageKey}.title`)}
          </Badge>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${CATEGORY_ICON_BG[category]}`}
          >
            <Icon className="h-7 w-7" />
          </div>
          <div className="min-w-0 space-y-2">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t(`${messageKey}.title`)}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t(`${messageKey}.description`)}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm font-medium text-muted-foreground">
            {localizedLevel.title}
          </p>
          {localizedLevel.description ? (
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">
              {localizedLevel.description}
            </p>
          ) : null}
          {typeof itemCount === "number" ? (
            <Badge
              variant="secondary"
              className="mt-3 border-white/10 bg-white/5 text-xs font-medium uppercase tracking-wide"
            >
              {category === "quiz"
                ? t("learn.quizCount", { count: itemCount })
                : t("learn.moduleCount", { count: itemCount })}
            </Badge>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function LearnCategoryBackLink({
  languageSlug,
  levelSlug,
  levelCode,
}: {
  languageSlug: string;
  levelSlug: string;
  levelCode: string;
}) {
  const { t } = useTranslations();

  return (
    <Button
      variant="ghost"
      size="sm"
      asChild
      className="-ms-2 w-fit text-muted-foreground hover:text-foreground"
    >
      <Link href={`/learn/${languageSlug}/${levelSlug}`}>
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
        {t("learn.backToCategories", { code: levelCode })}
      </Link>
    </Button>
  );
}
