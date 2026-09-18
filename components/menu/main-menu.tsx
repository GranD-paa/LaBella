"use client";

import Link from "next/link";
import { Compass } from "lucide-react";

import {
  Plate,
  PlateHead,
  PlateHorizon,
  PlateZone,
  PlateZoneHead,
} from "@/components/layout/plate";
import { BannerCarousel } from "@/components/menu/banner-carousel";
import { LanguageCard } from "@/components/menu/language-card";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { Banner } from "@/types";

export function MainMenu({
  displayName,
  languages,
  banners,
}: {
  displayName: string;
  languages: CurriculumLanguage[];
  banners: Banner[];
}) {
  const { t } = useTranslations();

  return (
    <div className="space-y-8">
      <BannerCarousel banners={banners} />

      <Plate>
        <PlateHead
          eyebrow={t("menu.badge")}
          title={t("menu.greeting", { name: displayName })}
          lede={t("menu.subtitle")}
          action={
            /*
              Outline rather than a fill. The subtitle sends the learner to pick
              a language, so the courses below are the primary action — a filled
              button here would be the loudest thing on the plate and pull
              attention off them.
            */
            <Button
              variant="outline"
              className="border-white/10 bg-white/[0.03] text-muted-foreground hover:bg-white/[0.07] hover:text-foreground"
              asChild
            >
              <Link href="/dashboard">
                <Compass className="h-4 w-4" />
                {t("menu.openDashboard")}
              </Link>
            </Button>
          }
        />

        <PlateHorizon />

        <PlateZone well>
          <PlateZoneHead
            title={t("menu.coursesTitle")}
            hint={t("menu.coursesSubtitle")}
          />
          <div className="grid gap-3 px-6 pb-7 sm:grid-cols-2 sm:px-10 sm:pb-8">
            {languages.map((language) => (
              <LanguageCard key={language.slug} language={language} />
            ))}
          </div>
        </PlateZone>
      </Plate>
    </div>
  );
}
