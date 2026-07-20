import type {
  CurriculumLevel,
  LanguageSlug,
} from "@/lib/curriculum/types";

type Translator = (
  key: string,
  params?: Record<string, string | number>
) => string;

function resolveMessage(t: Translator, key: string, fallback: string): string {
  const translated = t(key);
  return translated === key ? fallback : translated;
}

export function getLocalizedLanguageName(
  languageSlug: LanguageSlug,
  t: Translator
): string {
  const key = `locale.${languageSlug}`;
  return resolveMessage(t, key, languageSlug);
}

export function getLocalizedLevel(
  languageSlug: LanguageSlug,
  level: CurriculumLevel,
  t: Translator
): { title: string; description: string } {
  const titleKey = `curriculum.${languageSlug}.levels.${level.slug}.title`;
  const descriptionKey = `curriculum.${languageSlug}.levels.${level.slug}.description`;

  return {
    title: resolveMessage(t, titleKey, level.title),
    description: resolveMessage(t, descriptionKey, level.description),
  };
}
