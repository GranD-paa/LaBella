import { describe, expect, it } from "vitest";
import { gradeAnswer, getCorrectAnswerLabel } from "./grading";
import type { GradedQuizQuestion } from "./grading";

const multipleChoiceQuestion: GradedQuizQuestion = {
  id: "q1",
  question_text: "2 + 2?",
  option_a: "3",
  option_b: "4",
  option_c: "5",
  option_d: "6",
  question_type: "multiple_choice",
  correct_option: "b",
  expected_answer: null,
  explanation: null,
};

const writtenQuestion: GradedQuizQuestion = {
  id: "q2",
  question_text: "Translate 'hello'",
  option_a: "",
  option_b: "",
  option_c: "",
  option_d: "",
  question_type: "written",
  correct_option: "a",
  expected_answer: "Ciao",
  explanation: null,
};

describe("gradeAnswer", () => {
  it("grades multiple choice by exact option match", () => {
    expect(gradeAnswer(multipleChoiceQuestion, "b")).toBe(true);
    expect(gradeAnswer(multipleChoiceQuestion, "a")).toBe(false);
  });

  it("grades written answers case/whitespace-insensitively", () => {
    expect(gradeAnswer(writtenQuestion, "ciao")).toBe(true);
    expect(gradeAnswer(writtenQuestion, "  Ciao  ")).toBe(true);
    expect(gradeAnswer(writtenQuestion, "ciao!")).toBe(false);
  });

  it("fails written answers with no expected answer configured", () => {
    const question = { ...writtenQuestion, expected_answer: null };
    expect(gradeAnswer(question, "ciao")).toBe(false);
  });
});

describe("getCorrectAnswerLabel", () => {
  it("labels multiple choice as 'LETTER. text'", () => {
    expect(getCorrectAnswerLabel(multipleChoiceQuestion)).toBe("B. 4");
  });

  it("labels written questions with the trimmed expected answer", () => {
    expect(getCorrectAnswerLabel(writtenQuestion)).toBe("Ciao");
  });

  it("falls back to an em dash for written questions with no expected answer", () => {
    const question = { ...writtenQuestion, expected_answer: "   " };
    expect(getCorrectAnswerLabel(question)).toBe("—");
  });
});
