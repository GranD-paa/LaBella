"use server";

import { requireSuperAdminAction } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import {
  entitlementSettingsSchema,
  subscriptionPlanSchema,
  subscriptionTierSchema,
} from "@/lib/validations/admin";

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

/**
 * Changes what a tier unlocks.
 *
 * Applies to every language at once by design: a tier that includes grammar
 * for Italian but not for German is the kind of inconsistency nobody would
 * notice until a customer complained.
 */
export async function updateSubscriptionTierAction(
  planSlug: string,
  values: unknown
): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const parsed = subscriptionTierSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.updateSubscriptionTier(planSlug, parsed.data);
  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}

/**
 * Turns content gating on or off platform-wide and sets what stays free.
 *
 * This is the single most consequential switch in the admin panel: enabling it
 * closes paid content to everyone without an active subscription, so it is
 * deliberately separate from the per-plan editors rather than buried among
 * them.
 */
export async function updateEntitlementSettingsAction(
  values: unknown
): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const parsed = entitlementSettingsSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.updatePaymentSettings(parsed.data);
  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}
