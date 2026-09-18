"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  FileText,
  ImageIcon,
  Landmark,
  Languages,
  ListChecks,
  Receipt,
  Users,
} from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AdminDashboardData } from "@/lib/dashboard-data";
import type { AdminNavItem } from "@/lib/permissions/admin-nav";
import type { RolePermissions } from "@/lib/permissions/roles";

const NAV_ICONS = {
  ListChecks,
  Users,
  Languages,
  ImageIcon,
  CreditCard,
  Receipt,
  FileText,
  Landmark,
} as const;

/** The console's panels all sit on the same surface, one step above the page. */
const PANEL =
  "rounded-2xl border border-white/10 bg-[#12002a]/75 shadow-brand backdrop-blur-sm";

function scoreBadgeClassName(score: number) {
  if (score >= 80) {
    return "border-emerald-400/30 bg-emerald-500/15 text-emerald-300";
  }
  if (score >= 50) {
    return "border-amber-400/30 bg-amber-500/15 text-amber-300";
  }
  return "border-red-400/30 bg-red-500/15 text-red-300";
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
}

/**
 * One reading on the instrument panel.
 *
 * A number nobody has produced yet is dimmed rather than dressed up. On a
 * platform with three learners and no attempts, that leaves exactly one figure
 * at full contrast — which is the honest picture, and a more useful one than
 * four identical zeros shouting at the same volume.
 */
function Vital({
  label,
  value,
  hint,
  quiet,
}: {
  label: string;
  value: string | number;
  hint: string;
  quiet: boolean;
}) {
  return (
    <div className="px-5 py-5 sm:px-6">
      <p className="text-[0.8125rem] text-muted-foreground">{label}</p>
      <p
        className={cn(
          "ac-figure mt-2",
          quiet ? "text-foreground/40" : "text-foreground"
        )}
      >
        {value}
      </p>
      <p className="mt-1.5 text-xs text-muted-foreground/70">{hint}</p>
    </div>
  );
}

/**
 * The sentence under a panel title qualifies the title, so it sits beside it
 * rather than pinned to the far end of a 1200px bar, where it reads as an
 * unrelated caption that happened to land in the same row.
 */
function PanelHeader({
  title,
  hint,
  aside,
}: {
  title: string;
  hint: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-white/[0.07] px-5 py-4 sm:px-6">
      <h2 className="text-[0.9375rem] font-semibold">{title}</h2>
      {aside}
      <p className="text-xs text-muted-foreground/70">{hint}</p>
    </header>
  );
}

