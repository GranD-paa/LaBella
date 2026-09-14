/**
 * The one place the blog agent talks to a language model.
 *
 * Everything goes through an OpenAI-compatible gateway — ArvanCloud's AIaaS
 * unless the admin panel says otherwise. That default is not about taste:
 * this site runs in a container in Tehran, and the providers themselves
 * refuse requests from Iranian addresses. The gateway is inside the same
 * network as the app, bills in rial, and needs no proxy — which is the
 * difference between an agent that runs unattended and one that stops the
 * first time a tunnel drops.
 *
 * Because the format is OpenAI's, any compatible service works. The panel
 * stores one base URL and one key, and every call below accepts them as an
 * `AiConnection`. Nothing here knows the word "Arvan" except the default.
 */

/** Where the gateway lives when neither the panel nor the environment says. */
export const DEFAULT_AI_BASE_URL = "https://api.arvancloudai.ir/v1";

/** One OpenAI-compatible service: where it is, and the key that pays for it. */
export type AiConnection = {
  baseUrl: string;
  apiKey: string;
};

/**
 * How long a single text generation may take.
 *
 * Two minutes was the first guess and it was wrong: a full Persian article
 * with the image brief attached ran past it, and the run died on our own
 * deadline rather than on anything real. Five leaves room for a slow
 * afternoon while still landing inside the gateway's own ceiling — it hangs
 * up somewhere around the six-minute mark — so a stalled model is reported as
 * our timeout, with a message that says so, instead of as an opaque
 * `terminated` from the socket.
 */
const TEXT_TIMEOUT_MS = 300_000;

/** Images take longer per call and there is only one of them per run. */
const IMAGE_TIMEOUT_MS = 180_000;

export type TokenUsage = {
  promptTokens: number;
  completionTokens: number;
};

export type ChatResult<T> = {
  data: T;
  usage: TokenUsage;
  /** What the model actually returned, kept for the run log when parsing
   * fails and the error alone does not say why. */
  raw: string;
};

export type GeneratedImage = {
  bytes: Buffer;
  contentType: string;
  usage: TokenUsage;
};

export class AiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly body?: string
  ) {
    super(message);
    this.name = "AiError";
  }
}

/**
 * One spelling per address. Surrounding spaces and trailing slashes do not
 * make a different service, and the panel compares addresses through this
 * before it lets a saved key be used.
 */
export function normalizeBaseUrl(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

/**
 * The connection a call uses.
 *
 * An explicit connection — the one saved in the admin panel — wins. Without
 * one, the environment variables apply, which is how local scripts and the
 * bake-off still run without a database behind them. The agent itself always
 * passes one.
 */
function resolveConnection(connection?: AiConnection | null): AiConnection {
  const baseUrl = normalizeBaseUrl(
    connection?.baseUrl || process.env.ARVAN_AI_BASE_URL || DEFAULT_AI_BASE_URL
  );
  const apiKey = connection ? connection.apiKey : process.env.ARVAN_AI_API_KEY;

  if (!apiKey) {
    throw new AiError(
      "No API key is configured; the blog agent cannot reach the AI service."
    );
  }
  return { baseUrl, apiKey };
}

/**
 * A request and the deadline that covers all of it.
 *
 * The timer is deliberately *not* cleared when `fetch` resolves. On a
 * streamed call `fetch` resolves as soon as the response headers land, and
 * all of the waiting can happen afterwards, while the body trickles in.
 * Clearing the timer there leaves the body read with no deadline at all,
 * which is how a stalled model held a run open for six minutes before the
 * gateway, not us, gave up on it.
 *
 * The caller closes the deadline with `done()` once it has finished reading.
 */
function post(
  path: string,
  body: unknown,
  timeoutMs: number,
  connection?: AiConnection | null
): Promise<{ response: Response; done: () => void }> {
  const { baseUrl, apiKey } = resolveConnection(connection);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const done = () => clearTimeout(timer);

  return fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    signal: controller.signal,
  })
    .then((response) => ({ response, done }))
    .catch((error: unknown) => {
      done();
      if (error instanceof Error && error.name === "AbortError") {
        throw new AiError(
          `Gateway did not finish within ${Math.round(timeoutMs / 1000)}s.`
        );
      }
      throw error;
    });
}

function readUsage(payload: {
  usage?: { prompt_tokens?: number; completion_tokens?: number };
}): TokenUsage {
  return {
    promptTokens: payload.usage?.prompt_tokens ?? 0,
    completionTokens: payload.usage?.completion_tokens ?? 0,
  };
}

