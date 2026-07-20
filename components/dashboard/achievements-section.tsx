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

import { useTranslations } from "@/components/providers/locale-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  const earnedCount = achievements.filter((achievement) => achievement.earned).length;

  return (
    <section className="brand-surface overflow-hidden rounded-2xl border border-white/10">
      <Button
        type="button"
        variant="ghost"
        className="h-auto w-full rounded-none px-4 py-4 text-start hover:bg-white/5 sm:px-6 sm:py-5"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <div className="flex w-full items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-semibold">
                {t("dashboard.user.achievementsTitle")}
              </h2>
              <Badge variant="outline" className="border-brand-accent/30 bg-brand-accent/10">
                {t("dashboard.user.achievementsProgress", {
                  earned: earnedCount,
                  total: achievements.length,
                })}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("dashboard.user.achievementsHint")}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 pt-0.5 text-muted-foreground">
            <span className="hidden text-xs sm:inline">
              {open
                ? t("dashboard.user.achievementsCollapse")
                : t("dashboard.user.achievementsExpand")}
            </span>
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-transform duration-200",
                open && "rotate-180"
              )}
            />
          </div>
        </div>
      </Button>

      {open ? (
        <div className="grid gap-3 border-t border-white/10 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const Icon =
              ACHIEVEMENT_ICONS[achievement.icon as keyof typeof ACHIEVEMENT_ICONS] ??
              Star;
            const messageKey = ACHIEVEMENT_MESSAGE_KEYS[achievement.id];

            return (
              <div
                key={achievement.id}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4 transition-all",
                  achievement.earned
                    ? "border-brand-accent/30 bg-brand-accent/5"
                    : "border-white/10 bg-white/[0.02] opacity-70 grayscale"
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
                <div className="min-w-0">
                  <p className="font-medium">
                    {messageKey
                      ? t(`${messageKey}.title`)
                      : achievement.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
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
    </section>
  );
}
