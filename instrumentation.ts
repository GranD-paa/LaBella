/**
 * Runs once when the server process boots.
 *
 * Next.js compiles this file for the edge runtime as well, and the data layer
 * it reaches cannot exist there. The check is written as a positive `if` rather
 * than an early return on purpose: `NEXT_RUNTIME` is replaced at build time, so
 * webpack can drop the whole block — and the database driver with it — from the
 * edge bundle. An early return would leave the import in the graph and the edge
 * build would fail on `fs`.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startFxRateSchedule } = await import("@/lib/billing/fx/scheduler");
    startFxRateSchedule();
  }
}
