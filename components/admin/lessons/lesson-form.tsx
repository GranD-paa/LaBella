"use client";

import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import { createLesson } from "@/app/admin/actions/lessons";
import {
  createLessonSchema,
  type LessonValues,
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
import { useTranslations } from "@/components/providers/locale-provider";

export function LessonForm() {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();

  const lessonSchema = useMemo(() => createLessonSchema(t), [t]);

  const form = useForm<LessonValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: { title: "", description: "", orderNumber: 0 },
  });

  function onSubmit(values: LessonValues) {
    startTransition(async () => {
      const result = await createLesson(values);
      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }
      toast.success(t("admin.lessons.created"));
      form.reset({ title: "", description: "", orderNumber: 0 });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("admin.lessons.addTitle")}</CardTitle>
        <CardDescription>{t("admin.lessons.addDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-[2fr_1fr]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("common.title")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("admin.placeholders.lessonTitle")}
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
              name="orderNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("admin.fields.orderNumber")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isPending}
                      {...field}
                      onChange={(event) =>
                        field.onChange(event.target.valueAsNumber)
                      }
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
                <FormItem className="sm:col-span-2">
                  <FormLabel>{t("common.description")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("admin.placeholders.lessonDescription")}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="sm:col-span-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("common.creating")}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    {t("admin.lessons.addLesson")}
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
