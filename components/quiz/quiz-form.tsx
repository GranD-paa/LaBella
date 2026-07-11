"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { submitQuizAction } from "@/app/actions/quiz";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  createSubmitQuizSchema,
  type SubmitQuizValues,
} from "@/lib/validations/quiz";
import type { QuizQuestion } from "@/types";
import type { Json } from "@/types/database.types";

type PublicQuizQuestion = Pick<
  QuizQuestion,
  | "id"
  | "question_text"
  | "option_a"
  | "option_b"
  | "option_c"
  | "option_d"
>;

const OPTION_LABELS = [
  { key: "a" as const, label: "A", field: "option_a" as const },
  { key: "b" as const, label: "B", field: "option_b" as const },
  { key: "c" as const, label: "C", field: "option_c" as const },
  { key: "d" as const, label: "D", field: "option_d" as const },
];

function parseSavedAnswers(answersJson: Json): Record<string, "a" | "b" | "c" | "d"> {
  if (
    typeof answersJson === "object" &&
    answersJson !== null &&
    !Array.isArray(answersJson)
  ) {
    return answersJson as Record<string, "a" | "b" | "c" | "d">;
  }
  return {};
}

export function QuizForm({
  quizId,
  questions,
  lessonId,
  locked = false,
  existingScore,
  savedAnswers,
}: {
  quizId: string;
  questions: PublicQuizQuestion[];
  lessonId: string;
  locked?: boolean;
  existingScore?: number;
  savedAnswers?: Json;
}) {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  const lockedAnswers = useMemo(
    () => (savedAnswers ? parseSavedAnswers(savedAnswers) : {}),
    [savedAnswers]
  );

  const schema = useMemo(
    () => createSubmitQuizSchema(questions.map((question) => question.id)),
    [questions]
  );

  const form = useForm<SubmitQuizValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      quizId,
      answers: locked ? lockedAnswers : {},
    },
  });

  function onSubmit(values: SubmitQuizValues) {
    if (locked) {
      return;
    }

    setFormError(null);
    startTransition(async () => {
      const result = await submitQuizAction({
        quizId,
        answers: values.answers,
      });
      if (result && "error" in result) {
        setFormError(result.error);
        toast.error(result.error);
      }
    });
  }

  return (
    <div className="space-y-6">
      {locked ? (
        <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div className="space-y-1">
              <p className="font-semibold">
                You have already completed this quiz.
              </p>
              <p className="text-sm text-muted-foreground">
                Your answers are locked and cannot be changed.
              </p>
            </div>
          </div>
          <Badge className="w-fit text-sm">
            Your score: {existingScore ?? 0}%
          </Badge>
        </div>
      ) : null}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-xl border bg-card p-6 shadow-sm"
            >
              <FormField
                control={form.control}
                name={`answers.${question.id}`}
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-base font-semibold leading-snug">
                      {index + 1}. {question.question_text}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="gap-3"
                        disabled={isPending || locked}
                      >
                        {OPTION_LABELS.map((option) => (
                          <div
                            key={option.key}
                            className="flex items-center space-x-3 rounded-lg border px-4 py-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
                          >
                            <RadioGroupItem
                              value={option.key}
                              id={`${question.id}-${option.key}`}
                              disabled={locked}
                            />
                            <Label
                              htmlFor={`${question.id}-${option.key}`}
                              className="flex-1 font-normal"
                            >
                              <span className="mr-2 font-medium">
                                {option.label}.
                              </span>
                              {question[option.field]}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          {formError ? (
            <p className="text-sm font-medium text-destructive">{formError}</p>
          ) : null}

          {locked ? (
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={`/lesson/${lessonId}`}>Back to Lesson</Link>
            </Button>
          ) : (
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Answers"
              )}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
