"use client";

import { useMemo, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
  Layers,
  Loader2,
  Plus,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { createStructuredQuiz } from "@/app/admin/actions/quizzes";
import { WizardQuestionFields } from "@/components/admin/quizzes/wizard-question-fields";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES } from "@/lib/curriculum/languages";
import {
  getQuizSectionDescriptionKey,
  getQuizSectionTitleKey,
} from "@/lib/i18n/quiz-sections";
import { QUIZ_SECTIONS } from "@/lib/quiz-management/types";
import {
  createStructuredQuizSchema,
  type StructuredQuizValues,
} from "@/lib/validations/i18n/admin-schemas";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import type { Lesson } from "@/types";
import { cn } from "@/lib/utils";

const emptyQuestion = {
  questionType: "multiple_choice" as const,
  questionText: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOption: "a" as const,
  expectedAnswer: "",
  explanation: "",
};

export function QuizCreationWizard({
  lessons,
  onSuccess,
}: {
  lessons: Lesson[];
  onSuccess?: () => void;
}) {
  const { t } = useTranslations();
  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();

  const steps = useMemo(
    () =>
      [
        { id: 1, title: t("admin.quizzes.stepLanguage"), icon: Globe },
        { id: 2, title: t("admin.quizzes.stepLevel"), icon: Layers },
        { id: 3, title: t("admin.quizzes.stepSection"), icon: Sparkles },
        { id: 4, title: t("admin.quizzes.stepLesson"), icon: BookOpen },
        { id: 5, title: t("admin.quizzes.stepQuestions"), icon: Check },
      ] as const,
    [t]
  );

  const structuredQuizSchema = useMemo(() => createStructuredQuizSchema(t), [t]);

  const form = useForm<StructuredQuizValues>({
    resolver: zodResolver(structuredQuizSchema),
    defaultValues: {
      languageSlug: "italian",
      levelSlug: "a1-1",
      lessonId: lessons[0]?.id ?? "",
      sectionSlug: "quiz",
      title: "",
      status: "draft",
      questions: [{ ...emptyQuestion }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const languageSlug = form.watch("languageSlug");
  const levelSlug = form.watch("levelSlug");
  const sectionSlug = form.watch("sectionSlug");

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

  const selectedSectionLabel = useMemo(() => {
    const titleKey = getQuizSectionTitleKey(sectionSlug);
    const section = QUIZ_SECTIONS.find((entry) => entry.slug === sectionSlug);
    return titleKey ? t(titleKey) : section?.title ?? sectionSlug;
  }, [sectionSlug, t]);

  function goNext() {
    if (step === 4) {
      if (!lessonForLevel) {
        form.setError("lessonId", {
          type: "manual",
          message: t("admin.quizzes.noLessonMapped"),
        });
        return;
      }
      form.setValue("lessonId", lessonForLevel.id);
    }

    const fieldsByStep: Record<number, (keyof StructuredQuizValues)[]> = {
      1: ["languageSlug"],
      2: ["levelSlug"],
      3: ["sectionSlug"],
      4: ["lessonId", "title", "status"],
      5: ["questions"],
    };

    form.trigger(fieldsByStep[step]).then((valid) => {
      if (!valid) return;
      if (step < 5) {
        setStep((current) => current + 1);
      }
    });
  }

  function onSubmit(values: StructuredQuizValues) {
    const payload = {
      ...values,
      lessonId: lessonForLevel?.id ?? values.lessonId,
    };

    startTransition(async () => {
      const result = await createStructuredQuiz(payload);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }

      toast.success(
        values.status === "published"
          ? t("admin.quizzes.quizPublished")
          : t("admin.quizzes.quizSavedDraft")
      );
      form.reset({
        languageSlug: "italian",
        levelSlug: "a1-1",
        lessonId: lessons[0]?.id ?? "",
        sectionSlug: "quiz",
        title: "",
        status: "draft",
        questions: [{ ...emptyQuestion }],
      });
      setStep(1);
      onSuccess?.();
    });
  }

  return (
    <Card className="brand-surface">
      <CardHeader>
        <CardTitle>{t("admin.quizzes.wizardTitle")}</CardTitle>
        <CardDescription>{t("admin.quizzes.wizardDescription")}</CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
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
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 ? (
              <FormField
                control={form.control}
                name="languageSlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.quizzes.selectLanguage")}</FormLabel>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {LANGUAGES.map((language) => (
                        <button
                          key={language.slug}
                          type="button"
                          disabled={!language.available || isPending}
                          onClick={() => field.onChange(language.slug)}
                          className={cn(
                            "rounded-xl border p-4 text-left transition-all hover:border-brand-accent/50",
                            field.value === language.slug &&
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {step === 2 ? (
              <FormField
                control={form.control}
                name="levelSlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.quizzes.selectLevel")}</FormLabel>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {levelOptions.map((level) => (
                        <button
                          key={level.slug}
                          type="button"
                          disabled={isPending}
                          onClick={() => field.onChange(level.slug)}
                          className={cn(
                            "rounded-lg border px-4 py-3 text-left transition-colors hover:border-brand-accent/50",
                            field.value === level.slug &&
                              "border-brand-accent bg-brand-accent/10"
                          )}
                        >
                          <p className="font-semibold">{level.code}</p>
                          <p className="text-sm text-muted-foreground">
                            {level.title}
                          </p>
                        </button>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {step === 3 ? (
              <FormField
                control={form.control}
                name="sectionSlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("admin.quizzes.learningSection")}</FormLabel>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {QUIZ_SECTIONS.map((section) => {
                        const titleKey = getQuizSectionTitleKey(section.slug);
                        const descriptionKey = getQuizSectionDescriptionKey(
                          section.slug
                        );

                        return (
                          <button
                            key={section.slug}
                            type="button"
                            disabled={isPending}
                            onClick={() => field.onChange(section.slug)}
                            className={cn(
                              "rounded-lg border px-4 py-3 text-left transition-colors hover:border-brand-accent/50",
                              field.value === section.slug &&
                                "border-brand-accent bg-brand-accent/10"
                            )}
                          >
                            <p className="font-semibold">
                              {titleKey ? t(titleKey) : section.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {descriptionKey
                                ? t(descriptionKey)
                                : section.description}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {step === 4 ? (
              <div className="space-y-4">
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("admin.quizzes.learningSection")}
                  </p>
                  <p className="mt-1 text-lg font-semibold">{selectedSectionLabel}</p>
                </div>
                <div className="rounded-xl border bg-muted/30 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {t("admin.quizzes.selectedLesson")}
                  </p>
                  <p className="mt-1 text-lg font-semibold">
                    {lessonForLevel?.title ?? t("admin.quizzes.noLessonMapped")}
                  </p>
                  {lessonForLevel?.description ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {lessonForLevel.description}
                    </p>
                  ) : null}
                  {!lessonForLevel ? (
                    <p className="mt-2 text-sm text-destructive">
                      {form.formState.errors.lessonId?.message ??
                        t("admin.quizzes.noLessonMapped")}
                    </p>
                  ) : null}
                </div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("admin.quizzes.quizTitle")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("admin.quizzes.wizardTitlePlaceholder")}
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("admin.quizzes.publishStatus")}</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">
                            {t("admin.quizzes.saveAsDraft")}
                          </SelectItem>
                          <SelectItem value="published">
                            {t("admin.quizzes.publishNow")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : null}

            {step === 5 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    {t("admin.quizzes.quizQuestions")}
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ ...emptyQuestion })}
                    disabled={isPending}
                  >
                    <Plus className="h-4 w-4" />
                    {t("admin.quizzes.addQuestion")}
                  </Button>
                </div>
                {fields.map((fieldItem, index) => (
                  <WizardQuestionFields
                    key={fieldItem.id}
                    control={form.control}
                    index={index}
                    onRemove={() => remove(index)}
                    canRemove={fields.length > 1}
                    disabled={isPending}
                  />
                ))}
              </div>
            ) : null}

            <div className="flex flex-wrap justify-between gap-3 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={step === 1 || isPending}
                onClick={() => setStep((current) => current - 1)}
              >
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                {t("common.back")}
              </Button>
              {step < 5 ? (
                <Button type="button" onClick={goNext} disabled={isPending}>
                  {t("common.continue")}
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              ) : (
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("common.saving")}
                    </>
                  ) : (
                    t("admin.quizzes.createQuiz")
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
