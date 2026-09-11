import Link from "next/link";
import { Home, Newspaper } from "lucide-react";

import { ErrorState } from "@/components/errors/error-state";
import { Button } from "@/components/ui/button";

/**
 * Shown for an unknown URL and for every `notFound()` in the app — a blog
 * slug that no longer resolves, a lesson id that was never real.
 *
 * A 404 is not a failure worth apologising for, so it offers somewhere to go
 * rather than a retry: retrying a URL that does not exist never helps.
 */
export default function NotFound() {
  return (
    <ErrorState
      title="این صفحه پیدا نشد"
      description="نشانی‌ای که باز کردی وجود ندارد یا جابه‌جا شده است."
      actions={
        <>
          <Button asChild className="min-h-11 px-6">
            <Link href="/">
              <Home aria-hidden className="me-1 h-4 w-4" />
              صفحهٔ اصلی
            </Link>
          </Button>
          <Button asChild variant="outline" className="min-h-11 px-6">
            <Link href="/blog">
              <Newspaper aria-hidden className="me-1 h-4 w-4" />
              وبلاگ
            </Link>
          </Button>
        </>
      }
    />
  );
}
