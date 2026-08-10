import {
  CATEGORY_ICONS,
  CATEGORY_ICON_TINT,
} from "@/lib/curriculum/category-theme";
import type { CategorySlug } from "@/lib/curriculum/types";
import { cn } from "@/lib/utils";

/**
 * The section's icon, enlarged and set behind its title.
 *
 * Exists as one shared component rather than a class string copied into each
 * card so every section is watermarked identically by construction — size,
 * opacity, offset and hover behaviour can only drift in one place.
 *
 * Purely decorative: hidden from assistive technology and non-interactive, so
 * it never steals a tap from the card link it sits inside.
 *
 * Positioning uses logical `start-*` offsets, which flip with the document
 * direction — the mark tucks behind the first characters of the heading in
 * both the Persian RTL layout and the LTR ones.
 */
export function CategoryWatermark({
  category,
  size = "card",
  className,
}: {
  category: CategorySlug;
  /** `card` for the section grid, `hero` for the larger page header. */
  size?: "card" | "hero";
  className?: string;
}) {
  const Icon = CATEGORY_ICONS[category];

  return (
    <Icon
      aria-hidden="true"
      // A thinner stroke than the default keeps a large glyph from reading as
      // a heavy block behind the text.
      strokeWidth={1.25}
      className={cn(
        "pointer-events-none absolute select-none transition-all duration-500",
        "group-hover:scale-105",
        CATEGORY_ICON_TINT[category],
        // Positioned to sit *behind the heading* rather than bleed out of the
        // corner: only a sliver runs past the start edge, and the glyph's
        // centre lands on the title line.
        //
        // Opacity drops as the mark grows. A large shape carries more visual
        // weight at the same alpha, and the hero version sits under body copy
        // rather than just a heading, so it has to recede further.
        size === "card"
          ? "-start-5 top-1 h-32 w-32 opacity-[0.13] group-hover:opacity-[0.22]"
          : "-start-8 -top-8 h-44 w-44 opacity-[0.08]",
        className
      )}
    />
  );
}
