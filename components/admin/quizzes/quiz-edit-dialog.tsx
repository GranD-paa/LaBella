"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Pencil, Plus } from "lucide-react";

import {
  addQuizQuestion,
  deleteQuizQuestion,
  updateQuizQuestion,
  updateQuizTitle,
} from "@/app/admin/actions/quizzes";
import { DeleteConfirmDialog } from "@/components/admin/delete-confirm-dialog";
import { SingleQuizQuestionForm } from "@/components/admin/quizzes/single-quiz-question-form";
import {
  quizQuestionSchema,
  quizTitleSchema,
  type QuizQuestionValues,
  type QuizTitleValues,
} from "@/lib/validations/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Quiz, QuizQuestion } from "@/types";

const emptyQuestion: QuizQuestionValues = {
  questionText: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOption: "a",
};

function toQuestionValues(question: QuizQuestion): QuizQuestionValues {
  return {
    questionText: question.question_text,
    optionA: question.option_a,
    optionB: question.option_b,
    optionC: question.option_c,
    optionD: question.option_d,
    correctOption: question.correct_option,
  };
}

export function QuizEditDialog({
  quiz,
  questions,
}: {
  quiz: Quiz;
  questions: QuizQuestion[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );

  const titleForm = useForm<QuizTitleValues>({
    resolver: zodResolver(quizTitleSchema),
    defaultValues: { title: quiz.title },
  });

  const addQuestionForm = useForm<QuizQuestionValues>({
    resolver: zodResolver(quizQuestionSchema),
    defaultValues: emptyQuestion,
  });

  const editQuestionForm = useForm<QuizQuestionValues>({
    resolver: zodResolver(quizQuestionSchema),
    defaultValues: emptyQuestion,
  });

  const sortedQuestions = [...questions].sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  function refreshAfterMutation(message: string) {
    toast.success(message);
    router.refresh();
    setEditingQuestionId(null);
    addQuestionForm.reset(emptyQuestion);
  }

  function handleTitleSave(values: QuizTitleValues) {
    startTransition(async () => {
      const result = await updateQuizTitle(quiz.id, values);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      refreshAfterMutation("Quiz title updated");
    });
  }

  function handleAddQuestion(values: QuizQuestionValues) {
    startTransition(async () => {
      const result = await addQuizQuestion(quiz.id, values);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      refreshAfterMutation("Question added");
    });
  }

  function handleEditQuestion(values: QuizQuestionValues) {
    if (!editingQuestionId) return;

    startTransition(async () => {
      const result = await updateQuizQuestion(editingQuestionId, values);
      if ("error" in result) {
        toast.error(result.error);
        return;
      }
      refreshAfterMutation("Question updated");
    });
  }

  function startEditingQuestion(question: QuizQuestion) {
    setEditingQuestionId(question.id);
    editQuestionForm.reset(toQuestionValues(question));
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) {
          titleForm.reset({ title: quiz.title });
          addQuestionForm.reset(emptyQuestion);
          setEditingQuestionId(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit quiz</DialogTitle>
          <DialogDescription>
            Update the quiz title and manage its questions individually.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          <Form {...titleForm}>
            <form
              onSubmit={titleForm.handleSubmit(handleTitleSave)}
              className="space-y-4"
            >
              <FormField
                control={titleForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz title</FormLabel>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <FormControl>
                        <Input disabled={isPending} {...field} />
                      </FormControl>
                      <Button type="submit" disabled={isPending}>
                        {isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Save title"
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Existing questions</h3>
              <Badge variant="secondary">
                {sortedQuestions.length}{" "}
                {sortedQuestions.length === 1 ? "question" : "questions"}
              </Badge>
            </div>

            {sortedQuestions.length === 0 ? (
              <div className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
                No questions yet. Add one below.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Correct
                      </TableHead>
                      <TableHead className="w-28 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedQuestions.map((question, index) => (
                      <TableRow key={question.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="max-w-xs truncate font-medium">
                          {question.question_text}
                        </TableCell>
                        <TableCell className="hidden uppercase sm:table-cell">
                          {question.correct_option}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label="Edit question"
                              onClick={() => startEditingQuestion(question)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <DeleteConfirmDialog
                              title="Delete this question?"
                              description="This question will be permanently removed from the quiz."
                              successMessage="Question deleted"
                              onConfirm={async () => {
                                const result = await deleteQuizQuestion(
                                  question.id
                                );
                                if (!("error" in result)) {
                                  router.refresh();
                                  if (editingQuestionId === question.id) {
                                    setEditingQuestionId(null);
                                  }
                                }
                                return result;
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          {editingQuestionId ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Edit question</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingQuestionId(null)}
                >
                  Cancel edit
                </Button>
              </div>
              <Form {...editQuestionForm}>
                <form
                  onSubmit={editQuestionForm.handleSubmit(handleEditQuestion)}
                  className="space-y-4"
                >
                  <SingleQuizQuestionForm
                    control={editQuestionForm.control}
                    disabled={isPending}
                  />
                  <DialogFooter className="px-0">
                    <Button type="submit" disabled={isPending}>
                      {isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save question changes"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          ) : null}

          <div className="space-y-3">
            <h3 className="text-sm font-medium">Add a new question</h3>
            <Form {...addQuestionForm}>
              <form
                onSubmit={addQuestionForm.handleSubmit(handleAddQuestion)}
                className="space-y-4"
              >
                <SingleQuizQuestionForm
                  control={addQuestionForm.control}
                  disabled={isPending}
                />
                <DialogFooter className="px-0">
                  <Button type="submit" disabled={isPending}>
                    {isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Add question
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
