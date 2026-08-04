"use server";

import { headers } from "next/headers";

import { requireAuthenticatedAction } from "@/lib/auth/action-guards";
import { getAvailableProviders } from "@/lib/billing/providers";
import { getDataRepository } from "@/lib/data";
import type { BillingCurrency, PaymentProviderSlug } from "@/types";

export type CheckoutResult =
  | { error: string }
  | { success: true; redirectUrl: string };

/**
 * Opens a checkout for one plan in one language.
 *
 * The client names a plan, a language, a currency and a gateway — never an
 * amount. `createPendingPayment` derives the price server-side from the plan
 * table (and, for Rial, from the stored exchange rate), so the worst a
 * tampered request can do is buy the wrong plan at that plan's real price.
 */
export async function startCheckoutAction(input: {
  planSlug: string;
  languageSlug: string;
  currency: BillingCurrency;
  provider: PaymentProviderSlug;
}): Promise<CheckoutResult> {
  const guard = await requireAuthenticatedAction();
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const settings = await repo.getPaymentSettings();

  // Re-check availability on the server: the button being rendered is not
  // authorisation, and gateway toggles can change between page load and click.
  const allowed = getAvailableProviders(settings, input.currency);
  const provider = allowed.find((entry) => entry.slug === input.provider);
  if (!provider) {
    return { error: "actions.errors.paymentMethodUnavailable" };
  }

  const created = await repo.createPendingPayment({
    planSlug: input.planSlug,
    languageSlug: input.languageSlug,
    provider: input.provider,
    currency: input.currency,
  });
  if (created.error || !created.paymentId) {
    return { error: "actions.errors.checkoutFailed" };
  }

  const payment = await repo.getPaymentById(created.paymentId);
  if (!payment) return { error: "actions.errors.checkoutFailed" };

  const checkout = await provider.createCheckout({
    paymentId: payment.id,
    amount: payment.paid_amount,
    currency: payment.paid_currency,
    description: `${payment.plan_title ?? payment.plan_slug} — ${payment.language_slug}`,
    // The ledger id travels in the callback URL itself so every gateway —
    // including ones that echo back nothing of ours — lands on a route that
    // knows which payment it is settling.
    callbackUrl:
      `${await resolveOrigin()}/api/payments/callback/${provider.slug}` +
      `?payment_id=${payment.id}`,
    customerEmail: guard.user.email,
  });

  if (!checkout.ok) {
    // The pending row is left in place on purpose: a failed gateway handoff is
    // exactly the kind of thing you want visible in the ledger afterwards.
    return { error: "actions.errors.checkoutFailed" };
  }

  return { success: true, redirectUrl: checkout.redirectUrl };
}

/** Cancels a subscription at the end of the period the learner already paid for. */
export async function cancelSubscriptionAction(
  subscriptionId: string
): Promise<{ error: string } | { success: true }> {
  const guard = await requireAuthenticatedAction();
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const result = await repo.cancelSubscription(subscriptionId);
  return result.error ? { error: "actions.errors.generic" } : { success: true };
}

/**
 * Absolute origin for gateway callbacks.
 *
 * Gateways redirect the customer's browser here, so this has to be the public
 * URL rather than anything relative.
 */
async function resolveOrigin(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol =
    headerList.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}
