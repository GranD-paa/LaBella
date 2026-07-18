"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  BarChart3,
  BookOpen,
  ChevronDown,
  ListChecks,
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
  TableCell,
  TableRow,
} from "@/components/ui/table";
import type { AdminDashboardData } from "@/lib/dashboard-data";
import { getQuizSectionTitleKey } from "@/lib/i18n/quiz-sections";

type LevelQuizRow = AdminDashboardData["levelQuizOverview"][number];

const LANGUAGE_LABEL_KEYS: Record<string, string> = {
  italian: "dashboard.admin.languageItalian",
  english: "dashboard.admin.languageEnglish",
  german: "dashboard.admin.languageGerman",
  turkish: "dashboard.admin.languageTurkish",
};

function LevelQuizRowDetails({
  entry,
  expanded,
  onToggle,
  t,
  languageLabel,
  sectionLabel,
  statusLabel,
}: {
  entry: LevelQuizRow;
  expanded: boolean;
  onToggle: () => void;
  t: ReturnType<typeof useTranslations>["t"];
  languageLabel: (slug: string) => string;
  sectionLabel: (slug: string) => string;
  statusLabel: (status: LevelQuizRow["status"]) => string;
}) {
  const hasQuiz = Boolean(entry.quizId);

  return (
    <>
      <TableRow>
        <TableCell className="px-3 !text-center font-medium">{entry.lessonName}</TableCell>
        <TableCell className="px-3 !text-center">
          {languageLabel(entry.languageSlug)}
        </TableCell>
        <TableCell className="px-3 !text-center">{entry.levelCode}</TableCell>
        <TableCell className="px-3 !text-center">
          {entry.sectionSlug ? sectionLabel(entry.sectionSlug) : t("common.noValue")}
        </TableCell>
        <TableCell className="px-3 !text-center">
          <div className="flex justify-center">
            <Badge
              variant={
                entry.status === "published"
                  ? "default"
                  : entry.status === "draft"
                    ? "secondary"
                    : "outline"
              }
            >
              {statusLabel(entry.status)}
            </Badge>
          </div>
        </TableCell>
        <TableCell className="px-3 !text-center">
          {hasQuiz ? (
            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={onToggle}
                aria-expanded={expanded}
                aria-label={
                  expanded
                    ? t("dashboard.admin.hideQuizDetails")
                    : t("dashboard.admin.showQuizDetails")
                }
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
          ) : null}
        </TableCell>
      </TableRow>
      {hasQuiz && expanded ? (
        <TableRow className="bg-muted/20 hover:bg-muted/20">
          <TableCell colSpan={6} className="px-3 py-3 !text-center">
            <div className="flex flex-wrap justify-center gap-3">
              <div className="rounded-lg border border-white/10 bg-background/40 px-3 py-2 text-center text-sm">
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.admin.multipleChoiceQuestions")}
                </p>
                <p className="font-medium">
                  {t("dashboard.admin.questionCountValue", {
                    count: entry.multipleChoiceCount,
                  })}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-background/40 px-3 py-2 text-center text-sm">
                <p className="text-xs text-muted-foreground">
                  {t("dashboard.admin.writtenQuestions")}
                </p>
                <p className="font-medium">
                  {t("dashboard.admin.questionCountValue", {
                    count: entry.writtenCount,
                  })}
                </p>
              </div>
            </div>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  );
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
  const { t, formatDate } = useTranslations();
  const [expandedLevel, setExpandedLevel] = useState<string | null>(null);

  function languageLabel(slug: string) {
    const key = LANGUAGE_LABEL_KEYS[slug];
    return key ? t(key) : slug;
  }

  function sectionLabel(slug: string) {
    const key = getQuizSectionTitleKey(slug);
    return key ? t(key) : slug;
  }

  function statusLabel(status: LevelQuizRow["status"]) {
    if (status === "published") {
      return t("admin.quizzes.statusPublished");
    }
    if (status === "draft") {
      return t("admin.quizzes.statusDraft");
    }
    return t("dashboard.admin.statusNoQuiz");
  }

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
          {showFullManagement ? (
            <Button variant="outline" className="border-white/20" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                {t("profile.backToDashboard")}
              </Link>
            </Button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="secondary">
                <Link href="/admin/quizzes">
                  {t("dashboard.admin.manageQuizzes")}
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20">
                <Link href="/admin?tab=users">
                  {t("dashboard.admin.manageUsers")}
                </Link>
              </Button>
            </div>
          )}
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
      </section>

      <section className="mx-auto w-full max-w-6xl">
        <Card className="brand-surface">
          <CardHeader className="items-center space-y-2 text-center">
            <CardTitle className="flex w-full items-center justify-center gap-2">
              <BookOpen className="h-5 w-5 shrink-0 text-brand-accent" />
              {t("dashboard.admin.assignedQuizzes")}
            </CardTitle>
            <CardDescription className="max-w-3xl text-center">
              {t("dashboard.admin.assignedQuizzesHint")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center px-6 pt-0">
            <div className="w-full max-w-5xl overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full table-fixed caption-bottom text-sm [&_td]:!text-center [&_th]:!text-center">
                <thead className="border-b [&_tr]:border-b">
                  <tr className="border-b transition-colors">
                    <th className="h-10 px-3 align-middle text-sm font-medium !text-center text-muted-foreground">
                      {t("dashboard.admin.columnLesson")}
                    </th>
                    <th className="h-10 px-3 align-middle text-sm font-medium !text-center text-muted-foreground">
                      {t("dashboard.admin.columnLanguage")}
                    </th>
                    <th className="h-10 px-3 align-middle text-sm font-medium !text-center text-muted-foreground">
                      {t("dashboard.admin.columnLevel")}
                    </th>
                    <th className="h-10 px-3 align-middle text-sm font-medium !text-center text-muted-foreground">
                      {t("dashboard.admin.columnSection")}
                    </th>
                    <th className="h-10 px-3 align-middle text-sm font-medium !text-center text-muted-foreground">
                      {t("dashboard.admin.columnStatus")}
                    </th>
                    <th className="h-10 w-16 px-3 align-middle text-sm font-medium !text-center text-muted-foreground">
                      {t("dashboard.admin.columnDetails")}
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {data.levelQuizOverview.map((entry) => (
                    <LevelQuizRowDetails
                      key={entry.levelCode}
                      entry={entry}
                      expanded={expandedLevel === entry.levelCode}
                      onToggle={() =>
                        setExpandedLevel((current) =>
                          current === entry.levelCode ? null : entry.levelCode
                        )
                      }
                      t={t}
                      languageLabel={languageLabel}
                      sectionLabel={sectionLabel}
                      statusLabel={statusLabel}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
