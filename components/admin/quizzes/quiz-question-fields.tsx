"use client";

import type { Control } from "react-hook-form";
import { Trash2 } from "lucide-react";

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
import type { QuizValues } from "@/lib/validations/admin";

const OPTIONS = [
  { key: "optionA", letter: "a", label: "Option A" },
  { key: "optionB", letter: "b", label: "Option B" },
  { key: "optionC", letter: "c", label: "Option C" },
  { key: "optionD", letter: "d", label: "Option D" },
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
  return (
    <Card className="border-dashed">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Question {index + 1}
        </CardTitle>
        {canRemove ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={onRemove}
            disabled={disabled}
            aria-label="Remove question"
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
              name={`questions.${index}.${option.key}`}
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
          name={`questions.${index}.correctOption`}
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
                        id={`q${index}-${option.letter}`}
                        disabled={disabled}
                      />
                      <Label
                        htmlFor={`q${index}-${option.letter}`}
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
      </CardContent>
    </Card>
  );
}
