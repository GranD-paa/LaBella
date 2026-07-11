// Hand-written to match `supabase/schema.sql`. Once you have a live Supabase
// project, regenerate this file with:
//   npx supabase gen types typescript --project-id <project-id> > types/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          avatar_url: string | null;
          is_admin: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          is_admin?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      lessons: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          order_number: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          order_number?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          order_number?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      vocabulary: {
        Row: {
          id: string;
          lesson_id: string;
          word: string;
          translation: string;
          image_url: string | null;
          example_sentence: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          word: string;
          translation: string;
          image_url?: string | null;
          example_sentence?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          word?: string;
          translation?: string;
          image_url?: string | null;
          example_sentence?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "vocabulary_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
        ];
      };
      grammar_rules: {
        Row: {
          id: string;
          lesson_id: string;
          title: string;
          description: string | null;
          example: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          title: string;
          description?: string | null;
          example?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          title?: string;
          description?: string | null;
          example?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "grammar_rules_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
        ];
      };
      quizzes: {
        Row: {
          id: string;
          lesson_id: string;
          title: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          title: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          title?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quizzes_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
        ];
      };
      quiz_questions: {
        Row: {
          id: string;
          quiz_id: string;
          question_text: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_option: "a" | "b" | "c" | "d";
          created_at: string;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          question_text: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_option: "a" | "b" | "c" | "d";
          created_at?: string;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          question_text?: string;
          option_a?: string;
          option_b?: string;
          option_c?: string;
          option_d?: string;
          correct_option?: "a" | "b" | "c" | "d";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quizzes";
            referencedColumns: ["id"];
          },
        ];
      };
      user_quiz_attempts: {
        Row: {
          id: string;
          user_id: string;
          quiz_id: string;
          score: number;
          answers_json: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          quiz_id: string;
          score?: number;
          answers_json?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          quiz_id?: string;
          score?: number;
          answers_json?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_quiz_attempts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_quiz_attempts_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "quizzes";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
