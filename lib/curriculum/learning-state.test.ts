import { describe, expect, it } from "vitest";
import { resolveContinueLearningPath } from "./learning-state";
import type { CurriculumLanguage } from "@/lib/curriculum/types";
import type { Lesson, Quiz, UserLearningState } from "@/types";

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

const italian: CurriculumLanguage = {
  slug: "italian",
  name: "Italian",
  headline: "",
  description: "",
  flagEmoji: "🇮🇹",
  accentClass: "",
  available: true,
  levels: [
    { slug: "a1-1", code: "A1-1", title: "Foundations", description: "", orderNumber: 1 },
    { slug: "a1-2", code: "A1-2", title: "Introductions", description: "", orderNumber: 2 },
    { slug: "a1-3", code: "A1-3", title: "Routines", description: "", orderNumber: 3 },
  ],
};

const languages = [italian];

function buildState(overrides: Partial<UserLearningState> = {}): UserLearningState {
  return {
    user_id: "user-1",
    language_slug: "italian",
    level_slug: "a1-1",
    lesson_id: "lesson-1",
    section_slug: "quiz",
    updated_at: new Date().toISOString(),
    ...overrides,
  };
}

describe("resolveContinueLearningPath", () => {
  it("sends a brand-new user to the main menu", () => {
    expect(resolveContinueLearningPath(null, languages)).toBe("/menu");
  });

  it("without progress data, resumes exactly where the learner left off", () => {
    const state = buildState({ level_slug: "a1-1", section_slug: "grammar" });
    expect(resolveContinueLearningPath(state, languages)).toBe(
      "/learn/italian/a1-1/grammar"
    );
  });

  it("stays on the saved level when its checkpoint quiz is unattempted", () => {
    const state = buildState({ level_slug: "a1-1", section_slug: "quiz" });
    const lessons = [buildLesson({ id: "lesson-1", order_number: 1 })];
    const quizzes = [buildQuiz({ id: "q1", lesson_id: "lesson-1", level_slug: "a1-1" })];

    const path = resolveContinueLearningPath(state, languages, {
      lessons,
      quizzes,
      attemptedQuizIds: new Set(),
    });

    expect(path).toBe("/learn/italian/a1-1/quiz");
  });

  it("advances to the next level once the saved level's checkpoint quiz is passed", () => {
    const state = buildState({ level_slug: "a1-1", section_slug: "quiz" });
    const lessons = [
      buildLesson({ id: "lesson-1", order_number: 1 }),
      buildLesson({ id: "lesson-2", order_number: 2 }),
    ];
    const quizzes = [
      buildQuiz({ id: "q1", lesson_id: "lesson-1", level_slug: "a1-1" }),
      buildQuiz({ id: "q2", lesson_id: "lesson-2", level_slug: "a1-2" }),
    ];

    const path = resolveContinueLearningPath(state, languages, {
      lessons,
      quizzes,
      attemptedQuizIds: new Set(["q1"]),
    });

    expect(path).toBe("/learn/italian/a1-2");
  });

  it("stays on the last level once every level is already complete", () => {
    const state = buildState({ level_slug: "a1-3", section_slug: "quiz" });
    const lessons = [
      buildLesson({ id: "lesson-1", order_number: 1 }),
      buildLesson({ id: "lesson-2", order_number: 2 }),
      buildLesson({ id: "lesson-3", order_number: 3 }),
    ];
    const quizzes = [
      buildQuiz({ id: "q1", lesson_id: "lesson-1", level_slug: "a1-1" }),
      buildQuiz({ id: "q2", lesson_id: "lesson-2", level_slug: "a1-2" }),
      buildQuiz({ id: "q3", lesson_id: "lesson-3", level_slug: "a1-3" }),
    ];

    const path = resolveContinueLearningPath(state, languages, {
      lessons,
      quizzes,
      attemptedQuizIds: new Set(["q1", "q2", "q3"]),
    });

    expect(path).toBe("/learn/italian/a1-3");
  });

  it("falls back to the main menu when the saved language is disabled", () => {
    const disabled = { ...italian, available: false };
    const state = buildState({ language_slug: "italian" });
    expect(resolveContinueLearningPath(state, [disabled])).toBe("/menu");
  });
});
