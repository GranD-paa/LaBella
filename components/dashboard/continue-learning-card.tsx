"use client";

import { useTranslations } from "@/components/providers/locale-provider";
import type { ContinueLearningSnapshot } from "@/lib/dashboard/continue-learning";
import { getLocalizedLanguageName } from "@/lib/curriculum/localize";
import { cn } from "@/lib/utils";

export function ContinueLearningCard({
  snapshot,
}: {
  snapshot: ContinueLearningSnapshot;
}) {
  const { t } = useTranslations();

  const languageName = getLocalizedLanguageName(snapshot.languageSlug as "italian", t);
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

        <div className="min-w-0 space-y-5">
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
      </div>
    </section>
  );
}
