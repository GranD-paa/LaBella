# Blog agent — handoff

State as of 2026-09-13, 13:50 Tehran. Written to survive a
cleared context window: everything below was learned by measurement across two
sessions, and most of it is not recoverable from the code alone.

## What this is

A system that turns a queue of topics into published blog posts without anyone
opening the admin panel. The owner drops a month of subjects into a table; at
13:00 Tehran each day the agent takes the next one, writes a Persian article,
draws a cover, and publishes it.

Two ways in:

| Path | Who writes the article | Result |
|---|---|---|
| `/api/agent/blog/tick` | The container itself, via ArvanCloud AIaaS | Published (or draft, per config) |
| `/api/agent/blog/ingest` | Something outside — n8n, a script | Always a draft |

## Files

```
db/011_blog_agent.sql          blog_topics + blog_agent_runs (APPLIED to production)
lib/ai/arvan.ts                gateway client: chatJSON (streamed) + generateImage
lib/ai/pricing.ts              toman rates per model, cost calculation
lib/blog/revalidate.ts         extracted from app/admin/actions/blog.ts
lib/blog/agent/
  config.ts                    env knobs
  schedule.ts                  Tehran <-> UTC, cron expression builder
  schema.ts                    zod + JSON Schema for the writer's output
  prompts.ts                   brand voice, SEO rules, image style  <- the important one
  store.ts                     topic claim (for update skip locked), run log
  publish.ts                   shared by both entry points
  pipeline.ts                  orchestration
app/api/agent/blog/tick/       cron + manual, guarded by CRON_SECRET
app/api/agent/blog/ingest/     external ingest, guarded by AGENT_INGEST_SECRET
scripts/blog-agent.mjs         queue management from the CLI
middleware.ts                  api/agent excluded from the session check
.claude/skills/farsi-bidi/     how to write Persian with Latin in it
```

Checks on 2026-09-14, after the admin-panel review: `npx tsc --noEmit`,
`npm run lint`, `npx vitest run` (487 tests) and
`NEXT_PUBLIC_DATA_SOURCE=postgres npm run build` all pass.

## Admin panel (2026-09-14)

`/admin/blog/agent`, reached from a button on `/admin/blog`. **Super admin
only** (`fullAccess`, labelled «مدیر کل») — the owner's decision; writers keep
the blog editor and never see the agent. Tabs: queue, run log, prompt, AI
connection, settings. Code: `app/admin/blog/agent/page.tsx`,
`app/admin/actions/blog-agent.ts`, `components/admin/blog/agent/*`,
`lib/blog/agent/{config,settings,secret}.ts`.

**Migration `012_blog_agent_settings.sql` is applied** to the cluster
(2026-09-14), with its single row: agent off, publish on, three attempts, no
address, no key. Every statement the panel runs was exercised against it
inside rolled-back transactions by a throwaway script, not in the repo.

- **One AI service, the one entered in the panel.** No second provider and no
  server key behind it. When any step fails — the service, the cover, its
  upload, the database — the run stops, nothing is published, and the error
  lands on the topic and in the run log. Retrying on a later tick is the
  panel's attempts setting; `1` means never.
- The key is sealed with AES-256-GCM under a key derived from
  `BETTER_AUTH_SECRET` (`lib/blog/agent/secret.ts`). **Rotating that secret
  makes the stored key unreadable**; the panel says so and the owner pastes it
  in again.
- A saved key only ever goes to the address it was saved with. Changing the
  address, to save or to test, needs the key again — otherwise the form could
  send the hidden key to any server.
- "Run now" takes a topic only while it is still pending, so a stale page
  cannot publish a subject twice. The tick route's `POST` still re-runs any
  topic, for bake-offs.
- Prompt sections are stored only when they differ from the defaults in
  `prompts.ts`, so a later fix to a default still reaches untouched sections.

## Environment

All in `.env.local`, none committed. Values are NOT in this document.

```
ARVAN_AI_BASE_URL=https://api.arvancloudai.ir/v1   <- prefills the panel only
ARVAN_AI_API_KEY=             local scripts only (bake-off); the agent ignores it
AGENT_WRITER_MODEL=GPT-5.6-Luna   <- prefills the panel; also the code default
AGENT_IMAGE_MODEL=Gemini-3-Pro-Image-Preview   <- prefills the panel
AGENT_AUTHOR_PROFILE_ID=2qOoL7SyUdN0wXdt632yM4EcTrtM1lcY
AGENT_NOINDEX=true            <- local only; must NOT go to production, see Deploy
CRON_SECRET=                  generated locally
AGENT_INGEST_SECRET=          generated locally, give this one to n8n
```

