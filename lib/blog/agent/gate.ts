/**
 * Reads the finished article before anyone else does.
 *
 * `schema.ts` proves the writer returned the right *shape*, and `normalise` in
 * the pipeline repairs the mechanical slips — a stray heading, a category that
 * is not ours, a link to a post that does not exist. Neither has an opinion
 * about whether the article is any good, or even about the subject it was
 * handed. Every content bug found so far was found by a person reading output
 * afterwards.
 *
 * It is a second AI service, which the owner ruled out for the *writer*: the
 * writing stays on one service, and this one only ever judges what that service
 * produced. It cannot write, rewrite, or publish anything.
 *
 * **The rule that shapes everything here: the reviewer is an addition, never a
 * dependency.** If the credit runs out, the key is removed, or the network to
 * it closes, the agent must carry on exactly as it did before any of this
 * existed. So an unreachable reviewer never holds a post back and never fails a
 * run — it is recorded and stepped over. Only a reviewer that actually answered
 * and actually objected can change an outcome.
 *
 * Deliberately not here: whether a heading starts with a Latin word, and
 * whether examples sit in fenced code blocks. Those are exact rules, so they
 * belong in a regex, not in a judgment that costs a network call and can
 * disagree with itself.
 */
import { noul, score, TypeSafeClient } from "@typesafe-ai/sdk";

import {
  DEFAULT_GATE_SETTINGS,
  goodness,
  type CheckName,
  type GateMode,
  type GateSettings,
} from "@/lib/blog/agent/gate-settings";

export type GateOutcome =
  | "pass"
  /** The reviewer answered and objected. */
  | "hold"
  /** Switched off, or no key configured. */
  | "skipped"
  /** The reviewer could not be reached. Never blocks anything. */
  | "unavailable";

export type GateVerdict = {
  mode: GateMode;
  outcome: GateOutcome;
  /** Persian, written for the run log and the panel. */
  reasons: string[];
  scores: Partial<Record<CheckName, number>> | null;
  durationMs: number;
  inputTokens: number;
};

export type GateSubject = {
  /** The subject as it was queued, which is what the article owes. */
  queuedTopic: string;
  title: string;
  summary: string;
  metaDescription?: string;
  body: string;
  /** Judged before the image is drawn, so a bad brief costs nothing. */
  imagePrompt: string;
  existingPosts: { slug: string; title: string; summary: string | null }[];
};

/** The judgment behind each check name, built only for the enabled ones. */
function questionFor(name: CheckName) {
  switch (name) {
    case "coversTopic":
      return noul(
        "Does `article_body` actually teach the subject named in `queued_topic`?",
        {
          true: "The body explains that subject.",
          false: "The body is about a different subject.",
        }
      );
    case "duplicate":
      return noul(
        "Does this article cover substantially the same ground as one of `already_published_posts`?"
      );
    case "tuRuleViolated":
      return noul(
        "Does the article translate the Italian informal pronoun `tu` with the Persian formal «شما», " +
          "collapsing the formal/informal distinction a language lesson must preserve?"
      );
    case "coverMatches":
      return noul(
        "Would an image drawn from `cover_image_prompt` be specific to THIS article, " +
          "rather than a generic picture that would suit any article about any choice?"
      );
    case "depth":
      return score("How useful is this article to a Persian speaker learning Italian?", [
        "پر کردن صفحه بدون هیچ مثال مشخص",
        "درست ولی کم‌مایه، با مثال‌های اندک",
        "قاعدهٔ روشن به‌همراه جمله‌های نمونهٔ واقعی",
        "قاعده، مثال، و اشاره به اشتباهی که فارسی‌زبان‌ها می‌کنند",
      ]);
    case "seoQuality":
      return score(
        "Judge `article_title` and `meta_description` together as a search result: " +
          "would a Persian speaker searching this topic click it, and does it honestly describe `article_body`?",
        [
          "Vague or misleading; promises something the body does not deliver",
          "Accurate but flat; no reason to choose it over another result",
          "Accurate and clear about what the reader will learn",
          "Accurate, specific, and names the exact difficulty the reader has",
        ]
      );
    case "levelFit":
      // Judged against the subject's own demands, not against an absolute
      // beginner. The first version asked the flat question and punished an
      // article comparing exam certificates for being about exam
      // certificates: it scored 16, while a piece on food vocabulary scored
      // 51, and the difference was the topic the owner chose rather than
      // anything the writer did. What is worth catching is an article that is
      // harder than it needed to be.
      return score(
        "Given the subject `queued_topic` covers, is `article_body` as easy to follow as that subject allows? " +
          "An administrative or advanced subject is not penalised for being about one — judge only whether the " +
          "writing adds difficulty the subject did not require: unexplained terms, unglossed target-language " +
          "words, assumed knowledge it could have stated in a sentence.",
        [
          "Much harder than the subject required; assumes knowledge it never states",
          "Somewhat harder than it needed to be, with unexplained terms in places",
          "About as accessible as the subject allows",
          "Makes a demanding subject genuinely easy, explaining every term it uses",
        ]
      );
    case "grammarCorrect":
      return noul(
        "Are the Italian grammar claims and the Italian example sentences in `article_body` correct? " +
          "Judge the Italian itself, not the Persian explanation around it.",
        {
          true: "The Italian and the rules stated about it are correct.",
          false: "At least one rule or example sentence is wrong.",
        }
      );
    case "linksRelevant":
      return noul(
        "Where `article_body` links to another post in `already_published_posts`, " +
          "is the linked post actually relevant to the sentence it sits in?",
        {
          true: "Every link goes somewhere a reader of that sentence would want.",
          false: "At least one link is arbitrary, or there are no links to judge.",
        }
      );
  }
}

