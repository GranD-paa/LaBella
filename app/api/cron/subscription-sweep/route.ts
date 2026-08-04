import { NextResponse } from "next/server";

import { isLocalDataMode } from "@/lib/config/data-source";
import {
  createServiceClient,
  isAuthorizedCronRequest,
} from "@/lib/supabase/service-client";

export const dynamic = "force-dynamic";

/**
 * Nightly subscription sweep.
 *
 * Moves subscriptions whose period has ended into `past_due` (inside the
 * grace window) and then `expired`. This is what makes the "who didn't renew"
 * reporting real rather than aspirational.
 *
 * The underlying SQL derives status from dates rather than from "did this job
 * run", so a missed night self-corrects on the next one instead of leaving
 * subscriptions permanently mislabelled.
 */
export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (isLocalDataMode()) {
    // Local mode has no scheduler; the sweep is a no-op there.
    return NextResponse.json({ skipped: "local data mode" });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase.rpc("sweep_subscriptions");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = data?.[0] ?? { moved_to_past_due: 0, moved_to_expired: 0 };
  return NextResponse.json({
    pastDue: result.moved_to_past_due,
    expired: result.moved_to_expired,
  });
}
