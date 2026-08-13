import { getPaymentProvider } from "@/lib/billing/providers";
import type { Payment } from "@/types";

export type ReconcileOutcome =
  | { status: "settled"; paymentId: string; subscriptionId?: string }
  | { status: "failed"; paymentId: string; reason: string }
  | { status: "skipped"; paymentId: string; reason: string };

export type ReconcileDeps = {
  /** Marks the payment paid and moves the subscription forward. */
  settle(input: {
    paymentId: string;
    providerPaymentId: string;
    providerRef?: string;
  }): Promise<{ error?: string; subscriptionId?: string }>;
  /** Records a declined or abandoned attempt. */
  fail(paymentId: string, reason: string): Promise<void>;
};

/**
 * Asks a gateway what really happened to one abandoned payment, and applies it.
 *
 * This is the third layer of activation, behind the browser callback and the
 * webhook. The two of them cover almost everything; "almost" is the problem —
 * a customer whose connection drops during the redirect, on a gateway with no
 * webhooks at all, has paid and has nothing. That is the single worst failure
 * this system can have, so it gets its own recovery path rather than relying
 * on a support ticket.
 *
 * Two rules keep it safe to run unattended:
 *
 *  * It never invents a result. Without a stored `checkout_reference` there is
 *    nothing to ask the gateway about, so the payment is skipped and left
 *    pending rather than failed on a guess.
 *  * The amount quoted to the gateway comes from our own ledger, exactly as in
 *    the callback path, so reconciliation cannot be talked into confirming a
 *    different figure than the one we charged.
 */
export async function reconcilePayment(
  payment: Payment,
  deps: ReconcileDeps
): Promise<ReconcileOutcome> {
  if (payment.status !== "pending") {
    return {
      status: "skipped",
      paymentId: payment.id,
      reason: `already ${payment.status}`,
    };
  }

  const provider = getPaymentProvider(payment.provider);
  if (!provider?.verifyParamsFromReference) {
    return {
      status: "skipped",
      paymentId: payment.id,
      reason: `provider ${payment.provider} cannot be reconciled`,
    };
  }

  const params = payment.checkout_reference
    ? provider.verifyParamsFromReference(payment.checkout_reference)
    : null;
  if (!params) {
    // Handed off before the reference was recorded, or the gateway never gave
    // one. Nothing to verify against, so leave it alone.
    return {
      status: "skipped",
      paymentId: payment.id,
      reason: "no checkout reference to verify",
    };
  }

  const verification = await provider.verify({
    paymentId: payment.id,
    amount: payment.paid_amount,
    currency: payment.paid_currency,
    params,
  });

  if (!verification.ok) {
    // A gateway that says "not paid" for an attempt this old is telling us the
    // customer abandoned it. Recording that clears the row out of the pending
    // list so it is not re-checked for ever.
    await deps.fail(payment.id, verification.error);
    return {
      status: "failed",
      paymentId: payment.id,
      reason: verification.error,
    };
  }

  const settled = await deps.settle({
    paymentId: payment.id,
    providerPaymentId: verification.providerPaymentId,
    providerRef: verification.providerRef,
  });

  if (settled.error) {
    return {
      status: "skipped",
      paymentId: payment.id,
      reason: `settle failed: ${settled.error}`,
    };
  }

  return {
    status: "settled",
    paymentId: payment.id,
    subscriptionId: settled.subscriptionId,
  };
}

/** Runs {@link reconcilePayment} over a batch, one at a time. */
export async function reconcilePayments(
  payments: Payment[],
  deps: ReconcileDeps
): Promise<ReconcileOutcome[]> {
  const outcomes: ReconcileOutcome[] = [];
  // Sequential on purpose: these are outbound calls to a payment gateway, and
  // hammering one with a parallel burst is how you get rate-limited by the
  // service you least want to be rate-limited by.
  for (const payment of payments) {
    outcomes.push(await reconcilePayment(payment, deps));
  }
  return outcomes;
}
