import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";
import { AdminTabs } from "@/components/admin/admin-tabs";

export const metadata: Metadata = {
  title: "Admin Panel — LaBella",
};

export default async function AdminPage() {
  const supabase = await createClient();

  const [
    { data: lessons },
    { data: vocabulary },
    { data: grammarRules },
    { data: quizzes },
    { data: quizQuestions },
  ] = await Promise.all([
    supabase.from("lessons").select("*").order("order_number"),
    supabase.from("vocabulary").select("*").order("created_at", { ascending: false }),
    supabase
      .from("grammar_rules")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.from("quizzes").select("*").order("created_at", { ascending: false }),
    supabase.from("quiz_questions").select("*").order("created_at"),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground">
          Manage lessons, vocabulary, grammar rules, and quizzes.
        </p>
      </div>

      <AdminTabs
        lessons={lessons ?? []}
        vocabulary={vocabulary ?? []}
        grammarRules={grammarRules ?? []}
        quizzes={quizzes ?? []}
        quizQuestions={quizQuestions ?? []}
      />
    </div>
  );
}
