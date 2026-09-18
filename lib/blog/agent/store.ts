import {
  execute,
  query,
  queryOne,
  withTransaction,
} from "@/lib/data/postgres/client";

/**
 * Reads and writes for the agent's two tables.
 *
 * Deliberately not part of `DataRepository`. That interface is implemented
 * three times — local, postgres, supabase — and the agent only ever runs in
 * the container, which is postgres. Adding eleven methods to three
 * implementations so that two of them can throw "not supported" is worse than
 * one module that is honest about which backend it needs.
 */

export type AgentTopic = {
  id: string;
  topic: string;
  notes: string | null;
  categorySlug: string | null;
  languageSlug: string | null;
  scheduledFor: string;
  status: string;
  writerModel: string | null;
  imageModel: string | null;
  postId: string | null;
  attempts: number;
  lastError: string | null;
};

export type RunStep = {
  name: string;
  model?: string;
  promptTokens?: number;
  completionTokens?: number;
  durationMs: number;
  note?: string;
};

const TOPIC_COLUMNS = `
  id,
  topic,
  notes,
  category_slug as "categorySlug",
  language_slug as "languageSlug",
  scheduled_for as "scheduledFor",
  status,
  writer_model as "writerModel",
  image_model as "imageModel",
  post_id as "postId",
  attempts,
  last_error as "lastError"
`;

/**
 * Takes the next due subject, or returns null when there is nothing to do.
 *
 * `for update skip locked` is the whole point. Two pods overlap during a
 * rolling deploy and ArvanCloud's cron, like every cron, can fire a job twice
 * if the first attempt looked like it failed. Without the lock both would
 * read the same pending row, both would write it, and the blog would publish
 * one subject as two posts with two slugs — which is duplicate content the
 * site did not ask for and nobody would notice for a week.
 *
 * The claim and the status change are one statement so there is no window
 * between them at all.
 */
export async function claimNextTopic(): Promise<AgentTopic | null> {
  const rows = await withTransaction(async (run) => {
    return (await run(
      `update blog_topics
          set status = 'running',
              attempts = attempts + 1
        where id = (
          select id
            from blog_topics
           where status = 'pending'
             and scheduled_for <= now()
           order by scheduled_for
           limit 1
           for update skip locked
        )
    returning ${TOPIC_COLUMNS}`
    )) as AgentTopic[];
  });

  return rows[0] ?? null;
}

/**
 * Claims one named subject, whatever its schedule says.
 *
 * The bake-off needs to run the same subject three times this afternoon
 * rather than once next Tuesday, so the due check is dropped — but the lock
 * is not. A forced run and a cron tick landing together is exactly the race
 * the lock exists for, and it is likelier here than anywhere else because
 * the author tends to be clicking at the same time.
 *
 * `status` is not checked by default: a subject already marked `done` can be
 * run again, which is what "run this one with the other model" means.
 *
 * `onlyPending` is the admin panel's version. Its "run now" button sits on a
 * list that can be minutes old, and a cron tick may have written that subject
 * in the meantime; without the check, the click would publish the same
 * subject a second time.
 */
export async function claimTopicById(
  id: string,
  { onlyPending = false }: { onlyPending?: boolean } = {}
): Promise<AgentTopic | null> {
  const rows = await withTransaction(async (run) => {
    return (await run(
      `update blog_topics
          set status = 'running',
              attempts = attempts + 1
        where id = (
          select id
            from blog_topics
           where id = $1
             and status <> 'running'
             and (not $2::boolean or status = 'pending')
           for update skip locked
        )
    returning ${TOPIC_COLUMNS}`,
      [id, onlyPending]
    )) as AgentTopic[];
  });

  return rows[0] ?? null;
}

/**
 * Whether any post already owns this slug — draft or published.
 *
 * `getPublishedBlogPostBySlug` is the wrong question: the unique index covers
 * drafts too, so a slug that looks free to the public reader is still a
 * constraint violation on insert.
 */
export async function slugExists(slug: string): Promise<boolean> {
  const row = await queryOne<{ exists: boolean }>(
    `select exists(select 1 from blog_posts where slug = $1) as exists`,
    [slug]
  );
  return row?.exists ?? false;
}

/**
 * Puts back subjects whose run died without saying so.
 *
 * A pod restarted mid-article leaves its topic on `running` forever, and the
 * claim above will never look at it again. Rather than a separate janitor,
 * every tick sweeps first: anything that has been running longer than a run
 * could possibly take is assumed dead.
 *
 * `attempts` is not reset, so a subject that kills the process three times in
 * a row still ends up `failed` instead of looping until the wallet is empty.
 */
