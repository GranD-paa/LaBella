"use server";

import { requireAdminPermission } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
import {
  contentVocabularySchema,
  videoLessonSchema,
} from "@/lib/validations/admin";
import {
  deleteObjects,
  isObjectStorageConfigured,
  putObject,
} from "@/lib/storage";
import {
  countPdfPages,
  MAX_PDF_BYTES,
  MAX_PDF_PAGES,
  renderPdfToPages,
} from "@/lib/storage/pdf-pages";

/**
 * Adds one grammar title to a lesson, with the document a learner will read.
 *
 * Grammar is a PDF, not prose, so this is a single step: the title and the
 * file arrive together and either both land or neither does. The pages are
 * rendered here and the PDF is discarded — what the learner eventually
 * receives is a signed link to one page image at a time, never the document.
 *
 * The lesson comes from the wizard's own context, so an upload is always
 * bound to the lesson the admin is standing in.
 */
export async function createContentGrammar(
  formData: FormData
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  if (!isObjectStorageConfigured()) {
    return { error: "admin.content.grammar.errors.storageUnconfigured" };
  }

  const lessonId = formData.get("lessonId");
  const title = formData.get("title");
  const status = formData.get("status");
  const file = formData.get("document");

  if (
    typeof lessonId !== "string" ||
    typeof title !== "string" ||
    title.trim().length < 2 ||
    (status !== "draft" && status !== "published")
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

  let rendered;
  try {
    rendered = await renderPdfToPages(bytes);
  } catch {
    return { error: "admin.content.grammar.errors.renderFailed" };
  }

  const repo = getDataRepository();
  const created = await repo.createGrammarRule({
    lesson_id: lessonId,
    title: title.trim(),
    description: null,
    example: null,
    status,
  });
  if (created.error || !created.id) {
    return { error: "actions.errors.generic" };
  }
  const ruleId = created.id;

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
      const objectKey = `grammar/${ruleId}/${crypto.randomUUID()}.webp`;
      await putObject(objectKey, page.bytes, "image/webp");
      uploaded.push({
        objectKey,
        width: page.width,
        height: page.height,
        sourcePage: page.pageNumber,
      });
    }

    const appended = await repo.appendGrammarPages(ruleId, file.name, uploaded);
    if (appended.error) throw new Error(appended.error);
  } catch {
    // Leave nothing half-made: a title with no pages would show a learner an
    // entry that opens onto nothing.
    await deleteObjects(uploaded.map((page) => page.objectKey)).catch(() => {});
    await repo.deleteGrammarRule(ruleId).catch(() => {});
    return { error: "admin.content.grammar.errors.uploadFailed" };
  }

  revalidateAppContent(lessonId);
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
