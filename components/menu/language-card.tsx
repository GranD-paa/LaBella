"use client";

import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

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
        "group relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all duration-300",
        language.available
          ? "brand-surface hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-brand"
          : "border-dashed bg-muted/20 opacity-80"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity group-hover:opacity-100",
          language.accentClass
        )}
      />
      <div className="relative space-y-5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-4xl" aria-hidden>
            {language.flagEmoji}
          </span>
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
