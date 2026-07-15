"use client";

import type { Control } from "react-hook-form";

import { useTranslations } from "@/components/providers/locale-provider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { QuizQuestionValues } from "@/lib/validations/i18n/admin-schemas";

const OPTION_KEYS = [
  { key: "optionA", letter: "a", labelKey: "admin.quizzes.optionA" },
  { key: "optionB", letter: "b", labelKey: "admin.quizzes.optionB" },
  { key: "optionC", letter: "c", labelKey: "admin.quizzes.optionC" },
  { key: "optionD", letter: "d", labelKey: "admin.quizzes.optionD" },
] as const;

export function SingleQuizQuestionForm({
  control,
  disabled,
}: {
  control: Control<QuizQuestionValues>;
  disabled?: boolean;
}) {
  const { t } = useTranslations();

  return (
    <div className="space-y-4 rounded-lg border border-dashed p-4">
      <FormField
        control={control}
        name="questionText"
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
            name={option.key}
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
        name="correctOption"
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
                      id={`single-q-${option.letter}`}
                      disabled={disabled}
                    />
                    <Label
                      htmlFor={`single-q-${option.letter}`}
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
    </div>
  );
}
