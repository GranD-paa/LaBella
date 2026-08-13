/**
 * Stripe — international card payments, EUR.
 *
 * Talks to the REST API directly with `fetch` rather than pulling in the
 * `stripe` SDK: we use exactly two endpoints and one signature check, and the
 * SDK is a large dependency to carry for that.
 *
 * Confirmation comes from the webhook, not from the browser landing back on
 * the success URL — a customer closing the tab after paying must still get
 * their subscription, and a customer typing the success URL must not.
 */
import { createHmac, timingSafeEqual } from "node:crypto";

import type {
  CheckoutRequest,
  CheckoutResponse,
  PaymentProvider,
  VerifyRequest,
  VerifyResponse,
} from "@/lib/billing/providers/types";

const API_BASE = "https://api.stripe.com/v1";

/** Stripe's API takes form-encoded bodies with bracketed nested keys. */
function toFormBody(fields: Record<string, string | number>): string {
  return Object.entries(fields)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

export const stripeProvider: PaymentProvider = {
  slug: "stripe",
  currencies: ["EUR"],

  async createCheckout(request: CheckoutRequest): Promise<CheckoutResponse> {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return { ok: false, error: "stripe: STRIPE_SECRET_KEY is not set" };
    }
    if (request.currency !== "EUR") {
      return { ok: false, error: "stripe: only EUR is supported" };
    }

    try {
      const response = await fetch(`${API_BASE}/checkout/sessions`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${secretKey}`,
          "content-type": "application/x-www-form-urlencoded",
          // Replaying the same checkout must not create a second session.
          "idempotency-key": `checkout-${request.paymentId}`,
        },
        body: toFormBody({
          mode: "payment",
          // `callbackUrl` already carries `?payment_id=…`. Stripe substitutes
          // the {CHECKOUT_SESSION_ID} placeholder when it builds the redirect.
          success_url: `${request.callbackUrl}&status=success&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${request.callbackUrl}&status=cancel`,
          client_reference_id: request.paymentId,
          "metadata[payment_id]": request.paymentId,
          "line_items[0][quantity]": 1,
          "line_items[0][price_data][currency]": "eur",
          "line_items[0][price_data][unit_amount]": request.amount,
          "line_items[0][price_data][product_data][name]": request.description,
          ...(request.customerEmail
            ? { customer_email: request.customerEmail }
            : {}),
        }),
      });

      const payload = (await response.json()) as {
        id?: string;
        url?: string;
        error?: { message?: string };
      };

      if (!response.ok || !payload.url) {
        return {
          ok: false,
          error: `stripe: ${payload.error?.message ?? `HTTP ${response.status}`}`,
        };
      }

      return { ok: true, redirectUrl: payload.url, providerPaymentId: payload.id };
    } catch (error) {
      return {
        ok: false,
        error: `stripe: ${error instanceof Error ? error.message : "request failed"}`,
      };
    }
  },

  /**
   * Re-reads the session from Stripe rather than trusting the redirect.
   *
   * Used as a backstop when the customer lands on the success URL before the
   * webhook has arrived; the webhook remains the primary path.
   */
  async verify(request: VerifyRequest): Promise<VerifyResponse> {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return { ok: false, error: "stripe: STRIPE_SECRET_KEY is not set" };
    }
    if (request.params.status === "cancel") {
      return { ok: false, error: "stripe: checkout was cancelled", canceledByUser: true };
    }

    const sessionId = request.params.session_id;
    if (!sessionId) {
      return { ok: false, error: "stripe: no session_id to verify" };
    }

    try {
      const response = await fetch(`${API_BASE}/checkout/sessions/${sessionId}`, {
        headers: { authorization: `Bearer ${secretKey}` },
        cache: "no-store",
      });
      const payload = (await response.json()) as {
        id?: string;
        payment_status?: string;
        payment_intent?: string;
        client_reference_id?: string;
        error?: { message?: string };
      };

      if (!response.ok) {
        return {
          ok: false,
          error: `stripe: ${payload.error?.message ?? `HTTP ${response.status}`}`,
        };
      }
      if (payload.payment_status !== "paid") {
        return { ok: false, error: `stripe: session is ${payload.payment_status}` };
      }
      // The session must belong to the payment we think it does.
      if (payload.client_reference_id !== request.paymentId) {
        return { ok: false, error: "stripe: session does not match this payment" };
      }

      return {
        ok: true,
        providerPaymentId: payload.payment_intent ?? sessionId,
        providerRef: sessionId,
      };
    } catch (error) {
      return {
        ok: false,
        error: `stripe: ${error instanceof Error ? error.message : "verify failed"}`,
      };
    }
  },

  /**
   * The stored reference is the Checkout Session id, which is exactly what
   * `verify` retrieves. Reconciliation is a backstop here rather than the main
   * path — the webhook already covers the closed-tab case — but it also
   * catches the window where webhook delivery itself failed.
   */
  verifyParamsFromReference(reference) {
    return reference ? { session_id: reference } : null;
  },
};

export type StripeWebhookEvent = {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
};

/**
 * Verifies a `Stripe-Signature` header and parses the event.
 *
 * Without this an attacker could POST a fabricated `checkout.session.completed`
 * to the webhook URL and mint themselves a subscription, so a failure here is
 * a hard reject rather than a warning.
 */
export function verifyStripeWebhook(
  rawBody: string,
  signatureHeader: string | null,
  /** Rejects replays of an old, genuinely-signed event. */
  toleranceSeconds = 300
): { ok: true; event: StripeWebhookEvent } | { ok: false; error: string } {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return { ok: false, error: "STRIPE_WEBHOOK_SECRET is not set" };
  if (!signatureHeader) return { ok: false, error: "missing Stripe-Signature header" };

  const parts = new Map(
    signatureHeader.split(",").map((part) => {
      const [key, value] = part.split("=");
      return [key?.trim(), value?.trim()] as const;
    })
  );

  const timestamp = parts.get("t");
  const signature = parts.get("v1");
  if (!timestamp || !signature) {
    return { ok: false, error: "malformed Stripe-Signature header" };
  }

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > toleranceSeconds) {
    return { ok: false, error: "signature timestamp outside tolerance" };
  }

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");

  const expectedBuffer = Buffer.from(expected, "hex");
  const providedBuffer = Buffer.from(signature, "hex");
  if (
    expectedBuffer.length !== providedBuffer.length ||
    !timingSafeEqual(expectedBuffer, providedBuffer)
  ) {
    return { ok: false, error: "signature mismatch" };
  }

  try {
    return { ok: true, event: JSON.parse(rawBody) as StripeWebhookEvent };
  } catch {
    return { ok: false, error: "webhook body was not valid JSON" };
  }
}
