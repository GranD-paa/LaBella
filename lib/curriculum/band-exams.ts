import { cefrBandOf } from "@/lib/entitlements";
import { withQuizDefaults } from "@/lib/quiz-management/helpers";
import { LEVEL_EXAM_SECTION } from "@/lib/quiz-management/types";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { Lesson, Quiz } from "@/types";

export type BandExam = {
  /** CEFR band the exam covers, e.g. "A1". */
  band: string;
  /** Localized code of the first level in the band, for ordering. */
  firstLevelSlug: string;
  quizzes: Quiz[];
};

/**
 * The comprehensive exams for a language, one per CEFR band.
 *
 * The course levels are sub-levels — `a1-1` … `a1-10` are ten steps *within*
 * A1 — so an exam that covers "the whole of A1" cannot belong to any single
 * one of them. Every published `level-exam` quiz sitting anywhere in the band
 * therefore rolls up into that band's exam, which is why this groups by band
 * rather than by level.
 */
export function groupLevelExamsByBand(
  language: CurriculumLanguage,
  quizzes: Quiz[],
  lessons: Lesson[],
  /** Quizzes with no questions are not sittable. */
  questionCountByQuiz: Record<string, number> = {}
): BandExam[] {
  // Bands in curriculum order, so A1 is listed before A2.
  const bandOrder: string[] = [];
  const firstLevelOfBand: Record<string, string> = {};
  for (const level of [...language.levels].sort(
    (a, b) => a.orderNumber - b.orderNumber
  )) {
    const band = cefrBandOf(level.slug);
    if (!band) continue;
    if (!bandOrder.includes(band)) {
      bandOrder.push(band);
      firstLevelOfBand[band] = level.slug;
    }
  }

  const byBand = new Map<string, Quiz[]>();

  for (const quiz of quizzes) {
    const normalized = withQuizDefaults(quiz, lessons);
    if (normalized.status !== "published") continue;
    if (normalized.section_slug !== LEVEL_EXAM_SECTION) continue;
    if (normalized.language_slug !== language.slug) continue;
    if ((questionCountByQuiz[quiz.id] ?? 0) === 0) continue;

    const band = cefrBandOf(normalized.level_slug);
    if (!band) continue;

    byBand.set(band, [...(byBand.get(band) ?? []), quiz]);
  }

  return bandOrder
    .filter((band) => byBand.has(band))
    .map((band) => ({
      band,
      firstLevelSlug: firstLevelOfBand[band]!,
      quizzes: byBand.get(band)!,
    }));
}
