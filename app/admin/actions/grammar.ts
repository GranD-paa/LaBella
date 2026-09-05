"use server";

import { requireAdminPermission } from "@/lib/auth/action-guards";
import { getDataRepository } from "@/lib/data";
import { grammarRuleSchema } from "@/lib/validations/admin";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import type { ActionResult } from "@/lib/action-result";
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

export async function createGrammarRule(values: unknown): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = grammarRuleSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.createGrammarRule({
    lesson_id: parsed.data.lessonId,
    title: parsed.data.title,
    description: parsed.data.description || null,
    example: parsed.data.example || null,
    status: "published",
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function updateGrammarRule(
  id: string,
  values: unknown
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const parsed = grammarRuleSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "actions.errors.invalidInput" };
  }

  const repo = getDataRepository();
  const result = await repo.updateGrammarRule(id, {
    lesson_id: parsed.data.lessonId,
    title: parsed.data.title,
    description: parsed.data.description || null,
    example: parsed.data.example || null,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(parsed.data.lessonId);
  return { success: true };
}

export async function deleteGrammarRule(id: string): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const repo = getDataRepository();
  const row = (await repo.getAllGrammarRules()).find((item) => item.id === id);

  // The page rows go with the title on their own — the foreign key cascades —
  // but the stored images do not, so collect their keys while the rows are
  // still there to name them.
  const objectKeys = await repo.getGrammarPageKeys(id);

  const result = await repo.deleteGrammarRule(id);

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  await deleteObjects(objectKeys).catch(() => {});

  revalidateAppContent(row?.lesson_id);
  return { success: true };
}

/**
 * Takes a PDF and turns it into the pages a learner will read.
 *
 * The document itself is never stored or served. Each page is rendered to an
 * image, uploaded to private object storage, and recorded against the title;
 * what reaches the browser later is a signed link to one image at a time. That
 * is what "no download" rests on — there is no file on the other end to save.
 *
 * Rendering happens inline rather than in a queue. It is an admin action on a
 * bounded document, so the wait is the honest cost of the upload; the page and
 * size caps in lib/storage/pdf-pages keep that wait to something a request can
 * survive.
 */
export async function uploadGrammarDocument(
  formData: FormData
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  if (!isObjectStorageConfigured()) {
    return { error: "admin.grammar.errors.storageUnconfigured" };
  }

  const ruleId = formData.get("ruleId");
  const lessonId = formData.get("lessonId");
  const file = formData.get("document");

  if (typeof ruleId !== "string" || typeof lessonId !== "string") {
    return { error: "actions.errors.invalidInput" };
  }
  if (!(file instanceof File) || file.size === 0) {
    return { error: "admin.grammar.errors.fileRequired" };
  }
  if (file.type !== "application/pdf") {
    return { error: "admin.grammar.errors.notPdf" };
  }
  if (file.size > MAX_PDF_BYTES) {
    return { error: "admin.grammar.errors.tooLarge" };
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  // Counting first means an over-long document is refused in a second rather
  // than after several minutes of rendering work that gets thrown away.
  let pageCount: number;
  try {
    pageCount = await countPdfPages(bytes);
  } catch {
    return { error: "admin.grammar.errors.unreadable" };
  }
  if (pageCount === 0) {
    return { error: "admin.grammar.errors.unreadable" };
  }
  if (pageCount > MAX_PDF_PAGES) {
    return { error: "admin.grammar.errors.tooManyPages" };
  }

  let rendered;
  try {
    rendered = await renderPdfToPages(bytes);
  } catch {
    return { error: "admin.grammar.errors.renderFailed" };
  }

  // Upload before recording. A page row that points at an object which was
  // never written would render as a broken page for every learner; an object
  // with no row is invisible and costs a few kilobytes.
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
  } catch {
    await deleteObjects(uploaded.map((page) => page.objectKey)).catch(() => {});
    return { error: "admin.grammar.errors.uploadFailed" };
  }

  const result = await getDataRepository().appendGrammarPages(
    ruleId,
    file.name,
    uploaded
  );
  if (result.error) {
    await deleteObjects(uploaded.map((page) => page.objectKey)).catch(() => {});
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent(lessonId);
  return { success: true };
}

/** Removes one uploaded document from a title, pages and stored files alike. */
export async function removeGrammarDocument(
  ruleId: string,
  lessonId: string,
  sourceDocument: string
): Promise<ActionResult> {
  const guard = await requireAdminPermission("manageContent");
  if (!guard.ok) return { error: guard.error };

  const result = await getDataRepository().removeGrammarDocument(
    ruleId,
    sourceDocument
  );
  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  // The rows are already gone, so a failure here leaks storage rather than
  // breaking the reader. Not worth failing the action the admin asked for.
  await deleteObjects(result.objectKeys).catch(() => {});

  revalidateAppContent(lessonId);
  return { success: true };
}
