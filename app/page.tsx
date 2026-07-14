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
    <div className="flex min-h-screen flex-col bg-brand-gradient-subtle">
      <header className="brand-header">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="brand-header-link">
            <GraduationCap className="h-5 w-5 text-brand-accent" />
            LaBella
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="brand-header-btn" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button
              className="bg-primary font-semibold text-primary-foreground shadow-brand hover:bg-primary/90"
              asChild
            >
              <Link href="/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-12 px-4 py-16 text-center sm:px-6">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full border border-brand-accent/30 bg-brand-accent/10 px-4 py-1.5 text-sm font-medium text-brand-accent">
            Premium language learning
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Learn a new language,
            <br className="hidden sm:block" /> one lesson at a time.
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Vocabulary, grammar rules, and interactive quizzes — everything
            you need to build real fluency, in one simple app.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button
              size="lg"
              className="bg-primary font-semibold text-primary-foreground shadow-brand hover:bg-primary/90"
              asChild
            >
              <Link href="/sign-up">Start learning for free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              asChild
            >
              <Link href="/login">I already have an account</Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="text-muted-foreground hover:bg-white/5 hover:text-brand-accent"
              asChild
            >
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>

        <div className="grid w-full gap-4 sm:grid-cols-3">
          <Card className="brand-surface border-white/10 transition-transform hover:-translate-y-1">
            <CardHeader className="items-center text-center">
              <Languages className="h-6 w-6 text-brand-accent" />
              <CardTitle className="text-base">Vocabulary</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Learn new words with translations and example sentences.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="brand-surface border-white/10 transition-transform hover:-translate-y-1">
            <CardHeader className="items-center text-center">
              <BookOpenCheck className="h-6 w-6 text-brand-accent" />
              <CardTitle className="text-base">Grammar</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Clear explanations and examples for every grammar rule.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="brand-surface border-white/10 transition-transform hover:-translate-y-1">
            <CardHeader className="items-center text-center">
              <Trophy className="h-6 w-6 text-brand-accent" />
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
