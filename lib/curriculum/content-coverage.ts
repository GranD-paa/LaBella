import { cefrBandOf } from "@/lib/entitlements";
import { withQuizDefaults } from "@/lib/quiz-management/helpers";
import { LEVEL_EXAM_SECTION } from "@/lib/quiz-management/types";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { Lesson, Quiz } from "@/types";

/**
 * The four things a course level needs before a learner can work through it:
 * a grammar booklet, illustrated vocabulary, a video, and a checkpoint quiz.
 *
 * They are four of the five content types the creation wizard offers. The
 * fifth — the comprehensive level exam — covers a whole CEFR band rather than
 * a single level, so it is tracked once per band as `BandCoverage.levelExam`
 * instead of becoming a fifth slot on every row.
 */
export const COVERAGE_SLOTS = [
  "grammar",
  "vocabulary",
  "video",
  "quiz",
] as const;

export type CoverageSlot = (typeof COVERAGE_SLOTS)[number];

/** What the wizard has filed here: nothing, drafts only, or live content. */
export type CoverageState = "empty" | "draft" | "published";

export type SlotCoverage = {
  slot: CoverageSlot | typeof LEVEL_EXAM_SECTION;
  state: CoverageState;
  draftCount: number;
  publishedCount: number;
};

export type LevelCoverage = {
  slug: string;
  code: string;
  title: string;
  orderNumber: number;
  /** Null while no lesson row carries this level's order number yet. */
  lessonId: string | null;
  /** One entry per `COVERAGE_SLOTS`, in that order. */
  slots: SlotCoverage[];
};

export type BandCoverage = {
  /** CEFR band, e.g. "A1". */
  band: string;
  levels: LevelCoverage[];
  levelExam: SlotCoverage;
  /** Published slots across the band's levels; the exam is not counted here. */
  publishedSlots: number;
  totalSlots: number;
};

type StatusRow = { lesson_id: string; status: "draft" | "published" };

type Tally = { draftCount: number; publishedCount: number };

function emptyTally(): Tally {
  return { draftCount: 0, publishedCount: 0 };
}

function add(map: Map<string, Tally>, key: string, status: string) {
  const tally = map.get(key) ?? emptyTally();
  if (status === "published") tally.publishedCount += 1;
  else tally.draftCount += 1;
  map.set(key, tally);
}

function tallyByLesson(rows: readonly StatusRow[]) {
  const byLesson = new Map<string, Tally>();
  for (const row of rows) add(byLesson, row.lesson_id, row.status);
  return byLesson;
}

function toSlot(
  slot: SlotCoverage["slot"],
  tally: Tally | undefined
): SlotCoverage {
  const { draftCount, publishedCount } = tally ?? emptyTally();
  return {
    slot,
    draftCount,
    publishedCount,
    state:
      publishedCount > 0 ? "published" : draftCount > 0 ? "draft" : "empty",
  };
}

export type ContentCoverageInput = {
  language: CurriculumLanguage;
  lessons: Lesson[];
  grammarRules: readonly StatusRow[];
  vocabulary: readonly StatusRow[];
  videoLessons: readonly StatusRow[];
  quizzes: readonly Quiz[];
  /**
   * Questions per quiz id. When given, a quiz with none is skipped: it cannot
   * be sat, and the learner-facing pages hide it for exactly that reason, so
   * counting it here would report content that nobody can reach.
   */
  questionCountByQuiz?: Record<string, number>;
};

/**
 * How much of a language's curriculum is actually filled in, grouped by CEFR
 * band and broken down per level and content type.
 *
 * Grammar, vocabulary and video rows are keyed only by lesson, so this
 * resolves a level to its lesson the same way the creation wizard and
 * `resolveLessonForLevel` do — by matching `order_number`. Quizzes carry their
 * own language/level path and are matched on that.
 */
export function buildContentCoverage({
  language,
  lessons,
  grammarRules,
  vocabulary,
  videoLessons,
  quizzes,
  questionCountByQuiz,
}: ContentCoverageInput): BandCoverage[] {
  const grammarByLesson = tallyByLesson(grammarRules);
  const vocabularyByLesson = tallyByLesson(vocabulary);
  const videoByLesson = tallyByLesson(videoLessons);

  const quizByLevel = new Map<string, Tally>();
  const examByBand = new Map<string, Tally>();

  for (const quiz of quizzes) {
    if (questionCountByQuiz && (questionCountByQuiz[quiz.id] ?? 0) === 0) {
      continue;
    }

    const normalized = withQuizDefaults(quiz, lessons);
    if (normalized.language_slug !== language.slug) continue;

    if (normalized.section_slug === LEVEL_EXAM_SECTION) {
      add(examByBand, cefrBandOf(normalized.level_slug), normalized.status);
      continue;
    }

    // "custom" is the legacy spelling of the checkpoint section and is what
    // the learner's quiz tab still accepts, so it counts here too.
    if (
      normalized.section_slug !== "quiz" &&
      normalized.section_slug !== "custom"
    ) {
      continue;
    }

    add(quizByLevel, normalized.level_slug, normalized.status);
  }

  // First row wins, matching `lessons.find(...)` in the creation wizard.
  const lessonByOrder = new Map<number, Lesson>();
  for (const lesson of lessons) {
    if (!lessonByOrder.has(lesson.order_number)) {
      lessonByOrder.set(lesson.order_number, lesson);
    }
  }

  const bands: BandCoverage[] = [];
  const byBand = new Map<string, BandCoverage>();

  for (const level of [...language.levels].sort(
    (a, b) => a.orderNumber - b.orderNumber
  )) {
    const band = cefrBandOf(level.slug);
    if (!band) continue;

    const lesson = lessonByOrder.get(level.orderNumber) ?? null;
    const slots: SlotCoverage[] = [
      toSlot("grammar", lesson ? grammarByLesson.get(lesson.id) : undefined),
      toSlot(
        "vocabulary",
        lesson ? vocabularyByLesson.get(lesson.id) : undefined
      ),
      toSlot("video", lesson ? videoByLesson.get(lesson.id) : undefined),
      toSlot("quiz", quizByLevel.get(level.slug)),
    ];

    let entry = byBand.get(band);
    if (!entry) {
      entry = {
        band,
        levels: [],
        levelExam: toSlot(LEVEL_EXAM_SECTION, examByBand.get(band)),
        publishedSlots: 0,
        totalSlots: 0,
      };
      byBand.set(band, entry);
      bands.push(entry);
    }

    entry.levels.push({
      slug: level.slug,
      code: level.code,
      title: level.title,
      orderNumber: level.orderNumber,
      lessonId: lesson?.id ?? null,
      slots,
    });
    entry.publishedSlots += slots.filter(
      (slot) => slot.state === "published"
    ).length;
    entry.totalSlots += slots.length;
  }

  return bands;
}
