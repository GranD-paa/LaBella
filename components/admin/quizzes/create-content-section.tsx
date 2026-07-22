"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  ImageIcon,
  ListChecks,
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
import type {
  ContentCategorySlug,
  ContentWizardContext,
} from "@/lib/content-management/categories";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { Lesson } from "@/types";
import { cn } from "@/lib/utils";

const CONTENT_TYPES: Array<{
  slug: ContentCategorySlug;
  icon: typeof BookOpen;
  titleKey: string;
  descriptionKey: string;
  featuresKey: string;
}> = [
  {
    slug: "grammar",
    icon: BookOpen,
    titleKey: "admin.content.categories.grammar.title",
    descriptionKey: "admin.content.categories.grammar.description",
    featuresKey: "admin.content.categories.grammar.features",
  },
  {
    slug: "vocabulary",
    icon: ImageIcon,
    titleKey: "admin.content.categories.vocabulary.title",
    descriptionKey: "admin.content.categories.vocabulary.description",
    featuresKey: "admin.content.categories.vocabulary.features",
  },
  {
    slug: "video",
    icon: Clapperboard,
    titleKey: "admin.content.categories.video.title",
    descriptionKey: "admin.content.categories.video.description",
    featuresKey: "admin.content.categories.video.features",
  },
  {
    slug: "quiz",
    icon: ListChecks,
    titleKey: "admin.content.categories.quiz.title",
    descriptionKey: "admin.content.categories.quiz.description",
    featuresKey: "admin.content.categories.quiz.features",
  },
];

/**
 * Replaces the legacy quiz-creation wizard on /admin/quizzes.
 * Flow: Language → Lesson → Content Type → Create form.
 */
