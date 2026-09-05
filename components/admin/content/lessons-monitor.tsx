"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Clapperboard,
  GraduationCap,
  ImageIcon,
  ListChecks,
  type LucideIcon,
} from "lucide-react";

import { FlagIcon } from "@/components/menu/flag-icon";
import { useTranslations } from "@/components/providers/locale-provider";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type {
  ContentCategorySlug,
  ContentWizardTarget,
} from "@/lib/content-management/categories";
import {
  buildContentCoverage,
  COVERAGE_SLOTS,
  type CoverageState,
  type LevelCoverage,
  type SlotCoverage,
} from "@/lib/curriculum/content-coverage";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type {
  GrammarRule,
  Lesson,
  Quiz,
  QuizQuestion,
  VideoLesson,
  Vocabulary,
} from "@/types";
import { cn } from "@/lib/utils";

const SLOT_META: Record<
  SlotCoverage["slot"],
  { icon: LucideIcon; titleKey: string; category: ContentCategorySlug }
> = {
  grammar: {
    icon: BookOpen,
    titleKey: "admin.content.categories.grammar.title",
    category: "grammar",
  },
  vocabulary: {
    icon: ImageIcon,
    titleKey: "admin.content.categories.vocabulary.title",
    category: "vocabulary",
  },
  video: {
    icon: Clapperboard,
    titleKey: "admin.content.categories.video.title",
    category: "video",
  },
  quiz: {
    icon: ListChecks,
    titleKey: "admin.content.categories.quiz.title",
    category: "quiz",
  },
  "level-exam": {
    icon: GraduationCap,
    titleKey: "admin.content.categories.levelExam.title",
    category: "level-exam",
  },
};

const STATE_KEY: Record<CoverageState, string> = {
  empty: "admin.content.monitor.stateEmpty",
  draft: "admin.content.monitor.stateDraft",
  published: "admin.content.monitor.statePublished",
};

/**
 * One square. Filled means the content behind it is live, an outline with a
 * dot means a draft is sitting there, and a bare outline means nothing has
 * been filed yet.
 *
 * Every square opens its section, published ones included — a slot that is
 * done is exactly the one an admin wants to look inside, to check what is in
 * it or take something back out.
 */
