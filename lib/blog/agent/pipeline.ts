import {
  chatJSON,
  generateImage,
  type AiConnection,
  type TokenUsage,
} from "@/lib/ai/arvan";
import { costToman } from "@/lib/ai/pricing";
import {
  describeVerdict,
  failsRun,
  holdsPublication,
  reviewArticle,
} from "@/lib/blog/agent/gate";
import {
  loadAgentConfig,
  type ResolvedAgentConfig,
} from "@/lib/blog/agent/config";
import {
  coverImagePrompt,
  writerSystemPrompt,
  writerUserPrompt,
  type ExistingPost,
  type PromptOverrides,
} from "@/lib/blog/agent/prompts";
import {
  articleSchema,
  buildArticleJsonSchema,
  type Article,
} from "@/lib/blog/agent/schema";
import {
  claimNextTopic,
  claimTopicById,
  completeTopic,
  failTopic,
  finishRun,
  releaseStaleTopics,
  startRun,
  type AgentTopic,
  type RunStep,
} from "@/lib/blog/agent/store";
import {
  deriveSlug,
  publishArticle,
  resolveTaxonomies,
  stripLeadingHeading,
  uniqueSlug,
} from "@/lib/blog/agent/publish";
import { BLOG_LANGUAGES } from "@/lib/blog/languages";
import { revalidateBlog } from "@/lib/blog/revalidate";
import { getDataRepository } from "@/lib/data";

/**
 * One subject in, one post out — or nothing out, and the reason on record.
 *
 * The rule is the owner's: there is exactly one AI service, the one entered
 * in the admin panel, and when anything does not work the run stops. The
 * service not answering, a cover that will not generate or will not store,
 * the database refusing the post — each ends the run with nothing published
 * and the error written on the topic and in the run log. Nothing tries a
 * second service, and nothing goes out half-finished: a post that quietly
 * lost its cover is exactly the failure nobody notices for a week.
 *
 * What is still corrected in place are the model's small slips, because they
 * are not failures of anything: a stray `# Title` at the top of the body, a
 * category slug that is not one of ours, a link to a post that does not
 * exist. Each is fixed and noted on the run.
 *
 * Whether a stopped subject is tried again on a later tick is the panel's
 * "attempts" setting, not something decided here.
 */

/** How many published posts are shown to the writer for internal linking.
 * Two hundred titles and summaries is roughly ten thousand tokens — about
 * three toman on the cheap models, and far better link choices than a vector
 * search would make, because the model sees the whole map rather than five
 * nearest neighbours. Past this the prompt gets expensive and the answer gets
 * no better; that is when a retrieval step earns its place. */
const LINK_CONTEXT_LIMIT = 200;

export type RunOutcome =
  | { status: "idle" }
  | { status: "disabled" }
  | { status: "not-configured"; reason: string }
  | {
      status: "done";
      topicId: string;
      postId: string;
      slug: string;
      title: string;
      costToman: number;
      durationMs: number;
      notes: string[];
    }
  | { status: "failed"; topicId: string; error: string; durationMs: number };

/**
 * Loads the panel's settings, or says why it could not.
 *
 * A missing settings table — migration 012 not applied yet — is reported
 * rather than thrown. The cron caller gets a reason instead of a 500, and the
 * agent does not run on defaults nobody chose.
 */
async function loadConfigOrReason(): Promise<
  ResolvedAgentConfig | { reason: string }
> {
  try {
    return await loadAgentConfig();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[blog-agent] settings could not be read", { message });
    return { reason: `تنظیمات ایجنت خوانده نشد: ${message}` };
  }
}

/**
 * The cron entry point: sweep, take whatever is due, run it.
 *
 * Deliberately does one subject per call. A loop that drained the queue would
 * turn a mistake in the schedule — thirty rows all dated yesterday — into
 * thirty posts published in one afternoon, which is the single most reliable
 * way to get a site classed as scaled content abuse.
 */
