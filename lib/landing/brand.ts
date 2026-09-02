/**
 * The brand mark in the landing header.
 *
 * ## Dropping the logo in
 *
 * 1. Put the file in `public/landing/` — `logo.svg` for a vector mark,
 *    otherwise a PNG at twice the height below so it stays sharp on a retina
 *    screen.
 * 2. Fill in the object here. `height` is in *design pixels*, the unit the
 *    whole hero is measured in, so the mark scales with the rest of the
 *    composition instead of jumping around between breakpoints. 40 matches the
 *    empty slot the header reserves today.
 * 3. Nothing else changes. While this is `null` the header renders that empty
 *    slot in the mark's exact place, so the layout does not shift when the file
 *    arrives.
 *
 * ```ts
 * export const BRAND_MARK: BrandMark | null = {
 *   src: "/landing/logo.svg",
 *   height: 40,
 *   alt: "Laparli",
 * };
 * ```
 *
 * A mark that carries the word "Laparli" itself makes the text wordmark beside
 * it redundant — set `replacesWordmark` and the header drops the text.
 */

export type BrandMark = {
  /** Public path, e.g. "/landing/logo.svg". */
  src: string;
  /** Rendered height in design pixels. The width follows the aspect ratio. */
  height: number;
  /** Alternative text. Empty when the wordmark beside it already names it. */
  alt: string;
  /** True when the mark already spells the name out. */
  replacesWordmark?: boolean;
};

export const BRAND_MARK: BrandMark | null = null;
