"use server";

import { requireAdminPermission } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import {
  GRAMMAR_PAGES_PER_REQUEST,
  type RenderGrammarPagesResult,
  type StartGrammarUploadResult,
} from "@/lib/content-management/grammar-upload";
import {
  contentVocabularySchema,
  videoLessonSchema,
} from "@/lib/validations/admin";
import {
  deleteObjects,
  getObject,
  isObjectStorageConfigured,
  putObject,
} from "@/lib/storage";
import {
  countPdfPages,
  MAX_PDF_BYTES,
  MAX_PDF_PAGES,
  renderPdfToPages,
} from "@/lib/storage/pdf-pages";

/** The parked document is addressed by a key the client hands back, so its
 *  shape is checked rather than trusted. */
const UPLOAD_KEY_PATTERN = /^grammar-uploads\/[0-9a-f-]{36}\.pdf$/;

/**
 * Takes the title and the document, and hands back the work still to do.
 *
 * The PDF is parked in the bucket rather than held in memory: its pages are
 * rendered by later requests, and the bucket is the only place both can reach
 * it. The title is created as a draft no matter what the admin asked for, so
 * a run that stops halfway never leaves a learner an entry that opens onto
 * half a document. Publishing waits for finishGrammarUpload, once every page
 * is in.
 */
export async function startGrammarUpload(
  formData: FormData
): Promise<StartGrammarUploadResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  if (!isObjectStorageConfigured()) {
    return { error: "admin.content.grammar.errors.storageUnconfigured" };
  }

  const lessonId = formData.get("lessonId");
  const title = formData.get("title");
  const file = formData.get("document");

  if (
    typeof lessonId !== "string" ||
    typeof title !== "string" ||
    title.trim().length < 2
  ) {
    return { error: "actions.errors.invalidInput" };
  }
  if (!(file instanceof File) || file.size === 0) {
    return { error: "admin.content.grammar.errors.fileRequired" };
  }
  if (file.type !== "application/pdf") {
    return { error: "admin.content.grammar.errors.notPdf" };
  }
  if (file.size > MAX_PDF_BYTES) {
    return { error: "admin.content.grammar.errors.tooLarge" };
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  // Counting first refuses an over-long document in a second, rather than
  // after minutes of rendering that then gets thrown away.
  let pageCount: number;
  try {
    pageCount = await countPdfPages(bytes);
  } catch {
    return { error: "admin.content.grammar.errors.unreadable" };
  }
  if (pageCount === 0) {
    return { error: "admin.content.grammar.errors.unreadable" };
  }
  if (pageCount > MAX_PDF_PAGES) {
    return { error: "admin.content.grammar.errors.tooManyPages" };
  }

  const uploadKey = `grammar-uploads/${crypto.randomUUID()}.pdf`;
  try {
    await putObject(uploadKey, bytes, "application/pdf");
  } catch {
    return { error: "admin.content.grammar.errors.uploadFailed" };
  }

  const repo = getDataRepository();
  const created = await repo.createGrammarRule({
    lesson_id: lessonId,
    title: title.trim(),
    description: null,
    example: null,
    status: "draft",
  });
  if (created.error || !created.id) {
    await deleteObjects([uploadKey]).catch(() => {});
    return { error: "actions.errors.generic" };
  }

  return { ruleId: created.id, uploadKey, pageCount };
}

/**
 * Renders one stretch of the parked document and files those pages.
 *
 * Pages are appended, so 1-3 followed by 4-6 leaves the title numbered the way
 * the document reads. A batch that fails takes only itself down: what earlier
 * calls stored stays put, and the caller decides whether to retry this stretch
 * or give the title up.
 */
