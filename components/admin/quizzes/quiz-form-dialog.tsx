"use client";

import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import { createQuizWithQuestions } from "@/app/admin/actions/quizzes";
import { quizSchema, type QuizValues } from "@/lib/validations/admin";
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
import { LessonPicker } from "@/components/admin/lesson-picker";
import { QuizQuestionFields } from "@/components/admin/quizzes/quiz-question-fields";
import type { Lesson } from "@/types";

const emptyQuestion = {
  questionText: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOption: "a" as const,
};

export function QuizFormDialog({
  lessons,
  defaultLessonId,
}: {
  lessons: Lesson[];
  defaultLessonId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

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
        toast.error(result.error);
        return;
      }

      toast.success("Quiz created");
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
          New quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a quiz</DialogTitle>
          <DialogDescription>
            Add a quiz with one or more multiple-choice questions.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="lessonId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lesson</FormLabel>
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
                  <FormLabel>Quiz title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Lesson 1 Checkpoint"
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
                <h3 className="text-sm font-medium">Questions</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ ...emptyQuestion })}
                  disabled={isPending}
                >
                  <Plus className="h-4 w-4" />
                  Add question
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
                    Creating...
                  </>
                ) : (
                  "Create quiz"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
