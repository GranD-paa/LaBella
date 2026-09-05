export const adminContentEn = {
  wizardTitle: "Create Content",
  wizardDescription:
    "Add educational content step by step: choose a language, target lesson, content category, then create and publish when ready.",
  stepLanguage: "Language",
  stepLesson: "Lesson",
  stepCategory: "Category",
  stepContentType: "Content Type",
  stepCreate: "Create",
  askLanguage: "Which language do you want to add content for?",
  askLesson: "Which lesson do you want to add content to?",
  askCategory: "Which content category do you want to add?",
  askContentType: "Which content type do you want to add?",
  selectedLanguage: "Selected language",
  selectedLesson: "Selected lesson",
  selectedCategory: "Selected section",
  noLessonMapped: "No lesson is mapped to this level yet. Create a lesson first.",
  contextSummary: "{language} · {level} · {lesson}",
  saveDraft: "Save as draft",
  publishContent: "Publish content",
  savedDraft: "Content saved as draft",
  publishedContent: "Content published",
  publishedQuiz:
    "Quiz published. Learners will see it at Learn → {level} → Quiz.",
  addAnother: "Add more content",
  startOver: "Start over",
  categories: {
    grammar: {
      title: "Grammar",
      description: "Documents a learner reads a page at a time",
      features: "Add a title · Upload a PDF · Read in the app",
    },
    vocabulary: {
      title: "Important Vocabulary with Images",
      description: "Key words with meanings and visual support",
      features: "Add words · Add meanings · Add images · Add pronunciation",
    },
    video: {
      title: "Video Lessons",
      description: "Video-based learning content for this lesson",
      features: "Add video URL · Add title · Add description",
    },
    quiz: {
      title: "Quizzes",
      description: "Multiple-choice and written assessment questions",
      features: "Multiple choice · Written questions · Answers & explanations",
    },
    levelExam: {
      title: "Level exam",
      description:
        "The comprehensive exam for a whole CEFR level. Paid: it is gated on the subscription plan, unlike the per-lesson quizzes.",
      features: "Covers the whole level · Subscription required · Shown on the language page",
    },
  },
  grammar: {
    formTitle: "Add a grammar document",
    formDescription:
      "Give the section a title and upload its PDF. Learners read its pages in the app; the file itself is never sent to them.",
    documentLabel: "PDF",
    choosePdf: "Choose a PDF",
    documentHint: "Up to {pages} pages and {size}MB.",
    errors: {
      storageUnconfigured:
        "File storage is not configured, so documents cannot be uploaded yet.",
      fileRequired: "Choose a PDF to upload.",
      notPdf: "Only PDF files can be uploaded here.",
      tooLarge: "That PDF is too large.",
      tooManyPages: "That PDF has too many pages to render in one upload.",
      unreadable: "That file could not be read as a PDF.",
      renderFailed: "The pages of that PDF could not be rendered.",
      uploadFailed:
        "The pages could not be stored, so nothing was saved. Try again.",
    },
  },
  vocabulary: {
    formTitle: "Add vocabulary with image",
    formDescription: "Add an important word with translation and a visual.",
    pronunciationLabel: "Pronunciation (optional)",
    pronunciationPlaceholder: "e.g. /ˈkiao/",
    imageRequired: "An image URL is required for vocabulary with images.",
  },
  video: {
    formTitle: "Add video lesson",
    formDescription: "Upload video content by providing a hosted video URL.",
    videoUrlLabel: "Video URL",
    videoUrlPlaceholder: "https://…",
    thumbnailLabel: "Thumbnail URL (optional)",
    thumbnailPlaceholder: "https://…",
  },
  quiz: {
    formTitle: "Create quiz",
    formDescription:
      "Build multiple-choice and written questions for the Quiz section only. Grammar and vocabulary use their own categories and will not appear here.",
    quizTitle: "Quiz title",
    quizTitlePlaceholder: "e.g. A1 Greetings checkpoint",
    questionCountLabel: "Question count",
    questionCountHint: "Choose how many questions to create before filling them in.",
    questionsGenerated: "{count} question fields ready",
  },
} as const;
