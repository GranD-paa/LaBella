"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Pencil } from "lucide-react";

import { updateVocabulary } from "@/app/admin/actions/vocabulary";
import {
  createVocabularySchema,
  type VocabularyValues,
} from "@/lib/validations/i18n/admin-schemas";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import type { Lesson, Vocabulary } from "@/types";

export function VocabularyEditDialog({
  vocabulary,
  lessons,
}: {
  vocabulary: Vocabulary;
  lessons: Lesson[];
}) {
  const { t } = useTranslations();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const vocabularySchema = useMemo(() => createVocabularySchema(t), [t]);

  const defaultValues: VocabularyValues = {
    lessonId: vocabulary.lesson_id,
    word: vocabulary.word,
    translation: vocabulary.translation,
    imageUrl: vocabulary.image_url ?? "",
    exampleSentence: vocabulary.example_sentence ?? "",
  };

  const form = useForm<VocabularyValues>({
    resolver: zodResolver(vocabularySchema),
    defaultValues,
  });

  function onSubmit(values: VocabularyValues) {
    startTransition(async () => {
      const result = await updateVocabulary(vocabulary.id, values);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.vocabulary.updated"));
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) form.reset(defaultValues);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("admin.vocabulary.editAriaLabel")}
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("admin.vocabulary.editTitle")}</DialogTitle>
          <DialogDescription>
            {t("admin.vocabulary.editDescription", { word: vocabulary.word })}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="lessonId"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormLabel>{t("admin.fields.imageUrl")}</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} />
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
                  <FormLabel>{t("admin.fields.exampleSentence")}</FormLabel>
                  <FormControl>
                    <Textarea disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("common.saving")}
                  </>
                ) : (
                  t("common.saveChanges")
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
