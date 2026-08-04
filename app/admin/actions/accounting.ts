"use server";

import { requireSuperAdminAction } from "@/lib/auth/action-guards";
import { refreshFxRate } from "@/lib/billing/fx/refresh";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import {
  billingSettingsSchema,
  manualPaymentSchema,
  refundSchema,
} from "@/lib/validations/admin";

export async function updateBillingSettingsAction(
  values: unknown
): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const parsed = billingSettingsSchema.safeParse(values);
  if (!parsed.success) return { error: "actions.errors.invalidInput" };

  const repo = getDataRepository();
  const result = await repo.updatePaymentSettings(parsed.data);
  if (result.error) return { error: "actions.errors.generic" };

  revalidateAppContent();
  return { success: true };
}

/**
 * Pulls a fresh exchange rate on demand.
 *
 * The hourly cron is the normal path; this exists so an admin who has just
 * changed the source or margin can see the effect without waiting an hour.
 * The same deviation guard applies, so a manual refresh cannot force through
 * a rate the automated one would have rejected.
 */
export async function refreshFxRateAction(): Promise<
  ActionResult & { rate?: number; reason?: string }
> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const outcome = await refreshFxRate(getDataRepository());
  revalidateAppContent();

  switch (outcome.status) {
    case "applied":
      return { success: true, rate: outcome.rate };
    case "rejected":
      return { error: "admin.accounting.settings.rateRejected", reason: outcome.reason };
    default:
      return { error: "actions.errors.generic", reason: outcome.reason };
  }
}

/**
 * Records money that arrived outside any gateway and activates the
 * subscription. Priced through the same server-side path as an online
 * checkout, so a hand-entered payment cannot be mispriced.
 */
export async function recordManualPaymentAction(
  values: unknown
): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const parsed = manualPaymentSchema.safeParse(values);
  if (!parsed.success) return { error: "actions.errors.invalidInput" };

  const repo = getDataRepository();
  const result = await repo.recordManualPayment(parsed.data);
  if (result.error) return { error: "actions.errors.generic" };

  revalidateAppContent();
  return { success: true };
}

export async function refundPaymentAction(values: unknown): Promise<ActionResult> {
  const guard = await requireSuperAdminAction();
  if (!guard.ok) return { error: guard.error };

  const parsed = refundSchema.safeParse(values);
  if (!parsed.success) return { error: "actions.errors.invalidInput" };

  const repo = getDataRepository();

  // The refund cannot exceed what was actually charged — otherwise the ledger
  // would report negative lifetime revenue for that customer.
  const payment = await repo.getPaymentById(parsed.data.paymentId);
  if (!payment) return { error: "actions.errors.generic" };
  if (parsed.data.amountEurCents > payment.amount_eur_cents) {
    return { error: "actions.errors.invalidInput" };
  }

  const result = await repo.refundPayment(parsed.data);
  if (result.error) return { error: "actions.errors.generic" };

  revalidateAppContent();
  return { success: true };
}
