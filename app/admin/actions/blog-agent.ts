"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { normalizeBaseUrl, pingModel, type PingResult } from "@/lib/ai/arvan";
import { requireAdminPermission } from "@/lib/auth/action-guards";
import { loadAgentConfig } from "@/lib/blog/agent/config";
import {
  reviewArticle,
  type GateVerdict,
} from "@/lib/blog/agent/gate";
import { parseGateSettings } from "@/lib/blog/agent/gate-settings";
import {
  readGateSettings,
  writeGateSettings,
} from "@/lib/blog/agent/gate-settings-store";
import { runTopicNow } from "@/lib/blog/agent/pipeline";
import {
  DEFAULT_PROMPT_SECTIONS,
  PROMPT_SECTION_KEYS,
  type PromptSectionKey,
} from "@/lib/blog/agent/prompts";
import {
  tehranCalendarDay,
  tehranTimeToInstant,
} from "@/lib/blog/agent/schedule";
import { encryptSecret } from "@/lib/blog/agent/secret";
import {
  readAgentSettingsRow,
  saveAgentConnection,
  saveAgentPrompt,
  saveAgentSwitches,
  type ApiKeyChange,
} from "@/lib/blog/agent/settings";
import {
  deleteTopic,
  insertTopics,
  latestQueuedSlot,
  retryTopic,
  setTopicSkipped,
  updateTopic,
} from "@/lib/blog/agent/store";
import { getBlogLanguage } from "@/lib/blog/languages";

/**
 * Everything the blog agent's admin panel can change.
 *
 * The whole agent is a super-admin surface (`fullAccess`), by the owner's
 * decision: it spends money on the owner's AI account and can publish to the
 * public blog with nobody reading the post first. Writers keep the blog
 * editor; the machine that writes on its own stays with the super admin.
 */

const PANEL_PATH = "/admin/blog/agent";
const DAY_MS = 86_400_000;
const TOPIC_MAX_LENGTH = 500;

/** Said whenever a saved key would otherwise be used against a new address. */
const KEY_TIED_TO_ADDRESS =
  "آدرس سرویس عوض شده است. کلید ذخیره‌شده فقط با آدرس قبلی به کار می‌رود؛ کلید سرویس جدید را هم وارد کنید.";

export type AgentActionResult<T extends object = object> =
  | { error: string; detail?: string }
  | ({ success: true } & T);

export type TopicInput = {
  topic: string;
  notes: string;
  categorySlug: string;
  languageSlug: string;
  /** `YYYY-MM-DD`, read as a Tehran calendar day. */
  date: string;
  /** `HH:MM`, Tehran. */
  time: string;
};

export type BulkTopicsInput = {
  lines: string;
  /** Empty: continue after the last queued subject. */
  startDate: string;
  time: string;
};

export type SwitchesInput = {
  enabled: boolean;
  autoPublish: boolean;
  maxAttempts: number;
};

export type ConnectionInput = {
  baseUrl: string;
  /** Write-only. Empty keeps whatever key is stored. */
  apiKey: string;
  clearApiKey: boolean;
  writerModel: string;
  /** Empty switches covers off. */
  imageModel: string;
};

/**
 * Runs one action behind the super-admin check, and turns an unexpected
 * failure — in practice, the database — into a message rather than a crashed
 * page. The real error goes to the container log.
 */
async function asSuperAdmin<R extends AgentActionResult>(
  label: string,
  work: (profileId: string) => Promise<R>
): Promise<R | { error: string }> {
  const guard = await requireAdminPermission("fullAccess");
  if (!guard.ok) return { error: "دسترسی ندارید." };

  try {
    return await work(guard.profile.id);
  } catch (error) {
    console.error(`[admin/blog-agent] ${label} failed`, error);
    return {
      error: "انجام نشد. دوباره تلاش کنید؛ اگر تکرار شد، لاگ سرور را ببینید.",
    };
  }
}

function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "ورودی نامعتبر است.";
}

// -------------------------------------------------------------------- queue

const dateField = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "تاریخ را انتخاب کنید.");
const timeField = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "ساعت نامعتبر است.");

const topicFields = z.object({
  topic: z
    .string()
    .trim()
    .min(5, "موضوع حداقل ۵ حرف باشد.")
    .max(TOPIC_MAX_LENGTH, "موضوع حداکثر ۵۰۰ حرف باشد."),
  notes: z.string().trim().max(2000, "توضیحات حداکثر ۲٬۰۰۰ حرف باشد."),
  categorySlug: z.string().trim(),
  languageSlug: z.string().trim(),
  date: dateField,
  time: timeField,
});