function reasonFor(name: CheckName): string {
  switch (name) {
    case "coversTopic":
      return "مقاله به موضوعی که در صف ثبت شده بود نپرداخته است.";
    case "duplicate":
      return "محتوا با یکی از مطالب منتشرشده هم‌پوشانی زیادی دارد.";
    case "tuRuleViolated":
      return "ضمیر «tu» به «شما» ترجمه شده و تمایز رسمی و غیررسمی از بین رفته.";
    case "coverMatches":
      return "طرح تصویر شاخص عمومی است و به این مقالهٔ مشخص ربطی ندارد.";
    case "depth":
      return "مطلب کم‌مایه است و مثال یا قاعدهٔ کافی ندارد.";
    case "seoQuality":
      return "عنوان یا توضیح متا ضعیف است و نتیجهٔ جست‌وجوی خوبی نمی‌سازد.";
    case "levelFit":
      return "متن سخت‌تر از آن چیزی است که موضوعش ایجاب می‌کند.";
    case "grammarCorrect":
      return "دست‌کم یکی از قاعده‌ها یا مثال‌های ایتالیایی اشتباه است.";
    case "linksRelevant":
      return "لینک‌های داخلی به مطلب بی‌ربط می‌روند.";
  }
}

/**
 * Whether a raw answer trips this check.
 *
 * One comparison for all nine, because `goodness` has already turned every
 * answer into "higher is better, out of a hundred".
 */
export function trips(name: CheckName, raw: number, threshold: number): boolean {
  return goodness(name, raw) < threshold;
}

/**
 * One request, every enabled judgment at once.
 *
 * They are asked together on purpose: none needs another's answer, they run in
 * parallel, and a single round trip is the difference between a reviewer that
 * costs a second and one that costs nine.
 */
