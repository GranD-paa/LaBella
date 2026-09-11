"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Newspaper, RotateCcw } from "lucide-react";

import { BlogShell } from "@/components/blog/blog-shell";
import { ErrorState } from "@/components/errors/error-state";
import { Button } from "@/components/ui/button";

/**
 * The blog is the one surface strangers arrive at from a search result, so a
 * failure here keeps the shell — logo, navigation, footer — rather than
 * dropping a first-time visitor onto an unbranded error screen with no way
 * further into the site.
 */
export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[blog] render failed", error);
  }, [error]);

  return (
    <BlogShell>
      <ErrorState
        title="این مطلب باز نشد"
        description="مشکل از سمت ماست. یک تلاش دوباره معمولاً کافی است."
        digest={error.digest}
        actions={
          <>
            <Button onClick={reset} className="min-h-11 px-6">
              <RotateCcw aria-hidden className="me-1 h-4 w-4" />
              تلاش دوباره
            </Button>
            <Button asChild variant="outline" className="min-h-11 px-6">
              <Link href="/blog">
                <Newspaper aria-hidden className="me-1 h-4 w-4" />
                فهرست مطالب
              </Link>
            </Button>
          </>
        }
      />
    </BlogShell>
  );
}
