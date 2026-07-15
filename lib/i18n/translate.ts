import type { Messages, TranslateParams } from "@/lib/i18n/types";

function getNestedValue(messages: Messages, key: string): string | undefined {
  const parts = key.split(".");
  let current: unknown = messages;

  for (const part of parts) {
    if (
      typeof current !== "object" ||
      current === null ||
      !(part in current)
    ) {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === "string" ? current : undefined;
}

function interpolate(template: string, params?: TranslateParams) {
  if (!params) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, token: string) => {
    const value = params[token];
    return value === undefined ? `{${token}}` : String(value);
  });
}

export function createTranslator(messages: Messages) {
  return function translate(key: string, params?: TranslateParams) {
    const value = getNestedValue(messages, key);
    if (!value) {
      return key;
    }
    return interpolate(value, params);
  };
}
