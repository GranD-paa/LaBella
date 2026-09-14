import { DEFAULT_AI_BASE_URL, type AiConnection } from "@/lib/ai/arvan";
import type { PromptOverrides } from "@/lib/blog/agent/prompts";
import { decryptSecret } from "@/lib/blog/agent/secret";
import { readAgentSettingsRow } from "@/lib/blog/agent/settings";

/**
 * Every knob the blog agent has, read in one place.
 *
 * Two layers. Environment variables are the deployment facts — which profile
 * owns ingested posts, whether pages go out with `noindex`, which models the
 * panel suggests before anyone has saved it. The admin panel's row in
 * `blog_agent_settings` holds everything the owner decides: on/off, publish
 * or draft, retries, the AI service and its key, the prompt. Those change
 * without a deploy.
 *
 * The key does not layer. It comes from the panel or from nowhere: the owner
 * asked for one service, the one they enter, and a key kept on the server in
 * reserve would be a second service in disguise — one that carries on
 * spending after the panel's key was removed. Local scripts that call
 * `lib/ai/arvan.ts` directly still read `ARVAN_AI_API_KEY`; the agent does not.
 */

export type AgentConfig = {
  writerModel: string;
  imageModel: string;
  authorProfileId: string | null;
  /** True publishes with `noindex` set — the setting the model bake-off runs
   * under, so real pages can be compared without any of them being indexed. */
  noindex: boolean;
};

function flag(name: string, fallback: boolean): boolean {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  return raw.toLowerCase() === "true" || raw === "1";
}

/** The environment layer on its own. The ingest endpoint reads only this. */
export function getAgentConfig(): AgentConfig {
  return {
    // GPT-5.6-Luna, because on this gateway it is the only model that clears
    // both bars at once. GLM-5.3 and GPT-5.6-Terra ran past the gateway's
    // six-minute ceiling. The Gemini and Claude models answered in seconds
    // but ignore `response_format` behind this gateway: they invented their
    // own field names (`body`, `category`, `imageType`), left out the meta
    // fields, and wrote a third of the article — so every run would fail
    // validation. The per-topic override still exists for trying another
    // model on one subject without touching this.
    writerModel: process.env.AGENT_WRITER_MODEL || "GPT-5.6-Luna",

    // The Pro image tier, not the Flash one. Its output tokens cost a fifth
    // of Flash's on this gateway, which is backwards from every other
    // Pro/Flash pair and worth stating out loud so nobody "optimises" it.
    imageModel: process.env.AGENT_IMAGE_MODEL || "Gemini-3-Pro-Image-Preview",

    authorProfileId: process.env.AGENT_AUTHOR_PROFILE_ID || null,
    noindex: flag("AGENT_NOINDEX", false),
  };
}

/**
 * Where the agent's key stands.
 *
 * - `panel`      saved in the panel and readable
 * - `unreadable` saved in the panel, but sealed under a different server
 *                secret — the owner has to enter it again
 * - `missing`    nothing saved; the agent does not run
 */
export type ApiKeyState = "panel" | "unreadable" | "missing";

/** What the panel shows. Effective values, and never the key itself. */
export type AgentPanelSettings = {
  enabled: boolean;
  autoPublish: boolean;
  maxAttempts: number;
  apiBaseUrl: string;
  apiKeyState: ApiKeyState;
  apiKeyHint: string | null;
  writerModel: string;
  /** Empty string: covers switched off. */
  imageModel: string;
  promptOverrides: PromptOverrides;
  updatedAt: string | null;
};

/** What a run uses. */
export type ResolvedAgentConfig = {
  enabled: boolean;
  autoPublish: boolean;
  noindex: boolean;
  maxAttempts: number;
  authorProfileId: string | null;
  writerModel: string;
  /** Null: no cover for this run. */
  imageModel: string | null;
  /** Null when there is no usable key; `connectionProblem` says why. */
  connection: AiConnection | null;
  connectionProblem: string | null;
  prompts: PromptOverrides;
};

async function resolveLayers() {
  const env = getAgentConfig();
  const row = await readAgentSettingsRow();

  const apiKey = row.apiKeyCiphertext ? decryptSecret(row.apiKeyCiphertext) : null;
  const apiKeyState: ApiKeyState = !row.apiKeyCiphertext
    ? "missing"
    : apiKey
      ? "panel"
      : "unreadable";

  const panel: AgentPanelSettings = {
    enabled: row.enabled,
    autoPublish: row.autoPublish,
    maxAttempts: row.maxAttempts,
    // A key is only ever saved together with its address, so once there is a
    // key this is the row's own value. The fallbacks only prefill an empty
    // form.
    apiBaseUrl:
      row.apiBaseUrl || process.env.ARVAN_AI_BASE_URL || DEFAULT_AI_BASE_URL,
    apiKeyState,
    apiKeyHint: row.apiKeyCiphertext ? row.apiKeyHint : null,
    writerModel: row.writerModel || env.writerModel,
    imageModel: row.imageModel ?? env.imageModel,
    promptOverrides: row.promptOverrides,
    updatedAt: row.updatedAt,
  };

  return { env, row, panel, apiKey };
}

export async function readAgentPanelSettings(): Promise<AgentPanelSettings> {
  return (await resolveLayers()).panel;
}

export async function loadAgentConfig(): Promise<ResolvedAgentConfig> {
  const { env, row, panel, apiKey } = await resolveLayers();

  return {
    enabled: panel.enabled,
    autoPublish: panel.autoPublish,
    noindex: env.noindex,
    maxAttempts: panel.maxAttempts,
    // Without an explicit author, posts belong to whoever last saved the
    // panel — the one person who decided the agent should be writing.
    authorProfileId: env.authorProfileId ?? row.updatedBy,
    writerModel: panel.writerModel,
    imageModel: panel.imageModel || null,
    connection: apiKey ? { baseUrl: panel.apiBaseUrl, apiKey } : null,
    connectionProblem: apiKey
      ? null
      : panel.apiKeyState === "unreadable"
        ? "کلید ذخیره‌شده خوانده نمی‌شود؛ در پنل ایجنت دوباره واردش کنید."
        : "کلید سرویس هوش مصنوعی وارد نشده است.",
    prompts: panel.promptOverrides,
  };
}
