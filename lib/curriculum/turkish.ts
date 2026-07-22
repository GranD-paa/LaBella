import type { CurriculumLevel } from "@/lib/curriculum/types";

// Same A1 module structure as `italian.ts` so the admin can open this
// language with the exact learning path (levels, categories) once content
// has been added for it. See `lib/curriculum/availability.ts` for how the
// `available` flag is toggled by a super admin.
export const TURKISH_LEVELS: CurriculumLevel[] = [
  {
    slug: "a1-1",
    code: "A1-1",
    title: "Foundations & Greetings",
    description: "Alphabet, pronunciation, and essential greetings.",
    orderNumber: 1,
  },
  {
    slug: "a1-2",
    code: "A1-2",
    title: "Introducing Yourself",
    description: "Personal details, countries, and nationalities.",
    orderNumber: 2,
  },
  {
    slug: "a1-3",
    code: "A1-3",
    title: "Daily Routines",
    description: "Common verbs, time expressions, and habits.",
    orderNumber: 3,
  },
  {
    slug: "a1-4",
    code: "A1-4",
    title: "Family & Relationships",
    description: "Family members, possessives, and descriptions.",
    orderNumber: 4,
  },
  {
    slug: "a1-5",
    code: "A1-5",
    title: "Food & Dining",
    description: "Restaurant vocabulary and ordering phrases.",
    orderNumber: 5,
  },
  {
    slug: "a1-6",
    code: "A1-6",
    title: "Shopping & Prices",
    description: "Numbers, quantities, and marketplace language.",
    orderNumber: 6,
  },
  {
    slug: "a1-7",
    code: "A1-7",
    title: "Travel & Directions",
    description: "Transport, locations, and asking for help.",
    orderNumber: 7,
  },
  {
    slug: "a1-8",
    code: "A1-8",
    title: "Health & Wellbeing",
    description: "Body, symptoms, and pharmacy conversations.",
    orderNumber: 8,
  },
  {
    slug: "a1-9",
    code: "A1-9",
    title: "Work & Studies",
    description: "Professions, schedules, and classroom language.",
    orderNumber: 9,
  },
  {
    slug: "a1-10",
    code: "A1-10",
    title: "Review & A1 Checkpoint",
    description: "Consolidate grammar, vocabulary, and exam-style practice.",
    orderNumber: 10,
  },
];
