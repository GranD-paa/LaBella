"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  FileText,
  ImageIcon,
  Landmark,
  Languages,
  ListChecks,
  Receipt,
  Users,
} from "lucide-react";

import { Figure, FigureRail } from "@/components/layout/figure";
import {
  IndexRow,
  Plate,
  PlateHead,
  PlateHorizon,
  PlateIndex,
  PlateZone,
  PlateZoneHead,
} from "@/components/layout/plate";
import { useTranslations } from "@/components/providers/locale-provider";
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

function scoreToneClassName(score: number) {
  if (score >= 80) {
    return "text-emerald-300";
  }
  if (score >= 50) {
    return "text-amber-300";
  }
  return "text-red-300";
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?";
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

  const showFigures = !showFullManagement && (canSeeLearners || canSeeContent);
  const showIndex = !showFullManagement && navItems.length > 0;
  const showLedger = !showFullManagement && canSeeContent;

  return (
    <Plate>
      <PlateHead
        eyebrow={t("dashboard.admin.badge")}
        title={t("dashboard.admin.hello", { name: displayName })}
        lede={t("dashboard.admin.subtitle")}
        action={
          showFullManagement ? (
            <Button variant="outline" className="border-white/20" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                {t("profile.backToDashboard")}
              </Link>
            </Button>
          ) : null
        }
      />

      {showFigures || showIndex || showLedger ? <PlateHorizon /> : null}

      {showFigures ? (
        <FigureRail>
          {canSeeLearners ? (
            <Figure
              label={t("dashboard.admin.totalUsers")}
              value={data.stats.totalUsers}
              note={t("dashboard.admin.registeredLearners")}
            />
          ) : null}
          {canSeeContent ? (
            <>
              <Figure
                label={t("dashboard.admin.totalQuizzes")}
                value={data.stats.totalQuizzes}
                note={t("dashboard.admin.acrossLessons", {
                  count: data.stats.totalLessons,
                })}
              />
              <Figure
                label={t("dashboard.admin.avgScore")}
                value={data.stats.averageScore}
                suffix="%"
                note={t("dashboard.admin.totalAttempts", {
                  count: data.stats.totalAttempts,
                })}
              />
              <Figure
                label={t("dashboard.admin.quizzesWithAttempts")}
                value={data.stats.quizzesWithAttempts}
                note={t("dashboard.admin.outOfTotalQuizzes", {
                  count: data.stats.totalQuizzes,
                })}
              />
            </>
          ) : null}
        </FigureRail>
      ) : null}

      {showIndex ? (
        <PlateZone groove well>
          <PlateIndex>
            {navItems.map((item) => (
              <IndexRow
                key={item.href}
                href={item.href}
                icon={NAV_ICONS[item.icon]}
                label={item.labelKey ? t(item.labelKey) : item.label}
              />
            ))}
          </PlateIndex>
        </PlateZone>
      ) : null}

      {showLedger ? (
        <PlateZone groove>
          <PlateZoneHead
            title={t("dashboard.admin.recentActivity")}
            hint={t("dashboard.admin.recentActivityHint")}
            aside={
              data.recentActivity.length > 0 ? (
                <span className="text-[0.8125rem] tabular-nums text-muted-foreground">
                  {t("dashboard.admin.activityCount", {
                    count: data.recentActivity.length,
                  })}
                </span>
              ) : null
            }
          />

          {data.recentActivity.length === 0 ? (
            <p className="plate-empty mx-6 mb-10 mt-1 text-sm text-muted-foreground sm:mx-10">
              {t("dashboard.admin.noActivity")}
            </p>
          ) : (
            <ul className="max-h-[24rem] divide-y divide-white/[0.04] overflow-y-auto">
              {data.recentActivity.map((activity) => (
                <li
                  key={activity.id}
                  className="flex items-center gap-3.5 px-6 py-3 sm:px-10"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500/[0.18] text-[0.8125rem] font-semibold text-violet-50 ring-1 ring-inset ring-white/[0.09]">
                    {getInitial(activity.userName)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {activity.userName}
                    </p>
                    <p className="truncate text-[0.8125rem] font-medium text-muted-foreground/75">
                      {activity.quizTitle}
                    </p>
                  </div>
                  <div className="shrink-0 text-end">
                    <p
                      className={cn(
                        "text-sm font-semibold tabular-nums",
                        scoreToneClassName(activity.score)
                      )}
                    >
                      {activity.score}%
                    </p>
                    <p className="mt-0.5 text-xs font-medium text-muted-foreground/70">
                      {formatDate(activity.createdAt, {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </PlateZone>
      ) : null}
    </Plate>
  );
}
