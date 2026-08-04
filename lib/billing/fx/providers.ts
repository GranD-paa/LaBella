/**
 * EUR -> IRR rate sources.
 *
 * Why not a generic FX API: the international rate services (Google, x-rates,
 * exchangerate.host) quote the Iranian *official* rate, which is set
 * administratively and sits roughly an order of magnitude away from what
 * anyone actually transacts at. Pricing an Iranian customer off it would
 * charge them a small fraction of the intended price. These adapters read the
 * free-market rate instead, which is the one Iranian storefronts use.
 *
 * Every adapter returns the rate in **Rial per euro**. Feeds that quote Toman
 * are a real hazard here — a source silently switching units is a 10x pricing
 * error — which is why `isRateAcceptable()` guards the write path rather than
 * trusting any of these outright.
 */
import { parseRateString } from "@/lib/billing/money";

export type FxFetchResult =
  | { ok: true; rate: number; source: string }
  | { ok: false; error: string };

export type FxRateProvider = {
  slug: string;
  /** Fetches the current free-market Rial price of one euro. */
  fetchEurToIrr(): Promise<FxFetchResult>;
};

/** Feeds occasionally hang; a stuck cron is worse than a skipped one. */
const FETCH_TIMEOUT_MS = 10_000;

async function fetchJson(url: string, init?: RequestInit): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      ...init,
      signal: controller.signal,
      // These are live prices; a cached copy defeats the point of the refresh.
      cache: "no-store",
      headers: {
        accept: "application/json",
        // Some Iranian endpoints reject requests without a browser-ish UA.
        "user-agent": "Mozilla/5.0 (compatible; Laparli/1.0; +https://laparli.app)",
        ...init?.headers,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * TGJU (شبکه اطلاع‌رسانی طلا و ارز) — the reference free-market price source
 * in Iran. Public JSON feed, no API key.
 *
 * The quote lives at `current.price_eur.p` and is the euro price in **Rial**,
 * comma-grouped, e.g. "2,221,600". The top-level fallback is kept because the
 * feed has served a flatter shape in the past and a missing key here means no
 * Rial pricing at all.
 */
type TgjuQuote = { p?: unknown };
type TgjuPayload = {
  current?: Record<string, TgjuQuote>;
} & Record<string, unknown>;

export const tgjuProvider: FxRateProvider = {
  slug: "tgju",
  async fetchEurToIrr() {
    try {
      const payload = (await fetchJson(
        "https://call5.tgju.org/ajax.json"
      )) as TgjuPayload | undefined;

      const quote =
        payload?.current?.price_eur ?? (payload?.price_eur as TgjuQuote | undefined);
      const raw = quote?.p;

      if (typeof raw !== "string" && typeof raw !== "number") {
        return { ok: false, error: "tgju: current.price_eur.p missing from feed" };
      }

      const rate = parseRateString(String(raw));
      if (rate === null) {
        return { ok: false, error: `tgju: could not parse rate "${String(raw)}"` };
      }

      return { ok: true, rate, source: "tgju" };
    } catch (error) {
      return {
        ok: false,
        error: `tgju: ${error instanceof Error ? error.message : "request failed"}`,
      };
    }
  },
};

/**
 * Navasan (نوسان) — commercial feed, needs `NAVASAN_API_KEY`.
 *
 * Kept deliberately strict about the response shape: if the payload does not
 * look like what we expect, this reports a failure rather than guessing. A
 * wrong-but-plausible number here would reprice the whole Iranian catalogue.
 */
export const navasanProvider: FxRateProvider = {
  slug: "navasan",
  async fetchEurToIrr() {
    const apiKey = process.env.NAVASAN_API_KEY;
    if (!apiKey) {
      return { ok: false, error: "navasan: NAVASAN_API_KEY is not set" };
    }

    try {
      const payload = (await fetchJson(
        `https://api.navasan.tech/latest/?api_key=${encodeURIComponent(apiKey)}`
      )) as Record<string, { value?: unknown }> | undefined;

      const raw = payload?.eur?.value;
      if (typeof raw !== "string" && typeof raw !== "number") {
        return {
          ok: false,
          error: "navasan: unexpected payload shape (expected eur.value)",
        };
      }

      const rate = parseRateString(String(raw));
      if (rate === null) {
        return { ok: false, error: `navasan: could not parse rate "${String(raw)}"` };
      }

      return { ok: true, rate, source: "navasan" };
    } catch (error) {
      return {
        ok: false,
        error: `navasan: ${error instanceof Error ? error.message : "request failed"}`,
      };
    }
  },
};

const PROVIDERS: Record<string, FxRateProvider> = {
  tgju: tgjuProvider,
  navasan: navasanProvider,
};

/**
 * Resolves the configured adapter. `manual` has no adapter — the rate is typed
 * in by an admin and read straight from settings — so it is not listed here.
 */
export function getFxProvider(slug: string): FxRateProvider | null {
  return PROVIDERS[slug] ?? null;
}
