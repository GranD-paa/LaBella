"use client";

import { useMemo, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import { createQuizWithQuestions } from "@/app/admin/actions/quizzes";
import { QuizQuestionFields } from "@/components/admin/quizzes/quiz-question-fields";
import { LessonPicker } from "@/components/admin/lesson-picker";
import { useTranslations } from "@/components/providers/locale-provider";
import {
  createQuizSchema,
  type QuizValues,
} from "@/lib/validations/i18n/admin-schemas";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { Lesson } from "@/types";

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

export function QuizFormDialog({
  lessons,
  defaultLessonId,
}: {
  lessons: Lesson[];
  defaultLessonId?: string;
}) {
  const { t } = useTranslations();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const quizSchema = useMemo(() => createQuizSchema(t), [t]);

  const defaultValues: QuizValues = {
    lessonId: defaultLessonId ?? lessons[0]?.id ?? "",
    title: "",
    questions: [{ ...emptyQuestion }],
  };

  const form = useForm<QuizValues>({
    resolver: zodResolver(quizSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  function onSubmit(values: QuizValues) {
    startTransition(async () => {
      const result = await createQuizWithQuestions(values);

      if ("error" in result) {
        toast.error(resolveMessage(t, result.error));
        return;
      }

      toast.success(t("admin.quizzes.quizCreated"));
      setOpen(false);
      form.reset({
        lessonId: values.lessonId,
        title: "",
        questions: [{ ...emptyQuestion }],
      });
    });
  }

  const questionsError = form.formState.errors.questions;
  const questionsErrorMessage =
    questionsError && "message" in questionsError
      ? (questionsError as { message?: string }).message
      : undefined;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) form.reset(defaultValues);
      }}
    >
      <DialogTrigger asChild>
        <Button disabled={!lessons.length}>
          <Plus className="h-4 w-4" />
          {t("admin.quizzes.newQuiz")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("admin.quizzes.createTitle")}</DialogTitle>
          <DialogDescription>{t("admin.quizzes.createDescription")}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <FormLabel>{t("admin.quizzes.quizTitle")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("admin.quizzes.titlePlaceholder")}
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">
                  {t("admin.quizzes.questionsHeading")}
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
              {questionsErrorMessage ? (
                <p className="text-sm font-medium text-destructive">
                  {questionsErrorMessage}
                </p>
              ) : null}
              {fields.map((fieldItem, index) => (
                <QuizQuestionFields
                  key={fieldItem.id}
                  control={form.control}
                  index={index}
                  onRemove={() => remove(index)}
                  canRemove={fields.length > 1}
                  disabled={isPending}
                />
              ))}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t("common.creating")}
                  </>
                ) : (
                  t("admin.quizzes.createQuiz")
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
