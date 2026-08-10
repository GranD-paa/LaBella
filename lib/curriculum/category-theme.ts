import {
  BookOpen,
  ClipboardCheck,
  Languages,
  PlayCircle,
} from "lucide-react";

import type { CategorySlug } from "@/lib/curriculum/types";

/**
 * One icon per learning section.
 *
 * Chosen to read as a set: all four are open outline glyphs of similar visual
 * weight, so they stay legible when blown up as the watermark behind a section
 * title. Dense or asymmetric glyphs turn to mush at that size.
 *
 * The `visual` slug is kept for URLs and stored progress records even though
 * the section now holds video lessons rather than image cards.
 */
export const CATEGORY_ICONS = {
  grammar: BookOpen,
  vocabulary: Languages,
  visual: PlayCircle,
  quiz: ClipboardCheck,
} as const;

/** Thin accent bar along the top edge of a section card. */
export const CATEGORY_ACCENTS = {
  grammar: "from-violet-500/20 via-purple-500/10 to-transparent",
  vocabulary: "from-sky-500/20 via-blue-500/10 to-transparent",
  visual: "from-amber-500/20 via-yellow-500/10 to-transparent",
  quiz: "from-emerald-500/20 via-green-500/10 to-transparent",
} as const;

/**
 * Ink colour for the watermark. Kept separate from the chip background above
 * so the tint can be tuned for a large, very low-opacity mark without
 * disturbing anything that still renders a solid icon.
 */
export const CATEGORY_ICON_TINT: Record<CategorySlug, string> = {
  grammar: "text-violet-300",
  vocabulary: "text-sky-300",
  visual: "text-amber-300",
  quiz: "text-emerald-300",
};

export const CATEGORY_ICON_BG: Record<CategorySlug, string> = {
  grammar: "bg-violet-500/15 text-violet-300",
  vocabulary: "bg-sky-500/15 text-sky-300",
  visual: "bg-amber-500/15 text-amber-300",
  quiz: "bg-emerald-500/15 text-emerald-300",
};
