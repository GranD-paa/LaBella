"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { submitQuizAction } from "@/app/actions/quiz";
import { useTranslations } from "@/components/providers/locale-provider";
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
import { Textarea } from "@/components/ui/textarea";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import {
  createSubmitQuizSchema,
  type SubmitQuizValues,
} from "@/lib/validations/i18n/quiz-schemas";
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
  | "question_type"
  | "explanation"
>;

const OPTION_LABELS = [
  { key: "a" as const, label: "A", field: "option_a" as const },
  { key: "b" as const, label: "B", field: "option_b" as const },
  { key: "c" as const, label: "C", field: "option_c" as const },
  { key: "d" as const, label: "D", field: "option_d" as const },
];

function parseSavedAnswers(answersJson: Json): Record<string, string> {
  if (
    typeof answersJson === "object" &&
    answersJson !== null &&
    !Array.isArray(answersJson)
  ) {
    return answersJson as Record<string, string>;
  }
  return {};
}

export function QuizForm({
  quizId,
  questions,
  lessonId,
  backHref,
  locked = false,
  existingScore,
  savedAnswers,
}: {
  quizId: string;
  questions: PublicQuizQuestion[];
  lessonId: string;
  backHref?: string;
  locked?: boolean;
  existingScore?: number;
  savedAnswers?: Json;
}) {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { t } = useTranslations();

  const lockedAnswers = useMemo(
    () => (savedAnswers ? parseSavedAnswers(savedAnswers) : {}),
    [savedAnswers]
  );

  const schema = useMemo(
    () => createSubmitQuizSchema(t, questions),
    [questions, t]
  );

  const form = useForm<SubmitQuizValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      quizId,
      answers: locked ? lockedAnswers : {},
    },
  });

  const progress = Math.round(((currentStep + 1) / questions.length) * 100);
  const returnHref = backHref ?? `/lesson/${lessonId}`;

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
        const errorMessage = resolveMessage(t, result.error);
        setFormError(errorMessage);
        toast.error(errorMessage);
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
              <p className="font-semibold">{t("quiz.alreadyCompleted")}</p>
              <p className="text-sm text-muted-foreground">
                {t("quiz.answersLocked")}
              </p>
            </div>
          </div>
          <Badge className="w-fit text-sm">
            {t("quiz.yourScore", { score: existingScore ?? 0 })}
          </Badge>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-muted-foreground">
              {t("quiz.questionProgress", {
                current: currentStep + 1,
                total: questions.length,
              })}
            </span>
            <span className="font-semibold text-brand-accent">{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-brand-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {questions.map((question, index) => {
            const isWritten = question.question_type === "written";
            const isVisible = locked || index === currentStep;

            if (!isVisible) {
              return null;
            }

            return (
              <div
                key={question.id}
                className="animate-in fade-in slide-in-from-bottom-2 rounded-xl border bg-card p-6 shadow-sm duration-300"
              >
                <FormField
                  control={form.control}
                  name={`answers.${question.id}`}
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <div className="space-y-2">
                        <Badge variant="outline" className="text-xs">
                          {isWritten
                            ? t("quiz.writtenAnswer")
                            : t("quiz.multipleChoice")}
                        </Badge>
                        <FormLabel className="text-base font-semibold leading-snug">
                          {index + 1}. {question.question_text}
                        </FormLabel>
                      </div>
                      <FormControl>
                        {isWritten ? (
                          <Textarea
                            placeholder={t("quiz.typeAnswer")}
                            disabled={isPending || locked}
                            className="min-h-28"
                            {...field}
                          />
                        ) : (
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="gap-3"
                            disabled={isPending || locked}
                          >
                            {OPTION_LABELS.map((option) => (
                              <div
                                key={option.key}
                                className="flex items-center space-x-3 rounded-lg border px-4 py-3 transition-colors has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
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
                        )}
                      </FormControl>
                      {locked && question.explanation ? (
                        <p className="rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {t("quiz.explanationLabel")}:{" "}
                          </span>
                          {question.explanation}
                        </p>
                      ) : null}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          })}

          {formError ? (
            <p className="text-sm font-medium text-destructive">{formError}</p>
          ) : null}

          {locked ? (
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={returnHref}>{t("common.back")}</Link>
            </Button>
          ) : (
            <div className="flex flex-wrap gap-3">
              {currentStep > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep((step) => step - 1)}
                  disabled={isPending}
                >
                  {t("quiz.previous")}
                </Button>
              ) : null}
              {currentStep < questions.length - 1 ? (
                <Button
                  type="button"
                  onClick={async () => {
                    const questionId = questions[currentStep].id;
                    const valid = await form.trigger(`answers.${questionId}`);
                    if (valid) {
                      setCurrentStep((step) => step + 1);
                    }
                  }}
                  disabled={isPending}
                >
                  {t("quiz.nextQuestion")}
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  className="bg-brand-accent font-semibold text-brand-accent-foreground hover:bg-brand-accent/90"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t("quiz.submitting")}
                    </>
                  ) : (
                    t("quiz.submitAnswers")
                  )}
                </Button>
              )}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
