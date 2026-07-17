"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers,
  LayoutGrid,
  PenLine,
} from "lucide-react";

import { ContentFormPanel } from "@/components/admin/content/content-form-panels";
import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LANGUAGES } from "@/lib/curriculum/languages";
import {
  CONTENT_CATEGORIES,
  type ContentCategorySlug,
  type ContentWizardContext,
} from "@/lib/content-management/categories";
import type { Lesson } from "@/types";
import { cn } from "@/lib/utils";

export function ContentCreationWizard({
  lessons,
  onSuccess,
}: {
  lessons: Lesson[];
  onSuccess?: () => void;
}) {
  const { t } = useTranslations();
  const [step, setStep] = useState(1);
  const [languageSlug, setLanguageSlug] = useState("italian");
  const [levelSlug, setLevelSlug] = useState("a1-1");
  const [category, setCategory] = useState<ContentCategorySlug | null>(null);

  const steps = useMemo(
    () =>
      [
        { id: 1, title: t("admin.content.stepLanguage"), icon: Globe },
        { id: 2, title: t("admin.content.stepLesson"), icon: Layers },
        { id: 3, title: t("admin.content.stepCategory"), icon: LayoutGrid },
        { id: 4, title: t("admin.content.stepCreate"), icon: PenLine },
      ] as const,
    [t]
  );

  const selectedLanguage = useMemo(
    () => LANGUAGES.find((language) => language.slug === languageSlug),
    [languageSlug]
  );

  const levelOptions = useMemo(
    () => selectedLanguage?.levels ?? [],
    [selectedLanguage]
  );

  const lessonForLevel = useMemo(() => {
    const level = levelOptions.find((entry) => entry.slug === levelSlug);
    if (!level) return null;
    return (
      lessons.find((lesson) => lesson.order_number === level.orderNumber) ?? null
    );
  }, [lessons, levelOptions, levelSlug]);

  const selectedCategory = useMemo(
    () => CONTENT_CATEGORIES.find((entry) => entry.slug === category) ?? null,
    [category]
  );

  const wizardContext: ContentWizardContext | null =
    lessonForLevel && category
      ? {
          languageSlug: languageSlug as ContentWizardContext["languageSlug"],
          levelSlug: levelSlug as ContentWizardContext["levelSlug"],
          lessonId: lessonForLevel.id,
          category,
        }
      : null;

  function resetWizard() {
    setStep(1);
    setLanguageSlug("italian");
    setLevelSlug("a1-1");
    setCategory(null);
  }

  function goNext() {
    if (step === 2 && !lessonForLevel) {
      return;
    }
    if (step === 3 && !category) {
      return;
    }
    if (step < 4) {
      setStep((current) => current + 1);
    }
  }

  function handleContentSuccess() {
    onSuccess?.();
  }

  return (
    <Card className="brand-surface overflow-hidden">
      <CardHeader className="space-y-4 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <CardTitle className="text-xl">{t("admin.content.wizardTitle")}</CardTitle>
          <CardDescription className="max-w-3xl text-pretty">
            {t("admin.content.wizardDescription")}
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          {steps.map((entry) => {
            const Icon = entry.icon;
            const isActive = step === entry.id;
            const isDone = step > entry.id;
            return (
              <div
                key={entry.id}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  isActive && "border-brand-accent bg-brand-accent/10 text-brand-accent",
                  isDone && "border-primary/30 text-primary",
                  !isActive && !isDone && "text-muted-foreground"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {entry.title}
              </div>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {step === 1 ? (
          <div className="space-y-4">
            <h3 className="text-base font-semibold">{t("admin.content.askLanguage")}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {LANGUAGES.map((language) => (
                <button
                  key={language.slug}
                  type="button"
                  disabled={!language.available}
                  onClick={() => setLanguageSlug(language.slug)}
                  className={cn(
                    "rounded-xl border p-4 text-start transition-all hover:border-brand-accent/50",
                    languageSlug === language.slug &&
                      "border-brand-accent bg-brand-accent/10",
                    !language.available && "cursor-not-allowed opacity-50"
                  )}
                >
                  <p className="text-2xl">{language.flagEmoji}</p>
                  <p className="mt-2 font-semibold">{language.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {language.available
                      ? t("common.available")
                      : t("common.comingSoon")}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="font-normal">
                {selectedLanguage?.name}
              </Badge>
            </div>
            <h3 className="text-base font-semibold">{t("admin.content.askLesson")}</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {levelOptions.map((level) => (
                <button
                  key={level.slug}
                  type="button"
                  onClick={() => setLevelSlug(level.slug)}
                  className={cn(
                    "rounded-lg border px-4 py-3 text-start transition-colors hover:border-brand-accent/50",
                    levelSlug === level.slug &&
                      "border-brand-accent bg-brand-accent/10"
                  )}
                >
                  <p className="font-semibold">{level.code}</p>
                  <p className="text-sm text-muted-foreground">{level.title}</p>
                </button>
              ))}
            </div>
            {lessonForLevel ? (
              <div className="rounded-xl border bg-muted/20 p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {t("admin.content.selectedLesson")}
                </p>
                <p className="mt-1 font-semibold">{lessonForLevel.title}</p>
                {lessonForLevel.description ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {lessonForLevel.description}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-destructive">
                {t("admin.content.noLessonMapped")}
              </p>
            )}
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-4">
              <p className="text-sm text-muted-foreground">
                {t("admin.content.contextSummary", {
                  language: selectedLanguage?.name ?? languageSlug,
                  level: levelOptions.find((level) => level.slug === levelSlug)?.code ?? levelSlug,
                  lesson: lessonForLevel?.title ?? t("admin.content.noLessonMapped"),
                })}
              </p>
            </div>
            <h3 className="text-base font-semibold">{t("admin.content.askCategory")}</h3>
            <div className="grid gap-3">
              {CONTENT_CATEGORIES.map((entry) => {
                const Icon = entry.icon;
                return (
                  <button
                    key={entry.slug}
                    type="button"
                    onClick={() => setCategory(entry.slug)}
                    className={cn(
                      "flex items-start gap-4 rounded-xl border p-4 text-start transition-colors hover:border-brand-accent/50",
                      category === entry.slug &&
                        "border-brand-accent bg-brand-accent/10"
                    )}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <p className="font-semibold">{t(entry.titleKey)}</p>
                      <p className="text-sm text-muted-foreground">
                        {t(entry.descriptionKey)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t(entry.featuresKey)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {step === 4 && wizardContext && selectedCategory ? (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{selectedLanguage?.name}</Badge>
              <Badge variant="secondary">
                {levelOptions.find((level) => level.slug === levelSlug)?.code}
              </Badge>
              <Badge variant="outline">{t(selectedCategory.titleKey)}</Badge>
            </div>
            <ContentFormPanel context={wizardContext} onSuccess={handleContentSuccess} />
            <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
              <Button type="button" variant="outline" onClick={resetWizard}>
                {t("admin.content.startOver")}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setCategory(null);
                  setStep(3);
                }}
              >
                {t("admin.content.addAnother")}
              </Button>
            </div>
          </div>
        ) : null}

        {step < 4 ? (
          <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={step === 1}
              onClick={() => setStep((current) => current - 1)}
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              {t("common.back")}
            </Button>
            <Button
              type="button"
              onClick={goNext}
              disabled={
                (step === 2 && !lessonForLevel) || (step === 3 && !category)
              }
            >
              {t("common.continue")}
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-start border-t border-white/10 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(3)}
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              {t("common.back")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
