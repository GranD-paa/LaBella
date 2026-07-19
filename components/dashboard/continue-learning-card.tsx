"use client";

import Link from "next/link";
import { PlayCircle } from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import type { ContinueLearningSnapshot } from "@/lib/dashboard/continue-learning";
import { cn } from "@/lib/utils";

export function ContinueLearningCard({
  snapshot,
}: {
  snapshot: ContinueLearningSnapshot;
}) {
  const { t } = useTranslations();

  const languageName = t("locale.italian");
  const categoryLabel = t(
    `learn.categories.${snapshot.lastActivityCategory}.title`
  );
  const lastActivityLabel = snapshot.lastActivityTopic
    ? t("dashboard.user.lastActivityFormat", {
        category: categoryLabel,
        topic: snapshot.lastActivityTopic,
      })
    : t("dashboard.user.lastActivityDefault", {
        category: categoryLabel,
        topic: t("dashboard.user.defaultActivityTopic"),
      });

  return (
    <section
      className={cn(
        "brand-surface relative overflow-hidden border border-brand-accent/35 p-6 shadow-brand sm:p-8",
        "ring-1 ring-brand-accent/10"
      )}
    >
      <div className="absolute inset-0 bg-brand-gradient opacity-30" />
      <div className="relative space-y-6">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {t("dashboard.user.continueLearningTitle")}
          </h2>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 flex-1 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-2xl font-bold tracking-tight sm:text-3xl">
                {languageName}
              </span>
              <span className="text-2xl sm:text-3xl" aria-hidden>
                {snapshot.flagEmoji}
              </span>
            </div>

            <dl className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t("dashboard.user.currentLevelLabel")}
                </dt>
                <dd className="text-lg font-semibold">{snapshot.levelCode}</dd>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t("dashboard.user.lastActivityLabel")}
                </dt>
                <dd className="text-lg font-semibold">{lastActivityLabel}</dd>
              </div>
            </dl>

            <div className="space-y-2">
              <div className="flex items-end justify-between gap-3">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {t("dashboard.user.progressLabel")}
                </span>
                <span className="text-2xl font-bold text-brand-accent">
                  {snapshot.progressPercent}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted/80">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700"
                  style={{ width: `${snapshot.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          <Button
            asChild
            size="lg"
            className="w-full shrink-0 bg-primary font-semibold text-primary-foreground shadow-brand hover:bg-primary/90 lg:w-auto"
          >
            <Link href={snapshot.continueHref}>
              <PlayCircle className="h-5 w-5" />
              {t("dashboard.user.continueLearningButton")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
