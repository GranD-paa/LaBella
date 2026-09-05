"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  createContentGrammar,
  createContentVocabulary,
  createContentVideo,
} from "@/app/admin/actions/content";
import { createStructuredQuiz } from "@/app/admin/actions/quizzes";
import { WizardQuestionFields } from "@/components/admin/quizzes/wizard-question-fields";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { ContentWizardContext } from "@/lib/content-management/categories";
import { LEVEL_EXAM_SECTION } from "@/lib/quiz-management/types";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { MAX_PDF_BYTES, MAX_PDF_PAGES } from "@/lib/storage/pdf-limits";
import {
  createContentVocabularySchema,
  createStructuredQuizSchema,
  createVideoLessonSchema,
  type StructuredQuizValues,
} from "@/lib/validations/i18n/admin-schemas";

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

function ContentActionBar({
  isPending,
  onSaveDraft,
  onPublish,
}: {
  isPending: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
}) {
  const { t } = useTranslations();

  return (
    <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4">
      <Button
        type="button"
        variant="outline"
        className="border-white/20"
        disabled={isPending}
        onClick={onSaveDraft}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : null}
        {t("admin.content.saveDraft")}
      </Button>
      <Button type="button" disabled={isPending} onClick={onPublish}>
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : null}
        {t("admin.content.publishContent")}
      </Button>
    </div>
  );
}

type GrammarEntry = {
  key: string;
  title: string;
  file: File | null;
};

function emptyGrammarEntry(): GrammarEntry {
  return { key: crypto.randomUUID(), title: "", file: null };
}

export function GrammarContentPanel({
  context,
  onSuccess,
}: {
  context: ContentWizardContext;
  onSuccess: (published: boolean) => void;
}) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [entries, setEntries] = useState<GrammarEntry[]>([emptyGrammarEntry()]);
  const [done, setDone] = useState(0);

  const filled = entries.filter(
    (entry) => entry.title.trim().length >= 2 && entry.file !== null
  );
  const ready = filled.length > 0 && filled.length === entries.length;

  function update(key: string, patch: Partial<GrammarEntry>) {
    setEntries((current) =>
      current.map((entry) => (entry.key === key ? { ...entry, ...patch } : entry))
    );
  }

  /**
   * Sends one title at a time rather than all at once.
   *
   * Each PDF is rendered page by page on the server, so a batch of them is
   * minutes of work. Doing them in sequence means the count on the button is
   * honest, and that a document which fails does not take the ones already
   * stored down with it — the admin keeps that work and is told which title to
   * try again.
   */
  function submit(status: "draft" | "published") {
    if (!ready || isPending) return;

    startTransition(async () => {
      setDone(0);

      for (let index = 0; index < entries.length; index += 1) {
        const entry = entries[index];
        const formData = new FormData();
        formData.set("lessonId", context.lessonId);
        formData.set("title", entry.title.trim());
        formData.set("status", status);
        formData.set("document", entry.file as File);

        const result = await createContentGrammar(formData);

        if ("error" in result) {
          toast.error(resolveMessage(t, result.error));
          if (index > 0) {
            toast.info(
              t("admin.content.grammar.stoppedAt", { title: entry.title.trim() })
            );
          }
          // Drop what was stored and keep what still needs doing, so pressing
          // the button again does not create the same titles twice.
          setEntries(entries.slice(index));
          setDone(0);
          return;
        }

        setDone(index + 1);
      }

      toast.success(
        status === "published"
          ? t("admin.content.publishedContent")
          : t("admin.content.savedDraft")
      );
      setEntries([emptyGrammarEntry()]);
      setDone(0);
      onSuccess(status === "published");
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t("admin.content.grammar.formTitle")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("admin.content.grammar.formDescription")}
        </p>
      </div>

      <div className="space-y-4">
        {entries.map((entry, index) => (
          <GrammarEntryFields
            key={entry.key}
            entry={entry}
            index={index}
            total={entries.length}
            disabled={isPending}
            onChange={(patch) => update(entry.key, patch)}
            onRemove={() =>
              setEntries((current) =>
                current.filter((item) => item.key !== entry.key)
              )
            }
          />
        ))}

        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() =>
            setEntries((current) => [...current, emptyGrammarEntry()])
          }
        >
          <Plus className="h-4 w-4" />
          {t("admin.content.grammar.addAnother")}
        </Button>

        {isPending && entries.length > 1 ? (
          <p className="text-sm text-muted-foreground">
            {t("admin.content.grammar.progress", {
              done: done,
              total: entries.length,
            })}
          </p>
        ) : null}

        <ContentActionBar
          isPending={isPending}
          onSaveDraft={() => submit("draft")}
          onPublish={() => submit("published")}
        />
      </div>
    </div>
  );
}

