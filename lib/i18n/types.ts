import type en from "@/locales/en/translation.json";

export type AppLocale = "fa" | "it" | "en";

type DeepStringRecord<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends Record<string, unknown>
      ? DeepStringRecord<T[K]>
      : never;
};

export type Messages = DeepStringRecord<typeof en>;

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}.${P}`
    : never
  : never;

type Paths<T> = {
  [K in keyof T]: T[K] extends string
    ? K
    : T[K] extends Record<string, unknown>
      ? Join<K, Paths<T[K]>>
      : never;
}[keyof T];

type PathImpl<T, Key extends keyof T> = Key extends string
  ? T[Key] extends string
    ? Key
    : T[Key] extends Record<string, unknown>
      ? Join<Key, Paths<T[Key]>>
      : never
  : never;

export type MessageKey = PathImpl<Messages, keyof Messages> | Paths<Messages>;

export type TranslateParams = Record<string, string | number>;
