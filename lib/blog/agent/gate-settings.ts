/**
 * What the reviewer checks, and how strictly.
 *
 * Kept in the database so the owner changes it from the panel rather than
 * through a redeploy. Every value has a default here, so a row that has never
 * been saved — and a database that has not had `013` applied — still produces a
 * working configuration instead of an error.
 *
 * Pure on purpose: the admin panel is a client component and imports these
 * definitions to draw its controls. Reading and writing the row lives in
 * `gate-settings-store.ts`, so the database driver never reaches the browser
 * bundle.
 */
/** Every judgment the reviewer can make. Adding one here adds it everywhere. */
export const CHECKS = [
  "coversTopic",
  "duplicate",
  "tuRuleViolated",
  "coverMatches",
  "depth",
  "seoQuality",
  "levelFit",
  "grammarCorrect",
  "linksRelevant",
] as const;

export type CheckName = (typeof CHECKS)[number];

/**
 * Every score the panel shows runs 0–100, and higher is always better.
 *
 * The service does not answer that way. Some questions come back as a
 * probability (0–1) and some as a level on a rubric (0–`max`), and two of them
 * ask about a *fault* — "is this a duplicate?" — where a high answer is bad
 * news. Left as they arrive, the owner has to remember which way each number
 * points, which is exactly the thing nobody remembers at a glance.
 *
 * So `invert` marks the fault questions, `goodness` does the arithmetic once,
 * and every threshold in the panel reads the same way: below it is a problem.
 *
 * The raw answers are still what gets stored in the run log. This is a display
 * and comparison scale, not a change to what the service said.
 */
export type CheckDefinition = {
  /** Shown in the panel, phrased so that a high score matches the name. */
  label: string;
  /** What a high score means, in the owner's words. */
  meaning: string;
  /** True when the underlying question asks about a fault. */
  invert: boolean;
  /** The top of the raw range: 1 for a probability, 3 for a four-level rubric. */
  max: number;
  /** 0–100. */
  defaultThreshold: number;
};

/** Raw answer to a 0–100 score where higher is better. */
export function goodness(name: CheckName, raw: number): number {
  const { invert, max } = CHECK_DEFINITIONS[name];
  const share = Math.min(Math.max(raw / max, 0), 1);
  return Math.round((invert ? 1 - share : share) * 100);
}

export const CHECK_DEFINITIONS: Record<CheckName, CheckDefinition> = {
  coversTopic: {
    label: "پوشش موضوع",
    meaning: "مقاله واقعاً به موضوعی که در صف بود پرداخته",
    invert: false,
    max: 1,
    defaultThreshold: 50,
  },
  // The question asked is "is this a duplicate?", so the answer is inverted to
  // match the name. The key stays `duplicate` because past runs were logged
  // under it and renaming it would orphan their history.
  duplicate: {
    label: "تازگی مطلب",
    meaning: "حرف تازه‌ای دارد و مطالب منتشرشده را دوباره نمی‌گوید",
    invert: true,
    max: 1,
    defaultThreshold: 30,
  },
  tuRuleViolated: {
    label: "درستی ترجمهٔ «tu»",
    meaning: "تمایز رسمی و غیررسمی را حفظ کرده",
    invert: true,
    max: 1,
    defaultThreshold: 50,
  },
  coverMatches: {
    label: "تناسب تصویر",
    meaning: "طرح تصویر شاخص مخصوص همین مقاله است",
    invert: false,
    max: 1,
    defaultThreshold: 40,
  },
  depth: {
    label: "عمق مطلب",
    meaning: "قاعده، مثال واقعی، و اشتباه رایج فارسی‌زبان‌ها را دارد",
    invert: false,
    max: 3,
    defaultThreshold: 50,
  },
  seoQuality: {
    label: "کیفیت عنوان و سئو",
    meaning: "عنوان و توضیح متا هم دقیق‌اند هم کلیک‌گرفتنی",
    invert: false,
    max: 3,
    defaultThreshold: 50,
  },
  levelFit: {
    label: "تناسب سطح زبانی",
    meaning: "به اندازه‌ای که موضوعش اجازه می‌دهد ساده نوشته شده",
    invert: false,
    max: 3,
    defaultThreshold: 33,
  },
  grammarCorrect: {
    label: "درستی گرامر ایتالیایی",
    meaning: "ادعاهای دستوری و مثال‌های ایتالیایی درست‌اند",
    invert: false,
    max: 1,
    defaultThreshold: 60,
  },
  linksRelevant: {
    label: "ربط لینک‌های داخلی",
    meaning: "لینک‌ها به مطلب مرتبط می‌روند، نه هر مطلبی",
    invert: false,
    max: 1,
    defaultThreshold: 40,
  },
};