`AGENT_AUTOPUBLISH` and `AGENT_MAX_ATTEMPTS` may still sit in `.env.local`;
nothing reads them any more.

## Infrastructure facts

- Production is a Docker container on **ArvanCloud**, zone `ir-central1`, plan
  Bamdad, **1/1 pods**. Not Vercel — the `vercel.json` in the repo is a leftover
  and does not describe the live deployment.
- One pod means one ISR cache, so `revalidatePath` inside the container is
  enough. An agent run launched from a laptop updates the database but NOT the
  container's cache.
- Database is ArvanCloud managed Postgres (`*.db.arvandbaas.ir`). Reachable from
  the developer's machine, unreliably — `DATABASE_HOST_IP` in `.env.local` is
  the DNS workaround.
- Cloud Container has a **CronJobs** section, currently empty. Kubernetes
  CronJobs run on UTC: **13:00 Tehran is `30 9 * * *`**. Iran is UTC+3:30 with
  no DST since 2022.
- The gateway is `laparli-blog-agent`, 90/90 models connected, rate limit
  100/minute. Its Settings tab has **no timeout option**.

## What works

- The gateway answers — when it is up (see Outage). OpenAI wire format,
  `Bearer` auth.
- `response_format: json_schema` with `strict: true` works **for the GPT
  models only**. See the bake-off.
- Image generation works, but **not** at `/images/generations` — that path 404s.
  The picture comes back from `/chat/completions` with
  `modalities: ["image","text"]`, embedded as Markdown inside `message.content`:
  `![image](data:image/jpeg;base64,...)`. `findImage` in `lib/ai/arvan.ts` walks
  the payload for that.
- One complete article was produced end to end on 2026-09-12: 52 seconds, 8,761
  toman, with a cover, conjugation tables, real Italian examples, and a named
  Persian-speaker mistake. It was deleted after review.
- `/api/agent/blog/ingest` was tested end to end and returned
  `{"status":"draft", "hasCover":true, "notes":[]}`.

## The gateway: how it fails

Four distinct failure shapes have been seen. They mean different things, so
read the symptom before touching the code.

| Symptom | When | Meaning |
|---|---|---|
| `terminated` at 345–385s | `GLM-5.3`, `GPT-5.6-Terra`, 2026-09-12 | Model slower than the gateway's ~6-minute ceiling |
| Our own abort at 120s / 300s | `GPT-5.6-Luna`, 2026-09-12 21:36 and 21:39 | Model never finished; cause unknown |
| HTML 504 page from the CDN edge at ~30.5s | Every model, and `GET /v1/models`, 2026-09-13 from 13:37 (fine at 23:13 the night before) | **The gateway itself is down** |
| `fetch failed` at ~10.7s | Same window | Same outage, at connection level |

**First check when runs start failing: `GET /v1/models`.** It normally answers
in under two seconds. If it 504s after thirty, the service is down and nothing
in the prompt or the code is at fault. During that outage `laparli.com`, the
Arvan panel and google.com all answered normally from the same machine, so it
was not the local network.

`GPT-5.6-Luna` with the real prompt, in order: done 52s (with cover) → abort
120s → abort 300s → done 24s → 504 ×4 (outage). Two real failures in four
healthy-gateway attempts is why the cron plan below retries hourly.

**The gateway appears to buffer replies.** In the 23:13 bake-off every model's
response headers arrived together with its first content token, and Luna's
2,558 tokens all arrived within 2.2 seconds of that — far faster than a model
generates. So time-to-first-byte is roughly the whole generation time. Whether a
*healthy* edge also cuts at 30 seconds is not known: no successful request has
yet taken more than 25 seconds to its first byte. If it does, long articles
(2,000+ words) will fail systematically, not intermittently.

Consequences already handled in code:

- `chatJSON` streams (`stream: true` + `stream_options.include_usage`). Without
  streaming, every real article died at ~60s.
- `TEXT_TIMEOUT_MS` is 300s. The abort timer deliberately survives `fetch`
  resolving, because on a streamed call `fetch` returns at the headers and all
  the waiting happens in the body.
- `console.error` in the pipeline's catch runs **before** the two database
  writes, because those writes are what fail when the run is launched from
  outside ArvanCloud's network.

## Bake-off, 2026-09-12 23:13

The exact production prompt and schema, run through four models in parallel on
topic `d7db9a56` (avere/essere). Read-only: no image, no publish, no queue
claim.

