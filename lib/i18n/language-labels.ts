/**
 * Translation keys for the four curriculum languages.
 *
 * The curriculum definitions carry English names (`Italian`, `German`), which
 * is what the learner-facing course cards want. Admin surfaces name the same
 * languages in the admin's own language instead, and more than one of them
 * needs the mapping — so it lives here rather than being copied per panel.
 */
export const LANGUAGE_LABEL_KEYS: Record<string, string> = {
  italian: "dashboard.admin.languageItalian",
  english: "dashboard.admin.languageEnglish",
  german: "dashboard.admin.languageGerman",
  turkish: "dashboard.admin.languageTurkish",
};

export function languageLabelKey(slug: string): string | null {
  return LANGUAGE_LABEL_KEYS[slug] ?? null;
}