/** One title and the document that belongs under it. */
function GrammarEntryFields({
  entry,
  index,
  total,
  disabled,
  onChange,
  onRemove,
}: {
  entry: GrammarEntry;
  index: number;
  total: number;
  disabled: boolean;
  onChange: (patch: Partial<GrammarEntry>) => void;
  onRemove: () => void;
}) {
  const { t } = useTranslations();
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = `grammar-title-${entry.key}`;

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">
          {t("admin.content.grammar.entryNumber", { number: index + 1 })}
        </span>
        {total > 1 ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={onRemove}
            aria-label={t("admin.content.grammar.removeEntry")}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor={titleId}>{t("common.title")}</Label>
        <Input
          id={titleId}
          value={entry.title}
          disabled={disabled}
          onChange={(event) => onChange({ title: event.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label>{t("admin.content.grammar.documentLabel")}</Label>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => onChange({ file: event.target.files?.[0] ?? null })}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="flex w-full items-center gap-3 rounded-lg border border-dashed px-4 py-6 text-start transition hover:border-solid hover:bg-muted/30 disabled:opacity-60"
        >
          <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
          <span className="min-w-0">
            <span dir="auto" className="block truncate text-sm font-medium">
              {entry.file
                ? entry.file.name
                : t("admin.content.grammar.choosePdf")}
            </span>
            <span className="block text-xs text-muted-foreground">
              {t("admin.content.grammar.documentHint", {
                pages: MAX_PDF_PAGES,
                size: MAX_PDF_BYTES / (1024 * 1024),
              })}
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export function VocabularyContentPanel({
  context,
  onSuccess,
}: {
  context: ContentWizardContext;
  onSuccess: (published: boolean) => void;
}) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const schema = useMemo(() => createContentVocabularySchema(t), [t]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      lessonId: context.lessonId,
      word: "",
      translation: "",
      imageUrl: "",
      exampleSentence: "",
      pronunciation: "",
      status: "draft" as const,
    },
  });

  function submit(status: "draft" | "published") {
    startTransition(async () => {
      const values = { ...form.getValues(), status };
      const result = await createContentVocabulary(values);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(
        status === "published"
          ? t("admin.content.publishedContent")
          : t("admin.content.savedDraft")
      );
      form.reset({
        lessonId: context.lessonId,
        word: "",
        translation: "",
        imageUrl: "",
        exampleSentence: "",
        pronunciation: "",
        status: "draft",
      });
      onSuccess(status === "published");
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">
          {t("admin.content.vocabulary.formTitle")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("admin.content.vocabulary.formDescription")}
        </p>
      </div>
      <Form {...form}>
        <form className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="word"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.fields.word")}</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="translation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.fields.translation")}</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="sm:col-span-2">
                <FormLabel>{t("admin.fields.imageUrl")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("admin.placeholders.imageUrl")}
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
            name="pronunciation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.content.vocabulary.pronunciationLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("admin.content.vocabulary.pronunciationPlaceholder")}
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
            name="exampleSentence"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.fields.exampleSentenceOptional")}</FormLabel>
                <FormControl>
                  <Textarea disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="sm:col-span-2">
            <ContentActionBar
              isPending={isPending}
              onSaveDraft={() => form.handleSubmit(() => submit("draft"))()}
              onPublish={() => form.handleSubmit(() => submit("published"))()}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}

export function VideoContentPanel({
  context,
  onSuccess,
}: {
  context: ContentWizardContext;
  onSuccess: (published: boolean) => void;
}) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const schema = useMemo(() => createVideoLessonSchema(t), [t]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      lessonId: context.lessonId,
      languageSlug: context.languageSlug,
      levelSlug: context.levelSlug,
      title: "",
      description: "",
      videoUrl: "",
      thumbnailUrl: "",
      status: "draft" as const,
    },
  });

  function submit(status: "draft" | "published") {
    startTransition(async () => {
      const values = { ...form.getValues(), status };
      const result = await createContentVideo(values);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(
        status === "published"
          ? t("admin.content.publishedContent")
          : t("admin.content.savedDraft")
      );
      form.reset({
        lessonId: context.lessonId,
        languageSlug: context.languageSlug,
        levelSlug: context.levelSlug,
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
        status: "draft",
      });
      onSuccess(status === "published");
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t("admin.content.video.formTitle")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("admin.content.video.formDescription")}
        </p>
      </div>
      <Form {...form}>
        <form className="grid gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("common.title")}</FormLabel>
                <FormControl>
                  <Input disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.fields.descriptionOptional")}</FormLabel>
                <FormControl>
                  <Textarea disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.content.video.videoUrlLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("admin.content.video.videoUrlPlaceholder")}
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
            name="thumbnailUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.content.video.thumbnailLabel")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("admin.content.video.thumbnailPlaceholder")}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ContentActionBar
            isPending={isPending}
            onSaveDraft={() => form.handleSubmit(() => submit("draft"))()}
            onPublish={() => form.handleSubmit(() => submit("published"))()}
          />
        </form>
      </Form>
    </div>
  );
}

