import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Flame,
  ListChecks,
  PlayCircle,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { UserDashboardData } from "@/lib/dashboard-data";
import { cn } from "@/lib/utils";

const ACHIEVEMENT_ICONS = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  target: Target,
  flame: Flame,
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(dateString)
  );
}

export function UserDashboard({
  data,
  displayName,
}: {
  data: UserDashboardData;
  displayName: string;
}) {
  const earnedCount = data.achievements.filter((a) => a.earned).length;
  const progressPercent =
    data.stats.totalQuizzes > 0
      ? Math.round(
          (data.stats.completedQuizzes / data.stats.totalQuizzes) * 100
        )
      : 0;

  return (
    <div className="space-y-8">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-20" />
        <div className="relative space-y-4">
          <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
            Learner Dashboard
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, {displayName}
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your progress, statistics, and achievements. Choose languages
            from the Main Menu.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              asChild
              className="bg-primary font-semibold text-primary-foreground shadow-brand hover:bg-primary/90"
            >
              <Link href="/learn/italian">
                <PlayCircle className="h-4 w-4" />
                Continue learning
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-white/20 bg-white/5">
              <Link href="/menu">Main menu</Link>
            </Button>
            <Button variant="outline" asChild className="border-white/20 bg-white/5">
              <Link href="/profile">View profile</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Quizzes completed"
          value={data.stats.completedQuizzes}
          description={`of ${data.stats.totalQuizzes} total`}
          icon={CheckCircle2}
        />
        <StatCard
          title="Average score"
          value={`${data.stats.averageScore}%`}
          description="Across all attempts"
          icon={Trophy}
        />
        <StatCard
          title="Available quizzes"
          value={data.stats.availableQuizzes}
          description="Ready to take"
          icon={ListChecks}
        />
        <StatCard
          title="Achievements"
          value={`${earnedCount}/${data.achievements.length}`}
          description="Milestones unlocked"
          icon={Award}
          trend={earnedCount > 0 ? "Keep going!" : "Start your first quiz"}
        />
      </section>

      <section className="brand-surface p-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Learning progress</h2>
            <p className="text-sm text-muted-foreground">
              {progressPercent}% of quizzes completed
            </p>
          </div>
          <span className="text-2xl font-bold text-brand-accent">
            {progressPercent}%
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand-gradient transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      {data.availableQuizDetails.length > 0 ? (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Available quizzes</h2>
            <p className="text-sm text-muted-foreground">
              Quizzes you haven&apos;t taken yet.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {data.availableQuizDetails.slice(0, 4).map((quiz) => (
              <Card key={quiz.quizId} className="brand-surface">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{quiz.quizTitle}</CardTitle>
                  <CardDescription>{quiz.lessonTitle}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {quiz.questionCount} questions
                  </Badge>
                  <Button size="sm" asChild>
                    <Link href={`/quiz/${quiz.quizId}`}>Start quiz</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Achievements</h2>
          <p className="text-sm text-muted-foreground">
            Unlock milestones as you learn.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.achievements.map((achievement) => {
            const Icon = ACHIEVEMENT_ICONS[achievement.icon];
            return (
              <div
                key={achievement.id}
                className={cn(
                  "brand-surface flex items-start gap-3 p-4 transition-all",
                  achievement.earned
                    ? "border-brand-accent/30"
                    : "opacity-60 grayscale"
                )}
              >
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    achievement.earned
                      ? "bg-brand-accent/15 text-brand-accent"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Activity history</h2>
          <p className="text-sm text-muted-foreground">
            Recent quiz results and learning milestones.
          </p>
        </div>
        {data.completedQuizDetails.length > 0 ? (
          <div className="grid gap-3">
            {data.completedQuizDetails.slice(0, 6).map((quiz) => (
              <div
                key={quiz.attemptId}
                className="brand-surface flex flex-wrap items-center justify-between gap-3 p-4"
              >
                <div>
                  <p className="font-medium">{quiz.quizTitle}</p>
                  <p className="text-sm text-muted-foreground">
                    {quiz.lessonTitle} · {formatDate(quiz.completedAt)}
                  </p>
                </div>
                <Badge className="bg-primary/15 text-primary hover:bg-primary/20">
                  {quiz.score}%
                </Badge>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-12 text-center text-muted-foreground">
            <p>No activity yet. Start a quiz from the Italian learning path.</p>
            <Button className="mt-4" asChild>
              <Link href="/learn/italian">Go to Italian course</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
