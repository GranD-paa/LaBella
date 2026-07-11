"use client";

import type { Control } from "react-hook-form";

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
import type { QuizQuestionValues } from "@/lib/validations/admin";

const OPTIONS = [
  { key: "optionA", letter: "a", label: "Option A" },
  { key: "optionB", letter: "b", label: "Option B" },
  { key: "optionC", letter: "c", label: "Option C" },
  { key: "optionD", letter: "d", label: "Option D" },
] as const;

export function SingleQuizQuestionForm({
  control,
  disabled,
}: {
  control: Control<QuizQuestionValues>;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-4 rounded-lg border border-dashed p-4">
      <FormField
        control={control}
        name="questionText"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Question text</FormLabel>
            <FormControl>
              <Textarea
                placeholder="What is the Spanish word for 'hello'?"
                disabled={disabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {OPTIONS.map((option) => (
          <FormField
            key={option.key}
            control={control}
            name={option.key}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{option.label}</FormLabel>
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
            <FormLabel>Correct answer</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-wrap gap-4"
              >
                {OPTIONS.map((option) => (
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
                      {option.label}
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