/**
 * Asks a model for one JSON object and hands it back parsed.
 *
 * The schema is sent as `response_format: json_schema`, which the gateway
 * forwards to providers that support it. Support is per-provider rather than
 * per-model, so a model that quietly ignores it is a real possibility — and
 * that is why the response is still parsed defensively below rather than
 * trusted. A model that wraps its JSON in a ```json fence is not an error
 * worth failing a whole run over.
 */
export async function chatJSON<T>({
  model,
  system,
  user,
  schemaName,
  schema,
  maxTokens = 16_000,
  temperature = 0.7,
  connection,
}: {
  model: string;
  system: string;
  user: string;
  schemaName: string;
  schema: Record<string, unknown>;
  maxTokens?: number;
  temperature?: number;
  connection?: AiConnection | null;
}): Promise<ChatResult<T>> {
  const { response, done } = await post(
    "/chat/completions",
    {
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: {
        type: "json_schema",
        json_schema: { name: schemaName, strict: true, schema },
      },
      // Streamed, and not for the user experience — nothing here renders a
      // token as it arrives. The gateway closes an idle connection at about
      // sixty seconds, and a reasoning model writing a two-thousand-word
      // Persian article thinks for longer than that before it emits its first
      // byte. Unstreamed, every real article died as `undici` "terminated"
      // just past the minute mark.
      stream: true,
      // Without this the final chunk carries no `usage` and every run would
      // report zero tokens and zero cost.
      stream_options: { include_usage: true },
    },
    TEXT_TIMEOUT_MS,
    connection
  );

  if (!response.ok) {
    done();
    // The status goes into the message itself, because the message is what
    // the run log and the panel show. "Rejected" alone does not separate a
    // wrong key (401) from a service that is down (504).
    throw new AiError(
      `Gateway rejected the chat request for ${model} (HTTP ${response.status}).`,
      response.status,
      (await response.text()).slice(0, 2000)
    );
  }

  let content: string;
  let usage: TokenUsage;
  try {
    ({ content, usage } = await readChatStream(response, model));
  } finally {
    done();
  }
  if (!content.trim()) {
    throw new AiError(`${model} returned an empty message.`, 200);
  }

  return {
    data: parseJsonLoosely<T>(content, model),
    usage,
    raw: content,
  };
}

/**
 * Reassembles a streamed chat completion.
 *
 * Server-sent events, one JSON object per `data:` line, terminated by
 * `data: [DONE]`. Only two things are taken from it: the concatenated
 * `delta.content`, and the `usage` object that arrives on the last chunk.
 *
 * `delta.reasoning_content` is deliberately ignored. Reasoning models emit
 * their working there and their answer in `content`; concatenating both would
 * hand the JSON parser a paragraph of English deliberation wrapped around the
 * object it wants. The reasoning is still billed — it counts in
 * `completion_tokens` — which is the real reason these models cost more per
 * article than their rate card suggests.
 */
async function readChatStream(
  response: Response,
  model: string
): Promise<{ content: string; usage: TokenUsage }> {
  const body = response.body;
  if (!body) throw new AiError(`${model} returned no response body.`);

  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let content = "";
  let usage: TokenUsage = { promptTokens: 0, completionTokens: 0 };

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    // Events are separated by newlines and a chunk can split one in half, so
    // the tail stays in the buffer until its newline arrives.
    let newline: number;
    while ((newline = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, newline).trim();
      buffer = buffer.slice(newline + 1);
      if (!line.startsWith("data:")) continue;

      const payload = line.slice(5).trim();
      if (payload === "[DONE]") continue;

      try {
        const chunk = JSON.parse(payload) as {
          choices?: { delta?: { content?: string } }[];
          usage?: { prompt_tokens?: number; completion_tokens?: number };
          error?: unknown;
        };
        const delta = chunk.choices?.[0]?.delta?.content;
        if (delta) content += delta;
        if (chunk.usage) usage = readUsage(chunk);
        if (chunk.error) {
          throw new AiError(
            `${model} reported an error mid-stream.`,
            200,
            JSON.stringify(chunk.error).slice(0, 1000)
          );
        }
      } catch (error) {
        if (error instanceof AiError) throw error;
        // A malformed event is not worth failing a whole article over; the
        // parse of the assembled content is the real check.
      }
    }
  }

  return { content, usage };
}