export async function releaseStaleTopics(olderThanMinutes = 20): Promise<number> {
  return execute(
    `update blog_topics
        set status = 'pending',
            last_error = coalesce(last_error, 'run did not finish; released by sweep')
      where status = 'running'
        and updated_at < now() - make_interval(mins => $1)`,
    [olderThanMinutes]
  );
}

/** Marks a subject published and points it at the post that came out. */
export async function completeTopic(id: string, postId: string): Promise<void> {
  await execute(
    `update blog_topics
        set status = 'done', post_id = $2, last_error = null
      where id = $1`,
    [id, postId]
  );
}

/**
 * Records a failure, and decides whether the subject gets another day.
 *
 * Below the ceiling it goes back to `pending`, so tomorrow's tick retries it
 * before moving on — a provider having a bad afternoon should not cost the
 * author a subject. At the ceiling it stops, because a subject that has
 * failed three times is failing for a reason that another attempt will not
 * fix, and a queue that retries forever silently stops publishing anything
 * new while looking busy.
 */
export async function failTopic(
  id: string,
  error: string,
  maxAttempts = 3
): Promise<void> {
  await execute(
    `update blog_topics
        set status = case when attempts >= $3 then 'failed' else 'pending' end,
            last_error = $2
      where id = $1`,
    [id, error.slice(0, 2000), maxAttempts]
  );
}

/** Opens a run row before any money is spent, so a crash still leaves a trace. */
export async function startRun(input: {
  topicId: string;
  writerModel: string;
  imageModel: string | null;
}): Promise<string> {
  const row = await queryOne<{ id: string }>(
    `insert into blog_agent_runs (topic_id, writer_model, image_model)
     values ($1, $2, $3)
     returning id`,
    [input.topicId, input.writerModel, input.imageModel]
  );
  if (!row) throw new Error("could not open a blog_agent_runs row");
  return row.id;
}

export async function finishRun(input: {
  runId: string;
  postId: string | null;
  promptTokens: number;
  completionTokens: number;
  imagePromptTokens: number;
  imageCompletionTokens: number;
  costToman: number;
  durationMs: number;
  status: "done" | "failed";
  error?: string | null;
  steps: RunStep[];
}): Promise<void> {
  await execute(
    `update blog_agent_runs
        set post_id = $2,
            prompt_tokens = $3,
            completion_tokens = $4,
            image_prompt_tokens = $5,
            image_completion_tokens = $6,
            cost_toman = $7,
            duration_ms = $8,
            status = $9,
            error = $10,
            steps = $11::jsonb,
            finished_at = now()
      where id = $1`,
    [
      input.runId,
      input.postId,
      input.promptTokens,
      input.completionTokens,
      input.imagePromptTokens,
      input.imageCompletionTokens,
      input.costToman,
      input.durationMs,
      input.status,
      input.error?.slice(0, 4000) ?? null,
      JSON.stringify(input.steps),
    ]
  );
}

/** Everything in the queue, newest slot last. For the admin panel. */
export async function listTopics(limit = 100): Promise<AgentTopic[]> {
  return query<AgentTopic>(
    `select ${TOPIC_COLUMNS}
       from blog_topics
      order by scheduled_for
      limit $1`,
    [limit]
  );
}

export type NewTopic = {
  topic: string;
  notes?: string | null;
  categorySlug?: string | null;
  languageSlug?: string | null;
  scheduledFor: Date;
  writerModel?: string | null;
  imageModel?: string | null;
};

