"use server";

import type { ActionResult } from "@/lib/action-result";
import {
  computeNextCodeForBand,
  computeNextOrderNumberForLanguage,
  getAdminCurriculumLevelsByLanguage,
} from "@/lib/curriculum/level-overrides";
import { isLanguageSlug } from "@/lib/curriculum/languages";
import { CEFR_BANDS, type CefrBand } from "@/lib/curriculum/types";
import { getDataRepository } from "@/lib/data";
import { revalidateAppContent } from "@/lib/revalidate-paths";
import { requireAdmin } from "@/lib/supabase/admin-guard";

/** Curriculum structure edits are a platform-wide change, so — like
 * language availability — they are restricted to super admins only. */
async function requireSuperAdmin(): Promise<
  | { ok: true }
  | { ok: false; error: "actions.errors.forbidden" }
> {
  const { profile } = await requireAdmin();
  if (profile.role !== "super_admin") {
    return { ok: false, error: "actions.errors.forbidden" };
  }
  return { ok: true };
}

function isCefrBand(value: string): value is CefrBand {
  return (CEFR_BANDS as readonly string[]).includes(value);
}

export type AddCurriculumLevelResult =
  | { error: string; code?: number }
  | { success: true; slug: string; code: string };

/**
 * Adds a brand-new curriculum level to a language (e.g. the first "A2-1").
 * A matching lesson slot is created automatically so content creation
 * (grammar/vocabulary/video/quiz) works immediately for the new level.
 */
export async function addCurriculumLevelAction(
  languageSlug: string,
  band: string,
  title: string,
  description: string
): Promise<AddCurriculumLevelResult> {
  const guard = await requireSuperAdmin();
  if (!guard.ok) return { error: guard.error };

  if (!isLanguageSlug(languageSlug)) {
    return { error: "actions.errors.generic" };
  }
  if (!isCefrBand(band)) {
    return { error: "actions.errors.generic" };
  }

  const trimmedTitle = title.trim();
  if (trimmedTitle.length < 2 || trimmedTitle.length > 150) {
    return { error: "validation.admin.titleMin" };
  }

  const repo = getDataRepository();
  const levelsByLanguage = await getAdminCurriculumLevelsByLanguage(repo);
  const currentLevels = levelsByLanguage[languageSlug] ?? [];

  const { code, slug } = computeNextCodeForBand(currentLevels, band);
  if (currentLevels.some((level) => level.slug === slug)) {
    return { error: "actions.errors.generic" };
  }

  const nextOrderNumber = computeNextOrderNumberForLanguage(currentLevels);

  const trimmedDescription = description.trim();

  const lessonResult = await repo.createLesson({
    title: trimmedTitle,
    description: trimmedDescription || null,
    orderNumber: nextOrderNumber,
  });
  if (lessonResult.error) {
    return { error: "actions.errors.generic" };
  }

  const overrideResult = await repo.upsertCurriculumLevelOverride({
    languageSlug,
    slug,
    code,
    title: trimmedTitle,
    description: trimmedDescription,
    orderNumber: nextOrderNumber,
    isCustom: true,
  });
  if (overrideResult.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true, slug, code };
}

/** Renames a level's title/description — works for both default levels
 * (creates a rename override) and previously-added custom levels. */
export async function renameCurriculumLevelAction(
  languageSlug: string,
  levelSlug: string,
  title: string,
  description: string
): Promise<ActionResult> {
  const guard = await requireSuperAdmin();
  if (!guard.ok) return { error: guard.error };

  if (!isLanguageSlug(languageSlug)) {
    return { error: "actions.errors.generic" };
  }

  const trimmedTitle = title.trim();
  if (trimmedTitle.length < 2 || trimmedTitle.length > 150) {
    return { error: "validation.admin.titleMin" };
  }

  const repo = getDataRepository();
  const levelsByLanguage = await getAdminCurriculumLevelsByLanguage(repo);
  const currentLevel = (levelsByLanguage[languageSlug] ?? []).find(
    (level) => level.slug === levelSlug
  );
  if (!currentLevel) {
    return { error: "actions.errors.generic" };
  }

  const result = await repo.upsertCurriculumLevelOverride({
    languageSlug,
    slug: currentLevel.slug,
    code: currentLevel.code,
    title: trimmedTitle,
    description: description.trim(),
    orderNumber: currentLevel.orderNumber,
    isCustom: currentLevel.isCustom ?? false,
  });

  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}

/** Removes a custom level from a language's curriculum. Default levels
 * can't be deleted, only renamed or reset. */
export async function deleteCurriculumLevelAction(
  languageSlug: string,
  levelSlug: string
): Promise<ActionResult> {
  const guard = await requireSuperAdmin();
  if (!guard.ok) return { error: guard.error };

  if (!isLanguageSlug(languageSlug)) {
    return { error: "actions.errors.generic" };
  }

  const repo = getDataRepository();
  const levelsByLanguage = await getAdminCurriculumLevelsByLanguage(repo);
  const currentLevel = (levelsByLanguage[languageSlug] ?? []).find(
    (level) => level.slug === levelSlug
  );

  if (!currentLevel?.isCustom) {
    return { error: "admin.languages.curriculum.cannotDeleteDefault" };
  }

  const result = await repo.deleteCurriculumLevelOverride(languageSlug, levelSlug);
  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}

/** Reverts a renamed default level back to its original title/description.
 * No-op (and rejected) for custom levels — those should be deleted instead. */
export async function resetCurriculumLevelAction(
  languageSlug: string,
  levelSlug: string
): Promise<ActionResult> {
  const guard = await requireSuperAdmin();
  if (!guard.ok) return { error: guard.error };

  if (!isLanguageSlug(languageSlug)) {
    return { error: "actions.errors.generic" };
  }

  const repo = getDataRepository();
  const levelsByLanguage = await getAdminCurriculumLevelsByLanguage(repo);
  const currentLevel = (levelsByLanguage[languageSlug] ?? []).find(
    (level) => level.slug === levelSlug
  );

  if (!currentLevel || currentLevel.isCustom) {
    return { error: "actions.errors.generic" };
  }

  const result = await repo.deleteCurriculumLevelOverride(languageSlug, levelSlug);
  if (result.error) {
    return { error: "actions.errors.generic" };
  }

  revalidateAppContent();
  return { success: true };
}