export function AdminDashboard({
  data,
  displayName,
  showFullManagement = false,
  navItems = [],
  permissions,
}: {
  data: AdminDashboardData;
  displayName: string;
  currentUserId?: string;
  showFullManagement?: boolean;
  /** The admin pages this role may open, already filtered server-side. */
  navItems?: AdminNavItem[];
  /** Decides which panels below the links are worth rendering at all. */
  permissions: RolePermissions;
}) {
  const { t, formatDate } = useTranslations();

  // The panels below the links follow the same rule the links do: a role is
  // shown what it may act on, and nothing else. A writer has no business
  // reading learner names and quiz scores on their way to the blog.
  const canSeeLearners = permissions.fullAccess || permissions.viewUsers;
  const canSeeContent =
    permissions.fullAccess ||
    permissions.manageContent ||
    permissions.manageQuizzes;

  // Destinations and the activity feed share the bottom row, and either one can
  // be absent for a role — so each takes the whole row when the other is gone
  // rather than leaving a column of empty page behind it.
  const showDestinations = !showFullManagement && navItems.length > 0;
  const showActivity = !showFullManagement && canSeeContent;

  return (
    <div className="ac-console space-y-4 sm:space-y-5">
      <section className={cn("ac-masthead", PANEL)}>
        <div className="relative flex flex-wrap items-end justify-between gap-6 p-6 sm:px-8 sm:py-7">
          <div className="min-w-0 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-foreground/85">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
              {t("dashboard.admin.badge")}
            </span>
            <h1 className="ac-display">
              {t("dashboard.admin.hello", { name: displayName })}
            </h1>
            <p className="max-w-[48ch] text-[0.9375rem]/[1.85] text-muted-foreground">
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
          ) : null}
        </div>
      </section>

      {!showFullManagement && (canSeeLearners || canSeeContent) ? (
        <section className={PANEL}>
          <PanelHeader
            title={t("dashboard.admin.monitoring")}
            hint={t("dashboard.admin.monitoringHint")}
          />
          <div className="ac-vitals ac-wave">
            {canSeeLearners ? (
              <Vital
                label={t("dashboard.admin.totalUsers")}
                value={data.stats.totalUsers}
                hint={t("dashboard.admin.registeredLearners")}
                quiet={data.stats.totalUsers === 0}
              />
            ) : null}
            {canSeeContent ? (
              <>
                <Vital
                  label={t("dashboard.admin.totalQuizzes")}
                  value={data.stats.totalQuizzes}
                  hint={t("dashboard.admin.acrossLessons", {
                    count: data.stats.totalLessons,
                  })}
                  quiet={data.stats.totalQuizzes === 0}
                />
                <Vital
                  label={t("dashboard.admin.avgScore")}
                  value={`${data.stats.averageScore}%`}
                  hint={t("dashboard.admin.totalAttempts", {
                    count: data.stats.totalAttempts,
                  })}
                  quiet={data.stats.averageScore === 0}
                />
                <Vital
                  label={t("dashboard.admin.quizzesWithAttempts")}
                  value={data.stats.quizzesWithAttempts}
                  hint={t("dashboard.admin.outOfTotalQuizzes", {
                    count: data.stats.totalQuizzes,
                  })}
                  quiet={data.stats.quizzesWithAttempts === 0}
                />
              </>
            ) : null}
          </div>
        </section>
      ) : null}

      {showDestinations || showActivity ? (
        <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:items-start">
          {showDestinations ? (
            <nav
              className={cn(
                "grid gap-2.5 sm:grid-cols-2",
                showActivity ? "lg:col-span-7" : "lg:col-span-12"
              )}
            >
              {navItems.map((item) => {
                const Icon: LucideIcon = NAV_ICONS[item.icon];
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="ac-tile flex min-h-[3.75rem] items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-3"
                  >
                    <span className="ac-tile-chip flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.625rem] bg-white/[0.06] text-violet-100/70">
                      <Icon className="h-[1.05rem] w-[1.05rem]" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[0.9375rem] font-medium text-foreground/90">
                      {item.labelKey ? t(item.labelKey) : item.label}
                    </span>
                    <ChevronRight className="ac-chev h-4 w-4 shrink-0 text-white/25 rtl:rotate-180" />
                  </Link>
                );
              })}
            </nav>
          ) : null}

          {showActivity ? (
            <section
              className={cn(
                PANEL,
                showDestinations ? "lg:col-span-5" : "lg:col-span-12"
              )}
            >
              <PanelHeader
                title={t("dashboard.admin.recentActivity")}
                hint={t("dashboard.admin.recentActivityHint")}
                aside={
                  data.recentActivity.length > 0 ? (
                    <Badge
                      variant="outline"
                      className="border-white/10 bg-white/[0.04] px-2 py-0 text-[0.6875rem] font-medium text-muted-foreground"
                    >
                      {t("dashboard.admin.activityCount", {
                        count: data.recentActivity.length,
                      })}
                    </Badge>
                  ) : null
                }
              />
              {data.recentActivity.length === 0 ? (
                <p className="px-6 py-16 text-center text-sm text-muted-foreground/70">
                  {t("dashboard.admin.noActivity")}
                </p>
              ) : (
                <div className="max-h-[26rem] divide-y divide-white/[0.05] overflow-y-auto">
                  {data.recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 px-5 py-3 sm:px-6"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-[0.8125rem] font-semibold text-violet-100/85">
                        {getInitial(activity.userName)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {activity.userName}
                        </p>
                        <p className="truncate text-xs text-muted-foreground/80">
                          {activity.quizTitle}
                        </p>
                      </div>
                      <div className="shrink-0 text-end">
                        <Badge
                          variant="outline"
                          className={scoreBadgeClassName(activity.score)}
                        >
                          {activity.score}%
                        </Badge>
                        <p className="mt-1 text-[0.6875rem] text-muted-foreground/70">
                          {formatDate(activity.createdAt, {
                            dateStyle: "short",
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
