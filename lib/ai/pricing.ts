import type { TokenUsage } from "@/lib/ai/arvan";

/**
 * What each model costs, in toman per million tokens.
 *
 * Copied from the AIaaS model bazaar on 2026-09-12. These are here to turn a
 * token count into a number the author can compare, not to bill anyone — the
 * real invoice comes from ArvanCloud and this table has no say in it. A model
 * missing from the map costs zero here, which is deliberately obvious in the
 * run log rather than quietly wrong.
 *
 * Keep it in sync by hand when a rate moves. An automatic sync would need a
 * catalogue endpoint and a cache, for a table that changes a few times a year
 * and whose only reader is a comparison the author does with their own eyes.
 */
export type ModelRate = {
  /** Toman per 1,000,000 input tokens. */
  input: number;
  /** Toman per 1,000,000 output tokens. */
  output: number;
};

export const MODEL_RATES: Record<string, ModelRate> = {
  "GPT-5.6-Terra": { input: 600_000, output: 3_600_000 },
  "GPT-5.6-Luna": { input: 240_000, output: 1_440_000 },
  "GLM-5.3": { input: 336_000, output: 1_058_400 },
  "Claude-Sonnet-4.6": { input: 1_260_000, output: 4_725_000 },

  // Image models. Note the Pro tier is both better and five times cheaper per
  // output token than the Flash tier — an inversion worth leaving a comment
  // on, because the obvious assumption picks the wrong one.
  "Gemini-3-Pro-Image-Preview": { input: 420_000, output: 2_520_000 },
  "Gemini-3.1-Flash-Image-Preview": { input: 105_000, output: 12_600_000 },
};

/** Toman for one model call. Unknown models report zero. */
export function costToman(model: string, usage: TokenUsage): number {
  const rate = MODEL_RATES[model];
  if (!rate) return 0;
  return (
    (usage.promptTokens * rate.input + usage.completionTokens * rate.output) /
    1_000_000
  );
}

/** For the admin panel: "۱۹٬۴۰۰ تومان". */
export function formatToman(amount: number): string {
  return `${Math.round(amount).toLocaleString("fa-IR")} تومان`;
}