function toInstant(date: string, time: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return tehranTimeToInstant(year, month, day, hour, minute);
}

function topicRow(input: z.infer<typeof topicFields>) {
  return {
    topic: input.topic,
    notes: input.notes || null,
    categorySlug: input.categorySlug || null,
    // An unknown language is dropped rather than stored; the pipeline would
    // ignore it anyway, and the panel would show a slug nobody can read.
    languageSlug: getBlogLanguage(input.languageSlug) ? input.languageSlug : null,
    scheduledFor: toInstant(input.date, input.time),
  };
}

export async function addTopicAction(
  input: TopicInput
): Promise<AgentActionResult> {
  return asSuperAdmin("add topic", async () => {
    const parsed = topicFields.safeParse(input);
    if (!parsed.success) return { error: firstIssue(parsed.error) };

    await insertTopics([topicRow(parsed.data)]);
    revalidatePath(PANEL_PATH);
    return { success: true };
  });
}

const bulkFields = z.object({
  lines: z.string(),
  startDate: z.union([dateField, z.literal("")]),
  time: timeField,
});

export async function bulkAddTopicsAction(
  input: BulkTopicsInput
): Promise<AgentActionResult<{ count: number; firstSlot: string }>> {
  return asSuperAdmin("bulk add topics", async () => {
    const parsed = bulkFields.safeParse(input);
    if (!parsed.success) return { error: firstIssue(parsed.error) };

    const topics = parsed.data.lines
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && !line.startsWith("#"));

    if (topics.length === 0) {
      return { error: "هیچ موضوعی وارد نشده؛ هر موضوع را در یک خط بنویسید." };
    }
    if (topics.length > 100) {
      return { error: "در هر بار حداکثر ۱۰۰ موضوع می‌شود اضافه کرد." };
    }
    const tooShort = topics.find((topic) => topic.length < 5);
    if (tooShort) {
      return { error: `این خط برای یک موضوع خیلی کوتاه است: «${tooShort}»` };
    }
    // The same ceiling as a single subject, so a paragraph pasted by mistake
    // is caught here rather than written up as an article.
    const tooLong = topics.find((topic) => topic.length > TOPIC_MAX_LENGTH);
    if (tooLong) {
      return {
        error: `این خط از ۵۰۰ حرف بلندتر است: «${tooLong.slice(0, 60)}…»`,
      };
    }

    const [hour, minute] = parsed.data.time.split(":").map(Number);
    const start = parsed.data.startDate
      ? (() => {
          const [year, month, day] = parsed.data.startDate.split("-").map(Number);
          return { year, month, day };
        })()
      : await nextFreeDay();

    const rows = topics.map((topic, index) => ({
      topic,
      // `Date.UTC` rolls day 32 into the next month, so adding the index to
      // the day is enough to walk the calendar.
      scheduledFor: tehranTimeToInstant(
        start.year,
        start.month,
        start.day + index,
        hour,
        minute
      ),
    }));

    await insertTopics(rows);
    revalidatePath(PANEL_PATH);
    return {
      success: true,
      count: rows.length,
      firstSlot: rows[0].scheduledFor.toISOString(),
    };
  });
}

/**
 * Tomorrow, or the day after the last subject already waiting — whichever is
 * later. A second list pasted next week continues the calendar instead of
 * doubling up on days that are already taken.
 */
async function nextFreeDay() {
  const tomorrow = tehranCalendarDay(new Date(Date.now() + DAY_MS));
  const latest = await latestQueuedSlot();
  if (!latest) return tomorrow;

  const afterLatest = tehranCalendarDay(new Date(latest.getTime() + DAY_MS));
  const value = (d: { year: number; month: number; day: number }) =>
    d.year * 10_000 + d.month * 100 + d.day;
  return value(afterLatest) > value(tomorrow) ? afterLatest : tomorrow;
}

export async function updateTopicAction(
  input: TopicInput & { id: string }
): Promise<AgentActionResult> {
  return asSuperAdmin("update topic", async () => {
    const parsed = topicFields.extend({ id: z.string().uuid() }).safeParse(input);
    if (!parsed.success) return { error: firstIssue(parsed.error) };

    const updated = await updateTopic(parsed.data.id, topicRow(parsed.data));
    if (!updated) {
      return {
        error: "این موضوع در حال اجرا یا انجام‌شده است و دیگر ویرایش نمی‌شود.",
      };
    }
    revalidatePath(PANEL_PATH);
    return { success: true };
  });
}

