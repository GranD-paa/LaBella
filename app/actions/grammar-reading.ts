"use server";

import { requireAuthenticatedAction } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import type { ActionResult } from "@/lib/action-result";

/**
 * Remembers where a learner stopped reading a grammar title.
 *
 * Called as pages turn, so it is deliberately cheap and forgiving: the page
 * number is clamped rather than rejected, and the identity comes from the
 * session rather than the argument list — a learner cannot write a bookmark
 * into someone else's account.
 */
export async function saveGrammarReadingProgress(
  ruleId: string,
  pageNumber: number
): Promise<ActionResult> {
  const guard = await requireAuthenticatedAction();
  if (!guard.ok) return { error: guard.error };

  if (!ruleId || !Number.isFinite(pageNumber)) {
    return { error: "actions.errors.invalidInput" };
  }

  const result = await getDataRepository().saveGrammarReadingProgress(
    guard.user.id,
    ruleId,
    Math.max(1, Math.floor(pageNumber))
  );

  return result.error ? { error: "actions.errors.generic" } : { success: true };
}
