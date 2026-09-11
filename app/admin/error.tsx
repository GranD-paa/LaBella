"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, RotateCcw } from "lucide-react";

import { ErrorState } from "@/components/errors/error-state";
import { Button } from "@/components/ui/button";

/**
 * Scoped to the admin panel so a broken section does not take the whole
 * panel's chrome with it: this renders inside `app/admin/layout.tsx`, so the
 * header and the rest of the navigation survive and the admin can move on to
 * another page instead of landing on a bare error screen.
 *
 * Worth naming what usually gets here: a panel that reads a table the live
 * database does not have yet, because a migration in `db/` has not been run
 * against it.
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin] render failed", error);
  }, [error]);

  return (
    <ErrorState
      title="این بخش باز نشد"
      description="خواندن اطلاعات این صفحه از دیتابیس شکست خورد. اگر تلاش دوباره هم جواب نداد، لاگ کانتینر را با کد پیگیری زیر نگاه کن."
      digest={error.digest}
      actions={
        <>
          <Button onClick={reset} className="min-h-11 px-6">
            <RotateCcw aria-hidden className="me-1 h-4 w-4" />
            تلاش دوباره
          </Button>
          <Button asChild variant="outline" className="min-h-11 px-6">
            <Link href="/admin">
              <LayoutDashboard aria-hidden className="me-1 h-4 w-4" />
              پنل مدیریت
            </Link>
          </Button>
        </>
      }
    />
  );
}
