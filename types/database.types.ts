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
          email: string | null;
          is_admin: boolean;
          role:
            | "learner"
            | "limited_admin"
            | "quiz_manager"
            | "content_manager"
            | "admin"
            | "super_admin";
          status: "active" | "suspended";
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          is_admin?: boolean;
          role?:
            | "learner"
            | "limited_admin"
            | "quiz_manager"
            | "content_manager"
            | "admin"
            | "super_admin";
          status?: "active" | "suspended";
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          email?: string | null;
          is_admin?: boolean;
          role?:
            | "learner"
            | "limited_admin"
            | "quiz_manager"
            | "content_manager"
            | "admin"
            | "super_admin";
          status?: "active" | "suspended";
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
          pronunciation: string | null;
          status: "draft" | "published";
          created_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          word: string;
          translation: string;
          image_url?: string | null;
          example_sentence?: string | null;
          pronunciation?: string | null;
          status?: "draft" | "published";
          created_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          word?: string;
          translation?: string;
          image_url?: string | null;
          example_sentence?: string | null;
          pronunciation?: string | null;
          status?: "draft" | "published";
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
          status: "draft" | "published";
          created_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          title: string;
          description?: string | null;
          example?: string | null;
          status?: "draft" | "published";
          created_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          title?: string;
          description?: string | null;
          example?: string | null;
          status?: "draft" | "published";
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
          language_slug: string;
          level_slug: string;
          section_slug: string;
          status: "draft" | "published";
          created_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          title: string;
          language_slug?: string;
          level_slug?: string;
          section_slug?: string;
          status?: "draft" | "published";
          created_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          title?: string;
          language_slug?: string;
          level_slug?: string;
          section_slug?: string;
          status?: "draft" | "published";
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
          question_type: "multiple_choice" | "written";
          expected_answer: string | null;
          explanation: string | null;
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
          question_type?: "multiple_choice" | "written";
          expected_answer?: string | null;
          explanation?: string | null;
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
          question_type?: "multiple_choice" | "written";
          expected_answer?: string | null;
          explanation?: string | null;
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
      video_lessons: {
        Row: {
          id: string;
          lesson_id: string;
          language_slug: string;
          level_slug: string;
          title: string;
          description: string | null;
          video_url: string;
          thumbnail_url: string | null;
          status: "draft" | "published";
          created_at: string;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          language_slug?: string;
          level_slug?: string;
          title: string;
          description?: string | null;
          video_url: string;
          thumbnail_url?: string | null;
          status?: "draft" | "published";
          created_at?: string;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          language_slug?: string;
          level_slug?: string;
          title?: string;
          description?: string | null;
          video_url?: string;
          thumbnail_url?: string | null;
          status?: "draft" | "published";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "video_lessons_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
        ];
      };
      user_learning_state: {
        Row: {
          user_id: string;
          language_slug: string;
          level_slug: string | null;
          lesson_id: string | null;
          section_slug: string | null;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          language_slug: string;
          level_slug?: string | null;
          lesson_id?: string | null;
          section_slug?: string | null;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          language_slug?: string;
          level_slug?: string | null;
          lesson_id?: string | null;
          section_slug?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_learning_state_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: true;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_learning_state_lesson_id_fkey";
            columns: ["lesson_id"];
            isOneToOne: false;
            referencedRelation: "lessons";
            referencedColumns: ["id"];
          },
        ];
      };
      language_settings: {
        Row: {
          language_slug: string;
          enabled: boolean;
          updated_at: string;
        };
        Insert: {
          language_slug: string;
          enabled?: boolean;
          updated_at?: string;
        };
        Update: {
          language_slug?: string;
          enabled?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      curriculum_level_overrides: {
        Row: {
          id: string;
          language_slug: string;
          slug: string;
          code: string;
          title: string;
          description: string;
          order_number: number;
          is_custom: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          language_slug: string;
          slug: string;
          code: string;
          title: string;
          description?: string;
          order_number: number;
          is_custom?: boolean;
          updated_at?: string;
        };
        Update: {
          id?: string;
          language_slug?: string;
          slug?: string;
          code?: string;
          title?: string;
          description?: string;
          order_number?: number;
          is_custom?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
