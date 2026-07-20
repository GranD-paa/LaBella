import {
  BookMarked,
  Eye,
  Languages,
  ListChecks,
} from "lucide-react";

import type { CategorySlug } from "@/lib/curriculum/types";

export const CATEGORY_ICONS = {
  grammar: BookMarked,
  vocabulary: Languages,
  visual: Eye,
  quiz: ListChecks,
} as const;

export const CATEGORY_ACCENTS = {
  grammar: "from-violet-500/20 via-purple-500/10 to-transparent",
  vocabulary: "from-sky-500/20 via-blue-500/10 to-transparent",
  visual: "from-amber-500/20 via-yellow-500/10 to-transparent",
  quiz: "from-emerald-500/20 via-green-500/10 to-transparent",
} as const;

export const CATEGORY_ICON_BG: Record<CategorySlug, string> = {
  grammar: "bg-violet-500/15 text-violet-300",
  vocabulary: "bg-sky-500/15 text-sky-300",
  visual: "bg-amber-500/15 text-amber-300",
  quiz: "bg-emerald-500/15 text-emerald-300",
};