export function CreateContentSection({
  lessons,
  languages,
  onSuccess,
}: {
  lessons: Lesson[];
  languages: CurriculumLanguage[];
  onSuccess?: () => void;
}) {
  const { t } = useTranslations();
  const [step, setStep] = useState(1);
  const [languageSlug, setLanguageSlug] = useState("italian");
  const [levelSlug, setLevelSlug] = useState("a1-1");
  const [contentType, setContentType] = useState<ContentCategorySlug | null>(null);

  const selectedLanguage = useMemo(
    () => languages.find((language) => language.slug === languageSlug),
    [languages, languageSlug]
  );

  const levelOptions = useMemo(
    () => selectedLanguage?.levels ?? [],
    [selectedLanguage]
  );

  const selectedLevel = useMemo(
    () => levelOptions.find((level) => level.slug === levelSlug),
    [levelOptions, levelSlug]
  );

  const lessonForLevel = useMemo(() => {
    if (!selectedLevel) return null;
    return (
      lessons.find((lesson) => lesson.order_number === selectedLevel.orderNumber) ??
      null
    );
  }, [lessons, selectedLevel]);

  const selectedType = useMemo(
    () => CONTENT_TYPES.find((entry) => entry.slug === contentType) ?? null,
    [contentType]
  );

  const wizardContext: ContentWizardContext | null =
    lessonForLevel && contentType
      ? {
          languageSlug: languageSlug as ContentWizardContext["languageSlug"],
          levelSlug: levelSlug as ContentWizardContext["levelSlug"],
          lessonId: lessonForLevel.id,
          category: contentType,
        }
      : null;

  const steps = [
    { number: 1, label: t("admin.content.stepLanguage") },
    { number: 2, label: t("admin.content.stepLesson") },
    { number: 3, label: t("admin.content.stepContentType") },
    { number: 4, label: t("admin.content.stepCreate") },
  ];

  function resetFlow() {
    setStep(1);
    setLanguageSlug("italian");
    setLevelSlug("a1-1");
    setContentType(null);
  }

  function goNext() {
    if (step === 2 && !lessonForLevel) return;
    if (step === 3 && !contentType) return;
    if (step < 4) setStep((current) => current + 1);
  }

  return (
    <section
      id="create-content-section"
      data-testid="create-content-section"
      aria-labelledby="create-content-title"
    >
      <Card className="brand-surface overflow-hidden border-brand-accent/20">
        <CardHeader className="space-y-5 border-b border-white/10 bg-muted/10 pb-6">
          <div className="space-y-2">
            <Badge className="w-fit border-brand-accent/30 bg-brand-accent/10 text-brand-accent">
              CMS
            </Badge>
            <CardTitle id="create-content-title" className="text-2xl">
              {t("admin.content.wizardTitle")}
            </CardTitle>
            <CardDescription className="max-w-3xl text-pretty">
              {t("admin.content.wizardDescription")}
            </CardDescription>
          </div>

          <nav aria-label="Content creation steps">
            <ol className="grid gap-2 sm:grid-cols-4">
              {steps.map(({ number, label }) => {
                const isActive = step === number;
                const isDone = step > number;
                return (
                  <li
                    key={number}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium",
                      isActive &&
                        "border-brand-accent bg-brand-accent/10 text-brand-accent",
                      isDone && "border-primary/30 text-primary",
                      !isActive && !isDone && "border-white/10 text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                        isActive && "bg-brand-accent text-brand-accent-foreground",
                        isDone && "bg-primary/20 text-primary",
                        !isActive && !isDone && "bg-muted text-muted-foreground"
                      )}
                    >
                      {number}
                    </span>
                    <span className="truncate">{label}</span>
                  </li>
                );
              })}
            </ol>
          </nav>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {step === 1 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t("admin.content.askLanguage")}</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {languages.map((language) => (
                  <button
                    key={language.slug}
                    type="button"
                    disabled={!language.available}
                    onClick={() => setLanguageSlug(language.slug)}
                    className={cn(
                      "rounded-xl border p-4 text-start transition-all hover:border-brand-accent/50",
                      languageSlug === language.slug &&
                        "border-brand-accent bg-brand-accent/10 shadow-sm",
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
              <div className="rounded-lg border border-white/10 bg-muted/20 px-4 py-3 text-sm">
                <span className="text-muted-foreground">
                  {t("admin.content.selectedLanguage")}:{" "}
                </span>
                <span className="font-medium">{selectedLanguage?.name}</span>
              </div>
              <h3 className="text-lg font-semibold">{t("admin.content.askLesson")}</h3>
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
                <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("admin.content.selectedLesson")}
                  </p>
                  <p className="mt-1 text-lg font-semibold">{lessonForLevel.title}</p>
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
              <div className="rounded-lg border border-white/10 bg-muted/20 px-4 py-3 text-sm">
                {t("admin.content.contextSummary", {
                  language: selectedLanguage?.name ?? languageSlug,
                  level: selectedLevel?.code ?? levelSlug,
                  lesson: lessonForLevel?.title ?? t("admin.content.noLessonMapped"),
                })}
              </div>
              <h3 className="text-lg font-semibold">{t("admin.content.askContentType")}</h3>
              <div className="grid gap-3">
                {CONTENT_TYPES.map((entry) => {
                  const Icon = entry.icon;
                  return (
                    <button
                      key={entry.slug}
                      type="button"
                      onClick={() => setContentType(entry.slug)}
                      className={cn(
                        "flex items-start gap-4 rounded-xl border p-4 text-start transition-colors hover:border-brand-accent/50",
                        contentType === entry.slug &&
                          "border-brand-accent bg-brand-accent/10 shadow-sm"
                      )}
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 text-brand-accent">
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

          {step === 4 && wizardContext && selectedType ? (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{selectedLanguage?.name}</Badge>
                <Badge variant="secondary">{selectedLevel?.code}</Badge>
                <Badge variant="outline">{t(selectedType.titleKey)}</Badge>
              </div>
              <div className="rounded-xl border border-white/10 bg-muted/10 p-4 sm:p-6">
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <PenLine className="h-4 w-4 text-brand-accent" />
                  {t("admin.content.stepCreate")}
                </div>
                <ContentFormPanel
                  context={wizardContext}
                  onSuccess={() => onSuccess?.()}
                />
              </div>
              <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
                <Button type="button" variant="outline" onClick={resetFlow}>
                  {t("admin.content.startOver")}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    setContentType(null);
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
                  (step === 2 && !lessonForLevel) || (step === 3 && !contentType)
                }
              >
                {t("common.continue")}
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          ) : (
            <div className="flex justify-start border-t border-white/10 pt-4">
              <Button type="button" variant="outline" onClick={() => setStep(3)}>
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                {t("common.back")}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
