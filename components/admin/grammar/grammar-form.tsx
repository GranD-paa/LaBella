"use client";

import { useEffect, useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import { createGrammarRule } from "@/app/admin/actions/grammar";
import {
  createGrammarRuleSchema,
  type GrammarRuleValues,
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

export function GrammarForm({
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

  const grammarRuleSchema = useMemo(() => createGrammarRuleSchema(t), [t]);

  const form = useForm<GrammarRuleValues>({
    resolver: zodResolver(grammarRuleSchema),
    defaultValues: {
      lessonId: defaultLessonId ?? "",
      title: "",
      description: "",
      example: "",
    },
  });

  const lessonId = form.watch("lessonId");

  useEffect(() => {
    if (lessonId) onLessonChange(lessonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  function onSubmit(values: GrammarRuleValues) {
    startTransition(async () => {
      const result = await createGrammarRule(values);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.grammar.added"));
      form.reset({
        lessonId: values.lessonId,
        title: "",
        description: "",
        example: "",
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.grammar.addTitle")}</CardTitle>
        <CardDescription>{t("admin.grammar.addDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common.title")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("admin.placeholders.grammarTitle")}
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
                  <FormLabel>{t("admin.fields.exampleOptional")}</FormLabel>
                  <FormControl>
                    <Textarea disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button type="submit" disabled={isPending || !lessons.length}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("common.adding")}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    {t("admin.grammar.addButton")}
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
