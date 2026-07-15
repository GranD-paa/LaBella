import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { QuizForm } from "@/components/quiz/quiz-form";
import { NoQuestionsMessage, QuizPageIntro } from "@/components/quiz/quiz-page-intro";
import { getDataRepository } from "@/lib/data";
import { isQuizAccessible } from "@/lib/quiz-management/data";

import { getServerTranslator } from "@/lib/i18n/server-locale";

type PageProps = {
  params: Promise<{ quiz_id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { quiz_id } = await params;
  const repo = getDataRepository();
  const quiz = await repo.getQuizById(quiz_id);
  const { t } = await getServerTranslator();

  return {
    title: quiz ? `${quiz.title} — LaBella` : t("meta.quiz"),
  };
}

export default async function QuizPage({ params }: PageProps) {
  const { quiz_id } = await params;
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const [quiz, profile] = await Promise.all([
    repo.getQuizById(quiz_id),
    repo.getProfileById(user.id),
  ]);

  if (!quiz) {
    notFound();
  }

  const isAdmin = Boolean(profile?.is_admin);
  if (!isQuizAccessible(quiz, isAdmin)) {
    notFound();
  }

  const [existingAttempt, questions] = await Promise.all([
    repo.getAttemptByUserAndQuiz(user.id, quiz_id),
    repo.getQuizQuestionsByQuizId(quiz_id),
  ]);

  const hasCompleted = Boolean(existingAttempt);
  const backHref = `/quizzes/browse/${quiz.language_slug}/${quiz.level_slug}/${quiz.section_slug}`;

  return (
    <div className="space-y-8">
      <QuizPageIntro
        title={quiz.title}
        backHref={backHref}
        hasCompleted={hasCompleted}
      />

      {questions.length > 0 ? (
        <QuizForm
          quizId={quiz.id}
          lessonId={quiz.lesson_id}
          backHref={backHref}
          questions={questions}
          locked={hasCompleted}
          existingScore={existingAttempt?.score}
          savedAnswers={existingAttempt?.answers_json}
        />
      ) : (
        <div className="rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          <NoQuestionsMessage />
        </div>
      )}
    </div>
  );
}
