"use client";

import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

import { FlagIcon } from "@/components/menu/flag-icon";
import { getLanguageCode } from "@/lib/curriculum/language-codes";
import { useTranslations } from "@/components/providers/locale-provider";
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
        "plate-tile group relative overflow-hidden rounded-2xl border p-5 sm:p-6",
        language.available
          ? "border-white/[0.07] bg-white/[0.025]"
          : "border-dashed border-white/[0.07] bg-white/[0.012]"
      )}
    >
      {/* One tinted light per language, from the corner the card is read from.
          It is how the four cards tell themselves apart at a glance, before a
          word of the headline is read. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-75 ltr:-left-12 rtl:-right-12",
          language.accentClass
        )}
      />

      {/* The flag, oversized and nearly out of sight — texture, not a label.
          The one at the top says which language this is. */}
      <FlagIcon
        slug={language.slug}
        className="pointer-events-none absolute -bottom-7 h-24 w-36 rotate-6 opacity-[0.07] transition-transform duration-500 group-hover:scale-105 ltr:-right-5 rtl:-left-5 rtl:-rotate-6"
      />

      <div className="relative space-y-4">
        <div className="flex items-start justify-between gap-3">
          <span className="flex items-center gap-2 rounded-xl border border-white/[0.09] bg-black/30 p-1.5 shadow-inner">
            <FlagIcon slug={language.slug} className="h-6 w-9 shrink-0" />
            <span className="text-xs font-bold tracking-wider text-foreground/80">
              {getLanguageCode(language.slug)}
            </span>
          </span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
              language.available
                ? "border-white/10 bg-white/[0.05] text-foreground/80"
                : "border-white/[0.07] bg-white/[0.02] text-muted-foreground/70"
            )}
          >
            {language.available ? (
              <Sparkles className="h-3 w-3" aria-hidden />
            ) : (
              <Lock className="h-3 w-3" aria-hidden />
            )}
            {language.available ? t("common.available") : t("common.comingSoon")}
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold sm:text-[1.375rem]">
            {headline}
          </h2>
          <p className="text-[0.875rem]/[1.85] text-muted-foreground">
            {description}
          </p>
        </div>

        {language.available ? (
          /* Gold arrives on the one card the pointer is on, the same way it
             arrives on one row of an index. */
          <p className="plate-tile-cta flex items-center gap-2 text-sm font-medium text-foreground/70">
            {t("menu.startLearning")}
            <ArrowRight className="plate-chev h-4 w-4 rtl:rotate-180" aria-hidden />
          </p>
        ) : (
          <p className="text-sm font-medium text-muted-foreground/70">
            {t("menu.pathPreparing")}
          </p>
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
