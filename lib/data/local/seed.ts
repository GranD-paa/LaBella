import type {
  GrammarRule,
  Lesson,
  Profile,
  Quiz,
  QuizQuestion,
  UserQuizAttempt,
  Vocabulary,
} from "@/types";

import type { LocalAuthUser } from "@/lib/data/repository";

export type LocalDatabase = {
  users: LocalAuthUser[];
  profiles: Profile[];
  lessons: Lesson[];
  vocabulary: Vocabulary[];
  grammarRules: GrammarRule[];
  quizzes: Quiz[];
  quizQuestions: QuizQuestion[];
  userQuizAttempts: UserQuizAttempt[];
};

const now = "2026-07-15T08:00:00.000Z";

const lessonIds = Array.from({ length: 10 }, (_, index) =>
  `10000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`
);

const quizIds = Array.from({ length: 10 }, (_, index) =>
  `20000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`
);

export const LOCAL_DEV_CREDENTIALS = {
  admin: {
    email: "erfanmalayri@outlook.com",
    password: "451377e451377E",
  },
  user: {
    email: "erfanmalayriii@google.com",
    password: "451377e451377E",
  },
} as const;

export const LOCAL_SEED: LocalDatabase = {
  users: [
    {
      id: "21fdd721-b367-4b77-bf6d-d7fccbb4694f",
      email: LOCAL_DEV_CREDENTIALS.admin.email,
      password: LOCAL_DEV_CREDENTIALS.admin.password,
    },
    {
      id: "710a5c03-ffbc-4032-a3d2-154458b15bdd",
      email: LOCAL_DEV_CREDENTIALS.user.email,
      password: LOCAL_DEV_CREDENTIALS.user.password,
    },
  ],
  profiles: [
    {
      id: "21fdd721-b367-4b77-bf6d-d7fccbb4694f",
      full_name: "Erfan Admin",
      avatar_url: null,
      is_admin: true,
      created_at: now,
    },
    {
      id: "710a5c03-ffbc-4032-a3d2-154458b15bdd",
      full_name: "Erfan User",
      avatar_url: null,
      is_admin: false,
      created_at: now,
    },
  ],
  lessons: [
    {
      id: lessonIds[0],
      title: "A1-1 Foundations & Greetings",
      description: "Alphabet, pronunciation, and essential greetings.",
      order_number: 1,
      created_at: now,
    },
    {
      id: lessonIds[1],
      title: "A1-2 Introducing Yourself",
      description: "Personal details, countries, and nationalities.",
      order_number: 2,
      created_at: now,
    },
    {
      id: lessonIds[2],
      title: "A1-3 Daily Routines",
      description: "Common verbs, time expressions, and habits.",
      order_number: 3,
      created_at: now,
    },
    ...Array.from({ length: 7 }, (_, index) => ({
      id: lessonIds[index + 3],
      title: `A1-${index + 4} Italian Module`,
      description: `Structured Italian learning module A1-${index + 4}.`,
      order_number: index + 4,
      created_at: now,
    })),
  ],
  vocabulary: [
    {
      id: "30000000-0000-4000-8000-000000000001",
      lesson_id: lessonIds[0],
      word: "Ciao",
      translation: "Hello / Bye",
      image_url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop",
      example_sentence: "Ciao, come stai?",
      created_at: now,
    },
    {
      id: "30000000-0000-4000-8000-000000000002",
      lesson_id: lessonIds[0],
      word: "Buongiorno",
      translation: "Good morning",
      image_url: "https://images.unsplash.com/photo-1499750310107-5fef28fd660f?w=400&h=400&fit=crop",
      example_sentence: "Buongiorno, signora Rossi.",
      created_at: now,
    },
    {
      id: "30000000-0000-4000-8000-000000000003",
      lesson_id: lessonIds[0],
      word: "Grazie",
      translation: "Thank you",
      image_url: null,
      example_sentence: "Grazie mille!",
      created_at: now,
    },
    {
      id: "30000000-0000-4000-8000-000000000004",
      lesson_id: lessonIds[1],
      word: "Mi chiamo",
      translation: "My name is",
      image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
      example_sentence: "Mi chiamo Marco.",
      created_at: now,
    },
    {
      id: "30000000-0000-4000-8000-000000000005",
      lesson_id: lessonIds[2],
      word: "Mangiare",
      translation: "To eat",
      image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
      example_sentence: "Mi piace mangiare la pasta.",
      created_at: now,
    },
  ],
  grammarRules: [
    {
      id: "40000000-0000-4000-8000-000000000001",
      lesson_id: lessonIds[0],
      title: "Subject pronouns",
      description: "Italian subject pronouns are often omitted because verb endings show the subject.",
      example: "(Io) parlo italiano. (Tu) parli bene.",
      created_at: now,
    },
    {
      id: "40000000-0000-4000-8000-000000000002",
      lesson_id: lessonIds[0],
      title: "Formal vs informal greetings",
      description: "Use 'Lei' in formal contexts and 'tu' with friends and family.",
      example: "Buongiorno, come sta? / Ciao, come stai?",
      created_at: now,
    },
    {
      id: "40000000-0000-4000-8000-000000000003",
      lesson_id: lessonIds[1],
      title: "Verb essere (to be)",
      description: "Essere is irregular and essential for introductions.",
      example: "Io sono Erfan. Tu sei studente.",
      created_at: now,
    },
  ],
  quizzes: lessonIds.map((lessonId, index) => ({
    id: quizIds[index],
    lesson_id: lessonId,
    title: `A1-${index + 1} Checkpoint Quiz`,
    created_at: now,
  })),
  quizQuestions: [
    {
      id: "50000000-0000-4000-8000-000000000001",
      quiz_id: quizIds[0],
      question_text: "What does 'Ciao' mean?",
      option_a: "Good night",
      option_b: "Hello / Bye",
      option_c: "Please",
      option_d: "Excuse me",
      correct_option: "b",
      created_at: now,
    },
    {
      id: "50000000-0000-4000-8000-000000000002",
      quiz_id: quizIds[0],
      question_text: "Which greeting is most appropriate in the morning?",
      option_a: "Buonanotte",
      option_b: "Buongiorno",
      option_c: "Ciao",
      option_d: "Grazie",
      correct_option: "b",
      created_at: now,
    },
    {
      id: "50000000-0000-4000-8000-000000000003",
      quiz_id: quizIds[1],
      question_text: "How do you say 'My name is' in Italian?",
      option_a: "Mi chiamo",
      option_b: "Mi piace",
      option_c: "Mi dispiace",
      option_d: "Mi aiuti",
      correct_option: "a",
      created_at: now,
    },
  ],
  userQuizAttempts: [
    {
      id: "60000000-0000-4000-8000-000000000001",
      user_id: "710a5c03-ffbc-4032-a3d2-154458b15bdd",
      quiz_id: quizIds[0],
      score: 100,
      answers_json: {
        "50000000-0000-4000-8000-000000000001": "b",
        "50000000-0000-4000-8000-000000000002": "b",
      },
      created_at: now,
    },
  ],
};
