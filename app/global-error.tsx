"use client";

/**
 * The last boundary: it catches a failure in the root layout itself, which is
 * the one case `app/error.tsx` cannot reach.
 *
 * When the root layout is what broke, nothing it sets up can be relied on —
 * it supplies the fonts, the Tailwind stylesheet and the `<html>` element, so
 * this file has to bring its own. Hence the literal styles and the hard-coded
 * brand colours instead of the design tokens used everywhere else: a fallback
 * that depends on the thing that just failed is not a fallback.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          backgroundColor: "#090014",
          color: "#fafafa",
          fontFamily:
            "Vazirmatn, system-ui, -apple-system, 'Segoe UI', Tahoma, sans-serif",
        }}
      >
        <div role="alert" style={{ maxWidth: "32rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700, margin: 0 }}>
            سایت بالا نیامد
          </h1>
          <p
            style={{
              margin: "12px 0 0",
              lineHeight: 1.8,
              color: "#cfc6dd",
            }}
          >
            یک خطای غیرمنتظره جلوی بارگذاری صفحه را گرفت. چند لحظه بعد دوباره
            امتحان کن.
          </p>

          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "28px",
              minHeight: "44px",
              padding: "0 28px",
              border: "none",
              borderRadius: "9999px",
              backgroundColor: "#FBBF24",
              color: "#12002b",
              fontSize: "1rem",
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
            }}
          >
            تلاش دوباره
          </button>

          {error.digest ? (
            <p
              style={{
                marginTop: "28px",
                fontSize: "0.75rem",
                color: "#9c93ab",
              }}
            >
              کد پیگیری:{" "}
              <code dir="ltr" style={{ fontFamily: "monospace" }}>
                {error.digest}
              </code>
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
