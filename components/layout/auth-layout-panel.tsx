"use client";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useTranslations } from "@/components/providers/locale-provider";

export function AuthAsidePanel() {
  const { t } = useTranslations();

  return (
    <div className="relative z-10 space-y-3">
      <p className="text-2xl font-medium leading-snug">
        &ldquo;{t("auth.quote")}&rdquo;
      </p>
      <p className="text-sm text-white/70">{t("auth.quoteSubtitle")}</p>
    </div>
  );
}

export function AuthMobileHeader() {
  return (
    <div className="flex h-16 items-center justify-between px-4 pt-1">
      <LanguageSwitcher />
    </div>
  );
}