| Model | Time | Tokens in + out | Schema | Output |
|---|---|---|---|---|
| `GPT-5.6-Luna` | 24s | 5,152 + 2,558 | valid | 1,134 words, 7 question headings, correct Italian throughout, 4,920 toman |
| `Gemini-3-Flash-Preview` | 10s | 2,369 + 972 | invalid | 396 words |
| `Gemini-3.1-Flash-Lite-Preview` | 9s | 1,831 + 834 | invalid | ~350 words, in a field it named `body` |
| `Claude-Haiku-4.5` | 25s | 5,167 + 3,271 | invalid | 458 words, typo `favere`, slips into «تو» and colloquial Persian |

**Gemini and Claude ignore `response_format` behind this gateway.** They invent
their own keys (`body`, `category`, `language`/`languages`, `imageType`,
`internalLinks[].text`) and leave out `summary`, `metaTitle`,
`metaDescription` and `coverImageAlt`. Every run with them fails zod
validation. Making them usable would mean writing the schema into the prompt
itself; not done, because Luna's article was also plainly the best of the four.

Luna's article was checked line by line: conjugation tables right, `tu`
translated as «تو», agreement with `essere` right, verbs taking both auxiliaries
right, no «می‌باشد», no Arabic ي/ك, no Latin digits in prose, first paragraph
36 words, meta description 140 characters, one valid internal link.

The script is `bakeoff.mjs` in the session scratchpad, not in the repo. Node 24
with `--experimental-transform-types` imports `prompts.ts`, `schema.ts` and
`arvan.ts` directly, so it exercises the production code unmodified.

## Prompt bugs found by reading real output

All five were the prompt's fault, not the model's.

1. **`tu` translated as «شما».** The voice rule said "address the reader as
   شما consistently", and the model applied it to translating Italian pronouns
   too — which destroys the exact distinction a language lesson is about. The
   rule now says it applies only to addressing the reader.
2. **`metaDescription` ran to 168 characters.** The zod `max` was 200 and the
   description "said" 140–155. A model respects the `max`, not the prose. The
   ceiling is now 158.
3. **The cover had nothing to do with the article.** A post about two Italian
   verbs got a book with two arrows — a picture that suits any article about any
   choice. Root cause: the style string banned all text, so the model could only
   reach for a metaphor. Now `imageMode` is `typographic` or `conceptual`; for a
   post about specific words, the Latin words go on the cover, large, with a
   small icon beside each. Persian is still banned from images — models render
   it as confident nonsense.
4. **Summary and subheadings opened with a Latin word** — «Avere برای
   «داشتن»…», «### avere برای مالکیت». Harmless inside the `dir="rtl"` page;
   scrambled anywhere the direction is guessed from the first letter, such as
   link previews. Rule added to the voice section.
5. **Every example sentence sat in its own fenced code block** — about thirty
   in one article. `.blog-prose pre` in `app/globals.css` is
   `direction: ltr; text-align: left`, so each Persian translation would render
   left-aligned in a monospace box. `countWords` also strips fenced blocks, so
   reading time undercounts. Rule added: examples as list items,
   `- **Ho fame.** — گرسنه‌ام.`

**Bugs 4 and 5 are fixed in `prompts.ts` but not yet verified against a real
model output** — the gateway went down before the verification run.

The image style string was also rewritten on 2026-09-12. The first version
asked for gold "sparingly on one focal element" and "generous negative space"
and said nothing about contrast, and got exactly that: a small dark drawing in an
empty dark frame with no gold visible. It now demands high contrast, gold as a
co-dominant colour, and a subject filling ~70% of the frame.

## Costs, measured

- One complete run on Arvan: **8,761 toman** (writer `GPT-5.6-Luna` plus one
  `Gemini-3-Pro-Image-Preview` cover). The writer alone: about 4,900 toman.
- A whole day of experiments on 2026-09-12, including every failed run and every
  image attempt: about **96,000 toman** (wallet went 29,666,174 → 28,703,189
  rial). Wallet read 28,553,409 rial at 23:20 that night.
- At 30 articles a month that is roughly **263,000 toman/month** with no base
  fee.

Rates are in `lib/ai/pricing.ts`, copied from the bazaar. Note the inversion:
`Gemini-3-Pro-Image-Preview` output tokens cost 2,520,000 toman/M while
`Gemini-3.1-Flash-Image-Preview` costs 12,600,000 — the Pro tier is both better
and five times cheaper. Do not "optimise" that to Flash.

## Alternatives that were priced but not adopted

**OpenRouter** — best model and image selection, but it blocks Iranian
addresses and using it through a VPN violates its terms, which risks the
account and any credit on it. Needs a foreign card or crypto.

