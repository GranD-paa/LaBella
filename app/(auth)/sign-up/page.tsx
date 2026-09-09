import { redirect } from "next/navigation";

/**
 * Kept as a URL, gone as a page.
 *
 * Every marketing CTA, every old link and every bookmark points here, and
 * signing in and joining are now one screen — so this forwards rather than
 * duplicating it. The `redirectedFrom` a visitor arrived with is carried
 * across, or they would lose the page they were reaching for.
 */
export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectedFrom?: string }>;
}) {
  const { redirectedFrom } = await searchParams;

  redirect(
    redirectedFrom
      ? `/login?redirectedFrom=${encodeURIComponent(redirectedFrom)}`
      : "/login"
  );
}
