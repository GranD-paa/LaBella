import type {
  GrammarRule,
  Lesson,
  Profile,
  Quiz,
  QuizQuestion,
  UserQuizAttempt,
  VideoLesson,
  Vocabulary,
} from "@/types";

import type { LocalAuthUser } from "@/lib/data/repository";

export type LocalDatabase = {
  users: LocalAuthUser[];
  profiles: Profile[];
  lessons: Lesson[];
  vocabulary: Vocabulary[];
  grammarRules: GrammarRule[];
  videoLessons: VideoLesson[];
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
    email: "erfanmalayriii@gmail.com",
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
      email: LOCAL_DEV_CREDENTIALS.admin.email,
      is_admin: true,
      role: "super_admin",
      status: "active",
      created_at: now,
    },
    {
      id: "710a5c03-ffbc-4032-a3d2-154458b15bdd",
      full_name: "Erfan User",
      avatar_url: null,
      email: LOCAL_DEV_CREDENTIALS.user.email,
      is_admin: false,
      role: "learner",
      status: "active",
      created_at: now,
    },
    {
      id: "80000000-0000-4000-8000-000000000001",
      full_name: "Giulia Rossi",
      avatar_url: null,
      email: "giulia.rossi@labella.app",
      is_admin: true,
      role: "content_manager",
      status: "active",
      created_at: "2026-06-02T09:15:00.000Z",
    },
    {
      id: "80000000-0000-4000-8000-000000000002",
      full_name: "Marco Bianchi",
      avatar_url: null,
      email: "marco.bianchi@labella.app",
      is_admin: true,
      role: "quiz_manager",
      status: "suspended",
      created_at: "2026-06-10T14:40:00.000Z",
    },
    {
      id: "80000000-0000-4000-8000-000000000003",
      full_name: "Sara Verdi",
      avatar_url: null,
      email: "sara.verdi@labella.app",
      is_admin: true,
      role: "limited_admin",
      status: "active",
      created_at: "2026-06-18T11:05:00.000Z",
    },
    {
      id: "80000000-0000-4000-8000-000000000004",
      full_name: "Leo Conti",
      avatar_url: null,
      email: "leo.conti@example.com",
      is_admin: false,
      role: "learner",
      status: "active",
      created_at: "2026-06-25T08:30:00.000Z",
    },
    {
      id: "80000000-0000-4000-8000-000000000005",
      full_name: "Nina Ferrari",
      avatar_url: null,
      email: "nina.ferrari@example.com",
      is_admin: false,
      role: "learner",
      status: "suspended",
      created_at: "2026-07-01T16:20:00.000Z",
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
      pronunciation: null,
      status: "published",
      created_at: now,
    },
    {
      id: "30000000-0000-4000-8000-000000000002",
      lesson_id: lessonIds[0],
      word: "Buongiorno",
      translation: "Good morning",
      image_url: "https://images.unsplash.com/photo-1499750310107-5fef28fd660f?w=400&h=400&fit=crop",
      example_sentence: "Buongiorno, signora Rossi.",
      pronunciation: null,
      status: "published",
      created_at: now,
    },
    {
      id: "30000000-0000-4000-8000-000000000003",
      lesson_id: lessonIds[0],
      word: "Grazie",
      translation: "Thank you",
      image_url: null,
      example_sentence: "Grazie mille!",
      pronunciation: null,
      status: "published",
      created_at: now,
    },
    {
      id: "30000000-0000-4000-8000-000000000004",
      lesson_id: lessonIds[1],
      word: "Mi chiamo",
      translation: "My name is",
      image_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
      example_sentence: "Mi chiamo Marco.",
      pronunciation: null,
      status: "published",
      created_at: now,
    },
    {
      id: "30000000-0000-4000-8000-000000000005",
      lesson_id: lessonIds[2],
      word: "Mangiare",
      translation: "To eat",
      image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
      example_sentence: "Mi piace mangiare la pasta.",
      pronunciation: null,
      status: "published",
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
      status: "published",
      created_at: now,
    },
    {
      id: "40000000-0000-4000-8000-000000000002",
      lesson_id: lessonIds[0],
      title: "Formal vs informal greetings",
      description: "Use 'Lei' in formal contexts and 'tu' with friends and family.",
      example: "Buongiorno, come sta? / Ciao, come stai?",
      status: "published",
      created_at: now,
    },
    {
      id: "40000000-0000-4000-8000-000000000003",
      lesson_id: lessonIds[1],
      title: "Verb essere (to be)",
      description: "Essere is irregular and essential for introductions.",
      example: "Io sono Erfan. Tu sei studente.",
      status: "published",
      created_at: now,
    },
  ],
  videoLessons: [],
  quizzes: lessonIds.map((lessonId, index) => ({
    id: quizIds[index],
    lesson_id: lessonId,
    title: `A1-${index + 1} Checkpoint Quiz`,
    language_slug: "italian",
    level_slug: `a1-${index + 1}`,
    section_slug: "quiz",
    status: "draft" as const,
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
      question_type: "multiple_choice" as const,
      expected_answer: null,
      explanation: "Ciao is an informal greeting used for both hello and goodbye.",
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
      question_type: "multiple_choice" as const,
      expected_answer: null,
      explanation: "Buongiorno means good morning and is used until early afternoon.",
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
      question_type: "multiple_choice" as const,
      expected_answer: null,
      explanation: null,
      created_at: now,
    },
    {
      id: "50000000-0000-4000-8000-000000000004",
      quiz_id: quizIds[1],
      question_text: "Write the Italian phrase for 'Nice to meet you'.",
      option_a: "-",
      option_b: "-",
      option_c: "-",
      option_d: "-",
      correct_option: "a",
      question_type: "written" as const,
      expected_answer: "Piacere di conoscerti",
      explanation: "A common informal phrase when meeting someone new.",
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
