import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, User } from "lucide-react";

import { QuizHistoryTable } from "@/components/profile/quiz-history-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDataRepository } from "@/lib/data";

export const metadata: Metadata = {
  title: "Profile — LaBella",
};

export default async function ProfilePage() {
  const repo = getDataRepository();
  const user = await repo.getAuthUser();

  if (!user) {
    redirect("/login");
  }

  const [profile, attempts, quizzes, lessons] = await Promise.all([
    repo.getProfileById(user.id),
    repo.getAttemptsByUserId(user.id),
    repo.getQuizzes(),
    repo.getLessons(),
  ]);

  const lessonMap = new Map(lessons.map((lesson) => [lesson.id, lesson.title]));
  const quizMap = new Map(
    quizzes.map((quiz) => [
      quiz.id,
      {
        title: quiz.title,
        lessonTitle: lessonMap.get(quiz.lesson_id) ?? quiz.title,
      },
    ])
  );

  const historyRows = attempts.map((attempt) => {
    const quiz = quizMap.get(attempt.quiz_id);
    return {
      id: attempt.id,
      score: attempt.score,
      created_at: attempt.created_at,
      lessonName: quiz?.lessonTitle ?? "Unknown lesson",
    };
  });

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
            <User className="h-5 w-5" />
            <span className="text-sm font-medium">Profile</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground">
            View your account details and quiz history.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Full name</p>
            <p className="font-medium">{profile?.full_name || "Not set"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Quiz History</h2>
          <p className="text-sm text-muted-foreground">
            All quizzes you have completed.
          </p>
        </div>
        <QuizHistoryTable attempts={historyRows} />
      </div>
    </div>
  );
}