export async function reviewArticle(
  subject: GateSubject,
  settings: GateSettings = DEFAULT_GATE_SETTINGS
): Promise<GateVerdict> {
  const started = Date.now();
  const apiKey = process.env.TYPESAFE_API_KEY?.trim();

  const idle = (outcome: GateOutcome, reasons: string[] = []): GateVerdict => ({
    mode: settings.mode,
    outcome,
    reasons,
    scores: null,
    durationMs: Date.now() - started,
    inputTokens: 0,
  });

  if (settings.mode === "off") return idle("skipped");
  if (!apiKey) return idle("skipped", ["کلید سرویس بازبینی تنظیم نشده است."]);

  const enabled = (Object.keys(settings.checks) as CheckName[]).filter(
    (name) => settings.checks[name].enabled
  );
  if (enabled.length === 0) return idle("skipped", ["هیچ بررسی‌ای روشن نیست."]);

  const client = new TypeSafeClient({
    apiKey,
    // A judge that hangs must not hold up a run that has already been paid
    // for. Ten seconds is generous next to the second a healthy call takes.
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
        meta_description: subject.metaDescription ?? subject.summary,
        article_body: subject.body,
        cover_image_prompt: subject.imagePrompt,
        already_published_posts: subject.existingPosts,
      },
      questions: Object.fromEntries(
        enabled.map((name) => [name, questionFor(name)])
      ),
    });
  } catch (error) {
    return idle("unavailable", [
      `سرویس بازبینی در دسترس نبود: ${error instanceof Error ? error.message : String(error)}`,
    ]);
  }

  const scores: Partial<Record<CheckName, number>> = {};
  const reasons: string[] = [];

  for (const name of enabled) {
    const answer = result.answers[name] as
      | { type: "noul"; noul: number }
      | { type: "score"; score: number }
      | undefined;
    if (!answer) continue;

    const value = answer.type === "noul" ? answer.noul : answer.score;
    scores[name] = value;

    if (trips(name, value, settings.checks[name].threshold)) {
      reasons.push(reasonFor(name));
    }
  }

  return {
    mode: settings.mode,
    outcome: reasons.length > 0 ? "hold" : "pass",
    reasons,
    scores,
    durationMs: Date.now() - started,
    inputTokens: result.usage.input_tokens,
  };
}

/**
 * Judges a queued subject before a word of it is written.
 *
 * The cheapest check there is: an article costs about 9,500 toman to produce
 * and this costs about two, so catching a subject already covered pays for
 * itself hundreds of times over. It answers one question only — everything
 * else needs an article that does not exist yet.
 */
export async function reviewTopic(
  queuedTopic: string,
  existingPosts: GateSubject["existingPosts"],
  settings: GateSettings = DEFAULT_GATE_SETTINGS
): Promise<{ alreadyCovered: number | null; reason: string | null }> {
  const apiKey = process.env.TYPESAFE_API_KEY?.trim();
  if (!settings.preflight || settings.mode === "off" || !apiKey) {
    return { alreadyCovered: null, reason: null };
  }

  try {
    const client = new TypeSafeClient({
      apiKey,
      timeout: 10_000,
      retry: { maxRetries: 1 },
    });

    const result = await client.systemOne({
      state: { queued_topic: queuedTopic, already_published_posts: existingPosts },
      questions: {
        alreadyCovered: noul(
          "Is `queued_topic` already covered by one of `already_published_posts`, " +
            "such that writing it again would mostly repeat an existing article?"
        ),
      },
    });

    const value = result.answers.alreadyCovered.noul;
    return {
      alreadyCovered: value,
      // Judged against the freshness threshold, through the same helper the
      // post-write checks use, so one setting governs both.
      reason: trips("duplicate", value, settings.checks.duplicate.threshold)
        ? "این موضوع پیش‌تر پوشش داده شده بود."
        : null,
    };
  } catch {
    // Unreachable means "write it", never "skip it". The agent's job does not
    // depend on this answer.
    return { alreadyCovered: null, reason: null };
  }
}

/**
 * Whether this verdict should stop the post going live.
 *
 * Only a reviewer that answered and objected. `unavailable` is deliberately
 * absent: see the note at the top of the file.
 */
export function holdsPublication(verdict: GateVerdict): boolean {
  if (verdict.mode === "off" || verdict.mode === "log") return false;
  return verdict.outcome === "hold";
}

/** Whether this verdict should fail the whole run. */
export function failsRun(verdict: GateVerdict): boolean {
  return verdict.mode === "hard" && holdsPublication(verdict);
}

/** A one-line summary for the run log's step list. */
export function describeVerdict(verdict: GateVerdict): string {
  if (!verdict.scores) return verdict.outcome;
  const pairs = Object.entries(verdict.scores)
    .map(([key, value]) => `${key}=${value.toFixed(2)}`)
    .join(" ");
  return pairs ? `${verdict.outcome} ${pairs}` : verdict.outcome;
}
