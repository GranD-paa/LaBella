import type { BillingCurrency, PaymentProviderSlug } from "@/types";

/**
 * What every payment gateway must be able to do, reduced to the two moments
 * that matter: send the customer somewhere to pay, and later confirm that the
 * money actually arrived.
 *
 * Deliberately narrow. Gateways differ enormously in their APIs — ZarinPal
 * hands back an "authority" token, Stripe a hosted session, a manual bank
 * transfer neither — but the ledger only ever needs "where do I send them"
 * and "did this specific attempt succeed".
 */
export type CheckoutRequest = {
  /** Our own payment row id. Round-tripped through the gateway so the
   *  callback can be tied back to the ledger without trusting amounts. */
  paymentId: string;
  /** Minor units of `currency` — cents for EUR, whole Rial for IRR. */
  amount: number;
  currency: BillingCurrency;
  description: string;
  /** Absolute URL the gateway should return the customer to. */
  callbackUrl: string;
  customerEmail?: string | null;
};

export type CheckoutResponse =
  | { ok: true; redirectUrl: string; providerPaymentId?: string }
  | { ok: false; error: string };

export type VerifyRequest = {
  paymentId: string;
  /** Minor units, re-read from our ledger — never from the callback. */
  amount: number;
  currency: BillingCurrency;
  /** Whatever the gateway put in the return URL (authority, session id, …). */
  params: Record<string, string>;
};

export type VerifyResponse =
  | {
      ok: true;
      /** Gateway's own id for the payment, used for idempotency. */
      providerPaymentId: string;
      /** Human-facing reference shown on the receipt (RRN, ref id). */
      providerRef?: string;
    }
  | { ok: false; error: string; canceledByUser?: boolean };

export type PaymentProvider = {
  slug: PaymentProviderSlug;
  /** Currencies this gateway can actually settle. */
  currencies: readonly BillingCurrency[];
  createCheckout(request: CheckoutRequest): Promise<CheckoutResponse>;
  verify(request: VerifyRequest): Promise<VerifyResponse>;
};
