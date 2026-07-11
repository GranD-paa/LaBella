"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

import { createGrammarRule } from "@/app/admin/actions/grammar";
import {
  grammarRuleSchema,
  type GrammarRuleValues,
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

export function GrammarForm({
  lessons,
  defaultLessonId,
  onLessonChange,
}: {
  lessons: Lesson[];
  defaultLessonId?: string;
  onLessonChange: (lessonId: string) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<GrammarRuleValues>({
    resolver: zodResolver(grammarRuleSchema),
    defaultValues: {
      lessonId: defaultLessonId ?? "",
      title: "",
      description: "",
      example: "",
    },
  });

  const lessonId = form.watch("lessonId");

  useEffect(() => {
    if (lessonId) onLessonChange(lessonId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId]);

  function onSubmit(values: GrammarRuleValues) {
    startTransition(async () => {
      const result = await createGrammarRule(values);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Grammar rule added");
      form.reset({
        lessonId: values.lessonId,
        title: "",
        description: "",
        example: "",
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a grammar rule</CardTitle>
        <CardDescription>
          Choose a lesson, then add a grammar rule with an example.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Present tense of 'ser'"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Textarea disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="example"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Example (optional)</FormLabel>
                  <FormControl>
                    <Textarea disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button type="submit" disabled={isPending || !lessons.length}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add grammar rule
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