const idField = z.string().uuid();

export async function deleteTopicAction(id: string): Promise<AgentActionResult> {
  return asSuperAdmin("delete topic", async () => {
    if (!idField.safeParse(id).success) return { error: "موضوع پیدا نشد." };

    const deleted = await deleteTopic(id);
    if (!deleted) return { error: "این موضوع در حال اجراست و حذف نمی‌شود." };
    revalidatePath(PANEL_PATH);
    return { success: true };
  });
}

export async function skipTopicAction(
  id: string,
  skipped: boolean
): Promise<AgentActionResult> {
  return asSuperAdmin("skip topic", async () => {
    if (!idField.safeParse(id).success) return { error: "موضوع پیدا نشد." };

    const changed = await setTopicSkipped(id, skipped);
    if (!changed) return { error: "وضعیت این موضوع عوض شده است؛ صفحه را تازه کنید." };
    revalidatePath(PANEL_PATH);
    return { success: true };
  });
}

export async function retryTopicAction(id: string): Promise<AgentActionResult> {
  return asSuperAdmin("retry topic", async () => {
    if (!idField.safeParse(id).success) return { error: "موضوع پیدا نشد." };

    const changed = await retryTopic(id);
    if (!changed) return { error: "فقط موضوع ناموفق دوباره به صف برمی‌گردد." };
    revalidatePath(PANEL_PATH);
    return { success: true };
  });
}

/**
 * Writes one subject right now and waits for it — one to three minutes.
 * The page that calls this sets `maxDuration`, and the pipeline records the
 * run either way, so a browser that gives up early loses the message, not
 * the post.
 *
 * Only a subject still waiting in the queue is taken. The button sits on a
 * list that may be minutes old, and a subject the cron has finished since
 * must not be written a second time.
 */
export async function runTopicNowAction(
  id: string
): Promise<AgentActionResult<{ message: string }>> {
  return asSuperAdmin("run topic now", async () => {
    if (!idField.safeParse(id).success) return { error: "موضوع پیدا نشد." };

    const outcome = await runTopicNow(id, undefined, { onlyPending: true });
    revalidatePath(PANEL_PATH);

    switch (outcome.status) {
      case "done":
        return { success: true, message: `«${outcome.title}» نوشته شد.` };
      case "failed":
        return { error: "اجرا ناموفق بود و متوقف شد.", detail: outcome.error };
      case "not-configured":
        return { error: outcome.reason };
      default:
        return {
          error:
            "این موضوع دیگر در صف نیست؛ شاید همین حالا نوشته شده باشد. صفحه را تازه کنید.",
        };
    }
  });
}

// ----------------------------------------------------------------- settings

const switchFields = z.object({
  enabled: z.boolean(),
  autoPublish: z.boolean(),
  maxAttempts: z
    .number()
    .int("تعداد تلاش باید عدد صحیح باشد.")
    .min(1, "تعداد تلاش حداقل ۱ است.")
    .max(10, "تعداد تلاش حداکثر ۱۰ است."),
});

export async function saveSwitchesAction(
  input: SwitchesInput
): Promise<AgentActionResult> {
  return asSuperAdmin("save switches", async (profileId) => {
    const parsed = switchFields.safeParse(input);
    if (!parsed.success) return { error: firstIssue(parsed.error) };

    await saveAgentSwitches(parsed.data, profileId);
    revalidatePath(PANEL_PATH);
    return { success: true };
  });
}

/**
 * The Arvan panel shows a machine user's key as `apikey <uuid>`, and the
 * owner pastes what the panel shows. The gateway wants the bare key after
 * `Bearer`, so the word is dropped here — `Bearer apikey <uuid>` is a 401.
 */
