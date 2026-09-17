import { NextResponse } from "next/server";

import { refreshFxRate } from "@/lib/billing/fx/refresh";
import { getDataRepository } from "@/lib/data";
import { isAuthorizedCronRequest } from "@/lib/supabase/service-client";

// Live prices — a cached response would defeat the entire job.
export const dynamic = "force-dynamic";

/**
 * Daily EUR -> IRR refresh, over HTTP.
 *
 * The server schedules this work itself (`lib/billing/fx/scheduler.ts`), so
 * this route is the spare key: a way to force a refresh from outside without a
 * browser session, guarded by `CRON_SECRET`. It writes through the repository
 * like every other caller, so whichever database is configured is the one that
 * gets the row.
 */
export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const outcome = await refreshFxRate(getDataRepository());

  // A rejected or failed refresh is a normal, expected outcome — the previous
  // rate stays in force — so it is reported as 200 with detail rather than as
  // an error that would make the cron dashboard look broken.
  return NextResponse.json(outcome);
}
