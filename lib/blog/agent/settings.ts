import { execute, queryOne } from "@/lib/data/postgres/client";
import {
  PROMPT_SECTION_KEYS,
  type PromptOverrides,
  type PromptSectionKey,
} from "@/lib/blog/agent/prompts";

/**
 * The agent's control-panel row, exactly as stored.
 *
 * Nulls mean "not set in the panel"; `config.ts` decides what each one falls
 * back to. The ciphertext is read here and goes no further than `config.ts`:
 * nothing in this module returns a plain key, and nothing that renders the
 * panel receives the ciphertext.
 *
 * Like `store.ts`, this talks to Postgres directly rather than through
 * `DataRepository` — the agent only ever runs against Postgres.
 */

export type AgentSettingsRow = {
  enabled: boolean;
  autoPublish: boolean;
  maxAttempts: number;
  apiBaseUrl: string | null;
  apiKeyCiphertext: string | null;
  apiKeyHint: string | null;
  writerModel: string | null;
  /** Null: default image model. Empty string: covers switched off. */
  imageModel: string | null;
  promptOverrides: PromptOverrides;
  updatedAt: string | null;
  updatedBy: string | null;
};

/** What a database with the table but without its row behaves like. */
const DEFAULT_ROW: AgentSettingsRow = {
  enabled: false,
  autoPublish: true,
  maxAttempts: 3,
  apiBaseUrl: null,
  apiKeyCiphertext: null,
  apiKeyHint: null,
  writerModel: null,
  imageModel: null,
  promptOverrides: {},
  updatedAt: null,
  updatedBy: null,
};

/**
 * Reads the row. Throws when the table itself is missing — migration 012 not
 * applied — so the caller can say that instead of quietly running on
 * defaults nobody chose.
 */
export async function readAgentSettingsRow(): Promise<AgentSettingsRow> {
  const row = await queryOne<
    Omit<AgentSettingsRow, "updatedAt" | "promptOverrides"> & {
      updatedAt: Date | string | null;
      promptOverrides: unknown;
    }
  >(
    `select enabled,
            auto_publish as "autoPublish",
            max_attempts as "maxAttempts",
            api_base_url as "apiBaseUrl",
            api_key_ciphertext as "apiKeyCiphertext",
            api_key_hint as "apiKeyHint",
            writer_model as "writerModel",
            image_model as "imageModel",
            prompt_overrides as "promptOverrides",
            updated_at as "updatedAt",
            updated_by as "updatedBy"
       from blog_agent_settings
      where id = 1`
  );

  if (!row) return DEFAULT_ROW;

  return {
    ...row,
    promptOverrides: knownSections(row.promptOverrides),
    updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : null,
  };
}

/**
 * Only section names this code knows, and only text. The column is plain
 * jsonb, so a hand edit in the database can put anything there — and a
 * number where a prompt should be would crash every run at `.trim()`.
 */
function knownSections(value: unknown): PromptOverrides {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const stored = value as Record<string, unknown>;
  const clean: PromptOverrides = {};
  for (const key of PROMPT_SECTION_KEYS) {
    const text = stored[key];
    if (typeof text === "string" && text.trim().length > 0) clean[key] = text;
  }
  return clean;
}

export async function saveAgentSwitches(
  input: { enabled: boolean; autoPublish: boolean; maxAttempts: number },
  updatedBy: string
): Promise<void> {
  await execute(
    `insert into blog_agent_settings
       (id, enabled, auto_publish, max_attempts, updated_by)
     values (1, $1, $2, $3, $4)
     on conflict (id) do update
       set enabled = excluded.enabled,
           auto_publish = excluded.auto_publish,
           max_attempts = excluded.max_attempts,
           updated_by = excluded.updated_by,
           updated_at = now()`,
    [input.enabled, input.autoPublish, input.maxAttempts, updatedBy]
  );
}

/** What a save does to the stored key. The form's key field is write-only,
 * so an empty field means "keep", never "remove". */
export type ApiKeyChange =
  | { mode: "keep" }
  | { mode: "clear" }
  | { mode: "set"; ciphertext: string; hint: string };

export async function saveAgentConnection(
  input: {
    baseUrl: string;
    writerModel: string;
    imageModel: string;
    key: ApiKeyChange;
  },
  updatedBy: string
): Promise<void> {
  const sealed = input.key.mode === "set" ? input.key : null;

  await execute(
    `insert into blog_agent_settings
       (id, api_base_url, writer_model, image_model, updated_by,
        api_key_ciphertext, api_key_hint)
     values (1, $1, $2, $3, $4, $5, $6)
     on conflict (id) do update
       set api_base_url = excluded.api_base_url,
           writer_model = excluded.writer_model,
           image_model = excluded.image_model,
           updated_by = excluded.updated_by,
           updated_at = now(),
           api_key_ciphertext = case when $7 = 'keep'
                                     then blog_agent_settings.api_key_ciphertext
                                     else excluded.api_key_ciphertext end,
           api_key_hint = case when $7 = 'keep'
                               then blog_agent_settings.api_key_hint
                               else excluded.api_key_hint end`,
    [
      input.baseUrl,
      input.writerModel,
      input.imageModel,
      updatedBy,
      sealed?.ciphertext ?? null,
      sealed?.hint ?? null,
      input.key.mode,
    ]
  );
}

/** Stores one prompt section, or removes it (`text` null) so the default
 * applies again. The other sections are left exactly as they were. */
export async function saveAgentPrompt(
  section: PromptSectionKey,
  text: string | null,
  updatedBy: string
): Promise<void> {
  await execute(
    `insert into blog_agent_settings (id, prompt_overrides, updated_by)
     values (
       1,
       case when $2::text is null then '{}'::jsonb
            else jsonb_build_object($1::text, $2::text) end,
       $3
     )
     on conflict (id) do update
       set prompt_overrides =
             case when $2::text is null
                  then blog_agent_settings.prompt_overrides - $1::text
                  else blog_agent_settings.prompt_overrides
                       || jsonb_build_object($1::text, $2::text) end,
           updated_by = excluded.updated_by,
           updated_at = now()`,
    [section, text, updatedBy]
  );
}
