"use client";

import { useEffect, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import { createVocabulary } from "@/app/admin/actions/vocabulary";
import {
  createVocabularySchema,
  type VocabularyValues,
} from "@/lib/validations/i18n/admin-schemas";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { LessonPicker } from "@/components/admin/lesson-picker";
import { useTranslations } from "@/components/providers/locale-provider";
import type { Lesson } from "@/types";

export function VocabularyForm({
  lessons,
  defaultLessonId,
  onLessonChange,
}: {
  lessons: Lesson[];
  defaultLessonId?: string;
  onLessonChange: (lessonId: string) => void;
}) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();

  const vocabularySchema = useMemo(() => createVocabularySchema(t), [t]);

  const form = useForm<VocabularyValues>({
    resolver: zodResolver(vocabularySchema),
    defaultValues: {
      lessonId: defaultLessonId ?? "",
      word: "",
      translation: "",
      imageUrl: "",
      exampleSentence: "",
    },
  });

  const lessonId = form.watch("lessonId");

  useEffect(() => {
    if (lessonId) onLessonChange(lessonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  function onSubmit(values: VocabularyValues) {
    startTransition(async () => {
      const result = await createVocabulary(values);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.vocabulary.added"));
      form.reset({
        lessonId: values.lessonId,
        word: "",
        translation: "",
        imageUrl: "",
        exampleSentence: "",
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.vocabulary.addTitle")}</CardTitle>
        <CardDescription>{t("admin.vocabulary.addDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="lessonId"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>{t("admin.fields.lesson")}</FormLabel>
                  <FormControl>
                    <LessonPicker
                      lessons={lessons}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.fields.word")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("admin.placeholders.word")}
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
              name="translation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.fields.translation")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("admin.placeholders.translation")}
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.fields.imageUrlOptional")}</FormLabel>
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
              <Button type="submit" disabled={isPending || !lessons.length}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("common.adding")}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    {t("admin.vocabulary.addButton")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
