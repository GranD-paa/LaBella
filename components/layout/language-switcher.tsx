"use client";

import { Languages } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LOCALES } from "@/lib/i18n/config";
import type { AppLocale } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useTranslations();

  const current = LOCALES.find((entry) => entry.code === locale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "brand-header-btn gap-2 px-2.5 text-white hover:bg-white/10 hover:text-white sm:px-3",
            className
          )}
          aria-label={t("locale.label")}
        >
          <Languages className="h-4 w-4 shrink-0" />
          <span className="max-w-[7rem] truncate text-sm font-medium sm:max-w-none">
            {current?.nativeLabel}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuLabel>{t("locale.label")}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(value) => setLocale(value as AppLocale)}
        >
          {LOCALES.map((entry) => (
            <DropdownMenuRadioItem key={entry.code} value={entry.code}>
              {entry.nativeLabel}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
