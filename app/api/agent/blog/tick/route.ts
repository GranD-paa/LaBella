import { NextResponse } from "next/server";

import { runTopicNow, tick } from "@/lib/blog/agent/pipeline";
import { isLocalDataMode } from "@/lib/config/data-source";
import { isAuthorizedCronRequest } from "@/lib/supabase/service-client";

/**
 * The blog agent's only entry point.
 *
 * `GET` is the scheduled one: ArvanCloud's CronJob calls it once a day and
 * it takes whichever subject is due. `POST` is the manual one, for running a
 * named subject with a named model — which is how two models get compared on
 * the same brief.
 *
 * Both run **synchronously**. The tempting alternative — answer 202 and do
 * the work in a detached promise — breaks `revalidatePath`, which needs the
 * request scope it was called in and throws outside it. A post that exists in
 * the database but never appears on the site is a worse failure than a slow
 * response, so the response waits.
 *
 * That makes the call two to five minutes long, which is longer than most
 * ingress proxies will hold a connection open. The CronJob is therefore
 * pointed at the in-cluster service address rather than the public hostname:
 * pod to pod, there is no proxy in the middle to time out. If the public URL
 * is used anyway and the proxy gives up, the work still finishes — the caller
 * just does not hear how it went, and `blog_agent_runs` has the answer.
 */

// Cost is spent on every call; a cached response would be a bill for nothing.
export const dynamic = "force-dynamic";

// Honoured by hosts that read it, ignored by a plain Node container. Harmless
// either way, and it documents the expected shape of the run.
export const maxDuration = 600;

/**
 * Refuses to run against the file-backed development repository.
 *
 * The agent's own two tables are always Postgres — `lib/blog/agent/store.ts`
 * talks to the pool directly — while posts and images go through
 * `getDataRepository()`, which in local mode writes JSON files instead. Left
 * alone, that combination claims a subject from the cluster and publishes the
 * article to a file nobody serves, then marks the subject done. Nothing
 * errors; the post simply never exists. Better to say so.
 */
function wrongDataSource(): NextResponse | null {
  if (!isLocalDataMode()) return null;
  return NextResponse.json(
    {
      error: "local-data-mode",
      detail:
        "The agent writes its queue to Postgres but posts to the local file repository. Set NEXT_PUBLIC_DATA_SOURCE=postgres.",
    },
    { status: 409 }
  );
}

export async function GET(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const mismatch = wrongDataSource();
  if (mismatch) return mismatch;

  const outcome = await tick();

  // An idle tick and a failed run are both normal, expected outcomes — the
  // queue is empty, or a provider had a bad afternoon — so both answer 200
  // with detail rather than an error status that would make every empty day
  // look like an outage on the cron dashboard.
  return NextResponse.json(outcome);
}

export async function POST(request: Request) {
  if (!isAuthorizedCronRequest(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const mismatch = wrongDataSource();
  if (mismatch) return mismatch;

  let body: {
    topicId?: string;
    writerModel?: string;
    imageModel?: string;
  } = {};

  try {
    body = (await request.json()) as typeof body;
  } catch {
    // An empty body means "do what the cron would do", which is a reasonable
    // thing to ask for by hand and not worth an error.
  }

  const outcome = body.topicId
    ? await runTopicNow(body.topicId, {
        writerModel: body.writerModel,
        imageModel: body.imageModel,
      })
    : await tick();

  return NextResponse.json(outcome);
}