function SlotSquare({
  slot,
  label,
  onOpen,
}: {
  slot: SlotCoverage;
  /** Spelled out in full, for the tooltip and for screen readers. */
  label: string;
  onOpen: (() => void) | null;
}) {
  const shared = cn(
    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
    slot.state === "published" && "border-brand-accent bg-brand-accent",
    slot.state === "draft" && "border-brand-accent bg-brand-accent/5",
    slot.state === "empty" && "border-white/15 bg-white/[0.03]"
  );

  const marker =
    slot.state === "draft" ? (
      <span className="h-2 w-2 rounded-[2px] bg-brand-accent" />
    ) : null;

  if (!onOpen) {
    return (
      <div className={shared} role="img" aria-label={label} title={label}>
        {marker}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      title={label}
      className={cn(
        shared,
        "hover:border-brand-accent hover:bg-brand-accent/20",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      {marker}
    </button>
  );
}

function LevelRow({
  level,
  onOpenSlot,
}: {
  level: LevelCoverage;
  onOpenSlot: (levelSlug: string, category: ContentCategorySlug) => void;
}) {
  const { t } = useTranslations();

  return (
    <>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{level.code}</p>
        {/* <bdi> isolates an English lesson title inside the Persian layout
            without flipping the row's own alignment, which `dir="auto"` on the
            paragraph would do. */}
        <p className="truncate text-xs text-muted-foreground">
          <bdi>
            {level.lessonId
              ? level.title
              : t("admin.content.monitor.noLessonYet")}
          </bdi>
        </p>
      </div>
      {level.slots.map((slot) => {
        const meta = SLOT_META[slot.slot];
        return (
          <SlotSquare
            key={slot.slot}
            slot={slot}
            label={t("admin.content.monitor.slotLabel", {
              level: level.code,
              category: t(meta.titleKey),
              state: t(STATE_KEY[slot.state]),
            })}
            onOpen={() => onOpenSlot(level.slug, meta.category)}
          />
        );
      })}
    </>
  );
}

/**
 * A read-at-a-glance map of which lesson slots still need content, and the way
 * back into the creation wizard for the ones that do.
 */
export function LessonsMonitor({
  languages,
  lessons,
  grammarRules,
  vocabulary,
  videoLessons,
  quizzes,
  quizQuestions,
  onOpenSlot,
}: {
  languages: CurriculumLanguage[];
  lessons: Lesson[];
  grammarRules: GrammarRule[];
  vocabulary: Vocabulary[];
  videoLessons: VideoLesson[];
  quizzes: Quiz[];
  quizQuestions: QuizQuestion[];
  onOpenSlot: (target: Omit<ContentWizardTarget, "nonce">) => void;
}) {
  const { t } = useTranslations();
  const [languageSlug, setLanguageSlug] = useState<string>(
    () => languages.find((language) => language.available)?.slug ?? "italian"
  );

  const language = useMemo(
    () => languages.find((entry) => entry.slug === languageSlug),
    [languages, languageSlug]
  );

  const questionCountByQuiz = useMemo(
    () =>
      quizQuestions.reduce<Record<string, number>>((counts, question) => {
        counts[question.quiz_id] = (counts[question.quiz_id] ?? 0) + 1;
        return counts;
      }, {}),
    [quizQuestions]
  );

  const bands = useMemo(
    () =>
      language
        ? buildContentCoverage({
            language,
            lessons,
            grammarRules,
            vocabulary,
            videoLessons,
            quizzes,
            questionCountByQuiz,
          })
        : [],
    [
      language,
      lessons,
      grammarRules,
      vocabulary,
      videoLessons,
      quizzes,
      questionCountByQuiz,
    ]
  );

  function open(levelSlug: string, category: ContentCategorySlug) {
    if (!language) return;
    onOpenSlot({ languageSlug: language.slug, levelSlug, category });
  }

  return (
    <section id="lessons-monitor" data-testid="lessons-monitor">
      <Card className="brand-surface overflow-hidden border-brand-accent/20">
        <CardHeader className="space-y-4 border-b border-white/10 bg-muted/10">
          <div className="flex flex-wrap gap-2">
            {languages.map((entry) => (
              <button
                key={entry.slug}
                type="button"
                disabled={!entry.available}
                onClick={() => setLanguageSlug(entry.slug)}
                title={
                  entry.available
                    ? t("common.available")
                    : t("common.comingSoon")
                }
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors hover:border-brand-accent/50",
                  languageSlug === entry.slug
                    ? "border-brand-accent bg-brand-accent/10 text-brand-accent"
                    : "border-white/10",
                  !entry.available && "cursor-not-allowed opacity-50"
                )}
              >
                <FlagIcon slug={entry.slug} className="h-4 w-6" />
                <span className="font-medium">{entry.name}</span>
              </button>
            ))}
          </div>

          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-[3px] border-2 border-white/15 bg-white/[0.03]" />
              {t("admin.content.monitor.stateEmpty")}
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-[3px] border-2 border-brand-accent bg-brand-accent/5">
                <span className="h-1 w-1 rounded-[1px] bg-brand-accent" />
              </span>
              {t("admin.content.monitor.stateDraft")}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-[3px] border-2 border-brand-accent bg-brand-accent" />
              {t("admin.content.monitor.statePublished")}
            </li>
          </ul>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          {bands.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {t("admin.content.monitor.noLevels")}
            </p>
          ) : (
            bands.map((band) => (
              <div key={band.band} className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 bg-muted/20 px-4 py-3">
                  <div className="space-y-1">
                    <p className="font-semibold">{band.band}</p>
                    <p className="text-xs text-muted-foreground">
                      {t("admin.content.monitor.bandSummary", {
                        levels: band.levels.length,
                        done: band.publishedSlots,
                        total: band.totalSlots,
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {t("admin.content.categories.levelExam.title")}
                    </span>
                    <SlotSquare
                      slot={band.levelExam}
                      label={t("admin.content.monitor.slotLabel", {
                        level: band.band,
                        category: t("admin.content.categories.levelExam.title"),
                        state: t(STATE_KEY[band.levelExam.state]),
                      })}
                      onOpen={
                        band.levels[0]
                          ? () => open(band.levels[0]!.slug, "level-exam")
                          : null
                      }
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="grid min-w-[22rem] grid-cols-[minmax(0,1fr)_repeat(4,2rem)] items-center gap-x-3 gap-y-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      {t("admin.content.monitor.levelColumn")}
                    </span>
                    {COVERAGE_SLOTS.map((slot) => {
                      const Icon = SLOT_META[slot].icon;
                      return (
                        <span
                          key={slot}
                          className="flex justify-center text-muted-foreground"
                          title={t(SLOT_META[slot].titleKey)}
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                          <span className="sr-only">
                            {t(SLOT_META[slot].titleKey)}
                          </span>
                        </span>
                      );
                    })}

                    {band.levels.map((level) => (
                      <LevelRow
                        key={level.slug}
                        level={level}
                        onOpenSlot={open}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}
