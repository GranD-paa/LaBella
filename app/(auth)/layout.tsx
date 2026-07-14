import Link from "next/link";
import { GraduationCap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-brand-gradient p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.12),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(255,255,255,0.08),transparent_40%)]" />
        <Link
          href="/"
          className="relative z-10 flex items-center gap-2 text-lg font-semibold"
        >
          <GraduationCap className="h-6 w-6 text-brand-accent" />
          LaBella
        </Link>
        <div className="relative z-10 space-y-3">
          <p className="text-2xl font-medium leading-snug">
            &ldquo;Every lesson brings you one step closer to fluency.&rdquo;
          </p>
          <p className="text-sm text-white/70">
            Vocabulary, grammar, and quizzes — all in one place.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center bg-background p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-center gap-2 text-foreground lg:hidden">
            <GraduationCap className="h-6 w-6 text-brand-accent" />
            <span className="text-lg font-semibold">LaBella</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