**Liara** — Iranian, rial payment, no sanctions exposure, 146+ models,
OpenAI-SDK compatible (so `lib/ai/arvan.ts` would work against it by changing
two environment variables). Billed **hourly**, so a few hours of testing costs
about 2,500 toman rather than the monthly figure:

| Plan | Monthly | Hourly | Models |
|---|---|---|---|
| میرزاخانی | 600,000 toman | 833 toman | 115 |
| تورینگ | 1,050,000 toman | 1,458 toman | 169 |

Token cost is separate and at the upstream provider's own dollar rate, plus
VAT. At 240,000 toman to the dollar, 30 articles a month lands around
**2.1 million toman** — roughly eight times Arvan. Arvan's rates are fixed in
toman and do not move with the dollar.

The account had **zero credit** and an unfinished identity verification at the
time of writing. Nothing was purchased. **If a Liara project is ever created,
delete it after testing** — hourly billing keeps draining otherwise. It is also
the obvious fallback if Arvan's gateway turns out to be down often.

**n8n Cloud** — €20/month for 2,500 executions. One article a day is ~30
executions, so that is 1.2% of the plan for the full price. Self-hosted
Community edition is free but needs a host outside Iran to reach OpenRouter.

## Deploy plan (nothing done yet)

1. Commit on `preview` — needs the owner's go-ahead. CI then pushes
   `graandpaa/laparli:<full sha>` in about 100 seconds.
2. Panel → the app → Settings → Runtime Environment Variables. **The owner adds
   the values**, copied from `.env.local`; secrets do not pass through an
   assistant.
   - Required: `CRON_SECRET`, `AGENT_INGEST_SECRET`, `AGENT_AUTHOR_PROFILE_ID`.
   - **Not `ARVAN_AI_API_KEY`.** Since the admin panel (2026-09-14) the agent
     uses only the key entered at `/admin/blog/agent`; a server key is never
     read by it. `AGENT_AUTOPUBLISH` and `AGENT_MAX_ATTEMPTS` are gone too —
     both are panel settings now.
   - Not needed: `AGENT_WRITER_MODEL`, `AGENT_IMAGE_MODEL`,
     `ARVAN_AI_BASE_URL`. They only prefill the panel's empty form.
   - **Do not add `AGENT_NOINDEX`.** It is stored on each post, so every agent
     post would stay out of Google after launch. Site-wide hiding until launch
     is already handled by `SITE_INDEXABLE`.
3. Settings → Image → Tag → the new SHA → Apply → Apply. Restart does nothing;
   the app is pinned to a SHA.
4. As a super admin, open `/admin/blog/agent` on the live site. Connection
   tab: paste the key, test, save. Settings tab: attempts `6` to match the six
   hourly ticks below, then switch the agent on — it starts off.
5. One manual production run: "run now" on a pending topic in the queue tab.
   That publishes on the live site — the owner's call.
6. The CronJob, **hourly inside a window** rather than once:
   `30 9-14 * * *` = 13:00 to 18:00 Tehran. The first tick that works claims the
   day's topic; later ticks find nothing due and exit, so extra hours are
   retries, not extra posts. Header `Authorization: Bearer <CRON_SECRET>`.
   Point it at the in-cluster service address, not the public hostname, so no
   proxy times out the long call.

**Watch out:** topic `d7db9a56` (the avere/essere test subject) is still
`pending` and has been due since 2026-09-12 19:11. The first production tick
will publish it. Either that is the intended first post, or reschedule it first.

## Open

1. **Verify prompt rules 4 and 5** on a real Luna output once the gateway is
   back (a poller in the session scratchpad was set to do it automatically;
   output in `bakeoff-v4`).
2. **Does a healthy gateway cut at 30 seconds to first byte?** Decides whether
   long articles need splitting. The same poller measures stream shape on a
   long cheap-model reply.
3. **Support ticket.** The ticket in the panel (`36E-323863C3-0032`, 2026-09-12
   22:55) went to **Cloud Assistant**, which is an AI; it gave a non-answer and
   auto-marked itself Solved. **No ticket has reached human Basic Support.** The
   outage gives a sharper question than the old one: a 504 on every endpoint,
   `/v1/models` included.
4. Deploy, per the plan above. Nothing is live; neither endpoint exists in
   production yet.
5. Branch is `preview`; none of this is committed.

## Owner's stated preferences

- Cost matters; cheaper is genuinely better.
- Wants to hand over a 30-day topic list and not touch the blog again.
- Wants short, step-by-step replies — long multi-part messages are hard to
  follow.
- Posts arriving through `ingest` must be drafts for review; that was explicit.
