"use server";

import { requireAdminPermission } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import { BILLING_PERIOD_MONTHS } from "@/types";

const MAX_NOTE_LENGTH = 300;

/**
 * Puts a learner on a paid plan as a gift, with no payment behind it.
 *
 * Attribution is recorded — who gave it, when, and why — and stays on the
 * admin side: the subscriber's own page reads none of those columns, so a
 * gifted plan is indistinguishable from a bought one to the person holding it.
 *
 * No payment row is written, so nothing here reaches the revenue figures. The
 * paid tier the learner then shows as, and what it unlocks, both still come
 * from the subscription panel — a gift moves an account between plans, it does
 * not invent access of its own.
 */
export async function grantSubscriptionAction(input: {
  userId: string;
  planSlug: string;
  languageSlug: string;
  periodMonths: number;
  note?: string;
}): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageBilling");
  if (!guard.ok) return { error: guard.error };

  if (
    !input.userId ||
    !input.planSlug ||
    !input.languageSlug ||
    !(BILLING_PERIOD_MONTHS as readonly number[]).includes(input.periodMonths)
  ) {
    return { error: "actions.errors.invalidInput" };
  }

  const note = input.note?.trim().slice(0, MAX_NOTE_LENGTH) || undefined;

  const repo = getDataRepository();

  const target = await repo.getProfileById(input.userId);
  if (!target) return { error: "actions.errors.generic" };

  const result = await repo.grantSubscription({
    userId: input.userId,
    planSlug: input.planSlug,
    languageSlug: input.languageSlug,
    periodMonths: input.periodMonths,
    grantedBy: guard.profile.id,
    note,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}
