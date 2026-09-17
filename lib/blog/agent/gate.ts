/**
 * Reads the finished article before anyone else does.
 *
 * `schema.ts` already proves the writer returned the right *shape*, and
 * `normalise` in the pipeline repairs the mechanical slips — a stray heading, a
 * category that is not ours, a link to a post that does not exist. Neither of
 * them has an opinion about whether the article is any good, or even about the
 * subject it was asked to cover. Every content bug found so far was found by a
 * person reading the output afterwards.
 *
 * This asks that question in code. It is a second AI service, which the owner
 * had ruled out for the writer: the writing stays on one service, and this one
 * only ever judges what that service produced. It cannot write, rewrite, or
 * publish anything.
 *
 * Deliberately not here: whether a heading starts with a Latin word, and
 * whether examples sit in fenced code blocks. Those are exact rules, so they
 * belong in a regex, not in a judgment that costs a network call and can
 * disagree with itself.
 */
import { noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

/** What the verdict is allowed to do to a run. */
export type GateMode =
  /** Not consulted at all. */
  | "off"
  /** Consulted and recorded; the run proceeds exactly as before. */
  | "log"
  /** A concern holds the post back as a draft; the run still succeeds. */
  | "soft"
  /** A concern fails the run outright. */
  | "hard";

export type GateOutcome =
  | "pass"
  /** Something is wrong with the article. */
  | "hold"
  /** No key configured, or the mode is `off`. */
  | "skipped"
  /** The judge could not be reached. */
  | "unavailable";

export type GateVerdict = {
  mode: GateMode;
  outcome: GateOutcome;
  /** Persian, written for the run log and the admin panel. */
  reasons: string[];
  scores: Record<string, number> | null;
  durationMs: number;
  inputTokens: number;
};

export type GateSubject = {
  /** The subject as it was queued, which is what the article owes. */
  queuedTopic: string;
  title: string;
  summary: string;
  body: string;
  /** Judged before the image is drawn, so a bad brief costs nothing. */
  imagePrompt: string;
  existingPosts: { slug: string; title: string; summary: string | null }[];
};

/**
 * Provisional, from one measured pair: a sound article scored 0.91 / 0.13 /
 * 0.05 / 0.80 / 3.0 and one with planted faults scored 0.03 / 0.89 / 0.92 /
 * 0.17 / 1.26. The gaps are wide, so these sit in the middle of each.
 *
 * They are a starting point and nothing more. Run in `log` mode for a while,
 * look at where real articles land, and move them before trusting the gate to
 * hold anything back.
 */
const THRESHOLDS = {
  /** Below this, the article is not about the subject it was given. */
  coversTopic: 0.5,
  /** At or above this, it retreads a post that is already published. */
  duplicate: 0.7,
  /** At or above this, `tu` was flattened into «شما». */
  tuRuleViolated: 0.5,
  /** Below this, the cover brief would suit any article at all. */
  coverMatches: 0.4,
  /** Below this, there is not enough substance to publish. */
  depth: 1.5,
};

function mode(): GateMode {
  const raw = process.env.AGENT_GATE_MODE?.toLowerCase();
  if (raw === "off" || raw === "log" || raw === "hard") return raw;
  // The owner chose the soft gate: hold it back as a draft, do not fail the
  // run. Changing this is an environment variable and a restart, not a deploy.
  return "soft";
}

const DEPTH_LEVELS = [
  "پر کردن صفحه بدون هیچ مثال مشخص",
  "درست ولی کم‌مایه، با مثال‌های اندک",
  "قاعدهٔ روشن به‌همراه جمله‌های نمونهٔ واقعی",
  "قاعده، مثال، و اشاره به اشتباهی که فارسی‌زبان‌ها می‌کنند",
] as const;

/**
 * One request, five independent judgments.
 *
 * They are asked together on purpose: they run in parallel, none of them needs
 * another's answer, and a single round trip is the difference between a gate
 * that costs a second and one that costs five.
 */
export async function reviewArticle(subject: GateSubject): Promise<GateVerdict> {
  const started = Date.now();
  const active = mode();
  const apiKey = process.env.TYPESAFE_API_KEY?.trim();

  const idle = (outcome: GateOutcome, reasons: string[] = []): GateVerdict => ({
    mode: active,
    outcome,
    reasons,
    scores: null,
    durationMs: Date.now() - started,
    inputTokens: 0,
  });

  if (active === "off") return idle("skipped");
  if (!apiKey) return idle("skipped", ["کلید سرویس بازبینی تنظیم نشده است."]);

  const client = new TypeSafeClient({
    apiKey,
    // A judge that hangs must not hold up a run that has already been paid
    // for. Ten seconds is generous next to the 0.9s a healthy call takes.
    timeout: 10_000,
    retry: { maxRetries: 1 },
  });

  let result;
  try {
    result = await client.systemOne({
      state: {
        queued_topic: subject.queuedTopic,
        article_title: subject.title,
        article_summary: subject.summary,
        article_body: subject.body,
        cover_image_prompt: subject.imagePrompt,
        already_published_posts: subject.existingPosts,
      },
      questions: {
        coversTopic: noul(
          "Does `article_body` actually teach the subject named in `queued_topic`?",
          {
            true: "The body explains that subject.",
            false: "The body is about a different subject.",
          }
        ),
        duplicate: noul(
          "Does this article cover substantially the same ground as one of `already_published_posts`?"
        ),
        tuRuleViolated: noul(
          "Does the article translate the Italian informal pronoun `tu` with the Persian formal «شما», " +
            "collapsing the formal/informal distinction a language lesson must preserve?"
        ),
        coverMatches: noul(
          "Would an image drawn from `cover_image_prompt` be specific to THIS article, " +
            "rather than a generic picture that would suit any article about any choice?"
        ),
        depth: score(
          "How useful is this article to a Persian speaker learning Italian?",
          DEPTH_LEVELS
        ),
      },
    });
  } catch (error) {
    // Unreachable is not the same as failed. Under a soft gate this still
    // holds the post back, because an unreviewed article is exactly what the
    // gate exists to prevent — but it is reported as its own outcome so the
    // run log says "could not check", not "the article was bad".
    return idle("unavailable", [
      `سرویس بازبینی در دسترس نبود: ${error instanceof Error ? error.message : String(error)}`,
    ]);
  }

  const answers = result.answers;
  const scores = {
    coversTopic: answers.coversTopic.noul,
    duplicate: answers.duplicate.noul,
    tuRuleViolated: answers.tuRuleViolated.noul,
    coverMatches: answers.coverMatches.noul,
    depth: answers.depth.score,
  };

  const reasons: string[] = [];
  if (scores.coversTopic < THRESHOLDS.coversTopic) {
    reasons.push("مقاله به موضوعی که در صف ثبت شده بود نپرداخته است.");
  }
  if (scores.duplicate >= THRESHOLDS.duplicate) {
    reasons.push("محتوا با یکی از مطالب منتشرشده هم‌پوشانی زیادی دارد.");
  }
  if (scores.tuRuleViolated >= THRESHOLDS.tuRuleViolated) {
    reasons.push("ضمیر «tu» به «شما» ترجمه شده و تمایز رسمی و غیررسمی از بین رفته.");
  }
  if (scores.coverMatches < THRESHOLDS.coverMatches) {
    reasons.push("طرح تصویر شاخص عمومی است و به این مقالهٔ مشخص ربطی ندارد.");
  }
  if (scores.depth < THRESHOLDS.depth) {
    reasons.push("مطلب کم‌مایه است و مثال یا قاعدهٔ کافی ندارد.");
  }

  return {
    mode: active,
    outcome: reasons.length > 0 ? "hold" : "pass",
    reasons,
    scores,
    durationMs: Date.now() - started,
    inputTokens: result.usage.input_tokens,
  };
}

/** Whether this verdict should stop the post going live. */
export function holdsPublication(verdict: GateVerdict): boolean {
  if (verdict.mode === "off" || verdict.mode === "log") return false;
  return verdict.outcome === "hold" || verdict.outcome === "unavailable";
}

/** Whether this verdict should fail the whole run. */
export function failsRun(verdict: GateVerdict): boolean {
  return verdict.mode === "hard" && holdsPublication(verdict);
}

/** A one-line summary for the run log's step list. */
export function describeVerdict(verdict: GateVerdict): string {
  if (!verdict.scores) return `${verdict.outcome}`;
  const pairs = Object.entries(verdict.scores)
    .map(([key, value]) => `${key}=${value.toFixed(2)}`)
    .join(" ");
  return `${verdict.outcome} ${pairs}`;
}
