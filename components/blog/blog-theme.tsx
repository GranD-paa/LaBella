"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * The blog's light/dark switch.
 *
 * ## Why the blog has its own and does not use next-themes
 *
 * The app is dark and only dark: `:root` in globals.css *is* the dark palette,
 * there is no light one, and `next-themes` is in the tree solely because the
 * toast library asks it which theme is current. Mounting a real theme provider
 * to serve one page would put a context around the whole app so that one route
 * could change colour.
 *
 * So this writes a single attribute on `<html>` and the CSS in globals.css
 * does the rest, scoped to `.blog-root`. Nothing outside the blog can see it.
 */

export const BLOG_THEME_STORAGE_KEY = "laparli-blog-theme";
export const BLOG_THEME_ATTRIBUTE = "data-blog-theme";

type BlogTheme = "dark" | "light";

/**
 * Runs before the blog paints, from inside the markup rather than from a
 * bundle.
 *
 * A `useEffect` cannot do this job: it fires after the first paint, so a
 * reader who chose light would watch the page flash dark on every navigation.
 * Inline and synchronous, the attribute is already on `<html>` by the time the
 * browser reaches the first themed element below it.
 *
 * The stored value is validated rather than trusted — it is a string from a
 * store the reader can edit — and anything unexpected falls back to dark,
 * which is what the CSS renders with no attribute at all.
 */
const BOOTSTRAP = `(function(){try{var v=localStorage.getItem(${JSON.stringify(
  BLOG_THEME_STORAGE_KEY
)});if(v==='light'||v==='dark'){document.documentElement.setAttribute(${JSON.stringify(
  BLOG_THEME_ATTRIBUTE
)},v);}}catch(e){}})();`;

export function BlogThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: BOOTSTRAP }} />;
}

/** Keeps the browser chrome (address bar, task switcher) in step. */
function syncBrowserThemeColor(theme: BlogTheme) {
  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]'
  );
  if (meta) meta.content = theme === "light" ? "#fbfafe" : "#090014";
}

export function BlogThemeToggle() {
  // Starts as dark to match what the server rendered. The bootstrap script may
  // already have set light on <html>, and the effect below reconciles with it
  // after mount — rendering the real value on the server is impossible, since
  // the choice lives in the reader's browser and nowhere else.
  const [theme, setTheme] = useState<BlogTheme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = document.documentElement.getAttribute(
      BLOG_THEME_ATTRIBUTE
    );
    setTheme(current === "light" ? "light" : "dark");
    setMounted(true);
  }, []);

  function toggle() {
    const next: BlogTheme = theme === "light" ? "dark" : "light";
    setTheme(next);

    // Dark is the default, so it is stored as the absence of an attribute
    // rather than as `data-blog-theme="dark"`. One state, one representation.
    if (next === "light") {
      document.documentElement.setAttribute(BLOG_THEME_ATTRIBUTE, "light");
    } else {
      document.documentElement.removeAttribute(BLOG_THEME_ATTRIBUTE);
    }

    syncBrowserThemeColor(next);

    try {
      localStorage.setItem(BLOG_THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing, or storage the reader has switched off. The theme
      // still applies for this page; it just will not be remembered.
    }
  }

  const goingToLight = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      // Until the effect has read the real value, the label would describe the
      // wrong direction for a reader who chose light. Announcing nothing for
      // one frame beats announcing something false to a screen reader.
      aria-label={
        mounted
          ? goingToLight
            ? "تغییر به حالت روشن"
            : "تغییر به حالت تیره"
          : "تغییر حالت نمایش"
      }
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--blog-hairline))] text-muted-foreground transition-colors hover:bg-[hsl(var(--blog-wash))] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--ring))]"
    >
      {/*
        Both icons are in the DOM and CSS shows whichever matches the current
        theme (see `.blog-theme-sun` in globals.css). Picking one in JavaScript
        would mean the server renders the default and a reader who chose light
        gets the wrong icon until hydration catches up — the same flash the
        bootstrap script exists to prevent, reintroduced one element at a time.
      */}
      <Sun aria-hidden className="blog-theme-sun h-[1.15rem] w-[1.15rem]" />
      <Moon aria-hidden className="blog-theme-moon h-[1.15rem] w-[1.15rem]" />
    </button>
  );
}
