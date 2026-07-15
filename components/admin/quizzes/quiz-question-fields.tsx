"use client";

import type { Control } from "react-hook-form";
import { Trash2 } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { QuizValues } from "@/lib/validations/i18n/admin-schemas";

const OPTION_KEYS = [
  { key: "optionA", letter: "a", labelKey: "admin.quizzes.optionA" },
  { key: "optionB", letter: "b", labelKey: "admin.quizzes.optionB" },
  { key: "optionC", letter: "c", labelKey: "admin.quizzes.optionC" },
  { key: "optionD", letter: "d", labelKey: "admin.quizzes.optionD" },
] as const;

export function QuizQuestionFields({
  control,
  index,
  onRemove,
  canRemove,
  disabled,
}: {
  control: Control<QuizValues>;
  index: number;
  onRemove: () => void;
  canRemove: boolean;
  disabled?: boolean;
}) {
  const { t } = useTranslations();

  return (
    <Card className="border-dashed">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {t("admin.quizzes.questionLabel", { number: index + 1 })}
        </CardTitle>
        {canRemove ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={onRemove}
            disabled={disabled}
            aria-label={t("admin.quizzes.removeQuestionAria")}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name={`questions.${index}.questionText`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("admin.quizzes.questionText")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("admin.quizzes.questionTextPlaceholder")}
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {OPTION_KEYS.map((option) => (
            <FormField
              key={option.key}
              control={control}
              name={`questions.${index}.${option.key}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t(option.labelKey)}</FormLabel>
                  <FormControl>
                    <Input disabled={disabled} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <FormField
          control={control}
          name={`questions.${index}.correctOption`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("admin.quizzes.correctAnswer")}</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-4"
                >
                  {OPTION_KEYS.map((option) => (
                    <div key={option.letter} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={option.letter}
                        id={`q${index}-${option.letter}`}
                        disabled={disabled}
                      />
                      <Label
                        htmlFor={`q${index}-${option.letter}`}
                        className="font-normal"
                      >
                        {t(option.labelKey)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
