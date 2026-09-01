/**
 * The languages the landing page can showcase, each paired with the landmark
 * that represents it in the 3D stage.
 *
 * ## Adding a language
 *
 * 1. Add an entry here with a new `landmark` id.
 * 2. Add a builder for that id in `components/landing/landmarks.ts`.
 * 3. Add its copy to `LANDING_LANGUAGE_COPY` in `lib/landing/content.ts`.
 *
 * Nothing else needs to change — the stage, the scroll timeline, the language
 * rail and the admin toggle list are all driven off this array.
 *
 * `defaultVisible` is only the static fallback. What actually renders is
 * resolved per request against the `landing_language_settings` table, so a
 * super admin can reveal or hide a language from the admin panel without a
 * deploy. See `getLandingLanguages()`.
 */

export type LandmarkId =
  | "colosseum"
  | "liberty"
  | "brandenburg"
  | "hagia-sophia"
  | "eiffel"
  | "sagrada";

export type LandingLanguageSlug =
  | "italian"
  | "english"
  | "german"
  | "turkish"
  | "french"
  | "spanish";

export type LandingLanguageDefinition = {
  slug: LandingLanguageSlug;
  /** Endonym, shown under the landmark. Never translated. */
  nativeName: string;
  landmark: LandmarkId;
  /** Where the course lives, or `null` while it has no curriculum yet. */
  href: string | null;
  /** Static fallback used until the admin toggle table has a row. */
  defaultVisible: boolean;
  /** Drives the accent tint of the landmark's rim light. */
  accent: string;
};

export const LANDING_LANGUAGES: LandingLanguageDefinition[] = [
  {
    slug: "italian",
    nativeName: "Italiano",
    landmark: "colosseum",
    href: "/learn/italian",
    defaultVisible: true,
    accent: "#F2A93B",
  },
  {
    slug: "english",
    nativeName: "English",
    landmark: "liberty",
    href: "/learn/english",
    defaultVisible: true,
    accent: "#5FC9C0",
  },
  {
    slug: "german",
    nativeName: "Deutsch",
    landmark: "brandenburg",
    href: "/learn/german",
    defaultVisible: true,
    accent: "#E8C547",
  },
  {
    slug: "turkish",
    nativeName: "Türkçe",
    landmark: "hagia-sophia",
    href: "/learn/turkish",
    defaultVisible: true,
    accent: "#E4644F",
  },
  // Built and ready, but dark until a super admin flips them on — there is no
  // curriculum behind either one yet.
  {
    slug: "french",
    nativeName: "Français",
    landmark: "eiffel",
    href: null,
    defaultVisible: false,
    accent: "#8AA9F0",
  },
  {
    slug: "spanish",
    nativeName: "Español",
    landmark: "sagrada",
    href: null,
    defaultVisible: false,
    accent: "#F07B57",
  },
];

export function isLandingLanguageSlug(
  value: string
): value is LandingLanguageSlug {
  return LANDING_LANGUAGES.some((language) => language.slug === value);
}
