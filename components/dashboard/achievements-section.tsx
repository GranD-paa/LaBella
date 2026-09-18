"use client";

import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  Compass,
  Crown,
  Flame,
  Gem,
  Medal,
  Rocket,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";

import { PlateZone } from "@/components/layout/plate";
import { useTranslations } from "@/components/providers/locale-provider";
import type { UserDashboardData } from "@/lib/dashboard-data";
import { ACHIEVEMENT_MESSAGE_KEYS } from "@/lib/i18n/content-keys";
import { cn } from "@/lib/utils";

const ACHIEVEMENT_ICONS = {
  trophy: Trophy,
  star: Star,
  zap: Zap,
  target: Target,
  flame: Flame,
  crown: Crown,
  medal: Medal,
  rocket: Rocket,
  bookOpen: BookOpen,
  sparkles: Sparkles,
  gem: Gem,
  compass: Compass,
} as const;

type Achievement = UserDashboardData["achievements"][number];

export function AchievementsSection({
  achievements,
}: {
  achievements: Achievement[];
}) {
  const { t } = useTranslations();
  const [open, setOpen] = useState(false);
  const earnedCount = achievements.filter(
    (achievement) => achievement.earned
  ).length;

  return (
    <PlateZone groove>
      {/* The whole header is the control, so the target is the width of the
          zone rather than a chevron in the corner. */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="plate-row w-full rounded-none px-6 py-6 text-start sm:px-10"
      >
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-[0.9375rem] font-semibold text-foreground">
              {t("dashboard.user.achievementsTitle")}
            </span>
            <span className="text-[0.8125rem] tabular-nums text-muted-foreground">
              {t("dashboard.user.achievementsProgress", {
                earned: earnedCount,
                total: achievements.length,
              })}
            </span>
          </span>
          <span className="mt-1.5 block text-[0.8125rem] font-medium text-muted-foreground/70">
            {t("dashboard.user.achievementsHint")}
          </span>
        </span>
        <span className="hidden shrink-0 text-xs font-medium text-muted-foreground/70 sm:inline">
          {open
            ? t("dashboard.user.achievementsCollapse")
            : t("dashboard.user.achievementsExpand")}
        </span>
        <ChevronDown
          className={cn(
            "plate-chev h-5 w-5 shrink-0 text-foreground/45",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="grid gap-2.5 px-6 pb-7 sm:grid-cols-2 sm:px-10 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const Icon =
              ACHIEVEMENT_ICONS[
                achievement.icon as keyof typeof ACHIEVEMENT_ICONS
              ] ?? Star;
            const messageKey = ACHIEVEMENT_MESSAGE_KEYS[achievement.id];

            return (
              <div
                key={achievement.id}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4",
                  // Earned is lit; unearned is the same shape with the light
                  // off, which is the point of showing it at all.
                  achievement.earned
                    ? "border-brand-accent/25 bg-brand-accent/[0.06]"
                    : "border-white/[0.06] bg-white/[0.02]"
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    achievement.earned
                      ? "bg-brand-accent/15 text-brand-accent"
                      : "bg-white/[0.05] text-foreground/35"
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "font-medium",
                      achievement.earned
                        ? "text-foreground"
                        : "text-foreground/70"
                    )}
                  >
                    {messageKey ? t(`${messageKey}.title`) : achievement.title}
                  </p>
                  <p className="mt-1 text-[0.8125rem] font-medium leading-6 text-muted-foreground/75">
                    {messageKey
                      ? t(`${messageKey}.description`)
                      : achievement.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </PlateZone>
  );
}
