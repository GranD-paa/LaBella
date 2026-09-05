/**
 * What is left of the quiz admin after the browse/edit table was retired:
 * the page shell, the question fields the content wizard reuses, and the
 * section names the admin dashboard and banner list still read.
 */
export const adminQuizzesEn = {
  pageBadge: "Quiz management",
  pageHello: "Quiz hub, {name}",
  pageSubtitle: "Create, publish, and monitor quizzes across languages, levels, lessons, and sections.",
  fullAdminPanel: "Back to Dashboard",
  quizQuestions: "Quiz questions",
  statusPublished: "Published",
  statusDraft: "Draft",
  unpublish: "Unpublish",
  publish: "Publish",
  questionLabel: "Question {number}",
  removeQuestionAria: "Remove question",
  questionType: "Question type",
  selectType: "Select type",
  questionText: "Question text",
  wizardQuestionPlaceholder: "Enter the question learners will see...",
  expectedAnswer: "Expected answer",
  expectedAnswerPlaceholder: "The correct written answer",
  correctAnswer: "Correct answer",
  explanationOptional: "Explanation (optional)",
  explanationPlaceholder: "Shown after the quiz is submitted",
  optionA: "Option A",
  optionB: "Option B",
  optionC: "Option C",
  optionD: "Option D",
  sections: {
    grammar: {
      title: "Grammar",
      description: "Grammar-focused quizzes",
    },
    vocabulary: {
      title: "Vocabulary",
      description: "Vocabulary quizzes",
    },
    visual: {
      title: "Visual",
      description: "Visual learning quizzes",
    },
    quiz: {
      title: "Quiz",
      description: "General lesson quizzes",
    },
    custom: {
      title: "Custom",
      description: "Custom section quizzes",
    },
  },
} as const;
