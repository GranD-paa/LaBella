import { beforeEach, describe, expect, it, vi } from "vitest";

import { reconcilePayment, type ReconcileDeps } from "@/lib/billing/reconcile";
import type { Payment } from "@/types";

const verify = vi.fn();
const verifyParamsFromReference = vi.fn();

vi.mock("@/lib/billing/providers", () => ({
  getPaymentProvider: (slug: string) =>
    slug === "zarinpal"
      ? { slug, verify, verifyParamsFromReference }
      : slug === "manual"
        ? { slug, verify } // no verifyParamsFromReference — cannot be reconciled
        : null,
}));

function payment(over: Partial<Payment> = {}): Payment {
  return {
    id: "pay-1",
    user_id: "user-1",
    subscription_id: null,
    plan_slug: "basic",
    language_slug: "italian",
    period_months: 1,
    plan_title: "Basic",
    list_price_eur_cents: 299,
    discount_percent: 0,
    discount_eur_cents: 0,
    amount_eur_cents: 299,
    paid_currency: "IRR",
    paid_amount: 7_000_000,
    fx_rate: 2_221_600,
    fx_source: "tgju",
    provider: "zarinpal",
    provider_payment_id: null,
    provider_ref: null,
    checkout_reference: "A0000000000000000000000000000012345",
    status: "pending",
    failure_reason: null,
    paid_at: null,
    created_at: "2026-08-13T09:00:00Z",
    updated_at: "2026-08-13T09:00:00Z",
    metadata: {},
    ...over,
  } as Payment;
}

function deps(): ReconcileDeps & {
  settle: ReturnType<typeof vi.fn>;
  fail: ReturnType<typeof vi.fn>;
} {
  return {
    settle: vi.fn(async () => ({ subscriptionId: "sub-1" })),
    fail: vi.fn(async () => {}),
  };
}

beforeEach(() => {
  verify.mockReset();
  verifyParamsFromReference.mockReset();
  verifyParamsFromReference.mockImplementation((reference: string) => ({
    Authority: reference,
    Status: "OK",
  }));
});

describe("reconcilePayment", () => {
  it("settles a payment the gateway confirms was paid", async () => {
    verify.mockResolvedValue({
      ok: true,
      providerPaymentId: "auth-1",
      providerRef: "12345",
    });
    const d = deps();

    const outcome = await reconcilePayment(payment(), d);

    expect(outcome).toEqual({
      status: "settled",
      paymentId: "pay-1",
      subscriptionId: "sub-1",
    });
    expect(d.settle).toHaveBeenCalledWith({
      paymentId: "pay-1",
      providerPaymentId: "auth-1",
      providerRef: "12345",
    });
    expect(d.fail).not.toHaveBeenCalled();
  });

  it("quotes the amount from our own ledger, never from the gateway", async () => {
    verify.mockResolvedValue({ ok: true, providerPaymentId: "auth-1" });

    await reconcilePayment(payment({ paid_amount: 7_000_000 }), deps());

    expect(verify).toHaveBeenCalledWith(
      expect.objectContaining({ amount: 7_000_000, currency: "IRR" })
    );
  });

  it("fails a payment the gateway says was never completed", async () => {
    verify.mockResolvedValue({ ok: false, error: "zarinpal: not paid" });
    const d = deps();

    const outcome = await reconcilePayment(payment(), d);

    expect(outcome).toEqual({
      status: "failed",
      paymentId: "pay-1",
      reason: "zarinpal: not paid",
    });
    expect(d.fail).toHaveBeenCalledWith("pay-1", "zarinpal: not paid");
    expect(d.settle).not.toHaveBeenCalled();
  });

  it("leaves a payment alone when there is no reference to verify against", async () => {
    const d = deps();

    const outcome = await reconcilePayment(
      payment({ checkout_reference: null }),
      d
    );

    // Crucially neither settled nor failed: with nothing to ask the gateway,
    // failing it would destroy a possibly-good payment on a guess.
    expect(outcome.status).toBe("skipped");
    expect(verify).not.toHaveBeenCalled();
    expect(d.settle).not.toHaveBeenCalled();
    expect(d.fail).not.toHaveBeenCalled();
  });

  it("skips providers that cannot be asked after the fact", async () => {
    const d = deps();

    const outcome = await reconcilePayment(payment({ provider: "manual" }), d);

    expect(outcome.status).toBe("skipped");
    expect(d.fail).not.toHaveBeenCalled();
  });

  it("skips a payment that is no longer pending", async () => {
    const d = deps();

    const outcome = await reconcilePayment(payment({ status: "succeeded" }), d);

    expect(outcome).toEqual({
      status: "skipped",
      paymentId: "pay-1",
      reason: "already succeeded",
    });
    expect(verify).not.toHaveBeenCalled();
  });

  it("reports a settle failure as skipped so the row stays pending for a retry", async () => {
    verify.mockResolvedValue({ ok: true, providerPaymentId: "auth-1" });
    const d = deps();
    d.settle.mockResolvedValue({ error: "deadlock detected" });

    const outcome = await reconcilePayment(payment(), d);

    expect(outcome.status).toBe("skipped");
    expect(d.fail).not.toHaveBeenCalled();
  });

  it("skips when the provider declines to build verify params", async () => {
    verifyParamsFromReference.mockReturnValue(null);
    const d = deps();

    const outcome = await reconcilePayment(payment(), d);

    expect(outcome.status).toBe("skipped");
    expect(verify).not.toHaveBeenCalled();
  });
});
