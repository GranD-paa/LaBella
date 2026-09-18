"use client";

import { PlateFacts, PlateZone } from "@/components/layout/plate";
import { FlagIcon } from "@/components/menu/flag-icon";
import { useTranslations } from "@/components/providers/locale-provider";
import type { ContinueLearningSnapshot } from "@/lib/dashboard/continue-learning";
import { getLocalizedLanguageName } from "@/lib/curriculum/localize";
import type { LanguageSlug } from "@/lib/curriculum/types";

export function ContinueLearningCard({
  snapshot,
}: {
  snapshot: ContinueLearningSnapshot;
}) {
  const { t } = useTranslations();

  const languageName = getLocalizedLanguageName(
    snapshot.languageSlug as LanguageSlug,
    t
  );
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
    <PlateZone groove well className="px-6 py-7 sm:px-10 sm:py-8">
      <h2 className="text-[0.9375rem] font-semibold text-foreground">
        {t("dashboard.user.continueLearningTitle")}
      </h2>

      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-7">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl font-bold sm:text-3xl">
              {languageName}
            </span>
            <FlagIcon
              slug={snapshot.languageSlug as LanguageSlug}
              className="h-6 w-9 shrink-0"
            />
          </div>

          <PlateFacts
            facts={[
              {
                label: t("dashboard.user.currentLevelLabel"),
                value: snapshot.levelCode,
              },
              {
                label: t("dashboard.user.lastActivityLabel"),
                value: lastActivityLabel,
              },
            ]}
          />
        </div>

        {/* The one reading on this zone, so it is set in the same metal as the
            four on the rail above — a number, not a caption on a bar. */}
        <div className="min-w-[13rem] flex-1">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs font-medium text-muted-foreground/70">
              {t("dashboard.user.progressLabel")}
            </span>
            <span className="plate-metal text-2xl font-bold sm:text-3xl">
              {snapshot.progressPercent}%
            </span>
          </div>
          <div className="plate-track mt-2.5">
            <div
              className="plate-track-fill"
              style={{ width: `${snapshot.progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </PlateZone>
  );
}
