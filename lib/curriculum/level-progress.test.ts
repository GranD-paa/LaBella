import { describe, expect, it } from "vitest";
import {
  getLevelCheckpointQuizzes,
  isLevelCompleted,
  resolveNextIncompleteLevel,
} from "./level-progress";
import type { CurriculumLevel } from "@/lib/curriculum/types";
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

function buildLevel(overrides: Partial<CurriculumLevel> = {}): CurriculumLevel {
  return {
    slug: "a1-1",
    code: "A1-1",
    title: "Foundations",
    description: "",
    orderNumber: 1,
    ...overrides,
  };
}

describe("isLevelCompleted", () => {
  it("is false when the level has no checkpoint quiz at all", () => {
    expect(isLevelCompleted([], new Set())).toBe(false);
  });

  it("is false when some quizzes are unattempted", () => {
    const quizzes = [buildQuiz({ id: "q1" }), buildQuiz({ id: "q2" })];
    expect(isLevelCompleted(quizzes, new Set(["q1"]))).toBe(false);
  });

  it("is true once every quiz has an attempt", () => {
    const quizzes = [buildQuiz({ id: "q1" }), buildQuiz({ id: "q2" })];
    expect(isLevelCompleted(quizzes, new Set(["q1", "q2"]))).toBe(true);
  });
});

describe("getLevelCheckpointQuizzes", () => {
  it("finds the published quiz section for a level's lesson", () => {
    const lessons = [buildLesson({ id: "lesson-1", order_number: 1 })];
    const quizzes = [
      buildQuiz({ id: "q1", lesson_id: "lesson-1", level_slug: "a1-1" }),
      buildQuiz({
        id: "q2",
        lesson_id: "lesson-2",
        level_slug: "a1-2",
      }),
    ];

    const result = getLevelCheckpointQuizzes("italian", "a1-1", lessons, quizzes);
    expect(result.map((q) => q.id)).toEqual(["q1"]);
  });
});

describe("resolveNextIncompleteLevel", () => {
  const lessons = [
    buildLesson({ id: "lesson-1", order_number: 1 }),
    buildLesson({ id: "lesson-2", order_number: 2 }),
    buildLesson({ id: "lesson-3", order_number: 3 }),
  ];
  const levels = [
    buildLevel({ slug: "a1-1", code: "A1-1", orderNumber: 1 }),
    buildLevel({ slug: "a1-2", code: "A1-2", orderNumber: 2 }),
    buildLevel({ slug: "a1-3", code: "A1-3", orderNumber: 3 }),
  ];
  const quizzes = [
    buildQuiz({ id: "q1", lesson_id: "lesson-1", level_slug: "a1-1" }),
    buildQuiz({ id: "q2", lesson_id: "lesson-2", level_slug: "a1-2" }),
    buildQuiz({ id: "q3", lesson_id: "lesson-3", level_slug: "a1-3" }),
  ];

  it("returns the first level whose checkpoint quiz hasn't been attempted", () => {
    const attempted = new Set(["q1"]);
    const next = resolveNextIncompleteLevel(
      "italian",
      levels,
      lessons,
      quizzes,
      attempted
    );
    expect(next?.slug).toBe("a1-2");
  });

  it("skips straight to the first not-yet-started level when nothing is attempted", () => {
    const next = resolveNextIncompleteLevel(
      "italian",
      levels,
      lessons,
      quizzes,
      new Set()
    );
    expect(next?.slug).toBe("a1-1");
  });

  it("falls back to the last level once everything is complete", () => {
    const attempted = new Set(["q1", "q2", "q3"]);
    const next = resolveNextIncompleteLevel(
      "italian",
      levels,
      lessons,
      quizzes,
      attempted
    );
    expect(next?.slug).toBe("a1-3");
  });
});
