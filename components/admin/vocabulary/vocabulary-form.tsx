"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import { createVocabulary } from "@/app/admin/actions/vocabulary";
import {
  vocabularySchema,
  type VocabularyValues,
} from "@/lib/validations/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LessonPicker } from "@/components/admin/lesson-picker";
import type { Lesson } from "@/types";

export function VocabularyForm({
  lessons,
  defaultLessonId,
  onLessonChange,
}: {
  lessons: Lesson[];
  defaultLessonId?: string;
  onLessonChange: (lessonId: string) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<VocabularyValues>({
    resolver: zodResolver(vocabularySchema),
    defaultValues: {
      lessonId: defaultLessonId ?? "",
      word: "",
      translation: "",
      imageUrl: "",
      exampleSentence: "",
    },
  });

  const lessonId = form.watch("lessonId");

  useEffect(() => {
    if (lessonId) onLessonChange(lessonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  function onSubmit(values: VocabularyValues) {
    startTransition(async () => {
      const result = await createVocabulary(values);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Vocabulary added");
      form.reset({
        lessonId: values.lessonId,
        word: "",
        translation: "",
        imageUrl: "",
        exampleSentence: "",
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add vocabulary</CardTitle>
        <CardDescription>
          Choose a lesson, then add a word with its translation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-2"
          >
            <FormField
              control={form.control}
              name="lessonId"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
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
              name="word"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Word</FormLabel>
                  <FormControl>
                    <Input placeholder="Hola" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="translation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Translation</FormLabel>
                  <FormControl>
                    <Input placeholder="Hello" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://..."
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exampleSentence"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example sentence (optional)</FormLabel>
                  <FormControl>
                    <Textarea disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="sm:col-span-2">
              <Button type="submit" disabled={isPending || !lessons.length}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add vocabulary
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
