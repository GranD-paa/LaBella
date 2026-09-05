/**
 * The shape of a chunked grammar upload, in a module of its own because a
 * `"use server"` file may export nothing but async functions — the constant
 * and the result types cannot live beside the actions that use them.
 */

/**
 * How many pages one request renders.
 *
 * The whole document used to go in a single call, which is how an eleven-page
 * upload came to finish on the server after the browser had already given up
 * on the answer. A few pages at a time keeps every request short enough to
 * survive whatever sits between the two, and lets the admin watch the count
 * climb instead of staring at a spinner.
 */
export const GRAMMAR_PAGES_PER_REQUEST = 3;

export type StartGrammarUploadResult =
  | { error: string }
  | { ruleId: string; uploadKey: string; pageCount: number };

export type RenderGrammarPagesResult = { error: string } | { rendered: number };