/** Adds subjects to the queue. Used by the seeding script and the panel. */
export async function insertTopics(topics: NewTopic[]): Promise<number> {
  let inserted = 0;
  for (const topic of topics) {
    inserted += await execute(
      `insert into blog_topics
         (topic, notes, category_slug, language_slug, scheduled_for,
          writer_model, image_model)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [
        topic.topic,
        topic.notes ?? null,
        topic.categorySlug ?? null,
        topic.languageSlug ?? null,
        topic.scheduledFor.toISOString(),
        topic.writerModel ?? null,
        topic.imageModel ?? null,
      ]
    );
  }
  return inserted;
}

// -------------------------------------------------------------------- panel

export type AdminTopicStatus = "pending" | "running" | "done" | "failed" | "skipped";

export type AdminTopic = {
  id: string;
  topic: string;
  notes: string | null;
  categorySlug: string | null;
  languageSlug: string | null;
  /** ISO string. `pg` returns `Date`, which cannot cross into a client component. */
  scheduledFor: string;
  status: AdminTopicStatus;
  attempts: number;
  lastError: string | null;
  postId: string | null;
  postSlug: string | null;
  postStatus: string | null;
};

/**
 * The queue as the panel shows it: what is still to come first, soonest at
 * the top, then everything finished, most recent first.
 */
export async function listTopicsForAdmin(limit = 300): Promise<AdminTopic[]> {
  const rows = await query<
    Omit<AdminTopic, "scheduledFor"> & { scheduledFor: Date | string }
  >(
    `select t.id,
            t.topic,
            t.notes,
            t.category_slug as "categorySlug",
            t.language_slug as "languageSlug",
            t.scheduled_for as "scheduledFor",
            t.status,
            t.attempts,
            t.last_error as "lastError",
            t.post_id as "postId",
            p.slug as "postSlug",
            p.status as "postStatus"
       from blog_topics t
       left join blog_posts p on p.id = t.post_id
      order by case when t.status in ('pending', 'running') then 0 else 1 end,
               case when t.status in ('pending', 'running') then t.scheduled_for end asc,
               t.scheduled_for desc
      limit $1`,
    [limit]
  );

  return rows.map((row) => ({
    ...row,
    scheduledFor: new Date(row.scheduledFor).toISOString(),
  }));
}

/** Edits a subject that has not been written yet, or has failed or been set aside. */
export async function updateTopic(
  id: string,
  input: Omit<NewTopic, "writerModel" | "imageModel">
): Promise<boolean> {
  const count = await execute(
    `update blog_topics
        set topic = $2,
            notes = $3,
            category_slug = $4,
            language_slug = $5,
            scheduled_for = $6
      where id = $1
        and status in ('pending', 'failed', 'skipped')`,
    [
      id,
      input.topic,
      input.notes ?? null,
      input.categorySlug ?? null,
      input.languageSlug ?? null,
      input.scheduledFor.toISOString(),
    ]
  );
  return count > 0;
}

/** Removes a subject. A running one is left alone: its run still has to
 * write its receipt against it. The post of a finished one is not touched. */
export async function deleteTopic(id: string): Promise<boolean> {
  const count = await execute(
    `delete from blog_topics where id = $1 and status <> 'running'`,
    [id]
  );
  return count > 0;
}

/** Takes a waiting subject out of rotation, or puts a set-aside one back. */
export async function setTopicSkipped(
  id: string,
  skipped: boolean
): Promise<boolean> {
  const count = skipped
    ? await execute(
        `update blog_topics set status = 'skipped'
          where id = $1 and status = 'pending'`,
        [id]
      )
    : await execute(
        `update blog_topics set status = 'pending'
          where id = $1 and status = 'skipped'`,
        [id]
      );
  return count > 0;
}

/**
 * Gives a failed subject a clean slate: back in the queue, attempts reset.
 * Its schedule is left as it was, so a subject whose day has passed runs on
 * the very next tick.
 */
export async function retryTopic(id: string): Promise<boolean> {
  const count = await execute(
    `update blog_topics
        set status = 'pending', attempts = 0, last_error = null
      where id = $1 and status = 'failed'`,
    [id]
  );
  return count > 0;
}

/** The latest slot still ahead of the agent, so a pasted list can continue after it. */
export async function latestQueuedSlot(): Promise<Date | null> {
  const row = await queryOne<{ latest: Date | string | null }>(
    `select max(scheduled_for) as latest
       from blog_topics
      where status in ('pending', 'running', 'skipped')`
  );
  return row?.latest ? new Date(row.latest) : null;
}

export type AdminRun = {
  id: string;
  createdAt: string;
  status: "running" | "done" | "failed";
  writerModel: string | null;
  imageModel: string | null;
  promptTokens: number;
  completionTokens: number;
  imageTokens: number;
  costToman: number;
  durationMs: number | null;
  error: string | null;
  topic: string | null;
  postId: string | null;
  postSlug: string | null;
  /** The reviewer's verdict for this run, or null for runs that predate it. */
  gate: RunGate | null;
};

/**
 * The gate step, pulled back out of `steps` for the panel.
 *
 * It is stored as one more step rather than in columns of its own, so adding
 * the reviewer needed no migration. Reading it back is this function's job.
 */
export type RunGate = {
  outcome: string;
  scores: { name: string; value: number }[];
  durationMs: number;
  inputTokens: number;
};

function readGate(steps: unknown): RunGate | null {
  if (!Array.isArray(steps)) return null;

  const step = steps.find(
    (entry): entry is RunStep =>
      !!entry && typeof entry === "object" && (entry as RunStep).name === "gate"
  );
  if (!step?.note) return null;

  // `describeVerdict` writes "outcome name=0.00 name=0.00"; anything else is a
  // shape this code did not write, and a missing badge beats a crashed page.
  const [outcome, ...pairs] = step.note.split(" ");
  const scores = pairs
    .map((pair) => {
      const [name, value] = pair.split("=");
      return { name, value: Number(value) };
    })
    .filter((entry) => entry.name && Number.isFinite(entry.value));

  return {
    outcome,
    scores,
    durationMs: step.durationMs ?? 0,
    inputTokens: step.promptTokens ?? 0,
  };
}

export async function listRunsForAdmin(limit = 50): Promise<AdminRun[]> {
  const rows = await query<
    Omit<AdminRun, "createdAt" | "costToman" | "imageTokens" | "gate"> & {
      createdAt: Date | string;
      costToman: string | number;
      imageTokens: string | number;
      steps: unknown;
    }
  >(
    `select r.id,
            r.created_at as "createdAt",
            r.status,
            r.writer_model as "writerModel",
            r.image_model as "imageModel",
            r.prompt_tokens as "promptTokens",
            r.completion_tokens as "completionTokens",
            r.image_prompt_tokens + r.image_completion_tokens as "imageTokens",
            r.cost_toman as "costToman",
            r.duration_ms as "durationMs",
            r.steps,
            r.error,
            t.topic,
            r.post_id as "postId",
            p.slug as "postSlug"
       from blog_agent_runs r
       left join blog_topics t on t.id = r.topic_id
       left join blog_posts p on p.id = r.post_id
      order by r.created_at desc
      limit $1`,
    [limit]
  );

  return rows.map((row) => ({
    ...row,
    createdAt: new Date(row.createdAt).toISOString(),
    // `numeric` arrives as a string, so the sum is not concatenation.
    costToman: Number(row.costToman),
    imageTokens: Number(row.imageTokens),
    gate: readGate(row.steps),
  }));
}

/** Toman spent in the last `days` days, failed runs included. */
export async function costSince(days = 30): Promise<number> {
  const row = await queryOne<{ total: string | number | null }>(
    `select coalesce(sum(cost_toman), 0) as total
       from blog_agent_runs
      where created_at > now() - make_interval(days => $1)`,
    [days]
  );
  return Number(row?.total ?? 0);
}

/**
 * How the reviewer has been scoring, across recent runs.
 *
 * Read from the `steps` column rather than a table of its own — see `readGate`.
 * Runs from before the reviewer existed have no gate step and are skipped, so
 * the averages describe the runs that were actually judged, not a diluted
 * number that counts silence as a pass.
 */
export type GateStats = {
  judged: number;
  passed: number;
  held: number;
  unavailable: number;
  /** Mean per check name, over the runs where that check ran. */
  averages: { name: string; value: number; samples: number }[];
  /** Newest first, for the trend line. */
  history: { createdAt: string; outcome: string; scores: Record<string, number> }[];
  totalInputTokens: number;
};

export async function gateStats(limit = 50): Promise<GateStats> {
  const rows = await query<{ createdAt: Date | string; steps: unknown }>(
    `select created_at as "createdAt", steps
       from blog_agent_runs
      order by created_at desc
      limit $1`,
    [limit]
  );

  const stats: GateStats = {
    judged: 0,
    passed: 0,
    held: 0,
    unavailable: 0,
    averages: [],
    history: [],
    totalInputTokens: 0,
  };

  const sums = new Map<string, { total: number; samples: number }>();

  for (const row of rows) {
    const gate = readGate(row.steps);
    if (!gate) continue;

    stats.judged += 1;
    stats.totalInputTokens += gate.inputTokens;
    if (gate.outcome === "pass") stats.passed += 1;
    if (gate.outcome === "hold") stats.held += 1;
    if (gate.outcome === "unavailable") stats.unavailable += 1;

    const scores: Record<string, number> = {};
    for (const score of gate.scores) {
      scores[score.name] = score.value;
      const current = sums.get(score.name) ?? { total: 0, samples: 0 };
      sums.set(score.name, {
        total: current.total + score.value,
        samples: current.samples + 1,
      });
    }

    stats.history.push({
      createdAt: new Date(row.createdAt).toISOString(),
      outcome: gate.outcome,
      scores,
    });
  }

  sums.forEach(({ total, samples }, name) => {
    stats.averages.push({ name, value: total / samples, samples });
  });

  return stats;
}
