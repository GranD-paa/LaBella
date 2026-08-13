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
          attempt_number: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          quiz_id: string;
          score?: number;
          answers_json?: Json;
          attempt_number?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          quiz_id?: string;
          score?: number;
          answers_json?: Json;
          attempt_number?: number;
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
      banners: {
        Row: {
          id: string;
          image_url: string;
          title: string | null;
          link_href: string | null;
          order_number: number;
          status: "draft" | "published";
          created_at: string;
        };
        Insert: {
          id?: string;
          image_url: string;
          title?: string | null;
          link_href?: string | null;
          order_number?: number;
          status?: "draft" | "published";
          created_at?: string;
        };
        Update: {
          id?: string;
          image_url?: string;
          title?: string | null;
          link_href?: string | null;
          order_number?: number;
          status?: "draft" | "published";
          created_at?: string;
        };
        Relationships: [];
      };
      subscription_plans: {
        Row: {
          plan_slug: string;
          language_slug: string;
          price_eur: number;
          discount_percent: number;
          title: Json;
          description: Json;
          features: Json;
          order_number: number;
          is_active: boolean;
          quarterly_enabled: boolean;
          quarterly_discount_percent: number;
          updated_at: string;
        };
        Insert: {
          plan_slug: string;
          language_slug: string;
          price_eur: number;
          discount_percent?: number;
          title?: Json;
          description?: Json;
          features?: Json;
          order_number?: number;
          is_active?: boolean;
          quarterly_enabled?: boolean;
          quarterly_discount_percent?: number;
          updated_at?: string;
        };
        Update: {
          plan_slug?: string;
          language_slug?: string;
          price_eur?: number;
          discount_percent?: number;
          title?: Json;
          description?: Json;
          features?: Json;
          order_number?: number;
          is_active?: boolean;
          quarterly_enabled?: boolean;
          quarterly_discount_percent?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscription_tiers: {
        Row: {
          plan_slug: string;
          tier_rank: number;
          unlocks_vocabulary: boolean;
          unlocks_grammar: boolean;
          unlocks_video: boolean;
          unlocks_level_exam: boolean;
          quiz_retake_limit: number | null;
          updated_at: string;
        };
        Insert: {
          plan_slug: string;
          tier_rank: number;
          unlocks_vocabulary?: boolean;
          unlocks_grammar?: boolean;
          unlocks_video?: boolean;
          unlocks_level_exam?: boolean;
          quiz_retake_limit?: number | null;
          updated_at?: string;
        };
        Update: {
          plan_slug?: string;
          tier_rank?: number;
          unlocks_vocabulary?: boolean;
          unlocks_grammar?: boolean;
          unlocks_video?: boolean;
          unlocks_level_exam?: boolean;
          quiz_retake_limit?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscription_page_content: {
        Row: {
          id: string;
          hero_title: Json;
          hero_subtitle: Json;
          footer_note: Json;
          updated_at: string;
        };
        Insert: {
          id?: string;
          hero_title?: Json;
          hero_subtitle?: Json;
          footer_note?: Json;
          updated_at?: string;
        };
        Update: {
          id?: string;
          hero_title?: Json;
          hero_subtitle?: Json;
          footer_note?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      payment_settings: {
        Row: {
          id: string;
          base_currency: string;
          irr_enabled: boolean;
          fx_source: "tgju" | "navasan" | "manual";
          fx_margin_percent: number;
          irr_rounding: number;
          fx_manual_rate: number | null;
          fx_max_deviation_percent: number;
          stripe_enabled: boolean;
          zarinpal_enabled: boolean;
          manual_enabled: boolean;
          grace_period_days: number;
          enforce_entitlements: boolean;
          free_cefr_bands: string[];
          free_quiz_retake_limit: number;
          pending_payment_timeout_minutes: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          base_currency?: string;
          irr_enabled?: boolean;
          fx_source?: "tgju" | "navasan" | "manual";
          fx_margin_percent?: number;
          irr_rounding?: number;
          fx_manual_rate?: number | null;
          fx_max_deviation_percent?: number;
          stripe_enabled?: boolean;
          zarinpal_enabled?: boolean;
          manual_enabled?: boolean;
          grace_period_days?: number;
          enforce_entitlements?: boolean;
          free_cefr_bands?: string[];
          free_quiz_retake_limit?: number;
          pending_payment_timeout_minutes?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          base_currency?: string;
          irr_enabled?: boolean;
          fx_source?: "tgju" | "navasan" | "manual";
          fx_margin_percent?: number;
          irr_rounding?: number;
          fx_manual_rate?: number | null;
          fx_max_deviation_percent?: number;
          stripe_enabled?: boolean;
          zarinpal_enabled?: boolean;
          manual_enabled?: boolean;
          grace_period_days?: number;
          enforce_entitlements?: boolean;
          free_cefr_bands?: string[];
          free_quiz_retake_limit?: number;
          pending_payment_timeout_minutes?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      fx_rates: {
        Row: {
          id: string;
          base_currency: string;
          quote_currency: string;
          rate: number;
          source: string;
          accepted: boolean;
          rejection_reason: string | null;
          fetched_at: string;
        };
        Insert: {
          id?: string;
          base_currency?: string;
          quote_currency?: string;
          rate: number;
          source: string;
          accepted?: boolean;
          rejection_reason?: string | null;
          fetched_at?: string;
        };
        Update: {
          id?: string;
          base_currency?: string;
          quote_currency?: string;
          rate?: number;
          source?: string;
          accepted?: boolean;
          rejection_reason?: string | null;
          fetched_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan_slug: string;
          language_slug: string;
          status: "active" | "past_due" | "canceled" | "expired";
          current_period_start: string;
          current_period_end: string;
          anchor_day: number;
          period_months: number;
          cancel_at_period_end: boolean;
          started_at: string;
          canceled_at: string | null;
          ended_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan_slug: string;
          language_slug: string;
          status?: "active" | "past_due" | "canceled" | "expired";
          current_period_start?: string;
          current_period_end: string;
          anchor_day: number;
          period_months?: number;
          cancel_at_period_end?: boolean;
          started_at?: string;
          canceled_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan_slug?: string;
          language_slug?: string;
          status?: "active" | "past_due" | "canceled" | "expired";
          current_period_start?: string;
          current_period_end?: string;
          anchor_day?: number;
          period_months?: number;
          cancel_at_period_end?: boolean;
          started_at?: string;
          canceled_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          subscription_id: string | null;
          plan_slug: string;
          language_slug: string;
          period_months: number;
          plan_title: string | null;
          list_price_eur_cents: number;
          discount_percent: number;
          discount_eur_cents: number;
          amount_eur_cents: number;
          paid_currency: "EUR" | "IRR";
          paid_amount: number;
          fx_rate: number | null;
          fx_source: string | null;
          provider: "stripe" | "zarinpal" | "manual";
          provider_payment_id: string | null;
          provider_ref: string | null;
          checkout_reference: string | null;
          status: "pending" | "succeeded" | "failed" | "refunded" | "canceled";
          failure_reason: string | null;
          paid_at: string | null;
          created_at: string;
          updated_at: string;
          metadata: Json;
        };
        Insert: {
          id?: string;
          user_id: string;
          subscription_id?: string | null;
          plan_slug: string;
          language_slug: string;
          period_months?: number;
          plan_title?: string | null;
          list_price_eur_cents: number;
          discount_percent?: number;
          discount_eur_cents?: number;
          amount_eur_cents: number;
          paid_currency?: "EUR" | "IRR";
          paid_amount: number;
          fx_rate?: number | null;
          fx_source?: string | null;
          provider: "stripe" | "zarinpal" | "manual";
          provider_payment_id?: string | null;
          provider_ref?: string | null;
          checkout_reference?: string | null;
          status?: "pending" | "succeeded" | "failed" | "refunded" | "canceled";
          failure_reason?: string | null;
          paid_at?: string | null;
          created_at?: string;
          updated_at?: string;
          metadata?: Json;
        };
        Update: {
          subscription_id?: string | null;
          provider_payment_id?: string | null;
          provider_ref?: string | null;
          checkout_reference?: string | null;
          status?: "pending" | "succeeded" | "failed" | "refunded" | "canceled";
          failure_reason?: string | null;
          paid_at?: string | null;
          updated_at?: string;
          metadata?: Json;
        };
        Relationships: [];
      };
      refunds: {
        Row: {
          id: string;
          payment_id: string;
          amount_eur_cents: number;
          reason: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          payment_id: string;
          amount_eur_cents: number;
          reason?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          reason?: string | null;
        };
        Relationships: [];
      };
      subscription_events: {
        Row: {
          id: string;
          subscription_id: string | null;
          user_id: string;
          type:
            | "created"
            | "renewed"
            | "payment_failed"
            | "past_due"
            | "canceled"
            | "expired"
            | "reactivated"
            | "refunded"
            | "plan_changed";
          payload: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          subscription_id?: string | null;
          user_id: string;
          type:
            | "created"
            | "renewed"
            | "payment_failed"
            | "past_due"
            | "canceled"
            | "expired"
            | "reactivated"
            | "refunded"
            | "plan_changed";
          payload?: Json;
          created_at?: string;
        };
        Update: {
          payload?: Json;
        };
        Relationships: [];
      };
      webhook_events: {
        Row: {
          id: string;
          provider: string;
          provider_event_id: string;
          event_type: string | null;
          payload: Json;
          status: "received" | "processed" | "failed" | "ignored";
          error: string | null;
          created_at: string;
          processed_at: string | null;
        };
        Insert: {
          id?: string;
          provider: string;
          provider_event_id: string;
          event_type?: string | null;
          payload?: Json;
          status?: "received" | "processed" | "failed" | "ignored";
          error?: string | null;
          created_at?: string;
          processed_at?: string | null;
        };
        Update: {
          status?: "received" | "processed" | "failed" | "ignored";
          error?: string | null;
          processed_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      swap_banner_order: {
        Args: { banner_id_a: string; banner_id_b: string };
        Returns: void;
      };
      create_pending_payment: {
        Args: {
          p_plan_slug: string;
          p_language_slug: string;
          p_provider: string;
          p_currency?: string;
          /** 1 or 3; anything else is rejected. */
          p_period_months?: number;
        };
        /** The id of the freshly created pending payment row. */
        Returns: string;
      };
      record_quiz_attempt: {
        Args: {
          p_quiz_id: string;
          p_score: number;
          p_answers?: Json;
        };
        /**
         * `{ ok: false, reason: 'retake_limit_reached' }` when the learner has
         * spent their allowance, otherwise `{ ok: true, attempt_number }`.
         */
        Returns: {
          ok: boolean;
          reason?: string;
          attempt_number?: number;
          retake_limit?: number | null;
          attempts_used?: number;
        };
      };
      list_my_pending_payments: {
        Args: Record<string, never>;
        Returns: Database["public"]["Tables"]["payments"]["Row"][];
      };
      attach_checkout_reference: {
        Args: { p_payment_id: string; p_reference: string };
        Returns: void;
      };
      list_stale_pending_payments: {
        Args: { p_limit?: number };
        Returns: Database["public"]["Tables"]["payments"]["Row"][];
      };
      settle_payment: {
        Args: {
          p_payment_id: string;
          p_provider_payment_id?: string | null;
          p_provider_ref?: string | null;
        };
        /** The id of the subscription that was created or extended. */
        Returns: string;
      };
      fail_payment: {
        Args: { p_payment_id: string; p_reason?: string | null };
        Returns: void;
      };
      cancel_my_subscription: {
        Args: { p_subscription_id: string };
        Returns: void;
      };
      sweep_subscriptions: {
        Args: Record<string, never>;
        Returns: { moved_to_past_due: number; moved_to_expired: number }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
