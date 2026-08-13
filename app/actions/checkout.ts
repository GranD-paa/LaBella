"use server";

import { headers } from "next/headers";

import { requireAuthenticatedAction } from "@/lib/auth/action-guards";
import { getAvailableProviders } from "@/lib/billing/providers";
import { reconcilePayments, type ReconcileDeps } from "@/lib/billing/reconcile";
import { isLocalDataMode } from "@/lib/config/data-source";
import { getDataRepository } from "@/lib/data";
import { failLocalPayment, settleLocalPayment } from "@/lib/data/local/repository";
import { createServiceClient } from "@/lib/supabase/service-client";
import { BILLING_PERIOD_MONTHS } from "@/types";
import type {
  BillingCurrency,
  BillingPeriodMonths,
  PaymentProviderSlug,
} from "@/types";

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
  periodMonths?: BillingPeriodMonths;
}): Promise<CheckoutResult> {
  const guard = await requireAuthenticatedAction();
  if (!guard.ok) return { error: guard.error };

  // Narrowed here as well as in SQL: the period reaches the price calculation,
  // so a value outside the sold set must not get that far.
  const periodMonths = BILLING_PERIOD_MONTHS.includes(
    input.periodMonths as BillingPeriodMonths
  )
    ? (input.periodMonths as BillingPeriodMonths)
    : 1;

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
    periodMonths,
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

  // Keep the gateway's handle on this attempt before the customer leaves. It is
  // what lets us ask the gateway "did this actually get paid?" if they never
  // make it back through the callback — for ZarinPal, which has no webhooks,
  // that is the only recovery path there is.
  if (checkout.providerPaymentId) {
    await repo.attachCheckoutReference(payment.id, checkout.providerPaymentId);
  }

  return { success: true, redirectUrl: checkout.redirectUrl };
}

/**
 * Recovers the caller's own paid-but-not-activated payments, immediately.
 *
 * The nightly reconciliation job is the safety net, but "you paid, come back
 * tomorrow" is not an acceptable experience — and on Vercel Hobby the cron
 * cannot run more often than daily anyway. So opening the subscription page
 * also triggers a check of just this learner's stuck payments, which turns the
 * worst case from a day of waiting into a page load.
 *
 * Safe to call on every visit: it only ever looks at the caller's own pending
 * rows, only those with a gateway reference to verify against, and settlement
 * itself is idempotent.
 */
export async function recoverMyPendingPaymentsAction(): Promise<{
  activated: number;
}> {
  const guard = await requireAuthenticatedAction();
  if (!guard.ok) return { activated: 0 };

  const repo = getDataRepository();
  const pending = await repo.getMyPendingPayments();

  // Skip very recent attempts: the customer may still be on the gateway's
  // page, or the callback may be in flight. Verifying now would report a
  // perfectly healthy payment as abandoned.
  const cutoff = Date.now() - MIN_RECONCILE_AGE_MS;
  const stale = pending.filter(
    (payment) => new Date(payment.created_at).getTime() < cutoff
  );
  if (stale.length === 0) return { activated: 0 };

  const outcomes = await reconcilePayments(stale, buildRecoveryDeps());
  return {
    activated: outcomes.filter((outcome) => outcome.status === "settled").length,
  };
}

/** A payment younger than this is still plausibly mid-flight. */
const MIN_RECONCILE_AGE_MS = 60_000;

/**
 * Settle/fail wired to the service role.
 *
 * `settle_payment` is not granted to `authenticated` on purpose — a learner
 * must never be able to mark their own payment paid. The elevated client is
 * confined to this helper, and only ever reached after the gateway has
 * independently confirmed the money moved.
 */
function buildRecoveryDeps(): ReconcileDeps {
  if (isLocalDataMode()) {
    return {
      async settle({ paymentId }) {
        return settleLocalPayment(paymentId);
      },
      async fail(paymentId, reason) {
        failLocalPayment(paymentId, reason);
      },
    };
  }

  const supabase = createServiceClient();
  return {
    async settle({ paymentId, providerPaymentId, providerRef }) {
      const { data, error } = await supabase.rpc("settle_payment", {
        p_payment_id: paymentId,
        p_provider_payment_id: providerPaymentId,
        p_provider_ref: providerRef ?? null,
      });
      return error
        ? { error: error.message }
        : { subscriptionId: data as string };
    },
    async fail(paymentId, reason) {
      await supabase.rpc("fail_payment", {
        p_payment_id: paymentId,
        p_reason: reason,
      });
    },
  };
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