export async function renderGrammarPages(input: {
  ruleId: string;
  uploadKey: string;
  documentName: string;
  from: number;
  to: number;
}): Promise<RenderGrammarPagesResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  if (
    !UPLOAD_KEY_PATTERN.test(input.uploadKey) ||
    !Number.isInteger(input.from) ||
    !Number.isInteger(input.to) ||
    input.from < 1 ||
    input.to < input.from ||
    input.to - input.from >= GRAMMAR_PAGES_PER_REQUEST
  ) {
    return { error: "actions.errors.invalidInput" };
  }

  let source: Buffer;
  try {
    source = await getObject(input.uploadKey);
  } catch {
    return { error: "admin.content.grammar.errors.uploadFailed" };
  }

  let rendered;
  try {
    rendered = await renderPdfToPages(source, {
      from: input.from,
      to: input.to,
    });
  } catch {
    return { error: "admin.content.grammar.errors.renderFailed" };
  }
  if (rendered.length === 0) {
    return { error: "admin.content.grammar.errors.renderFailed" };
  }

  // Upload before recording. A page row pointing at an object that was never
  // written would render as a broken page for every learner; an object with no
  // row is invisible and costs a few kilobytes.
  const uploaded: Array<{
    objectKey: string;
    width: number;
    height: number;
    sourcePage: number;
  }> = [];

  try {
    for (const page of rendered) {
      const objectKey = `grammar/${input.ruleId}/${crypto.randomUUID()}.webp`;
      await putObject(objectKey, page.bytes, "image/webp");
      uploaded.push({
        objectKey,
        width: page.width,
        height: page.height,
        sourcePage: page.pageNumber,
      });
    }

    const appended = await getDataRepository().appendGrammarPages(
      input.ruleId,
      input.documentName,
      uploaded
    );
    if (appended.error) throw new Error(appended.error);
  } catch {
    await deleteObjects(uploaded.map((page) => page.objectKey)).catch(() => {});
    return { error: "admin.content.grammar.errors.uploadFailed" };
  }

  return { rendered: rendered.length };
}

/**
 * Closes a title whose pages are all in: publishes it if that is what was
 * asked for, and drops the parked PDF, which has done its job.
 */
export async function finishGrammarUpload(input: {
  ruleId: string;
  uploadKey: string;
  lessonId: string;
  status: "draft" | "published";
}): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  if (UPLOAD_KEY_PATTERN.test(input.uploadKey)) {
    await deleteObjects([input.uploadKey]).catch(() => {});
  }

  if (input.status === "published") {
    const updated = await getDataRepository().updateGrammarRule(input.ruleId, {
      status: "published",
    });
    if (updated.error) return { error: "actions.errors.generic" };
  }

  revalidateAppContent(input.lessonId);
  return { success: true };
}

/**
 * Clears away a title whose pages never all arrived.
 *
 * Leaving nothing half-made is the rule the single-request version followed
 * too; it just has to be asked for now, because the client is the only one
 * that knows the run was abandoned.
 */
export async function abortGrammarUpload(input: {
  ruleId: string;
  uploadKey: string;
}): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const keys: string[] = await repo
    .getGrammarPageKeys(input.ruleId)
    .catch(() => []);
  if (UPLOAD_KEY_PATTERN.test(input.uploadKey)) keys.push(input.uploadKey);

  await deleteObjects(keys).catch(() => {});
  await repo.deleteGrammarRule(input.ruleId).catch(() => {});

  return { success: true };
}

export async function createContentVocabulary(
  values: unknown
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = contentVocabularySchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.createVocabulary({
    lesson_id: parsed.data.lessonId,
    word: parsed.data.word,
    translation: parsed.data.translation,
    image_url: parsed.data.imageUrl,
    example_sentence: parsed.data.exampleSentence || null,
    pronunciation: parsed.data.pronunciation || null,
    status: parsed.data.status,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function createContentVideo(values: unknown): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = videoLessonSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.createVideoLesson({
    lesson_id: parsed.data.lessonId,
    language_slug: parsed.data.languageSlug,
    level_slug: parsed.data.levelSlug,
    title: parsed.data.title,
    description: parsed.data.description || null,
    video_url: parsed.data.videoUrl,
    thumbnail_url: parsed.data.thumbnailUrl || null,
    status: parsed.data.status,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}
