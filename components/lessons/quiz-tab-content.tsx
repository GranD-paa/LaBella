import Link from "next/link";
import { CheckCircle2, ListChecks, PlayCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Quiz, UserQuizAttempt } from "@/types";

export function QuizTabContent({
  quiz,
  attempt,
}: {
  quiz: Quiz | null;
  attempt: UserQuizAttempt | null;
}) {
  if (!quiz) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
        <ListChecks className="h-8 w-8" />
        <p>No quiz available for this lesson yet.</p>
      </div>
    );
  }

  if (attempt) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border bg-card px-6 py-12 text-center shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <div className="space-y-1">
          <p className="text-lg font-semibold">
            You have already completed this quiz.
          </p>
          <p className="text-muted-foreground">
            Your score:{" "}
            <span className="font-semibold text-foreground">{attempt.score}%</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 rounded-xl border bg-card px-6 py-12 text-center shadow-sm">
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{quiz.title}</h3>
        <p className="text-muted-foreground">
          Ready to test what you learned in this lesson?
        </p>
      </div>
      <Button size="lg" className="gap-2 px-8" asChild>
        <Link href={`/quiz/${quiz.id}`}>
          <PlayCircle className="h-5 w-5" />
          Start Quiz
        </Link>
      </Button>
    </div>
  );
}
