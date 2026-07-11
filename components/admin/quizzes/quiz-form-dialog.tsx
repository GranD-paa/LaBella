"use client";

import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Pencil, Plus } from "lucide-react";

import {
  createQuizWithQuestions,
  updateQuizWithQuestions,
} from "@/app/admin/actions/quizzes";
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
import type { Lesson, Quiz, QuizQuestion } from "@/types";

const emptyQuestion = {
  questionText: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOption: "a" as const,
};

function toFormQuestions(questions: QuizQuestion[]): QuizValues["questions"] {
  return questions.map((q) => ({
    questionText: q.question_text,
    optionA: q.option_a,
    optionB: q.option_b,
    optionC: q.option_c,
    optionD: q.option_d,
    correctOption: q.correct_option,
  }));
}

export function QuizFormDialog({
  lessons,
  defaultLessonId,
  quiz,
  initialQuestions,
}: {
  lessons: Lesson[];
  defaultLessonId?: string;
  quiz?: Quiz;
  initialQuestions?: QuizQuestion[];
}) {
  const isEdit = Boolean(quiz);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const defaultValues: QuizValues = {
    lessonId: quiz?.lesson_id ?? defaultLessonId ?? "",
    title: quiz?.title ?? "",
    questions:
      quiz && initialQuestions?.length
        ? toFormQuestions(initialQuestions)
        : [{ ...emptyQuestion }],
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
      const result =
        isEdit && quiz
          ? await updateQuizWithQuestions(quiz.id, values)
          : await createQuizWithQuestions(values);

      if ("error" in result) {
        toast.error(result.error);
        return;
      }

      toast.success(isEdit ? "Quiz updated" : "Quiz created");
      setOpen(false);
      if (!isEdit) {
        form.reset({
          lessonId: values.lessonId,
          title: "",
          questions: [{ ...emptyQuestion }],
        });
      }
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
        {isEdit ? (
          <Button variant="ghost" size="icon" aria-label="Edit quiz">
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button disabled={!lessons.length}>
            <Plus className="h-4 w-4" />
            New quiz
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit quiz" : "Create a quiz"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? `Update "${quiz?.title}" and its questions.`
              : "Add a quiz with one or more multiple-choice questions."}
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
                    Saving...
                  </>
                ) : isEdit ? (
                  "Save changes"
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
