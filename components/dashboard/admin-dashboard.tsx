"use client";

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
import { useTranslations } from "@/components/providers/locale-provider";
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
  const { t, formatDate } = useTranslations();

  return (
    <div className="space-y-8">
      <section className="brand-surface relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-brand-gradient opacity-25" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-3">
            <Badge className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent hover:bg-brand-accent/15">
              <ShieldCheck className="me-1 h-3 w-3" />
              {t("dashboard.admin.badge")}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("dashboard.admin.hello", { name: displayName })}
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              {t("dashboard.admin.subtitle")}
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
                  {t("dashboard.admin.fullManagement")}
                </Link>
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title={t("dashboard.admin.totalUsers")}
          value={data.stats.totalUsers}
          description={t("dashboard.admin.registeredLearners")}
          icon={Users}
        />
        <StatCard
          title={t("dashboard.admin.totalQuizzes")}
          value={data.stats.totalQuizzes}
          description={t("dashboard.admin.acrossLessons", {
            count: data.stats.totalLessons,
          })}
          icon={ListChecks}
        />
        <StatCard
          title={t("dashboard.admin.completionRate")}
          value={`${data.stats.completionRate}%`}
          description={t("dashboard.admin.quizzesWithAttempts")}
          icon={TrendingUp}
        />
        <StatCard
          title={t("dashboard.admin.avgScore")}
          value={`${data.stats.averageScore}%`}
          description={t("dashboard.admin.totalAttempts", {
            count: data.stats.totalAttempts,
          })}
          icon={BarChart3}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="brand-surface">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-brand-accent" />
              {t("dashboard.admin.recentActivity")}
            </CardTitle>
            <CardDescription>{t("dashboard.admin.recentActivityHint")}</CardDescription>
          </CardHeader>
          <CardContent>
            {data.recentActivity.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {t("dashboard.admin.noActivity")}
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
                    <div className="text-end">
                      <Badge variant="secondary">{activity.score}%</Badge>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(activity.createdAt, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
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
              {t("dashboard.admin.quizPerformance")}
            </CardTitle>
            <CardDescription>
              {t("dashboard.admin.quizPerformanceHint")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.quizPerformance.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {t("dashboard.admin.noQuizzes")}
              </p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-white/10">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("dashboard.admin.quiz")}</TableHead>
                      <TableHead className="text-end">
                        {t("dashboard.admin.attempts")}
                      </TableHead>
                      <TableHead className="text-end">
                        {t("dashboard.admin.avg")}
                      </TableHead>
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
                        <TableCell className="text-end">
                          {quiz.attemptCount}
                        </TableCell>
                        <TableCell className="text-end">
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
              <CardTitle>{t("dashboard.admin.quickActions")}</CardTitle>
              <CardDescription>{t("dashboard.admin.quickActionsHint")}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="/admin/quizzes">{t("dashboard.admin.manageQuizzes")}</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20">
              <Link href="/admin?tab=users">{t("dashboard.admin.manageUsers")}</Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
