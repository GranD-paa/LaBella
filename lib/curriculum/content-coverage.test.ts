import { describe, expect, it } from "vitest";

import { buildContentCoverage } from "./content-coverage";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { Lesson, Quiz } from "@/types";

function buildLesson(overrides: Partial<Lesson> = {}): Lesson {
  return {
    id: "lesson-1",
    title: "A1-1 Foundations",
    description: null,
    order_number: 1,
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

function buildQuiz(overrides: Partial<Quiz> = {}): Quiz {
  return {
    id: "quiz-1",
    lesson_id: "lesson-1",
    title: "Checkpoint",
    language_slug: "italian",
    level_slug: "a1-1",
    section_slug: "quiz",
    status: "published",
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

function buildLanguage(
  overrides: Partial<CurriculumLanguage> = {}
): CurriculumLanguage {
  return {
    slug: "italian",
    name: "Italian",
    headline: "",
    description: "",
    flagEmoji: "",
    accentClass: "",
    available: true,
    levels: [
      {
        slug: "a1-1",
        code: "A1-1",
        title: "Foundations",
        description: "",
        orderNumber: 1,
      },
      {
        slug: "a1-2",
        code: "A1-2",
        title: "Introductions",
        description: "",
        orderNumber: 2,
      },
    ],
    ...overrides,
  };
}

const emptyInput = {
  language: buildLanguage(),
  lessons: [buildLesson()],
  grammarRules: [],
  vocabulary: [],
  videoLessons: [],
  quizzes: [],
};

describe("buildContentCoverage", () => {
  it("groups levels under their CEFR band and reports four slots each", () => {
    const [band, ...rest] = buildContentCoverage(emptyInput);

    expect(rest).toEqual([]);
    expect(band.band).toBe("A1");
    expect(band.levels.map((level) => level.slug)).toEqual(["a1-1", "a1-2"]);
    expect(band.totalSlots).toBe(8);
    expect(band.publishedSlots).toBe(0);
    expect(band.levels[0].slots.map((slot) => slot.slot)).toEqual([
      "grammar",
      "vocabulary",
      "video",
      "quiz",
    ]);
  });

  it("marks a slot published only once published content exists", () => {
    const [band] = buildContentCoverage({
      ...emptyInput,
      grammarRules: [{ lesson_id: "lesson-1", status: "draft" }],
      vocabulary: [{ lesson_id: "lesson-1", status: "published" }],
    });

    const [grammar, vocabulary, video] = band.levels[0].slots;
    expect(grammar.state).toBe("draft");
    expect(vocabulary.state).toBe("published");
    expect(video.state).toBe("empty");
    expect(band.publishedSlots).toBe(1);
  });

  it("leaves every slot empty for a level with no lesson row", () => {
    const [band] = buildContentCoverage({
      ...emptyInput,
      grammarRules: [{ lesson_id: "lesson-1", status: "published" }],
    });

    expect(band.levels[1].lessonId).toBeNull();
    expect(band.levels[1].slots.every((slot) => slot.state === "empty")).toBe(
      true
    );
  });

  it("files a level exam under its band rather than a level", () => {
    const [band] = buildContentCoverage({
      ...emptyInput,
      quizzes: [
        buildQuiz({ id: "exam-1", section_slug: "level-exam" }),
      ],
    });

    expect(band.levelExam.state).toBe("published");
    expect(band.levels[0].slots[3].state).toBe("empty");
  });

  it("ignores quizzes belonging to another language", () => {
    const [band] = buildContentCoverage({
      ...emptyInput,
      quizzes: [buildQuiz({ language_slug: "german" })],
    });

    expect(band.levels[0].slots[3].state).toBe("empty");
  });

  it("skips a quiz with no questions when counts are supplied", () => {
    const [withCounts] = buildContentCoverage({
      ...emptyInput,
      quizzes: [buildQuiz()],
      questionCountByQuiz: { "quiz-1": 0 },
    });
    const [withoutCounts] = buildContentCoverage({
      ...emptyInput,
      quizzes: [buildQuiz()],
    });

    expect(withCounts.levels[0].slots[3].state).toBe("empty");
    expect(withoutCounts.levels[0].slots[3].state).toBe("published");
  });
});
