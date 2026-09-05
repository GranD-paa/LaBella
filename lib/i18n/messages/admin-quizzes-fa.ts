/**
 * What is left of the quiz admin after the browse/edit table was retired:
 * the page shell, the question fields the content wizard reuses, and the
 * section names the admin dashboard and banner list still read.
 */
export const adminQuizzesFa = {
  pageBadge: "مدیریت آزمون",
  pageHello: "مرکز آزمون، {name}",
  pageSubtitle: "آزمون‌ها را در زبان‌ها، سطوح، درس‌ها و بخش‌ها ایجاد، منتشر و پایش کنید.",
  fullAdminPanel: "بازگشت به داشبورد",
  quizQuestions: "سؤالات آزمون",
  statusPublished: "منتشرشده",
  statusDraft: "پیش‌نویس",
  unpublish: "لغو انتشار",
  publish: "انتشار",
  questionLabel: "سؤال {number}",
  removeQuestionAria: "حذف سؤال",
  questionType: "نوع سؤال",
  selectType: "انتخاب نوع",
  questionText: "متن سؤال",
  wizardQuestionPlaceholder: "سؤالی که یادگیرندگان می‌بینند را وارد کنید...",
  expectedAnswer: "پاسخ مورد انتظار",
  expectedAnswerPlaceholder: "پاسخ صحیح نوشتاری",
  correctAnswer: "پاسخ صحیح",
  explanationOptional: "توضیح (اختیاری)",
  explanationPlaceholder: "پس از ارسال آزمون نمایش داده می‌شود",
  optionA: "گزینه الف",
  optionB: "گزینه ب",
  optionC: "گزینه ج",
  optionD: "گزینه د",
  sections: {
    grammar: {
      title: "گرامر",
      description: "آزمون‌های گرامری",
    },
    vocabulary: {
      title: "واژگان",
      description: "آزمون‌های واژگان",
    },
    visual: {
      title: "تصویری",
      description: "آزمون‌های یادگیری تصویری",
    },
    quiz: {
      title: "آزمون",
      description: "آزمون‌های عمومی درس",
    },
    custom: {
      title: "سفارشی",
      description: "آزمون‌های بخش سفارشی",
    },
  },
} as const;
