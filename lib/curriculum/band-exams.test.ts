import { describe, expect, it } from "vitest";

import { groupLevelExamsByBand } from "@/lib/curriculum/band-exams";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { Lesson, Quiz } from "@/types";

function language(levelSlugs: string[]): CurriculumLanguage {
  return {
    slug: "italian",
    name: "Italian",
    headline: "",
    description: "",
    flagEmoji: "",
    accentClass: "",
    available: true,
    levels: levelSlugs.map((slug, index) => ({
      slug,
      code: slug.toUpperCase(),
      title: slug,
      description: "",
      orderNumber: index + 1,
    })),
  } as CurriculumLanguage;
}

function quiz(over: Partial<Quiz> = {}): Quiz {
  return {
    id: "q1",
    lesson_id: "lesson-1",
    title: "Exam",
    language_slug: "italian",
    level_slug: "a1-10",
    section_slug: "level-exam",
    status: "published",
    created_at: "2026-08-13T00:00:00Z",
    ...over,
  } as Quiz;
}

const LESSONS: Lesson[] = [];

/** Every quiz has one question unless a test says otherwise. */
function counts(...quizzes: Quiz[]): Record<string, number> {
  return Object.fromEntries(quizzes.map((entry) => [entry.id, 1]));
}

const TEN_A1_LEVELS = Array.from({ length: 10 }, (_, i) => `a1-${i + 1}`);

describe("groupLevelExamsByBand", () => {
  it("collapses sub-levels into one exam per band", () => {
    // The whole reason this exists: a1-1…a1-10 are ten steps *inside* A1, so an
    // exam covering "all of A1" must appear once, not ten times.
    const a = quiz({ id: "a", level_slug: "a1-3" });
    const b = quiz({ id: "b", level_slug: "a1-10" });

    const exams = groupLevelExamsByBand(
      language(TEN_A1_LEVELS),
      [a, b],
      LESSONS,
      counts(a, b)
    );

    expect(exams).toHaveLength(1);
    expect(exams[0]!.band).toBe("A1");
    expect(exams[0]!.quizzes.map((q) => q.id)).toEqual(["a", "b"]);
  });

  it("keeps separate bands separate and in curriculum order", () => {
    const a2 = quiz({ id: "a2", level_slug: "a2-1" });
    const a1 = quiz({ id: "a1", level_slug: "a1-1" });

    const exams = groupLevelExamsByBand(
      language([...TEN_A1_LEVELS, "a2-1", "a2-2"]),
      // Deliberately out of order, to prove ordering comes from the curriculum.
      [a2, a1],
      LESSONS,
      counts(a1, a2)
    );

    expect(exams.map((exam) => exam.band)).toEqual(["A1", "A2"]);
  });

  it("reports the band's first level, so entitlement is resolved against it", () => {
    const exam = quiz({ id: "a", level_slug: "a1-7" });

    const exams = groupLevelExamsByBand(
      language(TEN_A1_LEVELS),
      [exam],
      LESSONS,
      counts(exam)
    );

    expect(exams[0]!.firstLevelSlug).toBe("a1-1");
  });

  it("ignores the per-lesson quizzes that stay free", () => {
    const lessonQuiz = quiz({ id: "a", section_slug: "quiz" });

    const exams = groupLevelExamsByBand(
      language(TEN_A1_LEVELS),
      [lessonQuiz],
      LESSONS,
      counts(lessonQuiz)
    );

    expect(exams).toHaveLength(0);
  });

  it("ignores drafts and other languages", () => {
    const draft = quiz({ id: "a", status: "draft" });
    const german = quiz({ id: "b", language_slug: "german" });

    const exams = groupLevelExamsByBand(
      language(TEN_A1_LEVELS),
      [draft, german],
      LESSONS,
      counts(draft, german)
    );

    expect(exams).toHaveLength(0);
  });

  it("ignores an exam with no questions, which cannot be sat", () => {
    const empty = quiz({ id: "a" });

    const exams = groupLevelExamsByBand(
      language(TEN_A1_LEVELS),
      [empty],
      LESSONS,
      { a: 0 }
    );

    expect(exams).toHaveLength(0);
  });

  it("returns nothing when the language has no exams yet", () => {
    expect(
      groupLevelExamsByBand(language(TEN_A1_LEVELS), [], LESSONS, {})
    ).toEqual([]);
  });
});
