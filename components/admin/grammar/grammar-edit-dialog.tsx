"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Pencil } from "lucide-react";

import { updateGrammarRule } from "@/app/admin/actions/grammar";
import {
  grammarRuleSchema,
  type GrammarRuleValues,
} from "@/lib/validations/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import type { GrammarRule, Lesson } from "@/types";

export function GrammarEditDialog({
  grammarRule,
  lessons,
}: {
  grammarRule: GrammarRule;
  lessons: Lesson[];
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const defaultValues: GrammarRuleValues = {
    lessonId: grammarRule.lesson_id,
    title: grammarRule.title,
    description: grammarRule.description ?? "",
    example: grammarRule.example ?? "",
  };

  const form = useForm<GrammarRuleValues>({
    resolver: zodResolver(grammarRuleSchema),
    defaultValues,
  });

  function onSubmit(values: GrammarRuleValues) {
    startTransition(async () => {
      const result = await updateGrammarRule(grammarRule.id, values);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      toast.success("Grammar rule updated");
      setOpen(false);
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) form.reset(defaultValues);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Edit grammar rule">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit grammar rule</DialogTitle>
          <DialogDescription>
            Update &ldquo;{grammarRule.title}&rdquo;.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    <Input disabled={isPending} {...field} />
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
                  <FormLabel>Description</FormLabel>
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
                  <FormLabel>Example</FormLabel>
                  <FormControl>
                    <Textarea disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
