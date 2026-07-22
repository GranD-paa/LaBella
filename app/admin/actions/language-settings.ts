"use server";

import { isLanguageSlug } from "@/lib/curriculum/languages";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import { requireAdmin } from "@/lib/supabase/admin-guard";
import type { ActionResult } from "@/lib/action-result";

/**
 * Opens or closes a language course (e.g. German, Turkish, English) for
 * learners. Restricted to super admins — this is a platform-wide switch,
 * not a per-content edit, so it deliberately sits above the regular
 * `manageContent` permission tier.
 */
export async function setLanguageAvailabilityAction(
  languageSlug: string,
  enabled: boolean
): Promise<ActionResult> {
  const { profile } = await requireAdmin();

  if (profile.role !== "super_admin") {
    return { error: "actions.errors.forbidden" };
  }

  if (!isLanguageSlug(languageSlug)) {
    return { error: "actions.errors.generic" };
  }

  // Italian ships with real content and must always stay active.
  if (languageSlug === "italian") {
    return { error: "actions.errors.generic" };
  }

  const repo = getDataRepository();
  const result = await repo.setLanguageAvailability(languageSlug, enabled);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}