export async function tick(): Promise<RunOutcome> {
  const config = await loadConfigOrReason();
  if ("reason" in config) {
    return { status: "not-configured", reason: config.reason };
  }

  // Before the switch, not after it. A run started by hand while the agent is
  // off can still be cut short by a restart, and its subject should not stay
  // stuck on "running" until somebody turns the schedule on.
  await releaseStaleTopics();

  // Both checked before anything is claimed. A switched-off agent that still
  // claimed its topic would spend an attempt on every tick it then ignored.
  if (!config.enabled) return { status: "disabled" };
  if (!config.connection) {
    return {
      status: "not-configured",
      reason: config.connectionProblem ?? "اتصال هوش مصنوعی تنظیم نشده است.",
    };
  }

  const topic = await claimNextTopic();
  if (!topic) return { status: "idle" };
  return runTopic(topic, config, config.connection);
}

/**
 * Runs one named subject immediately, whatever its schedule says.
 *
 * This is the panel's "run now", and how the model bake-off works: the same
 * subject, forced through with a different `writerModel`. It bypasses the
 * due check but not the claim, so it still cannot collide with a cron tick.
 * The panel passes `onlyPending`, so a click on a stale list cannot write a
 * subject the cron already finished; the bake-off leaves it off on purpose.
 *
 * It ignores the on/off switch on purpose. The switch governs the schedule;
 * a run started by hand is the owner saying "now".
 */
export async function runTopicNow(
  topicId: string,
  overrides?: { writerModel?: string; imageModel?: string },
  { onlyPending = false }: { onlyPending?: boolean } = {}
): Promise<RunOutcome> {
  const config = await loadConfigOrReason();
  if ("reason" in config) {
    return { status: "not-configured", reason: config.reason };
  }
  if (!config.connection) {
    return {
      status: "not-configured",
      reason: config.connectionProblem ?? "اتصال هوش مصنوعی تنظیم نشده است.",
    };
  }

  const topic = await claimTopicById(topicId, { onlyPending });
  if (!topic) return { status: "idle" };
  return runTopic(
    {
      ...topic,
      writerModel: overrides?.writerModel ?? topic.writerModel,
      imageModel: overrides?.imageModel ?? topic.imageModel,
    },
    config,
    config.connection
  );
}

