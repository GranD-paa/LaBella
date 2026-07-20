"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
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
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import {
  getCorrectAnswerLabel,
  gradeAnswer,
  type GradedQuizQuestion,
} from "@/lib/quiz/grading";
import {
  createSubmitQuizSchema,
  type SubmitQuizValues,
} from "@/lib/validations/i18n/quiz-schemas";
import { parseStoredAnswers } from "@/lib/quiz/attempt-payload";
import { cn } from "@/lib/utils";
import type { Json } from "@/types/database.types";

const OPTION_LABELS = [
  { key: "a" as const, label: "A", field: "option_a" as const },
  { key: "b" as const, label: "B", field: "option_b" as const },
  { key: "c" as const, label: "C", field: "option_c" as const },
  { key: "d" as const, label: "D", field: "option_d" as const },
] as const;

type QuestionFeedback = {
  isCorrect: boolean;
  userAnswer: string;
};

function buildInitialFeedback(
  questions: GradedQuizQuestion[],
  answers: Record<string, string>
): Record<string, QuestionFeedback> {
  const feedback: Record<string, QuestionFeedback> = {};

  for (const question of questions) {
    const userAnswer = answers[question.id]?.trim();
    if (!userAnswer) {
      continue;
    }

    feedback[question.id] = {
      isCorrect: gradeAnswer(question, userAnswer),
      userAnswer,
    };
  }

  return feedback;
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
  questions: GradedQuizQuestion[];
  lessonId: string;
  backHref?: string;
  locked?: boolean;
  existingScore?: number;
  savedAnswers?: Json;
}) {
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [writtenDrafts, setWrittenDrafts] = useState<Record<string, string>>({});
  const { t } = useTranslations();
  const reducedMotion = useReducedMotion();

  const lockedAnswers = useMemo(
    () => (savedAnswers ? parseStoredAnswers(savedAnswers) : {}),
    [savedAnswers]
  );

  const [feedback, setFeedback] = useState<Record<string, QuestionFeedback>>(() =>
    locked ? buildInitialFeedback(questions, lockedAnswers) : {}
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

  const currentQuestion = questions[currentStep];
  const currentFeedback = feedback[currentQuestion.id];
  const isCurrentLocked = locked || Boolean(currentFeedback);
  const progress = Math.round(((currentStep + 1) / questions.length) * 100);
  const returnHref = backHref ?? `/lesson/${lessonId}`;

  function lockAnswer(questionId: string, userAnswer: string) {
    const question = questions.find((entry) => entry.id === questionId);
    if (!question || locked) {
      return;
    }

    const trimmed = userAnswer.trim();
    if (!trimmed) {
      return;
    }

    form.setValue(`answers.${questionId}`, trimmed, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setFeedback((previous) => ({
      ...previous,
      [questionId]: {
        isCorrect: gradeAnswer(question, trimmed),
        userAnswer: trimmed,
      },
    }));
  }

  function onSubmit(values: SubmitQuizValues) {
    if (locked) {
      return;
    }

    const answers = { ...values.answers };
    for (const question of questions) {
      if (!answers[question.id]?.trim() && feedback[question.id]) {
        answers[question.id] = feedback[question.id].userAnswer;
      }
    }

    setFormError(null);
    startTransition(async () => {
      const result = await submitQuizAction({
        quizId,
        answers,
      });
      if (result && "error" in result) {
        const errorMessage = resolveMessage(t, result.error);
        setFormError(errorMessage);
        toast.error(errorMessage);
      }
    });
  }

  function onInvalid() {
    const firstError = Object.values(form.formState.errors.answers ?? {})[0];
    const message =
      typeof firstError === "object" && firstError && "message" in firstError
        ? String(firstError.message)
        : t("actions.errors.invalidSubmission");
    setFormError(message);
    toast.error(message);
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
              className="h-full rounded-full bg-brand-accent transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8">
          {questions.map((question, index) => {
            const isWritten = question.question_type === "written";
            const isVisible = locked || index === currentStep;
            const questionFeedback = feedback[question.id];

            if (!isVisible) {
              return null;
            }

            const isCorrect = questionFeedback?.isCorrect ?? false;
            const cardAnimation =
              questionFeedback && !reducedMotion
                ? isCorrect
                  ? "animate-quiz-pop"
                  : "animate-quiz-shake"
                : "";

            return (
              <div
                key={question.id}
                className={cn(
                  "rounded-xl border bg-card p-6 shadow-sm transition-colors duration-300",
                  questionFeedback &&
                    (isCorrect
                      ? "border-emerald-500/40 bg-emerald-500/5"
                      : "border-rose-500/40 bg-rose-500/5"),
                  cardAnimation
                )}
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
                          <div className="space-y-3">
                            {isCurrentLocked ? (
                              <div className="rounded-lg border bg-muted/30 px-4 py-3 text-sm">
                                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                  {t("quiz.yourAnswer")}
                                </p>
                                <p className="mt-1 font-medium">
                                  {field.value || questionFeedback?.userAnswer || "—"}
                                </p>
                              </div>
                            ) : (
                              <>
                                <Textarea
                                  value={writtenDrafts[question.id] ?? field.value ?? ""}
                                  onChange={(event) =>
                                    setWrittenDrafts((previous) => ({
                                      ...previous,
                                      [question.id]: event.target.value,
                                    }))
                                  }
                                  placeholder={t("quiz.typeAnswer")}
                                  disabled={isPending}
                                  className="min-h-28"
                                />
                                <Button
                                  type="button"
                                  variant="secondary"
                                  disabled={
                                    isPending ||
                                    !(writtenDrafts[question.id] ?? "").trim()
                                  }
                                  onClick={() =>
                                    lockAnswer(
                                      question.id,
                                      writtenDrafts[question.id] ?? ""
                                    )
                                  }
                                >
                                  {t("quiz.checkAnswer")}
                                </Button>
                              </>
                            )}
                          </div>
                        ) : (
                          <RadioGroup
                            onValueChange={(value) => {
                              if (!isCurrentLocked) {
                                lockAnswer(question.id, value);
                              }
                            }}
                            value={field.value}
                            className="gap-3"
                            disabled={isPending || isCurrentLocked}
                          >
                            {OPTION_LABELS.map((option) => {
                              const isSelected = field.value === option.key;
                              const isCorrectOption =
                                question.correct_option === option.key;
                              const showResults = Boolean(questionFeedback);
                              const showCorrect =
                                showResults && isCorrectOption;
                              const showWrong =
                                showResults && isSelected && !isCorrectOption;

                              return (
                                <div
                                  key={option.key}
                                  className={cn(
                                    "flex items-center space-x-3 rounded-lg border px-4 py-3 transition-all duration-200",
                                    showCorrect &&
                                      "border-emerald-500 bg-emerald-500/10",
                                    showWrong &&
                                      "border-rose-500 bg-rose-500/10",
                                    !showCorrect &&
                                      !showWrong &&
                                      isSelected &&
                                      "border-primary bg-primary/5",
                                    !isCurrentLocked &&
                                      !showResults &&
                                      "hover:border-brand-accent/40 hover:bg-brand-accent/5"
                                  )}
                                >
                                  <RadioGroupItem
                                    value={option.key}
                                    id={`${question.id}-${option.key}`}
                                    disabled={isCurrentLocked}
                                  />
                                  <Label
                                    htmlFor={`${question.id}-${option.key}`}
                                    className="flex-1 cursor-pointer font-normal"
                                  >
                                    <span className="me-2 font-medium">
                                      {option.label}.
                                    </span>
                                    {question[option.field]}
                                  </Label>
                                </div>
                              );
                            })}
                          </RadioGroup>
                        )}
                      </FormControl>

                      {questionFeedback ? (
                        <div
                          className={cn(
                            "space-y-3 animate-quiz-reveal",
                            !reducedMotion && "animate-quiz-reveal"
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium",
                              isCorrect
                                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                                : "bg-rose-500/10 text-rose-700 dark:text-rose-300"
                            )}
                          >
                            {isCorrect ? (
                              <CheckCircle2 className="h-4 w-4 shrink-0" />
                            ) : (
                              <XCircle className="h-4 w-4 shrink-0" />
                            )}
                            <span>
                              {isCorrect
                                ? t(`quiz.feedback.success.${index % 3}`)
                                : t(`quiz.feedback.error.${index % 3}`)}
                            </span>
                          </div>

                          <div className="space-y-2 rounded-lg bg-muted/40 px-3 py-3 text-sm">
                            {!isCorrect ? (
                              <p>
                                <span className="font-medium text-foreground">
                                  {t("quiz.correctAnswer")}:{" "}
                                </span>
                                {getCorrectAnswerLabel(question)}
                              </p>
                            ) : null}
                            {question.explanation ? (
                              <p className="text-muted-foreground">
                                <span className="font-medium text-foreground">
                                  {t("quiz.explanationLabel")}:{" "}
                                </span>
                                {question.explanation}
                              </p>
                            ) : null}
                          </div>
                        </div>
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
            <div className="flex flex-wrap gap-3">
              {currentStep > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep((step) => step - 1)}
                >
                  {t("quiz.previous")}
                </Button>
              ) : null}
              {currentStep < questions.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep((step) => step + 1)}
                >
                  {t("quiz.nextQuestion")}
                </Button>
              ) : null}
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href={returnHref}>{t("common.back")}</Link>
              </Button>
            </div>
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
                  onClick={() => setCurrentStep((step) => step + 1)}
                  disabled={isPending || !currentFeedback}
                >
                  {t("quiz.nextQuestion")}
                </Button>
              ) : (
                <Button
                  type="submit"
                  size="lg"
                  className="bg-brand-accent font-semibold text-brand-accent-foreground hover:bg-brand-accent/90"
                  disabled={isPending || !currentFeedback}
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
