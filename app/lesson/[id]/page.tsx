import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";

import { LessonDetailTabs } from "@/components/lessons/lesson-detail-tabs";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: lesson } = await supabase
    .from("lessons")
    .select("title")
    .eq("id", id)
    .single();

  return {
    title: lesson ? `${lesson.title} — LaBella` : "Lesson — LaBella",
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .single();

  if (!lesson) {
    notFound();
  }

  const [
    { data: vocabulary },
    { data: grammarRules },
    { data: quizzes },
  ] = await Promise.all([
    supabase
      .from("vocabulary")
      .select("*")
      .eq("lesson_id", id)
      .order("created_at"),
    supabase
      .from("grammar_rules")
      .select("*")
      .eq("lesson_id", id)
      .order("created_at"),
    supabase
      .from("quizzes")
      .select("*")
      .eq("lesson_id", id)
      .order("created_at")
      .limit(1),
  ]);

  const quiz = quizzes?.[0] ?? null;

  let quizAttempt = null;
  if (quiz && user) {
    const { data } = await supabase
      .from("user_quiz_attempts")
      .select("*")
      .eq("user_id", user.id)
      .eq("quiz_id", quiz.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    quizAttempt = data;
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-medium">Lesson</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{lesson.title}</h1>
          {lesson.description ? (
            <p className="max-w-2xl text-muted-foreground">{lesson.description}</p>
          ) : null}
        </div>
      </div>

      <LessonDetailTabs
        vocabulary={vocabulary ?? []}
        grammarRules={grammarRules ?? []}
        quiz={quiz}
        quizAttempt={quizAttempt}
      />
    </div>
  );
}
