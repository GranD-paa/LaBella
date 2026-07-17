"use client";

import { useMemo, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus } from "lucide-react";
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
import { resolveMessage } from "@/lib/i18n/resolve-message";
import {
  createContentGrammarRuleSchema,
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

export function GrammarContentPanel({
  context,
  onSuccess,
}: {
  context: ContentWizardContext;
  onSuccess: (published: boolean) => void;
}) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const schema = useMemo(() => createContentGrammarRuleSchema(t), [t]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      lessonId: context.lessonId,
      title: "",
      description: "",
      example: "",
      status: "draft" as const,
    },
  });

  function submit(status: "draft" | "published") {
    startTransition(async () => {
      const values = { ...form.getValues(), status };
      const result = await createContentGrammar(values);
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
        title: "",
        description: "",
        example: "",
        status: "draft",
      });
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
            name="example"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.content.grammar.exerciseLabel")}</FormLabel>
                <FormControl>
                  <Textarea disabled={isPending} {...field} />
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

export function QuizContentPanel({
  context,
  onSuccess,
}: {
  context: ContentWizardContext;
  onSuccess: (published: boolean) => void;
}) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const schema = useMemo(() => createStructuredQuizSchema(t), [t]);

  const form = useForm<StructuredQuizValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      lessonId: context.lessonId,
      languageSlug: context.languageSlug,
      levelSlug: context.levelSlug,
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
          ? t("admin.content.publishedContent")
          : t("admin.content.savedDraft")
      );
      form.reset({
        lessonId: context.lessonId,
        languageSlug: context.languageSlug,
        levelSlug: context.levelSlug,
        sectionSlug: "quiz",
        title: "",
        status: "draft",
        questions: [{ ...emptyQuestion }],
      });
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

          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-medium">{t("admin.quizzes.quizQuestions")}</h4>
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
      return <QuizContentPanel context={context} onSuccess={onSuccess} />;
    default:
      return null;
  }
}
