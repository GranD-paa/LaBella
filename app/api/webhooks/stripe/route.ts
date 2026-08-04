import { NextResponse } from "next/server";

import { verifyStripeWebhook } from "@/lib/billing/providers/stripe";
import { createServiceClient } from "@/lib/supabase/service-client";
import type { Json } from "@/types/database.types";

export const dynamic = "force-dynamic";

/**
 * Stripe webhook — the authoritative confirmation of an online payment.
 *
 * The browser callback is a convenience; this is the path that has to work.
 * A customer who pays and immediately closes the tab still gets their
 * subscription, because Stripe delivers here regardless.
 *
 * Two things make it safe to act on:
 *  * the HMAC signature is verified before the body is parsed, so a forged
 *    POST cannot mint a subscription;
 *  * every event id is written to `webhook_events` with a unique constraint,
 *    so Stripe's at-least-once delivery cannot settle a payment twice.
 */
export async function POST(request: Request) {
  // Must be the exact bytes Stripe signed — parsing first would break the HMAC.
  const rawBody = await request.text();

  const verified = verifyStripeWebhook(
    rawBody,
    request.headers.get("stripe-signature")
  );
  if (!verified.ok) {
    return NextResponse.json({ error: verified.error }, { status: 400 });
  }

  const { event } = verified;
  const supabase = createServiceClient();

  // Claim the event. A duplicate delivery loses the race on the unique index
  // and returns here without touching the ledger.
  const { error: claimError } = await supabase.from("webhook_events").insert({
    provider: "stripe",
    provider_event_id: event.id,
    event_type: event.type,
    payload: event as unknown as Json,
    status: "received",
  });
  if (claimError) {
    // Unique violation means we have already handled this event.
    if (claimError.code === "23505") {
      return NextResponse.json({ received: true, duplicate: true });
    }
    return NextResponse.json({ error: claimError.message }, { status: 500 });
  }

  const finish = async (
    status: "processed" | "failed" | "ignored",
    error?: string
  ) => {
    await supabase
      .from("webhook_events")
      .update({ status, error: error ?? null, processed_at: new Date().toISOString() })
      .eq("provider", "stripe")
      .eq("provider_event_id", event.id);
  };

  if (event.type !== "checkout.session.completed") {
    await finish("ignored");
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const session = event.data.object as {
    client_reference_id?: string;
    payment_intent?: string;
    payment_status?: string;
    id?: string;
  };

  const paymentId = session.client_reference_id;
  if (!paymentId) {
    await finish("failed", "session had no client_reference_id");
    return NextResponse.json({ error: "missing client_reference_id" }, { status: 400 });
  }
  if (session.payment_status !== "paid") {
    await finish("ignored", `payment_status=${session.payment_status}`);
    return NextResponse.json({ received: true });
  }

  const { error: settleError } = await supabase.rpc("settle_payment", {
    p_payment_id: paymentId,
    p_provider_payment_id: session.payment_intent ?? session.id ?? null,
    p_provider_ref: session.id ?? null,
  });

  if (settleError) {
    await finish("failed", settleError.message);
    // A 500 asks Stripe to retry, which is what we want for a transient fault.
    return NextResponse.json({ error: settleError.message }, { status: 500 });
  }

  await finish("processed");
  return NextResponse.json({ received: true });
}