/** What the verdict is allowed to do to a run. */
export type GateMode = "off" | "log" | "soft" | "hard";

export type GateSettings = {
  /**
   * 100 means the thresholds below are on the 0–100 scale. A row saved before
   * that change has no marker, and its thresholds are still in the raw ranges;
   * `parseGateSettings` converts those rather than reading 0.5 as "half a
   * point out of a hundred".
   */
  scale: 100;
  mode: GateMode;
  /** Judge the queued subject before paying to write it. */
  preflight: boolean;
  /** Per check: whether it runs, and where it fails. */
  checks: Record<CheckName, { enabled: boolean; threshold: number }>;
};

export const DEFAULT_GATE_SETTINGS: GateSettings = {
  scale: 100,
  // The owner's choice: hold a doubtful article back as a draft, never fail
  // the run over it.
  mode: "soft",
  preflight: true,
  checks: Object.fromEntries(
    CHECKS.map((name) => [
      name,
      { enabled: true, threshold: CHECK_DEFINITIONS[name].defaultThreshold },
    ])
  ) as GateSettings["checks"],
};

const MODES: GateMode[] = ["off", "log", "soft", "hard"];

/**
 * Turns whatever is in the column into settings this code can rely on.
 *
 * The column is plain jsonb with nothing enforcing its shape, and a check
 * added in a later release will be missing from every row saved before it —
 * so each field falls back to its default on its own rather than the whole
 * object being thrown away.
 */
export function parseGateSettings(value: unknown): GateSettings {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return DEFAULT_GATE_SETTINGS;
  }

  const raw = value as Record<string, unknown>;
  const isCurrentScale = raw.scale === 100;
  const rawChecks =
    raw.checks && typeof raw.checks === "object" && !Array.isArray(raw.checks)
      ? (raw.checks as Record<string, unknown>)
      : {};

  const checks = Object.fromEntries(
    CHECKS.map((name) => {
      const entry = rawChecks[name];
      const fallback = DEFAULT_GATE_SETTINGS.checks[name];
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
        return [name, fallback];
      }

      const { enabled, threshold } = entry as Record<string, unknown>;

      let value =
        typeof threshold === "number" && Number.isFinite(threshold)
          ? threshold
          : fallback.threshold;

      if (!isCurrentScale) {
        // An old row: the number is a raw cut-off, and for a fault question it
        // pointed the other way. Both are undone here so the owner's tuning
        // survives the change of scale.
        const { invert, max } = CHECK_DEFINITIONS[name];
        const share = Math.min(Math.max(value / max, 0), 1);
        value = Math.round((invert ? 1 - share : share) * 100);
      }

      return [
        name,
        {
          enabled: typeof enabled === "boolean" ? enabled : fallback.enabled,
          threshold: value >= 0 && value <= 100 ? value : fallback.threshold,
        },
      ];
    })
  ) as GateSettings["checks"];

  return {
    scale: 100,
    mode: MODES.includes(raw.mode as GateMode)
      ? (raw.mode as GateMode)
      : DEFAULT_GATE_SETTINGS.mode,
    preflight:
      typeof raw.preflight === "boolean"
        ? raw.preflight
        : DEFAULT_GATE_SETTINGS.preflight,
    checks,
  };
}
