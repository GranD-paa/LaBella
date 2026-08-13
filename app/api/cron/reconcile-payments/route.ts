import { NextResponse } from "next/server";

import { reconcilePayments } from "@/lib/billing/reconcile";
import { isLocalDataMode } from "@/lib/config/data-source";
import {
  createServiceClient,
  isAuthorizedCronRequest,
} from "@/lib/supabase/service-client";
import type { Payment } from "@/types";

export const dynamic = "force-dynamic";

/**
 * Recovers payments that were paid but never activated.
 *
 * The browser callback and the gateway webhook settle nearly everything
 * between them. This closes the gap they cannot: a customer whose connection
 * died during the redirect on ZarinPal, which has no webhooks at all, and any
 * Stripe webhook that failed to deliver. Those customers have paid and have
 * nothing to show for it, which is the worst thing this system can do to
 * someone.
 *
 * Runs with the service role because settling is deliberately not executable
 * by `authenticated`.
 */
export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (isLocalDataMode()) {
    // No real gateway to reconcile against locally.
    return NextResponse.json({ skipped: "local data mode" });
  }

  const supabase = createServiceClient();

  const { data, error } = await supabase.rpc("list_stale_pending_payments", {
    p_limit: 50,
  });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const stale = (data as Payment[] | null) ?? [];
  if (stale.length === 0) {
    return NextResponse.json({ checked: 0, settled: 0, failed: 0, skipped: 0 });
  }

  const outcomes = await reconcilePayments(stale, {
    async settle({ paymentId, providerPaymentId, providerRef }) {
      const { data: subscriptionId, error: settleError } = await supabase.rpc(
        "settle_payment",
        {
          p_payment_id: paymentId,
          p_provider_payment_id: providerPaymentId,
          p_provider_ref: providerRef ?? null,
        }
      );
      return settleError
        ? { error: settleError.message }
        : { subscriptionId: subscriptionId as string };
    },
    async fail(paymentId, reason) {
      await supabase.rpc("fail_payment", {
        p_payment_id: paymentId,
        p_reason: reason,
      });
    },
  });

  const count = (status: string) =>
    outcomes.filter((outcome) => outcome.status === status).length;

  return NextResponse.json({
    checked: outcomes.length,
    settled: count("settled"),
    failed: count("failed"),
    skipped: count("skipped"),
    // Surfaced so a gateway misconfiguration shows up in the cron log rather
    // than silently reconciling nothing every night.
    skippedReasons: outcomes
      .filter((outcome) => outcome.status === "skipped")
      .map((outcome) => ("reason" in outcome ? outcome.reason : "")),
  });
}
