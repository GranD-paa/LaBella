import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ListChecks } from "lucide-react";

import { QuizForm } from "@/components/quiz/quiz-form";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ quiz_id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { quiz_id } = await params;
  const supabase = await createClient();
  const { data: quiz } = await supabase
    .from("quizzes")
    .select("title")
    .eq("id", quiz_id)
    .single();

  return {
    title: quiz ? `${quiz.title} — LaBella` : "Quiz — LaBella",
  };
}

export default async function QuizPage({ params }: PageProps) {
  const { quiz_id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: quiz } = await supabase
    .from("quizzes")
    .select("id, title, lesson_id")
    .eq("id", quiz_id)
    .single();

  if (!quiz) {
    notFound();
  }

  const [{ data: existingAttempt }, { data: questions }] = await Promise.all([
    supabase
      .from("user_quiz_attempts")
      .select("id")
      .eq("user_id", user.id)
      .eq("quiz_id", quiz_id)
      .maybeSingle(),
    supabase
      .from("quiz_questions")
      .select("id, question_text, option_a, option_b, option_c, option_d")
      .eq("quiz_id", quiz_id)
      .order("created_at"),
  ]);

  if (existingAttempt) {
    redirect(`/lesson/${quiz.lesson_id}`);
  }

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
            Answer all questions below, then submit when you&apos;re ready.
          </p>
        </div>
      </div>

      {questions && questions.length > 0 ? (
        <QuizForm quizId={quiz.id} questions={questions} />
      ) : (
        <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          This quiz has no questions yet.
        </div>
      )}
    </div>
  );
}
