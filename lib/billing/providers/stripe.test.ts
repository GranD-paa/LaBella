import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { verifyStripeWebhook } from "./stripe";

const SECRET = "whsec_test_secret";

function sign(body: string, timestamp: number, secret = SECRET): string {
  const signature = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`, "utf8")
    .digest("hex");
  return `t=${timestamp},v1=${signature}`;
}

const BODY = JSON.stringify({
  id: "evt_123",
  type: "checkout.session.completed",
  data: { object: { client_reference_id: "pay-1", payment_status: "paid" } },
});

describe("verifyStripeWebhook", () => {
  beforeEach(() => {
    process.env.STRIPE_WEBHOOK_SECRET = SECRET;
  });

  afterEach(() => {
    delete process.env.STRIPE_WEBHOOK_SECRET;
  });

  it("accepts a correctly signed, current event", () => {
    const now = Math.floor(Date.now() / 1000);
    const result = verifyStripeWebhook(BODY, sign(BODY, now));

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.event.id).toBe("evt_123");
      expect(result.event.type).toBe("checkout.session.completed");
    }
  });

  it("rejects a forged signature", () => {
    // The whole attack this stops: POSTing a fabricated
    // checkout.session.completed to mint yourself a subscription.
    const now = Math.floor(Date.now() / 1000);
    const result = verifyStripeWebhook(BODY, sign(BODY, now, "wrong_secret"));

    expect(result).toMatchObject({ ok: false, error: "signature mismatch" });
  });

  it("rejects a body that was altered after signing", () => {
    const now = Math.floor(Date.now() / 1000);
    const header = sign(BODY, now);
    const tampered = BODY.replace("pay-1", "pay-999");

    expect(verifyStripeWebhook(tampered, header).ok).toBe(false);
  });

  it("rejects a replayed old event", () => {
    const longAgo = Math.floor(Date.now() / 1000) - 3600;
    const result = verifyStripeWebhook(BODY, sign(BODY, longAgo));

    expect(result).toMatchObject({
      ok: false,
      error: "signature timestamp outside tolerance",
    });
  });

  it("rejects a missing or malformed header", () => {
    expect(verifyStripeWebhook(BODY, null).ok).toBe(false);
    expect(verifyStripeWebhook(BODY, "nonsense").ok).toBe(false);
    expect(verifyStripeWebhook(BODY, "t=123").ok).toBe(false);
  });

  it("fails closed when the secret is not configured", () => {
    delete process.env.STRIPE_WEBHOOK_SECRET;
    const now = Math.floor(Date.now() / 1000);

    expect(verifyStripeWebhook(BODY, sign(BODY, now))).toMatchObject({
      ok: false,
      error: "STRIPE_WEBHOOK_SECRET is not set",
    });
  });

  it("rejects a signed body that is not valid JSON", () => {
    const now = Math.floor(Date.now() / 1000);
    const body = "not json";

    expect(verifyStripeWebhook(body, sign(body, now))).toMatchObject({
      ok: false,
      error: "webhook body was not valid JSON",
    });
  });
});
