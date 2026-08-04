import { NextResponse } from "next/server";

import { getPaymentProvider } from "@/lib/billing/providers";
import { isLocalDataMode } from "@/lib/config/data-source";
import { getDataRepository } from "@/lib/data";
import { failLocalPayment, settleLocalPayment } from "@/lib/data/local/repository";
import { createServiceClient } from "@/lib/supabase/service-client";

export const dynamic = "force-dynamic";

/**
 * Where a payment gateway returns the customer after checkout.
 *
 * The security-relevant part is that nothing in the incoming query string is
 * trusted as proof of payment. `Status=OK` is just text in a URL. The route
 * looks the payment up in our own ledger, asks the gateway server-to-server
 * whether that specific attempt succeeded — quoting the amount from our
 * records, not theirs — and only then settles.
 *
 * Settlement runs with the service role because `settle_payment` is
 * deliberately not executable by `authenticated`: a learner must never be
 * able to mark their own payment as paid.
 */
export async function GET(
  request: Request,
  { params }: { params: { provider: string } }
) {
  const url = new URL(request.url);
  const paymentId = url.searchParams.get("payment_id");

  const provider = getPaymentProvider(params.provider);
  if (!provider || !paymentId) {
    return redirectToResult(url, "error");
  }

  const repo = getDataRepository();
  const payment = await repo.getPaymentById(paymentId);
  if (!payment) {
    return redirectToResult(url, "error");
  }

  // A refreshed return page must not run settlement twice.
  if (payment.status === "succeeded") {
    return redirectToResult(url, "success", payment.language_slug);
  }
  if (payment.status !== "pending") {
    return redirectToResult(url, "failed", payment.language_slug);
  }

  const query: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    query[key] = value;
  });

  const verification = await provider.verify({
    paymentId: payment.id,
    // Amount comes from our ledger so a tampered callback cannot change it.
    amount: payment.paid_amount,
    currency: payment.paid_currency,
    params: query,
  });

  if (!verification.ok) {
    await markFailed(payment.id, verification.error);
    return redirectToResult(
      url,
      verification.canceledByUser ? "cancelled" : "failed",
      payment.language_slug
    );
  }

  const settled = await settle(
    payment.id,
    verification.providerPaymentId,
    verification.providerRef
  );
  if (settled.error) {
    return redirectToResult(url, "error", payment.language_slug);
  }

  return redirectToResult(url, "success", payment.language_slug);
}

async function settle(
  paymentId: string,
  providerPaymentId: string,
  providerRef?: string
): Promise<{ error?: string }> {
  if (isLocalDataMode()) {
    return settleLocalPayment(paymentId);
  }

  const supabase = createServiceClient();
  const { error } = await supabase.rpc("settle_payment", {
    p_payment_id: paymentId,
    p_provider_payment_id: providerPaymentId,
    p_provider_ref: providerRef ?? null,
  });
  return error ? { error: error.message } : {};
}

async function markFailed(paymentId: string, reason: string): Promise<void> {
  if (isLocalDataMode()) {
    failLocalPayment(paymentId, reason);
    return;
  }

  const supabase = createServiceClient();
  await supabase.rpc("fail_payment", {
    p_payment_id: paymentId,
    p_reason: reason,
  });
}

function redirectToResult(
  requestUrl: URL,
  status: "success" | "failed" | "cancelled" | "error",
  languageSlug?: string
) {
  const destination = new URL("/subscription", requestUrl.origin);
  destination.searchParams.set("checkout", status);
  if (languageSlug) destination.searchParams.set("language", languageSlug);
  return NextResponse.redirect(destination);
}