function normaliseApiKey(value: string): string {
  return value.trim().replace(/^(apikey|bearer)\s+/i, "").trim();
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

const connectionFields = z.object({
  baseUrl: z
    .string()
    .trim()
    .refine(isHttpUrl, "آدرس سرویس معتبر نیست. آدرس کامل را از پنل سرویس کپی کنید."),
  apiKey: z
    .string()
    .max(500, "کلید بیش از حد بلند است.")
    .transform(normaliseApiKey),
  clearApiKey: z.boolean(),
  writerModel: z
    .string()
    .trim()
    .min(1, "نام مدل نویسنده را وارد کنید.")
    .max(120, "نام مدل بیش از حد بلند است."),
  imageModel: z.string().trim().max(120, "نام مدل بیش از حد بلند است."),
});

export async function saveConnectionAction(
  input: ConnectionInput
): Promise<AgentActionResult> {
  return asSuperAdmin("save connection", async (profileId) => {
    const parsed = connectionFields.safeParse(input);
    if (!parsed.success) return { error: firstIssue(parsed.error) };

    const baseUrl = normalizeBaseUrl(parsed.data.baseUrl);
    let key: ApiKeyChange = parsed.data.clearApiKey
      ? { mode: "clear" }
      : { mode: "keep" };

    if (parsed.data.apiKey) {
      if (parsed.data.apiKey.length < 8) {
        return { error: "کلید کوتاه‌تر از حد معمول است؛ دوباره کپی‌اش کنید." };
      }
      key = {
        mode: "set",
        ciphertext: encryptSecret(parsed.data.apiKey),
        hint: parsed.data.apiKey.slice(-4),
      };
    } else if (key.mode === "keep") {
      // A saved key stays tied to the address it was saved with. Otherwise
      // the key this form never shows would still be one save away from being
      // sent anywhere: change the address to a server of your own, keep the
      // key, and the next run hands it over.
      const stored = await readAgentSettingsRow();
      if (
        stored.apiKeyCiphertext &&
        normalizeBaseUrl(stored.apiBaseUrl ?? "") !== baseUrl
      ) {
        return { error: KEY_TIED_TO_ADDRESS };
      }
    }

    await saveAgentConnection(
      {
        baseUrl,
        writerModel: parsed.data.writerModel,
        imageModel: parsed.data.imageModel,
        key,
      },
      profileId
    );
    revalidatePath(PANEL_PATH);
    return { success: true };
  });
}

/**
 * Tries the connection as it stands in the form, before it is saved. An
 * empty key field tests with the stored key — but only against the address
 * that key was saved with, for the same reason `saveConnectionAction` refuses
 * to move it.
 */
export async function testConnectionAction(
  input: Pick<ConnectionInput, "baseUrl" | "apiKey" | "writerModel">
): Promise<AgentActionResult<{ message: string }>> {
  return asSuperAdmin("test connection", async () => {
    const baseUrl = normalizeBaseUrl(input.baseUrl);
    if (!isHttpUrl(baseUrl)) {
      return { error: "آدرس سرویس معتبر نیست. آدرس کامل را از پنل سرویس کپی کنید." };
    }

    const model = input.writerModel.trim();
    if (!model) return { error: "نام مدل نویسنده را وارد کنید." };

    let apiKey = normaliseApiKey(input.apiKey);
    if (!apiKey) {
      const saved = await loadAgentConfig().catch(() => null);
      const stored = saved?.connection;
      if (!stored) {
        return { error: "کلیدی برای تست وجود ندارد؛ اول کلید را وارد کنید." };
      }
      if (normalizeBaseUrl(stored.baseUrl) !== baseUrl) {
        return { error: KEY_TIED_TO_ADDRESS };
      }
      apiKey = stored.apiKey;
    }

    const result = await pingModel({ model, connection: { baseUrl, apiKey } });
    if (result.ok) {
      const seconds = (result.ms / 1000).toLocaleString("fa-IR", {
        maximumFractionDigits: 1,
      });
      return { success: true, message: `وصل شد؛ مدل در ${seconds} ثانیه جواب داد.` };
    }
    return describePingFailure(result);
  });
}

function describePingFailure(
  result: Extract<PingResult, { ok: false }>
): { error: string; detail?: string } {
  const status = result.status;
  const detail = result.error.startsWith("<") ? undefined : result.error;

  if (status === 401 || status === 403) {
    return { error: "کلید پذیرفته نشد. کلید را دوباره از پنل سرویس کپی کنید.", detail };
  }
  if (status === 404) {
    return { error: "آدرس سرویس یا نام مدل پیدا نشد.", detail };
  }
  if (status === 400 || status === 422) {
    return { error: "سرویس درخواست را رد کرد؛ نام مدل را بررسی کنید.", detail };
  }
  if (status === 402 || status === 429) {
    return {
      error: "سرویس درخواست را نپذیرفت؛ اعتبار حساب یا سقف درخواست را بررسی کنید.",
      detail,
    };
  }
  if (status && status >= 500) {
    return {
      error: `سرویس در دسترس نیست (خطای ${status.toLocaleString("fa-IR")}). کمی بعد دوباره امتحان کنید.`,
      detail,
    };
  }
  return { error: "اتصال برقرار نشد.", detail: result.error };
}

// ------------------------------------------------------------------- prompt

const promptFields = z.object({
  section: z.enum(PROMPT_SECTION_KEYS),
  text: z.string().max(20_000, "متن بیش از حد بلند است."),
});

export async function savePromptAction(input: {
  section: PromptSectionKey;
  text: string;
}): Promise<AgentActionResult> {
  return asSuperAdmin("save prompt", async (profileId) => {
    const parsed = promptFields.safeParse(input);
    if (!parsed.success) return { error: firstIssue(parsed.error) };

    const text = parsed.data.text.trim();
    if (text.length < 20) {
      return {
        error: "این بخش نمی‌تواند خالی بماند. برای برگشت به متن اصلی، «برگشت به پیش‌فرض» را بزنید.",
      };
    }

    // Saving the default word for word stores nothing, so a later fix to the
    // default still reaches this section.
    const isDefault = text === DEFAULT_PROMPT_SECTIONS[parsed.data.section].trim();
    await saveAgentPrompt(parsed.data.section, isDefault ? null : text, profileId);
    revalidatePath(PANEL_PATH);
    return { success: true };
  });
}

export async function resetPromptAction(
  section: PromptSectionKey
): Promise<AgentActionResult> {
  return asSuperAdmin("reset prompt", async (profileId) => {
    const parsed = promptFields.shape.section.safeParse(section);
    if (!parsed.success) return { error: "بخش نامعتبر است." };

    await saveAgentPrompt(parsed.data, null, profileId);
    revalidatePath(PANEL_PATH);
    return { success: true };
  });
}

// ---------------------------------------------------------------------------
// The reviewer
// ---------------------------------------------------------------------------

const gateFields = z.object({
  // Carried through deliberately. zod drops anything the schema does not name,
  // and without the marker `parseGateSettings` would take the payload for a
  // pre-0-100 row and rescale numbers that are already on the new scale.
  scale: z.literal(100),
  mode: z.enum(["off", "log", "soft", "hard"]),
  preflight: z.boolean(),
  checks: z.record(
    z.string(),
    z.object({ enabled: z.boolean(), threshold: z.number().min(0).max(100) })
  ),
});

export async function saveGateSettingsAction(
  input: unknown
): Promise<AgentActionResult> {
  return asSuperAdmin("save reviewer settings", async (profileId) => {
    const parsed = gateFields.safeParse(input);
    if (!parsed.success) return { error: firstIssue(parsed.error) };

    // Parsed again on the way in: zod proved the shape, `parseGateSettings`
    // proves every threshold is inside its own check's range and drops names
    // this build does not know.
    await writeGateSettings(parseGateSettings(parsed.data), profileId);
    revalidatePath(PANEL_PATH);
    return { success: true };
  });
}

/**
 * Runs the reviewer over text the owner pasted in, against no article and no
 * queue.
 *
 * Nothing is stored and nothing is published — it exists so the owner can put
 * a draft, a competitor's post, or a paragraph they are unsure about in front
 * of the same judgments the agent's output gets, and see the numbers.
 */
export async function reviewTextAction(input: {
  topic: string;
  title: string;
  body: string;
}): Promise<AgentActionResult & { verdict?: GateVerdict }> {
  return asSuperAdmin("review text", async () => {
    const text = input.body?.trim();
    if (!text) return { error: "متنی برای بررسی وارد نشده است." };

    const settings = await readGateSettings();
    const verdict = await reviewArticle(
      {
        queuedTopic: input.topic?.trim() || input.title?.trim() || "—",
        title: input.title?.trim() || "—",
        summary: text.slice(0, 200),
        body: text,
        // The manual box has no cover and no queue to compare against, so the
        // two checks that need them are told so plainly rather than being
        // handed an empty string to guess at.
        imagePrompt: "(no cover was produced for this text)",
        existingPosts: [],
      },
      settings
    );

    return { success: true, verdict };
  });
}
