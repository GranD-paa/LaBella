/**
 * Keeps the exchange rate current without anyone pressing anything.
 *
 * The timer lives inside the running server rather than in an external
 * scheduler, because the host this app runs on has no cron of its own and a
 * public URL that forces a rate write is a liability. One pod, one timer.
 *
 * The manual refresh in the admin panel stays exactly as it was — both call the
 * same `refreshFxRate`, so both obey the same deviation guard and the same
 * "manual source means hands off" rule.
 */
import {
  isRefreshOverdue,
  millisecondsUntilNextRun,
  nextRunAfter,
} from "@/lib/billing/fx/schedule";

/** Module state, so a second import cannot start a second timer. */
let started = false;
let timer: ReturnType<typeof setTimeout> | null = null;

function enabled(): boolean {
  const flag = process.env.FX_AUTO_REFRESH?.toLowerCase();
  if (flag === "on" || flag === "true") return true;
  if (flag === "off" || flag === "false") return false;
  // Off by default outside production so a dev server does not reach out to the
  // rate source on its own.
  return process.env.NODE_ENV === "production";
}

async function runRefresh(reason: "catch-up" | "scheduled") {
  try {
    // Imported lazily: pulling the data layer in at module load would drag a
    // database connection into every build that merely touches this file.
    const { refreshFxRate } = await import("@/lib/billing/fx/refresh");
    const { getDataRepository } = await import("@/lib/data");

    const outcome = await refreshFxRate(getDataRepository());
    console.info(`[fx] ${reason} refresh: ${outcome.status}`);
  } catch (error) {
    // A failed refresh must never take the server down with it; the previous
    // rate simply stays in force until the next attempt.
    console.error(`[fx] ${reason} refresh threw`, error);
  }
}

function queueNext() {
  const now = new Date();
  const delay = millisecondsUntilNextRun(now);

  timer = setTimeout(async () => {
    await runRefresh("scheduled");
    queueNext();
  }, delay);

  // Do not hold the process open on this timer alone.
  timer.unref?.();

  console.info(`[fx] next automatic refresh at ${nextRunAfter(now).toISOString()}`);
}

/**
 * Starts the daily cycle, and fills in a run that was missed while the server
 * was down.
 */
export function startFxRateSchedule() {
  if (started || !enabled()) return;
  started = true;

  void (async () => {
    try {
      const { getDataRepository } = await import("@/lib/data");
      const latest = await getDataRepository().getLatestFxRate();

      if (isRefreshOverdue(new Date(), latest?.fetched_at ?? null)) {
        await runRefresh("catch-up");
      }
    } catch (error) {
      console.error("[fx] could not check for a missed refresh", error);
    }

    queueNext();
  })();
}

/** Test/teardown hook — nothing in the app calls this. */
export function stopFxRateSchedule() {
  if (timer) clearTimeout(timer);
  timer = null;
  started = false;
}
