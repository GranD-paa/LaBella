"use client";

import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

import { FlagIcon, getLanguageCode } from "@/components/menu/flag-icon";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { CURRICULUM_MESSAGE_KEYS } from "@/lib/i18n/content-keys";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

export function LanguageCard({ language }: { language: CurriculumLanguage }) {
  const { t } = useTranslations();
  const contentKey = CURRICULUM_MESSAGE_KEYS[language.slug];
  const headline = contentKey ? t(`${contentKey}.headline`) : language.headline;
  const description = contentKey
    ? t(`${contentKey}.description`)
    : language.description;

  const content = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 p-6 transition-all duration-300 sm:p-7",
        language.available
          ? "brand-surface hover:-translate-y-1.5 hover:border-brand-accent/40 hover:shadow-brand"
          : "border-dashed bg-muted/20 opacity-80"
      )}
    >
      {/* Ambient glow, tinted per-language, blooms in on hover */}
      <div
        className={cn(
          "pointer-events-none absolute -top-10 h-40 w-40 rounded-full bg-gradient-to-br opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-80 ltr:-right-10 rtl:-left-10",
          language.accentClass
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50 transition-opacity duration-500 group-hover:opacity-90",
          language.accentClass
        )}
      />

      {/* Oversized watermark flag, purely decorative */}
      <FlagIcon
        slug={language.slug}
        className="pointer-events-none absolute -bottom-7 h-24 w-36 rotate-6 opacity-[0.08] transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105 ltr:-right-5 rtl:-left-5 rtl:-rotate-6 rtl:group-hover:-rotate-2"
      />

      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/25 p-1.5 shadow-inner backdrop-blur-sm">
            <FlagIcon slug={language.slug} className="h-6 w-9 shrink-0" />
            <span className="text-xs font-bold tracking-wider text-foreground/80">
              {getLanguageCode(language.slug)}
            </span>
          </div>
          {language.available ? (
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
              <Sparkles className="me-1 h-3 w-3" />
              {t("common.available")}
            </Badge>
          ) : (
            <Badge variant="secondary">
              <Lock className="me-1 h-3 w-3" />
              {t("common.comingSoon")}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {headline}
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {language.available ? (
          <div className="flex items-center gap-2 text-sm font-medium text-brand-accent">
            {t("menu.startLearning")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">{t("menu.pathPreparing")}</p>
        )}
      </div>
    </div>
  );

  if (!language.available) {
    return <div className="cursor-not-allowed">{content}</div>;
  }

  return (
    <Link href={`/learn/${language.slug}`} className="block">
      {content}
    </Link>
  );
}