const MAX_QUIZ_QUESTIONS = 20;

export function QuizContentPanel({
  context,
  onSuccess,
}: {
  context: ContentWizardContext;
  onSuccess: (published: boolean) => void;
}) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [questionCount, setQuestionCount] = useState(1);
  const schema = useMemo(() => createStructuredQuizSchema(t), [t]);

  // A level exam is filed under its own section, which is what makes it a paid
  // entitlement rather than one of the free per-lesson quizzes.
  const sectionSlug =
    context.category === "level-exam" ? LEVEL_EXAM_SECTION : "quiz";

  const form = useForm<StructuredQuizValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      lessonId: context.lessonId,
      languageSlug: context.languageSlug,
      levelSlug: context.levelSlug,
      sectionSlug,
      title: "",
      status: "draft",
      questions: [{ ...emptyQuestion }],
    },
  });

  const { fields, replace } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  function applyQuestionCount(count: number) {
    const clamped = Math.min(
      MAX_QUIZ_QUESTIONS,
      Math.max(1, Number.isFinite(count) ? Math.round(count) : 1)
    );
    setQuestionCount(clamped);
    const current = form.getValues("questions");
    const next = Array.from({ length: clamped }, (_, index) => ({
      ...(current[index] ?? { ...emptyQuestion }),
    }));
    replace(next);
  }

  function submit(status: "draft" | "published") {
    startTransition(async () => {
      const values = { ...form.getValues(), status };
      const result = await createStructuredQuiz(values);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(
        status === "published"
          ? t("admin.content.publishedQuiz", {
              level: context.levelSlug.toUpperCase(),
            })
          : t("admin.content.savedDraft")
      );
      form.reset({
        lessonId: context.lessonId,
        languageSlug: context.languageSlug,
        levelSlug: context.levelSlug,
        sectionSlug,
        title: "",
        status: "draft",
        questions: [{ ...emptyQuestion }],
      });
      setQuestionCount(1);
      onSuccess(status === "published");
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{t("admin.content.quiz.formTitle")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("admin.content.quiz.formDescription")}
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.content.quiz.quizTitle")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("admin.content.quiz.quizTitlePlaceholder")}
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="rounded-lg border border-white/10 bg-muted/20 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <Label htmlFor="quiz-question-count">
                  {t("admin.content.quiz.questionCountLabel")}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {t("admin.content.quiz.questionCountHint")}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                  disabled={isPending || questionCount <= 1}
                  onClick={() => applyQuestionCount(questionCount - 1)}
                >
                  −
                </Button>
                <Input
                  id="quiz-question-count"
                  type="number"
                  min={1}
                  max={MAX_QUIZ_QUESTIONS}
                  value={questionCount}
                  disabled={isPending}
                  className="h-9 w-20 text-center"
                  onChange={(event) => {
                    const value = Number.parseInt(event.target.value, 10);
                    if (!Number.isNaN(value)) {
                      applyQuestionCount(value);
                    }
                  }}
                  onBlur={(event) => {
                    const value = Number.parseInt(event.target.value, 10);
                    applyQuestionCount(Number.isNaN(value) ? 1 : value);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 shrink-0"
                  disabled={isPending || questionCount >= MAX_QUIZ_QUESTIONS}
                  onClick={() => applyQuestionCount(questionCount + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {t("admin.content.quiz.questionsGenerated", { count: fields.length })}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">{t("admin.quizzes.quizQuestions")}</h4>
            {fields.map((fieldItem, index) => (
              <WizardQuestionFields
                key={fieldItem.id}
                control={form.control}
                index={index}
                onRemove={() => {}}
                canRemove={false}
                disabled={isPending}
              />
            ))}
          </div>

          <ContentActionBar
            isPending={isPending}
            onSaveDraft={() =>
              form.handleSubmit(
                () => submit("draft"),
                () => toast.error(t("actions.errors.formCheck"))
              )()
            }
            onPublish={() =>
              form.handleSubmit(
                () => submit("published"),
                () => toast.error(t("actions.errors.formCheck"))
              )()
            }
          />
        </form>
      </Form>
    </div>
  );
}

export function ContentFormPanel({
  context,
  onSuccess,
}: {
  context: ContentWizardContext;
  onSuccess: (published: boolean) => void;
}) {
  switch (context.category) {
    case "grammar":
      return <GrammarContentPanel context={context} onSuccess={onSuccess} />;
    case "vocabulary":
      return <VocabularyContentPanel context={context} onSuccess={onSuccess} />;
    case "video":
      return <VideoContentPanel context={context} onSuccess={onSuccess} />;
    case "quiz":
    // The level exam is authored with the same question builder; only the
    // section it is filed under differs, and QuizContentPanel derives that
    // from the category.
    case "level-exam":
      return <QuizContentPanel context={context} onSuccess={onSuccess} />;
    default:
      return null;
  }
}
