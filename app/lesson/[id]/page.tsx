import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";

import { LessonDetailTabs } from "@/components/lessons/lesson-detail-tabs";
import { Button } from "@/components/ui/button";
import { getDataRepository } from "@/lib/data";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const repo = getDataRepository();
  const lesson = await repo.getLessonById(id);

  return {
    title: lesson ? `${lesson.title} — LaBella` : "Lesson — LaBella",
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { id } = await params;
  const repo = getDataRepository();
  const user = await repo.getAuthUser();
  const lesson = await repo.getLessonById(id);

  if (!lesson) {
    notFound();
  }

  const [vocabulary, grammarRules, quizzes] = await Promise.all([
    repo.getVocabularyByLessonId(id),
    repo.getGrammarRulesByLessonId(id),
    repo.getQuizzes(),
  ]);

  const quiz = quizzes.find((entry) => entry.lesson_id === id) ?? null;

  let quizAttempt = null;
  if (quiz && user) {
    quizAttempt = await repo.getAttemptByUserAndQuiz(user.id, quiz.id);
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Button variant="ghost" size="sm" asChild className="-ml-2 w-fit">
          <Link href="/learn/italian">
            <ArrowLeft className="h-4 w-4" />
            Back to Italian course
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
        vocabulary={vocabulary}
        grammarRules={grammarRules}
        quiz={quiz}
        quizAttempt={quizAttempt}
      />
    </div>
  );
}
