/**
 * Reading and writing the reviewer's settings row.
 *
 * Split from `gate-settings.ts` because that module's definitions are drawn by
 * a client component, and anything it imports goes to the browser with it.
 */
import {
  parseGateSettings,
  DEFAULT_GATE_SETTINGS,
  type GateSettings,
} from "@/lib/blog/agent/gate-settings";
import { query, execute } from "@/lib/data/postgres/client";

export async function readGateSettings(): Promise<GateSettings> {
  try {
    const rows = await query<{ gate: unknown }>(
      `select gate from blog_agent_settings where id = 1 limit 1`
    );
    return parseGateSettings(rows[0]?.gate);
  } catch {
    // Most likely `013` has not been applied yet. The reviewer is an addition
    // to the agent, never a precondition for it, so a missing column means
    // "use the defaults", not "stop".
    return DEFAULT_GATE_SETTINGS;
  }
}

export async function writeGateSettings(
  settings: GateSettings,
  updatedBy: string
): Promise<void> {
  await execute(
    `insert into blog_agent_settings (id, gate, updated_by)
     values (1, $1::jsonb, $2)
     on conflict (id) do update
        set gate = excluded.gate,
            updated_by = excluded.updated_by,
            updated_at = now()`,
    [JSON.stringify(settings), updatedBy]
  );
}
