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
 * Which way a check fails.
 *
 * `below` means a low number is bad (the article did not cover its topic);
 * `atOrAbove` means a high number is bad (it duplicates something). Keeping
 * the direction beside the threshold is what lets the panel render one slider
 * per check without a table of special cases.
 */
export type CheckDirection = "below" | "atOrAbove";

export type CheckDefinition = {
  /** Shown in the panel. */
  label: string;
  /** What a high number means, in the owner's words. */
  meaning: string;
  direction: CheckDirection;
  defaultThreshold: number;
  /** Score questions run 0..levels-1; Noul questions run 0..1. */
  max: number;
};

export const CHECK_DEFINITIONS: Record<CheckName, CheckDefinition> = {
  coversTopic: {
    label: "پوشش موضوع",
    meaning: "مقاله واقعاً به موضوعی که در صف بود پرداخته",
    direction: "below",
    defaultThreshold: 0.5,
    max: 1,
  },
  duplicate: {
    label: "تکراری بودن",
    meaning: "با یکی از مطالب منتشرشده هم‌پوشانی دارد",
    direction: "atOrAbove",
    defaultThreshold: 0.7,
    max: 1,
  },
  tuRuleViolated: {
    label: "خطای ترجمهٔ «tu»",
    meaning: "ضمیر غیررسمی را «شما» ترجمه کرده",
    direction: "atOrAbove",
    defaultThreshold: 0.5,
    max: 1,
  },
  coverMatches: {
    label: "تناسب تصویر",
    meaning: "طرح تصویر شاخص مخصوص همین مقاله است",
    direction: "below",
    defaultThreshold: 0.4,
    max: 1,
  },
  depth: {
    label: "عمق مطلب",
    meaning: "قاعده، مثال واقعی، و اشتباه رایج فارسی‌زبان‌ها را دارد",
    direction: "below",
    defaultThreshold: 1.5,
    max: 3,
  },
  seoQuality: {
    label: "کیفیت عنوان و سئو",
    meaning: "عنوان و توضیح متا هم دقیق‌اند هم کلیک‌گرفتنی",
    direction: "below",
    defaultThreshold: 1.5,
    max: 3,
  },
  levelFit: {
    label: "تناسب سطح زبانی",
    meaning: "برای زبان‌آموز مبتدی قابل فهم است",
    direction: "below",
    defaultThreshold: 1.0,
    max: 3,
  },
  grammarCorrect: {
    label: "درستی گرامر ایتالیایی",
    meaning: "ادعاهای دستوری و مثال‌های ایتالیایی درست‌اند",
    direction: "below",
    defaultThreshold: 0.6,
    max: 1,
  },
  linksRelevant: {
    label: "ربط لینک‌های داخلی",
    meaning: "لینک‌ها به مطلب مرتبط می‌روند، نه هر مطلبی",
    direction: "below",
    defaultThreshold: 0.4,
    max: 1,
  },
};

/** What the verdict is allowed to do to a run. */
export type GateMode = "off" | "log" | "soft" | "hard";

export type GateSettings = {
  mode: GateMode;
  /** Judge the queued subject before paying to write it. */
  preflight: boolean;
  /** Per check: whether it runs, and where it fails. */
  checks: Record<CheckName, { enabled: boolean; threshold: number }>;
};

export const DEFAULT_GATE_SETTINGS: GateSettings = {
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
      const limit = CHECK_DEFINITIONS[name].max;

      return [
        name,
        {
          enabled: typeof enabled === "boolean" ? enabled : fallback.enabled,
          threshold:
            typeof threshold === "number" &&
            Number.isFinite(threshold) &&
            threshold >= 0 &&
            threshold <= limit
              ? threshold
              : fallback.threshold,
        },
      ];
    })
  ) as GateSettings["checks"];

  return {
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
