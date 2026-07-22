import { LANGUAGES, getLanguage } from "@/lib/curriculum/languages";
import { CEFR_BANDS, type CefrBand, type CurriculumLevel } from "@/lib/curriculum/types";
import type { DataRepository } from "@/lib/data/repository";

/**
 * A single row of super-admin customization for a language's curriculum.
 *
 * `isCustom: false` rows only *rename* an existing default level (title /
 * description) — the slug, code, and order number always come from the
 * static default in that case. `isCustom: true` rows are entirely new
 * levels (e.g. the first "A2-1" for a language) with their own dedicated
 * lesson slot, created alongside the row.
 */
export type CurriculumLevelOverrideRow = {
  languageSlug: string;
  slug: string;
  code: string;
  title: string;
  description: string;
  orderNumber: number;
  isCustom: boolean;
};

export function mergeLevelOverrides(
  defaults: CurriculumLevel[],
  overrides: CurriculumLevelOverrideRow[]
): CurriculumLevel[] {
  const renameBySlug = new Map(
    overrides.filter((row) => !row.isCustom).map((row) => [row.slug, row])
  );

  const mergedDefaults = defaults.map((level) => {
    const rename = renameBySlug.get(level.slug);
    return rename
      ? { ...level, title: rename.title, description: rename.description }
      : level;
  });

  const customLevels: CurriculumLevel[] = overrides
    .filter((row) => row.isCustom)
    .map((row) => ({
      slug: row.slug,
      code: row.code,
      title: row.title,
      description: row.description,
      orderNumber: row.orderNumber,
      isCustom: true,
    }));

  return [...mergedDefaults, ...customLevels].sort(
    (a, b) => a.orderNumber - b.orderNumber
  );
}

/** Levels for one language, merged with any stored overrides. */
export async function getCurriculumLevelsForLanguage(
  repo: DataRepository,
  languageSlug: string
): Promise<CurriculumLevel[]> {
  const language = getLanguage(languageSlug);
  if (!language) return [];

  const overrides = await repo.getCurriculumLevelOverrides();
  return mergeLevelOverrides(
    language.levels,
    overrides.filter((row) => row.languageSlug === languageSlug)
  );
}

/** Merged levels for every language, keyed by language slug — used by the
 *  admin curriculum manager so it can render all four languages at once
 *  without extra round-trips when the admin switches tabs. */
export async function getAdminCurriculumLevelsByLanguage(
  repo: DataRepository
): Promise<Record<string, CurriculumLevel[]>> {
  const overrides = await repo.getCurriculumLevelOverrides();
  const result: Record<string, CurriculumLevel[]> = {};

  for (const language of LANGUAGES) {
    result[language.slug] = mergeLevelOverrides(
      language.levels,
      overrides.filter((row) => row.languageSlug === language.slug)
    );
  }

  return result;
}

export function getBandFromCode(code: string): CefrBand | null {
  const prefix = code.split("-")[0]?.toUpperCase();
  return (CEFR_BANDS as readonly string[]).includes(prefix ?? "")
    ? (prefix as CefrBand)
    : null;
}

/** Groups a language's merged levels by CEFR band, in canonical band order. */
export function groupLevelsByBand(
  levels: CurriculumLevel[]
): Array<{ band: CefrBand; levels: CurriculumLevel[] }> {
  const groups = new Map<CefrBand, CurriculumLevel[]>();

  for (const level of levels) {
    const band = getBandFromCode(level.code) ?? "A1";
    const existing = groups.get(band);
    if (existing) {
      existing.push(level);
    } else {
      groups.set(band, [level]);
    }
  }

  return CEFR_BANDS.filter((band) => groups.has(band)).map((band) => ({
    band,
    levels: groups.get(band)!,
  }));
}

/** Computes the next free "{BAND}-{n}" code within a language's level list. */
export function computeNextCodeForBand(
  levels: CurriculumLevel[],
  band: CefrBand
): { code: string; slug: string } {
  const prefix = `${band}-`;
  let highest = 0;

  for (const level of levels) {
    if (level.code.toUpperCase().startsWith(prefix)) {
      const suffix = Number.parseInt(level.code.slice(prefix.length), 10);
      if (Number.isFinite(suffix) && suffix > highest) {
        highest = suffix;
      }
    }
  }

  const nextNumber = highest + 1;
  const code = `${band}-${nextNumber}`;
  return { code, slug: code.toLowerCase() };
}
