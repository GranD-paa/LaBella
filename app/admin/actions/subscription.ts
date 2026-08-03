"use server";

import { requireSuperAdminAction } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import { subscriptionPlanSchema } from "@/lib/validations/admin";

/**
 * Subscription pricing is a platform-wide, first-impression surface — like
 * banners and language availability, only super admins may manage it.
 */
export async function updateSubscriptionPlanAction(
  planSlug: string,
  languageSlug: string,
  values: unknown
): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const parsed = subscriptionPlanSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.updateSubscriptionPlan(planSlug, languageSlug, parsed.data);
  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}
