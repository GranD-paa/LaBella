"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Layers, Lock, Sparkles } from "lucide-react";

import { AddCurriculumLevelDialog } from "@/components/admin/languages/add-curriculum-level-dialog";
import { EditCurriculumLevelDialog } from "@/components/admin/languages/edit-curriculum-level-dialog";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { groupLevelsByBand } from "@/lib/curriculum/level-overrides";
import { CEFR_BANDS, type CefrBand } from "@/lib/curriculum/types";
import type { LanguageToggle } from "@/lib/curriculum/availability";
import type { CurriculumLevel } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

export function CurriculumLevelManager({
  languages,
  levelsByLanguage,
}: {
  languages: LanguageToggle[];
  levelsByLanguage: Record<string, CurriculumLevel[]>;
}) {
  const { t } = useTranslations();
  const router = useRouter();
  const [activeLanguage, setActiveLanguage] = useState<string>(
    languages[0]?.slug ?? "italian"
  );

  const activeLanguageMeta = languages.find(
    (language) => language.slug === activeLanguage
  );
  const currentLevels = useMemo(
    () => levelsByLanguage[activeLanguage] ?? [],
    [levelsByLanguage, activeLanguage]
  );

  const bandGroups = useMemo(
    () => groupLevelsByBand(currentLevels),
    [currentLevels]
  );
  const bandCounts = useMemo(() => {
    const counts = new Map<CefrBand, number>();
    for (const group of bandGroups) counts.set(group.band, group.levels.length);
    return counts;
  }, [bandGroups]);

  const nextEmptyBand =
    CEFR_BANDS.find((band) => !bandCounts.has(band)) ??
    CEFR_BANDS[CEFR_BANDS.length - 1];

  function handleChanged() {
    router.refresh();
  }

  return (
    <Card className="brand-surface">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-brand-accent" />
              {t("admin.languages.curriculum.title")}
            </CardTitle>
            <CardDescription className="max-w-2xl">
              {t("admin.languages.curriculum.description")}
            </CardDescription>
          </div>
          {activeLanguageMeta ? (
            <AddCurriculumLevelDialog
              languageSlug={activeLanguage}
              languageName={activeLanguageMeta.name}
              levels={currentLevels}
              defaultBand={nextEmptyBand}
              onCreated={handleChanged}
            />
          ) : null}
        </div>

        <Tabs value={activeLanguage} onValueChange={setActiveLanguage}>
          <TabsList className="flex-wrap">
            {languages.map((language) => (
              <TabsTrigger key={language.slug} value={language.slug} className="gap-1.5">
                <span>{language.flagEmoji}</span>
                {language.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* CEFR roadmap: a quick visual of how far this language's curriculum
            has grown, and a nudge toward the next stage worth building. */}
        <div className="flex items-center overflow-x-auto rounded-lg border border-white/10 bg-muted/10 px-4 py-4">
          {CEFR_BANDS.map((band, index) => {
            const count = bandCounts.get(band) ?? 0;
            const hasLevels = count > 0;
            return (
              <div key={band} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                      hasLevels
                        ? "border-brand-accent bg-brand-accent/15 text-brand-accent"
                        : "border-dashed border-white/20 text-muted-foreground"
                    )}
                  >
                    {band}
                  </div>
                  <Badge
                    variant={hasLevels ? "default" : "outline"}
                    className={cn(
                      "px-2 text-[10px]",
                      hasLevels
                        ? "border-brand-accent/30 bg-brand-accent/10 text-brand-accent"
                        : "text-muted-foreground"
                    )}
                  >
                    {t("admin.languages.curriculum.levelsCount", { count })}
                  </Badge>
                </div>
                {index < CEFR_BANDS.length - 1 ? (
                  <div
                    className={cn(
                      "mx-2 h-0.5 w-8 shrink-0 sm:w-14",
                      hasLevels ? "bg-brand-accent/40" : "bg-white/10"
                    )}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {bandGroups.length === 0 ? (
          <p className="rounded-lg border border-dashed border-white/10 px-4 py-8 text-center text-sm text-muted-foreground">
            {t("admin.languages.curriculum.emptyState")}
          </p>
        ) : (
          bandGroups.map((group) => (
            <div key={group.band} className="space-y-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-brand-accent" />
                <h3 className="text-sm font-semibold">{group.band}</h3>
                <Badge variant="secondary" className="text-[10px]">
                  {t("admin.languages.curriculum.levelsCount", {
                    count: group.levels.length,
                  })}
                </Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.levels.map((level) => (
                  <div
                    key={level.slug}
                    className="flex items-start justify-between gap-2 rounded-xl border border-white/10 bg-muted/10 p-4"
                  >
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="font-mono text-[11px]">
                          {level.code}
                        </Badge>
                        {level.isCustom ? (
                          <Badge className="gap-1 border-brand-accent/30 bg-brand-accent/10 text-[10px] text-brand-accent">
                            <Sparkles className="h-3 w-3" />
                            {t("admin.languages.curriculum.customBadge")}
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="gap-1 text-[10px] text-muted-foreground"
                            title={t("admin.languages.curriculum.defaultBadgeHint")}
                          >
                            <Lock className="h-3 w-3" />
                            {t("admin.languages.curriculum.defaultBadge")}
                          </Badge>
                        )}
                      </div>
                      <p className="truncate text-sm font-semibold">{level.title}</p>
                      {level.description ? (
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {level.description}
                        </p>
                      ) : null}
                    </div>
                    {activeLanguageMeta ? (
                      <EditCurriculumLevelDialog
                        languageSlug={activeLanguage}
                        languageName={activeLanguageMeta.name}
                        level={level}
                        onChanged={handleChanged}
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
