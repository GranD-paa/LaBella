"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CATEGORY_DEFINITIONS } from "@/lib/curriculum/languages";
import {
  CATEGORY_ACCENTS,
  CATEGORY_ICON_BG,
  CATEGORY_ICONS,
} from "@/lib/curriculum/category-theme";
import {
  getLocalizedLanguageName,
  getLocalizedLevel,
} from "@/lib/curriculum/localize";
import { CATEGORY_MESSAGE_KEYS } from "@/lib/i18n/content-keys";
import type {
  CurriculumLanguage,
  CurriculumLevel,
} from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

type LevelCategoryGridProps = {
  language: CurriculumLanguage;
  level: CurriculumLevel;
};

export function LevelCategoryGrid({ language, level }: LevelCategoryGridProps) {
  const { t } = useTranslations();
  const languageLabel = getLocalizedLanguageName(language.slug, t);
  const localizedLevel = getLocalizedLevel(language.slug, level, t);
  const moduleCount = CATEGORY_DEFINITIONS.length;

  return (
    <div className="space-y-8">
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
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {localizedLevel.title}
            </h1>
            {localizedLevel.description ? (
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {localizedLevel.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">
                  {t("learn.chooseCategoryTitle")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("learn.chooseCategory")}
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="w-fit shrink-0 border-white/10 bg-white/5 text-xs font-medium uppercase tracking-wide"
            >
              {t("learn.moduleCount", { count: moduleCount })}
            </Badge>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {CATEGORY_DEFINITIONS.map((category) => {
          const Icon = CATEGORY_ICONS[category.slug];
          const messageKey = CATEGORY_MESSAGE_KEYS[category.slug];

          return (
            <Link
              key={category.slug}
              href={category.href(language.slug, level.slug)}
              className="group block"
            >
              <Card className="brand-surface h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/35 hover:shadow-brand">
                <div
                  className={cn(
                    "h-1 bg-gradient-to-r",
                    CATEGORY_ACCENTS[category.slug]
                  )}
                />
                <CardHeader className="space-y-4">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105",
                      CATEGORY_ICON_BG[category.slug]
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{t(`${messageKey}.title`)}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {t(`${messageKey}.description`)}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent transition-transform group-hover:gap-2">
                    {t("common.openModule")}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5">
                      ←
                    </span>
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
