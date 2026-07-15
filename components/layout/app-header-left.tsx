"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";

export function AppHeaderLeft({ isAdmin = false }: { isAdmin?: boolean }) {
  const { t } = useTranslations();

  return (
    <div className="flex min-w-0 items-center gap-1 sm:gap-2">
      <LanguageSwitcher />
      {isAdmin ? (
        <Button
          variant="ghost"
          size="sm"
          className="brand-header-btn hidden sm:inline-flex"
          asChild
        >
          <Link href="/admin">
            <ShieldCheck className="h-4 w-4" />
            <span>{t("common.admin")}</span>
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
