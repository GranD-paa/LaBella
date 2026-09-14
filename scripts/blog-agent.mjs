/**
 * Queue management for the blog agent, from the command line.
 *
 * The agent itself runs inside Next — it needs the repository, which needs
 * the framework. This script does not: it only touches `blog_topics` and
 * `blog_agent_runs`, which are plain tables, so it can be a plain node script
 * and stay usable when the app will not start.
 *
 *   node scripts/blog-agent.mjs add "چطور ایتالیایی را از صفر شروع کنیم" --now
 *   node scripts/blog-agent.mjs add "..." --at 2026-09-20 --language italian
 *   node scripts/blog-agent.mjs seed topics.txt      # one subject per line, daily
 *   node scripts/blog-agent.mjs list
 *   node scripts/blog-agent.mjs runs
 *
 * Times are Tehran times. The conversion to UTC happens here so nobody has to
 * do it in their head; see lib/blog/agent/schedule.ts for the same arithmetic
 * on the application side.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const PROJECT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const TEHRAN_OFFSET_MINUTES = 3 * 60 + 30;
const PUBLISH_HOUR = 13;

function env(key) {
  const file = fs.readFileSync(path.join(PROJECT, ".env.local"), "utf8");
  for (const line of file.split(/\r?\n/)) {
    const match = new RegExp(`^\\s*${key}\\s*=\\s*(.*)$`).exec(line);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "");
  }
  return null;
}

/** 13:00 Tehran on the given calendar day, as the instant the database wants. */
function tehranSlot(year, month, day, hour = PUBLISH_HOUR) {
  return new Date(
    Date.UTC(year, month - 1, day, hour, 0) - TEHRAN_OFFSET_MINUTES * 60_000
  );
}

function tomorrowSlot(offsetDays = 1) {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + offsetDays);
  return tehranSlot(now.getUTCFullYear(), now.getUTCMonth() + 1, now.getUTCDate());
}

function flag(argv, name) {
  const index = argv.indexOf(`--${name}`);
  if (index === -1) return null;
  const value = argv[index + 1];
  return value && !value.startsWith("--") ? value : true;
}

function fmt(date) {
  // Tehran wall clock, so the listing reads the way the author thinks.
  const shifted = new Date(
    new Date(date).getTime() + TEHRAN_OFFSET_MINUTES * 60_000
  );
  return shifted.toISOString().replace("T", " ").slice(0, 16);
}

async function main() {
  const [, , command, ...rest] = process.argv;
  const client = new pg.Client({ connectionString: env("DATABASE_URL") });
  await client.connect();

  try {
    if (command === "add") {
      const topic = rest.find((arg) => !arg.startsWith("--"));
      if (!topic) throw new Error('usage: add "<topic>" [--now|--at YYYY-MM-DD]');

      const at = flag(rest, "at");
      const scheduledFor =
        flag(rest, "now") === true
          ? new Date(Date.now() - 60_000)
          : at && at !== true
            ? tehranSlot(...at.split("-").map(Number))
            : tomorrowSlot();

      const row = await client.query(
        `insert into blog_topics
           (topic, notes, category_slug, language_slug, scheduled_for,
            writer_model, image_model)
         values ($1,$2,$3,$4,$5,$6,$7)
         returning id, scheduled_for`,
        [
          topic,
          orNull(flag(rest, "notes")),
          orNull(flag(rest, "category")),
          orNull(flag(rest, "language")),
          scheduledFor.toISOString(),
          orNull(flag(rest, "writer")),
          orNull(flag(rest, "image")),
        ]
      );
      console.log(`added ${row.rows[0].id}  due ${fmt(row.rows[0].scheduled_for)} Tehran`);
      return;
    }

    if (command === "seed") {
      const file = rest[0];
      if (!file) throw new Error("usage: seed <file.txt>");
      const lines = fs
        .readFileSync(path.resolve(file), "utf8")
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith("#"));

      for (const [index, topic] of lines.entries()) {
        // Starting tomorrow: a list pasted in the afternoon whose first slot
        // was today would have the agent publish twice on its next tick.
        await client.query(
          `insert into blog_topics (topic, scheduled_for) values ($1, $2)`,
          [topic, tomorrowSlot(index + 1).toISOString()]
        );
      }
      console.log(`queued ${lines.length} subjects, one per day at 13:00 Tehran`);
      return;
    }

    if (command === "list") {
      const rows = await client.query(
        `select id, topic, status, scheduled_for, attempts, writer_model,
                post_id, left(coalesce(last_error,''), 80) as err
           from blog_topics order by scheduled_for limit 60`
      );
      if (rows.rows.length === 0) return console.log("queue is empty");
      for (const row of rows.rows) {
        console.log(
          [
            row.id.slice(0, 8),
            fmt(row.scheduled_for),
            row.status.padEnd(7),
            (row.writer_model ?? "default").padEnd(18),
            row.topic.slice(0, 44),
            row.err || "",
          ].join("  ")
        );
      }
      return;
    }

    if (command === "runs") {
      const rows = await client.query(
        `select r.id, r.created_at, r.status, r.writer_model, r.image_model,
                r.prompt_tokens, r.completion_tokens,
                r.image_prompt_tokens, r.image_completion_tokens,
                r.cost_toman, r.duration_ms,
                p.slug, left(coalesce(r.error,''), 90) as err
           from blog_agent_runs r
           left join blog_posts p on p.id = r.post_id
          order by r.created_at desc limit 30`
      );
      if (rows.rows.length === 0) return console.log("no runs yet");
      for (const row of rows.rows) {
        console.log(
          [
            fmt(row.created_at),
            row.status.padEnd(6),
            (row.writer_model ?? "-").padEnd(18),
            `${row.prompt_tokens}+${row.completion_tokens}tok`.padEnd(14),
            `${Math.round(Number(row.cost_toman)).toLocaleString("en-US")}T`.padEnd(10),
            `${Math.round((row.duration_ms ?? 0) / 1000)}s`.padEnd(5),
            row.slug ?? row.err,
          ].join("  ")
        );
      }
      return;
    }

    console.log(
      "commands: add \"<topic>\" [--now|--at YYYY-MM-DD] [--language x] [--category x] [--writer M] [--image M] [--notes \"...\"] | seed <file> | list | runs"
    );
  } finally {
    await client.end();
  }
}

function orNull(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
