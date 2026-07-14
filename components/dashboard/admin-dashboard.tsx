import Link from "next/link";
import {
  Activity,
  BarChart3,
  BookOpen,
  ListChecks,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AdminDashboardData } from "@/lib/dashboard-data";

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}

export function AdminDashboard({
  data,
  displayName,
  showFullManagement = false,
}: {
  data: AdminDashboardData;
  displayName: string;
  currentUserId?: string;
  showFullManagement?: boolean;
}) {
  return (
    <div className="space-y-8">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
              <ShieldCheck className="mr-1 h-3 w-3" />
              Admin Dashboard
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Hello, {displayName}
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Manage quizzes, monitor learner activity, and oversee your
              language-learning platform from one central hub.
            </p>
          </div>
          {!showFullManagement ? (
            <div className="flex flex-wrap gap-2">
              <Button
                asChild
                className="bg-primary font-semibold text-primary-foreground shadow-brand hover:bg-primary/90"
              >
                <Link href="/admin">
                  <Settings className="h-4 w-4" />
                  Full management panel
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total users"
          value={data.stats.totalUsers}
          description="Registered learners"
          icon={Users}
        />
        <StatCard
          title="Total quizzes"
          value={data.stats.totalQuizzes}
          description={`Across ${data.stats.totalLessons} lessons`}
          icon={ListChecks}
        />
        <StatCard
          title="Completion rate"
          value={`${data.stats.completionRate}%`}
          description="Quizzes with attempts"
          icon={TrendingUp}
        />
        <StatCard
          title="Avg. score"
          value={`${data.stats.averageScore}%`}
          description={`${data.stats.totalAttempts} total attempts`}
          icon={BarChart3}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="brand-surface">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-brand-accent" />
              Recent activity
            </CardTitle>
            <CardDescription>Latest quiz submissions from learners.</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentActivity.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No quiz activity yet.
              </p>
            ) : (
              <div className="space-y-3">
                {data.recentActivity.slice(0, 6).map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-muted/30 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {activity.userName}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {activity.quizTitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{activity.score}%</Badge>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(activity.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="brand-surface">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand-accent" />
              Quiz performance
            </CardTitle>
            <CardDescription>
              Attempt counts and average scores per quiz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.quizPerformance.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No quizzes created yet.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Quiz</TableHead>
                      <TableHead className="text-right">Attempts</TableHead>
                      <TableHead className="text-right">Avg.</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.quizPerformance.slice(0, 6).map((quiz) => (
                      <TableRow key={quiz.quizId}>
                        <TableCell>
                          <p className="font-medium">{quiz.quizTitle}</p>
                          <p className="text-xs text-muted-foreground">
                            {quiz.lessonTitle}
                          </p>
                        </TableCell>
                        <TableCell className="text-right">
                          {quiz.attemptCount}
                        </TableCell>
                        <TableCell className="text-right">
                          {quiz.attemptCount > 0 ? `${quiz.averageScore}%` : "—"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {!showFullManagement ? (
        <Card className="brand-surface">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>
                Jump into common admin tasks.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/admin">Manage quizzes & content</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20">
              <Link href="/admin?tab=users">Manage users</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