async function runTopic(
  topic: AgentTopic,
  config: ResolvedAgentConfig,
  connection: AiConnection
): Promise<RunOutcome> {
  const writerModel = topic.writerModel || config.writerModel;
  // Null when the panel switched covers off.
  const imageModel = topic.imageModel || config.imageModel;

  const startedAt = Date.now();
  const steps: RunStep[] = [];
  const notes: string[] = [];

  const runId = await startRun({
    topicId: topic.id,
    writerModel,
    imageModel,
  });

  let writerUsage: TokenUsage = { promptTokens: 0, completionTokens: 0 };
  // Filled in by `makeCover` as soon as the image model has charged, and read
  // by `spent()` — so a cover that fails after the picture was drawn still
  // shows what it cost.
  const imageUsage: TokenUsage = { promptTokens: 0, completionTokens: 0 };

  const spent = () =>
    costToman(writerModel, writerUsage) +
    (imageModel ? costToman(imageModel, imageUsage) : 0);

  try {
    // ---------------------------------------------------------------- write
    const context = await loadContext();
    const writeStarted = Date.now();

    const completion = await chatJSON<unknown>({
      model: writerModel,
      system: writerSystemPrompt(config.prompts),
      user: writerUserPrompt({
        topic: topic.topic,
        notes: topic.notes,
        categories: context.categories,
        languages: BLOG_LANGUAGES,
        existingPosts: context.existingPosts,
        categoryHint: topic.categorySlug,
        languageHint: topic.languageSlug,
        overrides: config.prompts,
      }),
      schemaName: "laparli_blog_article",
      schema: buildArticleJsonSchema(
        context.categories.map((category) => category.slug),
        BLOG_LANGUAGES.map((language) => language.slug)
      ),
      connection,
    });

    writerUsage = completion.usage;
    steps.push({
      name: "write",
      model: writerModel,
      promptTokens: writerUsage.promptTokens,
      completionTokens: writerUsage.completionTokens,
      durationMs: Date.now() - writeStarted,
    });

    const parsed = articleSchema.safeParse(completion.data);
    if (!parsed.success) {
      throw new Error(
        `مدل خروجی نامعتبر داد: ${parsed.error.issues
          .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
          .join("; ")}`
      );
    }

    const article = normalise(parsed.data, context, notes);
    const slug = await uniqueSlug(article.slug, notes);

    // ----------------------------------------------------------------- gate
    // Before the cover, not after it. The image is about half what a run
    // costs, and an article that is not going out does not need one drawn.
    const gateStarted = Date.now();
    const verdict = await reviewArticle({
      queuedTopic: topic.topic,
      title: article.title,
      summary: article.summary,
      body: article.content,
      imagePrompt: article.imagePrompt,
      existingPosts: context.existingPosts,
    });
    steps.push({
      name: "gate",
      durationMs: Date.now() - gateStarted,
      promptTokens: verdict.inputTokens,
      note: describeVerdict(verdict),
    });
    for (const reason of verdict.reasons) notes.push(reason);

    if (failsRun(verdict)) {
      throw new Error(`بازبینی مقاله را رد کرد: ${verdict.reasons.join(" ")}`);
    }

    const heldBack = holdsPublication(verdict);
    if (heldBack) {
      notes.push("مقاله به‌جای انتشار، پیش‌نویس ماند تا خودتان ببینید.");
    }

    // ---------------------------------------------------------------- cover
    let coverUrl: string | null = null;
    if (imageModel) {
      const coverStarted = Date.now();
      try {
        coverUrl = await makeCover({
          article,
          imageModel,
          connection,
          prompts: config.prompts,
          authorProfileId: config.authorProfileId,
          usage: imageUsage,
        });
      } finally {
        // Recorded whether or not the cover worked, so the steps of a failed
        // run show where it stopped.
        steps.push({
          name: "cover",
          model: imageModel,
          promptTokens: imageUsage.promptTokens,
          completionTokens: imageUsage.completionTokens,
          durationMs: Date.now() - coverStarted,
        });
      }
    } else {
      notes.push("ساخت تصویر شاخص در تنظیمات خاموش است.");
    }

    // -------------------------------------------------------------- publish
    const postId = await publishArticle({
      article,
      slug,
      coverUrl,
      status: config.autoPublish && !heldBack ? "published" : "draft",
      noindex: config.noindex,
      authorId: config.authorProfileId,
    });

    await completeTopic(topic.id, postId);

    const durationMs = Date.now() - startedAt;
    const cost = spent();

    await finishRun({
      runId,
      postId,
      promptTokens: writerUsage.promptTokens,
      completionTokens: writerUsage.completionTokens,
      imagePromptTokens: imageUsage.promptTokens,
      imageCompletionTokens: imageUsage.completionTokens,
      costToman: cost,
      durationMs,
      status: "done",
      steps,
    });

    revalidateBlog(slug, article.categorySlugs, article.languageSlugs);

    return {
      status: "done",
      topicId: topic.id,
      postId,
      slug,
      title: article.title,
      costToman: cost,
      durationMs,
      notes,
    };
  } catch (error) {
    const message = messageOf(error);
    const durationMs = Date.now() - startedAt;

    // Logged before anything else is attempted. The two calls below both talk
    // to the database, and the database is exactly what fails when the run is
    // launched from outside ArvanCloud's network — so a log line written after
    // them is a log line that never appears, and the original error dies
    // inside a connection timeout that says nothing about it.
    console.error("[blog-agent] run failed", { topicId: topic.id, message });

    // The tokens already spent are recorded even though nothing was
    // published. A failed run that cost money and says it cost nothing makes
    // the month's total a lie.
    await finishRun({
      runId,
      postId: null,
      promptTokens: writerUsage.promptTokens,
      completionTokens: writerUsage.completionTokens,
      imagePromptTokens: imageUsage.promptTokens,
      imageCompletionTokens: imageUsage.completionTokens,
      costToman: spent(),
      durationMs,
      status: "failed",
      error: message,
      steps,
    });

    await failTopic(topic.id, message, config.maxAttempts);

    return { status: "failed", topicId: topic.id, error: message, durationMs };
  }
}

