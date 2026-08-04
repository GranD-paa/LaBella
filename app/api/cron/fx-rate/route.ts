import { NextResponse } from "next/server";

import { refreshFxRate, type FxRateStore } from "@/lib/billing/fx/refresh";
import { DEFAULT_PAYMENT_SETTINGS } from "@/lib/billing/defaults";
import { isLocalDataMode } from "@/lib/config/data-source";
import { getDataRepository } from "@/lib/data";
import {
  createServiceClient,
  isAuthorizedCronRequest,
} from "@/lib/supabase/service-client";

// Live prices — a cached response would defeat the entire job.
export const dynamic = "force-dynamic";

/**
 * Hourly EUR -> IRR refresh.
 *
 * Scheduled from vercel.json. Runs with the service role because there is no
 * user session on a cron invocation and `fx_rates` is admin-writable only.
 */
export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // In local mode the file-backed repository is the store; there is no
  // Supabase project to talk to.
  const store: FxRateStore = isLocalDataMode()
    ? getDataRepository()
    : supabaseFxStore();

  const outcome = await refreshFxRate(store);

  // A rejected or failed refresh is a normal, expected outcome — the previous
  // rate stays in force — so it is reported as 200 with detail rather than as
  // an error that would make the cron dashboard look broken.
  return NextResponse.json(outcome);
}

function supabaseFxStore(): FxRateStore {
  const supabase = createServiceClient();

  return {
    async getPaymentSettings() {
      const { data } = await supabase
        .from("payment_settings")
        .select("*")
        .eq("id", "default")
        .maybeSingle();
      return data ?? DEFAULT_PAYMENT_SETTINGS;
    },

    async getLatestFxRate() {
      const { data } = await supabase
        .from("fx_rates")
        .select("*")
        .eq("base_currency", "EUR")
        .eq("quote_currency", "IRR")
        .eq("accepted", true)
        .order("fetched_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      return data ?? null;
    },

    async recordFxRate(input) {
      const { error } = await supabase.from("fx_rates").insert({
        rate: input.rate,
        source: input.source,
        accepted: input.accepted,
        rejection_reason: input.rejectionReason ?? null,
      });
      return error ? { error: error.message } : {};
    },
  };
}
