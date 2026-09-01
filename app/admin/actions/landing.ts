"use server";

import { revalidatePath } from "next/cache";

import { requireSuperAdminAction } from "@/lib/auth/action-guards";
import { isLandingLanguageSlug } from "@/lib/landing/languages";
import { getDataRepository } from "@/lib/data";
import type { ActionResult } from "@/lib/action-result";

/**
 * Shows or hides a language in the landing page's 3D showcase.
 *
 * Separate from `setLanguageAvailabilityAction`, which opens or closes the
 * *course*. This one only controls what a visitor sees on `/`, which is why
 * French and Spanish can be revealed here without any curriculum behind them.
 * Super admins only — it changes the public front page.
 */
export async function setLandingLanguageVisibilityAction(
  languageSlug: string,
  visible: boolean
): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  if (!isLandingLanguageSlug(languageSlug)) {
    return { error: "actions.errors.generic" };
  }

  const result = await getDataRepository().setLandingLanguageVisibility(
    languageSlug,
    visible
  );

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidatePath("/");
  revalidatePath("/admin/landing");
  return { success: true };
}
