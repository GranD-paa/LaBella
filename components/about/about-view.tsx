"use client";

import {
  BookOpen,
  Globe2,
  HeartHandshake,
  Target,
  Users,
} from "lucide-react";

import { useTranslations } from "@/components/providers/locale-provider";
import { Plate } from "@/components/layout/plate";

const VALUE_ICONS = [Target, BookOpen, HeartHandshake, Globe2] as const;

const TIMELINE_KEYS = [
  "about.timeline.items.idea",
  "about.timeline.items.italian",
  "about.timeline.items.multilingual",
  "about.timeline.items.future",
] as const;

export function AboutView() {
  const { t } = useTranslations();

  return (
    <div className="space-y-10 pb-4">
      <Plate>
        <div className="plate-zone mx-auto max-w-3xl px-6 py-11 text-center sm:px-10 sm:py-14">
          <p className="inline-flex items-center gap-2.5 text-[0.8125rem] font-medium text-foreground/80">
            <span className="plate-dot" aria-hidden />
            {t("about.badge")}
          </p>
          <h1 className="plate-title mt-4">{t("about.title")}</h1>
          <p className="mx-auto mt-4 max-w-[52ch] text-[0.9375rem]/[1.9] text-muted-foreground">
            {t("about.subtitle")}
          </p>
        </div>
      </Plate>

      <section className="brand-surface p-6 sm:p-8">
        <h2 className="plate-zone-title text-xl font-semibold sm:text-2xl">
          {t("about.missionTitle")}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {t("about.missionBody")}
        </p>
      </section>

      <section className="space-y-5">
        <div className="space-y-2 text-center sm:text-start">
          <h2 className="plate-zone-title text-xl font-semibold sm:text-2xl">
            {t("about.valuesTitle")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("about.valuesSubtitle")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {VALUE_ICONS.map((Icon, index) => {
            const key = `about.values.items.${index}` as const;
            return (
              <div
                key={key}
                className="brand-surface rounded-2xl border border-white/10 p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                  <Icon className="h-5 w-5 text-brand-accent" />
                </div>
                <h3 className="font-semibold">{t(`${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`${key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-5">
        <div className="space-y-2 text-center sm:text-start">
          <h2 className="plate-zone-title text-xl font-semibold sm:text-2xl">
            {t("about.timeline.title")}
          </h2>
          <p className="text-sm text-muted-foreground">{t("about.timeline.subtitle")}</p>
        </div>
        <ol className="relative space-y-4 border-s border-white/10 ps-6">
          {TIMELINE_KEYS.map((key, index) => (
            <li key={key} className="relative">
              <span className="absolute -start-[1.78rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-brand-accent/40 bg-background text-[10px] font-bold text-brand-accent">
                {index + 1}
              </span>
              <div className="plate-tile rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <p className="font-medium">{t(`${key}.title`)}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t(`${key}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {(["learners", "languages", "lessons"] as const).map((key) => (
          <div
            key={key}
            className="brand-surface p-5 text-center"
          >
            <p className="text-3xl font-bold text-brand-accent">
              {t(`about.stats.${key}.value`)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {t(`about.stats.${key}.label`)}
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-brand-accent/30 bg-brand-accent/5 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-brand-accent" />
              <h2 className="text-xl font-semibold">{t("about.communityTitle")}</h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t("about.communityBody")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
