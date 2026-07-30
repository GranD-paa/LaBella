"use client";

import Link from "next/link";
import { Compass, Globe2, LayoutGrid } from "lucide-react";

import { BannerCarousel } from "@/components/menu/banner-carousel";
import { LanguageCard } from "@/components/menu/language-card";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
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

      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative space-y-4">
          <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
            <LayoutGrid className="me-1 h-3 w-3" />
            {t("menu.badge")}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("menu.greeting", { name: displayName })}
          </h1>
          <p className="max-w-2xl text-muted-foreground">{t("menu.subtitle")}</p>
          <Button
            variant="outline"
            className="border-white/20 bg-white/5"
            asChild
          >
            <Link href="/dashboard">
              <Compass className="h-4 w-4" />
              {t("menu.openDashboard")}
            </Link>
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
            <Globe2 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-xl font-semibold">{t("menu.coursesTitle")}</h2>
            <p className="text-sm text-muted-foreground">{t("menu.coursesSubtitle")}</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {languages.map((language) => (
            <LanguageCard key={language.slug} language={language} />
          ))}
        </div>
      </section>
    </div>
  );
}
