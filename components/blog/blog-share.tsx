"use client";

import { useEffect, useState } from "react";
import { Check, Link2, Send, Share2 } from "lucide-react";

/**
 * The share rail beside an article.
 *
 * ## Which networks, and why not the usual five
 *
 * Facebook and X are not on this list. The readers of a Persian-language
 * blog about learning Italian share links in Telegram and WhatsApp, and the
 * honest fifth option is "copy the address" — a row of buttons nobody presses
 * is not neutral, it costs vertical space next to the text and a moment of
 * every reader's attention.
 *
 * The native share sheet comes first where the browser has one, because on a
 * phone it reaches every app the reader actually uses rather than the three
 * this component happened to pick.
 */
export function BlogShare({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  // `navigator.share` exists on phones and almost nowhere else, so the button
  // appears only after the client confirms it. An effect rather than a check
  // during render: the server has no `navigator`, and a render that reads one
  // would have the server and the browser disagree about what is on the page.
  useEffect(() => {
    setCanShare(typeof navigator.share === "function");
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access denied, or an insecure origin. The address is in the
      // address bar either way; nothing here is worth an error message.
    }
  }

  async function share() {
    try {
      await navigator.share({ title, url });
    } catch {
      // Includes the reader simply dismissing the sheet, which is not a failure.
    }
  }

  return (
    <div
      className="flex flex-row gap-2 lg:sticky lg:top-28 lg:flex-col"
      role="group"
      aria-label="هم‌رسانی این مطلب"
    >
      {canShare ? (
        <IconButton onClick={share} label="هم‌رسانی">
          <Share2 aria-hidden className="h-[1.1rem] w-[1.1rem]" />
        </IconButton>
      ) : null}

      <IconLink
        href={`https://t.me/share/url?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`}
        label="هم‌رسانی در تلگرام"
      >
        <Send aria-hidden className="h-[1.1rem] w-[1.1rem]" />
      </IconLink>

      <IconLink
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        label="هم‌رسانی در واتساپ"
      >
        <WhatsAppIcon />
      </IconLink>

      <IconButton
        onClick={copy}
        label={copied ? "نشانی کپی شد" : "کپی نشانی مطلب"}
      >
        {copied ? (
          <Check aria-hidden className="h-[1.1rem] w-[1.1rem]" />
        ) : (
          <Link2 aria-hidden className="h-[1.1rem] w-[1.1rem]" />
        )}
      </IconButton>

      {/* The label above changes when a link is copied, but a change to an
          `aria-label` is not announced on its own. This region is. */}
      <span aria-live="polite" className="sr-only">
        {copied ? "نشانی مطلب کپی شد." : ""}
      </span>
    </div>
  );
}

const BUTTON_CLASS =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--blog-hairline))] text-muted-foreground transition-colors hover:border-[hsl(var(--blog-accent)/0.5)] hover:text-[hsl(var(--blog-accent))] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ring))]";

function IconButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className={BUTTON_CLASS}>
      {children}
    </button>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={BUTTON_CLASS}
    >
      {children}
    </a>
  );
}

/** Not in lucide, and a brand mark is the one icon that has to be its own shape. */
function WhatsAppIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[1.1rem] w-[1.1rem]"
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.27-1.38a9.9 9.9 0 0 0 4.77 1.21h.01c5.46 0 9.91-4.45 9.91-9.92C21.96 6.45 17.5 2 12.04 2Zm0 18.16h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.05-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Z" />
    </svg>
  );
}