/**
 * Pulls a JSON object out of a model's reply.
 *
 * Strict mode is requested, but "requested" and "enforced" are different
 * words and the difference shows up as a fenced code block or a sentence of
 * preamble. Rather than fail the run, the fence is stripped and the outermost
 * braces are used — the same recovery a person would do by eye.
 */
function parseJsonLoosely<T>(content: string, model: string): T {
  const unfenced = content
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    return JSON.parse(unfenced) as T;
  } catch {
    // Fall through to the brace scan.
  }

  const start = unfenced.indexOf("{");
  const end = unfenced.lastIndexOf("}");
  if (start !== -1 && end > start) {
    try {
      return JSON.parse(unfenced.slice(start, end + 1)) as T;
    } catch {
      // Fall through to the error.
    }
  }

  throw new AiError(
    `${model} did not return parseable JSON.`,
    200,
    content.slice(0, 2000)
  );
}

export type PingResult =
  | { ok: true; ms: number; reply: string }
  | { ok: false; ms: number; status?: number; error: string };

/**
 * The cheapest possible "does this work": one short, unstreamed request.
 *
 * Used by the panel's connection test, so the owner finds out that a key is
 * wrong or a model name is misspelt from a button rather than from tomorrow's
 * failed run. It costs a handful of tokens. Never throws — a failure is the
 * answer, not an exception.
 */
