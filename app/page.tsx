import Link from "next/link";
import { redirect } from "next/navigation";
import { GraduationCap, BookOpenCheck, Languages, Trophy } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-5 w-5" />
          LaBella
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Get started</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-12 px-4 py-16 text-center sm:px-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Learn a new language,
            <br className="hidden sm:block" /> one lesson at a time.
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Vocabulary, grammar rules, and interactive quizzes — everything
            you need to build real fluency, in one simple app.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button size="lg" asChild>
              <Link href="/sign-up">Start learning for free</Link>
            </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">I already have an account</Link>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <Link href="/pricing">View pricing</Link>
          </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="items-center text-center">
              <Languages className="h-6 w-6" />
              <CardTitle className="text-base">Vocabulary</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Learn new words with translations and example sentences.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-center text-center">
              <BookOpenCheck className="h-6 w-6" />
              <CardTitle className="text-base">Grammar</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Clear explanations and examples for every grammar rule.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="items-center text-center">
              <Trophy className="h-6 w-6" />
              <CardTitle className="text-base">Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Reinforce what you&apos;ve learned and track your score.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
