import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ListChecks } from "lucide-react";

import { QuizForm } from "@/components/quiz/quiz-form";
import { Button } from "@/components/ui/button";
import { getDataRepository } from "@/lib/data";

type PageProps = {
  params: Promise<{ quiz_id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { quiz_id } = await params;
  const repo = getDataRepository();
  const quiz = await repo.getQuizById(quiz_id);

  return {
    title: quiz ? `${quiz.title} — LaBella` : "Quiz — LaBella",
  };
}

export default async function QuizPage({ params }: PageProps) {
  const { quiz_id } = await params;
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const quiz = await repo.getQuizById(quiz_id);
  if (!quiz) {
    notFound();
  }

  const [existingAttempt, questions] = await Promise.all([
    repo.getAttemptByUserAndQuiz(user.id, quiz_id),
    repo.getQuizQuestionsByQuizId(quiz_id),
  ]);

  const hasCompleted = Boolean(existingAttempt);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
          <Link href={`/lesson/${quiz.lesson_id}`}>
            <ArrowLeft className="h-4 w-4" />
            Back to Lesson
          </Link>
        </Button>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <ListChecks className="h-5 w-5" />
            <span className="text-sm font-medium">Quiz</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{quiz.title}</h1>
          <p className="text-muted-foreground">
            {hasCompleted
              ? "This quiz has already been submitted. Your answers are read-only."
              : "Answer all questions below, then submit when you're ready."}
          </p>
        </div>
      </div>

      {questions.length > 0 ? (
        <QuizForm
          quizId={quiz.id}
          lessonId={quiz.lesson_id}
          questions={questions}
          locked={hasCompleted}
          existingScore={existingAttempt?.score}
          savedAnswers={existingAttempt?.answers_json}
        />
      ) : (
        <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          This quiz has no questions yet.
        </div>
      )}
    </div>
  );
}
