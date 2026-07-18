export const ADMIN_TAB_VALUES = [
  "lessons",
  "vocabulary",
  "grammar",
  "quizzes",
  "users",
] as const;

export type AdminTabValue = (typeof ADMIN_TAB_VALUES)[number];