// ---------------------------------------------------------------------------

function messageOf(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function loadContext() {
  const repo = getDataRepository();
  const [categories, listing] = await Promise.all([
    repo.getBlogCategories(),
    repo.getPublishedBlogPosts({ limit: LINK_CONTEXT_LIMIT, offset: 0 }),
  ]);

  const existingPosts: ExistingPost[] = listing.posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    summary: post.summary ?? post.excerpt,
  }));

  return { categories, existingPosts };
}

/**
 * Fixes what the model got wrong before any of it reaches the database.
 *
 * None of these throw. Each is a thing a model does a few times in a hundred
 * and that is cheaper to correct than to re-request: a stray `# Title` at the
 * top of the body, a category slug that is not one of ours, a link to a post
 * that does not exist.
 */
function normalise(
  article: Article,
  context: { categories: { slug: string }[]; existingPosts: ExistingPost[] },
  notes: string[]
): Article {
  const taxonomies = resolveTaxonomies(
    article.categorySlugs,
    article.languageSlugs,
    context,
    notes
  );

  let content = stripLeadingHeading(article.content);

  const slugs = new Set(context.existingPosts.map((post) => post.slug));
  const dropped: string[] = [];
  content = content.replace(
    /\[([^\]]+)\]\(\/blog\/([^)\s]+)\)/g,
    (match, anchor: string, target: string) => {
      if (slugs.has(decodeURIComponent(target))) return match;
      dropped.push(target);
      // Keep the sentence, lose the link. Deleting the anchor text would
      // leave a hole in a sentence that was written around it.
      return anchor;
    }
  );
  if (dropped.length > 0) {
    notes.push(`${dropped.length} لینک داخلی به مطلب ناموجود حذف شد.`);
  }

  return {
    ...article,
    content,
    categorySlugs: taxonomies.categorySlugs,
    languageSlugs: taxonomies.languageSlugs,
    slug: deriveSlug(article.slug, article.title),
  };
}

/**
 * Draws the cover and puts it in the blog's own image store, or throws.
 *
 * A failure here stops the run like a failure anywhere else. Tokens the image
 * model charged are written into `usage` the moment they are known, so a
 * cover that was drawn and then refused by the store still shows its cost.
 */
async function makeCover({
  article,
  imageModel,
  connection,
  prompts,
  authorProfileId,
  usage,
}: {
  article: Article;
  imageModel: string;
  connection: AiConnection;
  prompts: PromptOverrides;
  authorProfileId: string | null;
  usage: TokenUsage;
}): Promise<string> {
  const image = await generateImage({
    model: imageModel,
    prompt: coverImagePrompt(
      article.imagePrompt,
      article.imageMode,
      article.imageWords,
      prompts
    ),
    connection,
  }).catch((error: unknown) => {
    throw new Error(`ساخت تصویر شاخص ناموفق بود: ${messageOf(error)}`);
  });

  usage.promptTokens = image.usage.promptTokens;
  usage.completionTokens = image.usage.completionTokens;

  // `lib/data/blog-image.ts` refuses anything over four megabytes. Checking
  // here names the real reason instead of the generic upload error.
  if (image.bytes.byteLength > 4 * 1024 * 1024) {
    throw new Error(
      `تصویر شاخص ${Math.round(image.bytes.byteLength / 1024)} کیلوبایت بود و از سقف ۴ مگابایت گذشت.`
    );
  }

  const extension = image.contentType.split("/")[1] ?? "png";
  const file = new File(
    [new Uint8Array(image.bytes)],
    `cover-${Date.now()}.${extension}`,
    { type: image.contentType }
  );

  const uploaded = await getDataRepository().uploadBlogImage(
    file,
    article.coverImageAlt,
    authorProfileId
  );

  if (uploaded.error || !uploaded.image) {
    throw new Error(
      `ذخیره‌ی تصویر شاخص ناموفق بود: ${uploaded.error ?? "unknown"}`
    );
  }

  return uploaded.image.url;
}
