"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CurriculumLevelManager } from "@/components/admin/languages/curriculum-level-manager";
import { LanguageManagementPanel } from "@/components/admin/languages/language-management-panel";
import { Plate, PlateHead } from "@/components/layout/plate";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { LanguageToggle } from "@/lib/curriculum/availability";
import type { CurriculumLevel } from "@/lib/curriculum/types";

export function AdminLanguagesPageView({
  displayName,
  languages,
  levelsByLanguage,
}: {
  displayName: string;
  languages: LanguageToggle[];
  levelsByLanguage: Record<string, CurriculumLevel[]>;
}) {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <Plate>
        <PlateHead
          eyebrow={t("admin.languages.pageBadge")}
          title={t("admin.languages.pageHello", { name: displayName })}
          lede={t("admin.languages.pageSubtitle")}
          action={
                <Button variant="outline" className="border-white/20" asChild>
                  <Link href="/dashboard">
                    <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                    {t("admin.languages.backToDashboard")}
                  </Link>
                </Button>
          }
        />
      </Plate>

      <LanguageManagementPanel languages={languages} />

      <CurriculumLevelManager
        languages={languages}
        levelsByLanguage={levelsByLanguage}
      />
    </div>
  );
}
