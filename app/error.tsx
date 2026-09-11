"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

import { ErrorState } from "@/components/errors/error-state";
import { Button } from "@/components/ui/button";

/**
 * The catch-all for anything that throws while rendering a route.
 *
 * Without this file Next serves its own bare "Application error: a
 * server-side exception has occurred" — no chrome, no way back, and no hint
 * that retrying is worth a try. It usually is: the app talks to a Postgres
 * cluster across a lossy path, so a good share of what lands here is a
 * request that would succeed on the next attempt, which is what `reset()`
 * does without a full page load.
 *
 * Note that `redirect()` and `notFound()` are not errors as far as this
 * boundary is concerned — Next handles both before they ever reach it, so the
 * admin guards keep redirecting exactly as they did.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The server error itself is already in the container logs; this is the
    // browser-side half, so a report from a user can be matched to it.
    console.error("[route] render failed", error);
  }, [error]);

  return (
    <ErrorState
      title="این صفحه بالا نیامد"
      description="مشکل از سمت ماست، نه از کاری که کردی. معمولاً یک تلاش دوباره کافی است."
      digest={error.digest}
      actions={
        <>
          <Button onClick={reset} className="min-h-11 px-6">
            <RotateCcw aria-hidden className="me-1 h-4 w-4" />
            تلاش دوباره
          </Button>
          <Button asChild variant="outline" className="min-h-11 px-6">
            <Link href="/">
              <Home aria-hidden className="me-1 h-4 w-4" />
              صفحهٔ اصلی
            </Link>
          </Button>
        </>
      }
    />
  );
}
