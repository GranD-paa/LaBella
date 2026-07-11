import type { Metadata } from "next";
import { BookOpen } from "lucide-react";

import { LessonCard } from "@/components/lessons/lesson-card";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard — LaBella",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: profile }, { data: lessons }] = await Promise.all([
    user
      ? supabase
          .from("profiles")
          .select("full_name")
          .eq("id", user.id)
          .single()
      : Promise.resolve({ data: null }),
    supabase.from("lessons").select("*").order("order_number", { ascending: true }),
  ]);

  const displayName = profile?.full_name || user?.email || "there";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {displayName} 👋
        </h1>
        <p className="text-muted-foreground">
          Pick up where you left off, or start a new lesson.
        </p>
      </div>

      {lessons && lessons.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-16 text-center text-muted-foreground">
          <BookOpen className="h-8 w-8" />
          <p>No lessons available yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
