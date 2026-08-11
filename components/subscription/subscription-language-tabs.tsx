"use client";

import { Lock } from "lucide-react";

import { FlagIcon } from "@/components/menu/flag-icon";
import { getLanguageCode } from "@/lib/curriculum/language-codes";
import { useTranslations } from "@/components/providers/locale-provider";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

export function SubscriptionLanguageTabs({
  languages,
  selectedSlug,
  onSelect,
}: {
  languages: CurriculumLanguage[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) {
  const { t } = useTranslations();

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {languages.map((language) => {
        const isSelected = language.slug === selectedSlug;
        return (
          <button
            key={language.slug}
            type="button"
            disabled={!language.available}
            onClick={() => onSelect(language.slug)}
            aria-pressed={isSelected}
            className={cn(
              "flex items-center gap-2 rounded-xl border p-3 text-start transition-colors",
              language.available
                ? "hover:border-brand-accent/50"
                : "cursor-not-allowed opacity-60",
              isSelected
                ? "border-brand-accent bg-brand-accent/10"
                : "border-white/10 bg-white/5"
            )}
          >
            <FlagIcon slug={language.slug} className="h-6 w-9 shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{language.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {language.available ? (
                  getLanguageCode(language.slug)
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Lock className="h-3 w-3" />
                    {t("common.comingSoon")}
                  </span>
                )}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