export async function pingModel({
  model,
  connection,
  timeoutMs = 45_000,
}: {
  model: string;
  connection?: AiConnection | null;
  timeoutMs?: number;
}): Promise<PingResult> {
  const started = Date.now();
  const elapsed = () => Date.now() - started;

  try {
    const { response, done } = await post(
      "/chat/completions",
      {
        model,
        messages: [{ role: "user", content: "Reply with the single word OK." }],
        // Room for a reasoning model to think briefly and still answer.
        max_tokens: 200,
      },
      timeoutMs,
      connection
    );

    try {
      const text = await response.text();
      if (!response.ok) {
        return {
          ok: false,
          ms: elapsed(),
          status: response.status,
          error: text.replace(/\s+/g, " ").slice(0, 300),
        };
      }

      let reply = "";
      try {
        const payload = JSON.parse(text) as {
          choices?: { message?: { content?: string | null } }[];
        };
        reply = payload.choices?.[0]?.message?.content ?? "";
      } catch {
        return {
          ok: false,
          ms: elapsed(),
          status: response.status,
          error: "The service answered, but not in the OpenAI format.",
        };
      }

      return { ok: true, ms: elapsed(), reply: reply.slice(0, 80) };
    } finally {
      done();
    }
  } catch (error) {
    return {
      ok: false,
      ms: elapsed(),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Generates one picture and returns its bytes.
 *
 * Two request shapes are tried, in order, because the gateway's image
 * surface is newer than its chat surface and which one answers depends on
 * the model behind it. `/images/generations` is the OpenAI-standard shape;
 * the Gemini image models are multimodal chat models whose picture arrives
 * inside a chat completion instead. Trying the standard shape first and
 * falling back keeps the caller from having to know which kind it asked for.
 *
 * The fallback is only taken on a 404/405 — a shape mismatch — never on a
 * 4xx that means the request itself was wrong, because retrying a rejected
 * prompt in a different envelope just spends money twice.
 */
export async function generateImage({
  model,
  prompt,
  connection,
}: {
  model: string;
  prompt: string;
  connection?: AiConnection | null;
}): Promise<GeneratedImage> {
  const direct = await post(
    "/images/generations",
    { model, prompt, n: 1 },
    IMAGE_TIMEOUT_MS,
    connection
  );

  try {
    if (direct.response.ok) {
      return decodeImagePayload(await direct.response.text(), model);
    }

    const status = direct.response.status;
    if (status !== 404 && status !== 405 && status !== 501) {
      throw new AiError(
        `Image gateway rejected ${model} (HTTP ${status}).`,
        status,
        (await direct.response.text()).slice(0, 2000)
      );
    }
  } finally {
    direct.done();
  }

  const chat = await post(
    "/chat/completions",
    {
      model,
      messages: [{ role: "user", content: prompt }],
      modalities: ["image", "text"],
    },
    IMAGE_TIMEOUT_MS,
    connection
  );

  try {
    const text = await chat.response.text();
    if (!chat.response.ok) {
      throw new AiError(
        `Image generation through chat failed for ${model} (HTTP ${chat.response.status}).`,
        chat.response.status,
        text.slice(0, 2000)
      );
    }
    return decodeImagePayload(text, model);
  } finally {
    chat.done();
  }
}

/** Content types the blog's own image store will accept. Anything else is
 * refused here rather than at the upload, where the message is vaguer. */
const ACCEPTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

/**
 * Finds the picture in whatever the gateway sent back.
 *
 * Five shapes are in circulation across the providers behind this gateway
 * and the response does not say which one it is using, so each is probed in
 * turn. This is ugly on purpose: the alternative is pinning one shape and
 * having the cover silently stop appearing the day a provider changes.
 */
function decodeImagePayload(text: string, model: string): GeneratedImage {
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new AiError(
      `${model} returned an image body that is not JSON.`,
      200,
      text.slice(0, 2000)
    );
  }

  const usage = readUsage(payload as { usage?: Record<string, number> });
  const found = findImage(payload);
  if (!found) {
    throw new AiError(
      `Could not find image bytes in the reply from ${model}.`,
      200,
      text.slice(0, 2000)
    );
  }

  if (!ACCEPTED_IMAGE_TYPES.has(found.contentType)) {
    throw new AiError(
      `${model} returned ${found.contentType}, which the blog's image store does not accept.`
    );
  }

  return { bytes: found.bytes, contentType: found.contentType, usage };
}

type FoundImage = { bytes: Buffer; contentType: string };

function findImage(payload: unknown): FoundImage | null {
  const seen = new Set<unknown>();

  const walk = (node: unknown): FoundImage | null => {
    if (!node || typeof node !== "object") return null;
    if (seen.has(node)) return null;
    seen.add(node);

    if (Array.isArray(node)) {
      for (const item of node) {
        const hit = walk(item);
        if (hit) return hit;
      }
      return null;
    }

    const record = node as Record<string, unknown>;

    // Shape 1 — OpenAI images API: { b64_json, media_type? }
    if (typeof record.b64_json === "string") {
      return fromBase64(
        record.b64_json,
        asString(record.media_type) ?? asString(record.mime_type) ?? "image/png"
      );
    }

    // Shape 2 — Google inline data: { inlineData: { mimeType, data } }
    const inline = (record.inlineData ?? record.inline_data) as
      | Record<string, unknown>
      | undefined;
    if (inline && typeof inline.data === "string") {
      return fromBase64(
        inline.data,
        asString(inline.mimeType) ?? asString(inline.mime_type) ?? "image/png"
      );
    }

    // Shape 3 — a data: URL, wherever it is hiding.
    for (const key of ["url", "image_url", "b64", "data"]) {
      const value = record[key];
      if (typeof value === "string" && value.startsWith("data:image/")) {
        return fromDataUrl(value);
      }
      if (
        value &&
        typeof value === "object" &&
        typeof (value as Record<string, unknown>).url === "string"
      ) {
        const url = (value as Record<string, unknown>).url as string;
        if (url.startsWith("data:image/")) return fromDataUrl(url);
      }
    }

    // Shape 4 — the one this gateway actually uses: the picture arrives as
    // Markdown inside `message.content`, i.e. `![image](data:image/jpeg;…)`.
    // The data URL is a substring of ordinary prose, so no key name leads to
    // it and every string has to be looked at.
    for (const value of Object.values(record)) {
      if (typeof value === "string") {
        const embedded = extractDataUrl(value);
        if (embedded) return fromDataUrl(embedded);
        continue;
      }
      const hit = walk(value);
      if (hit) return hit;
    }
    return null;
  };

  return walk(payload);
}

/** Pulls `data:image/…` out of surrounding text. Stops at the first
 * character Markdown or JSON would use to close it. */
function extractDataUrl(value: string): string | null {
  const match = /data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/.exec(value);
  return match ? match[0] : null;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function fromBase64(data: string, contentType: string): FoundImage {
  return { bytes: Buffer.from(data, "base64"), contentType };
}

function fromDataUrl(url: string): FoundImage {
  // `[\s\S]` rather than `.` with the `s` flag: the project targets a
  // pre-2018 lib and dotall is not available there. Base64 payloads are
  // occasionally wrapped, so the newline case is real.
  const match = /^data:([^;,]+)(;base64)?,([\s\S]*)$/.exec(url);
  if (!match) {
    throw new AiError("A data: URL in the reply could not be parsed.");
  }
  const [, contentType, isBase64, data] = match;
  return {
    bytes: isBase64
      ? Buffer.from(data, "base64")
      : Buffer.from(decodeURIComponent(data), "utf8"),
    contentType,
  };
}
