"use client";

import { useEffect, useRef } from "react";
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

const COUNT_MS = 2000;
/* The readings rise on a CSS wave that opens at 120ms. The count starts with
   them, so the arriving figure and the climbing number are one movement rather
   than two. */
const COUNT_DELAY_MS = 120;

/**
 * Counts a reading up to its real value once, on arrival.
 *
 * The text goes straight to the node instead of through state: four figures at
 * 60fps is some 480 React renders a second for something decorative, and the
 * value React rendered is the value the count lands on, so nothing drifts out
 * of sync. Server-rendered output is the real number from the first byte — the
 * count only ever replaces a number that is already correct.
 *
 * Ease-out, because a counter that decelerates onto its value reads as
 * arriving, while a linear one reads as a machine being read out.
 */
function useCountUp(
  ref: React.RefObject<HTMLElement>,
  target: number,
  suffix: string
) {
  useEffect(() => {
    const node = ref.current;
    // Nothing to count towards, and nothing to count for a reader who has
    // asked the system for less movement.
    if (
      !node ||
      target === 0 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // The server sends the real number, and hydration arrives a few hundred
    // milliseconds after first paint — so the figure is held invisible by CSS
    // until this effect can claim it. If it is already on screen, hydration
    // was slow and the reading has been read: pulling it back to zero now
    // would be a number changing under someone, not an entrance. Leave it.
    if (Number(getComputedStyle(node).opacity) > 0.02) {
      return;
    }

    let frame = 0;
    let startedAt = 0;
    // Reveal and count are the same event, so the figure never appears at a
    // value it is about to abandon.
    node.dataset.counting = "";
    node.textContent = `0${suffix}`;

    const tick = (now: number) => {
      if (!startedAt) {
        startedAt = now;
      }
      const elapsed = now - startedAt - COUNT_DELAY_MS;
      if (elapsed >= 0) {
        const progress = Math.min(elapsed / COUNT_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress >= 1) {
          return;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      // Whatever interrupted the count, the reading it leaves behind is true.
      node.textContent = `${target}${suffix}`;
      delete node.dataset.counting;
    };
  }, [ref, target, suffix]);
}

/** One reading, engraved into the plate rather than boxed on top of it. */
function Figure({
  label,
  value,
  note,
  suffix = "",
}: {
  label: string;
  value: number;
  note: string;
  /** Printed after the figure and carried through the count — "%", so far. */
  suffix?: string;
}) {
  const figure = useRef<HTMLParagraphElement>(null);
  useCountUp(figure, value, suffix);

  return (
    <div className="ac-fig px-6 py-7 sm:px-8 sm:py-9">
      <p className="text-[0.8125rem] text-muted-foreground">{label}</p>
      {/* Spacing lives with the type in globals.css: the figure carries padding
          the gradient needs, and margins that cancel it out. */}
      <p ref={figure} className="ac-fig-value">{`${value}${suffix}`}</p>
      <p className="mt-3 text-[0.8125rem] font-medium text-muted-foreground/70">{note}</p>
    </div>
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

  const showFigures =
    !showFullManagement && (canSeeLearners || canSeeContent);
  const showIndex = !showFullManagement && navItems.length > 0;
  const showLedger = !showFullManagement && canSeeContent;

  return (
    <section className="ac-plate">
      <span className="ac-sheen" aria-hidden />
      <div className="ac-zone flex flex-wrap items-end justify-between gap-6 px-6 pb-8 pt-7 sm:px-10 sm:pb-10 sm:pt-9">
        <div className="min-w-0">
          <p className="flex items-center gap-2.5 text-[0.8125rem] font-medium text-foreground/80">
            <span className="ac-eyebrow-dot" aria-hidden />
            {t("dashboard.admin.badge")}
          </p>
          <h1 className="ac-title mt-4">
            {t("dashboard.admin.hello", { name: displayName })}
          </h1>
          <p className="mt-3.5 max-w-[46ch] text-[0.9375rem]/[1.9] text-muted-foreground">
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

      {showFigures || showIndex || showLedger ? (
        <div className="ac-zone ac-horizon" aria-hidden />
      ) : null}

      {showFigures ? (
        <div className="ac-zone ac-figs ac-wave">
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
        </div>
      ) : null}

      {showIndex ? (
        <nav className="ac-zone ac-groove ac-well grid gap-x-7 px-3 py-4 sm:grid-cols-2 sm:px-7 sm:py-6">
          {navItems.map((item) => {
            const Icon: LucideIcon = NAV_ICONS[item.icon];
            return (
              <Link key={item.href} href={item.href} className="ac-row">
                <Icon
                  className="ac-row-icon h-[1.05rem] w-[1.05rem] shrink-0 text-foreground/60"
                  aria-hidden
                />
                <span className="min-w-0 truncate text-[0.9375rem] font-medium text-foreground/95">
                  {item.labelKey ? t(item.labelKey) : item.label}
                </span>
                <span className="ac-leader" aria-hidden />
                <ChevronRight
                  className="ac-chev h-4 w-4 shrink-0 text-foreground/45 rtl:rotate-180"
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>
      ) : null}

      {showLedger ? (
        <div className="ac-zone ac-groove">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-6 pb-5 pt-7 sm:px-10 sm:pt-8">
            <h2 className="text-[0.9375rem] font-semibold text-foreground">
              {t("dashboard.admin.recentActivity")}
            </h2>
            {data.recentActivity.length > 0 ? (
              <span className="text-[0.8125rem] tabular-nums text-muted-foreground">
                {t("dashboard.admin.activityCount", {
                  count: data.recentActivity.length,
                })}
              </span>
            ) : null}
            <p className="text-[0.8125rem] font-medium text-muted-foreground/70">
              {t("dashboard.admin.recentActivityHint")}
            </p>
          </div>

          {data.recentActivity.length === 0 ? (
            <p className="px-6 pb-12 pt-5 text-center text-sm text-muted-foreground">
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
        </div>
      ) : null}
    </section>
  );
}
