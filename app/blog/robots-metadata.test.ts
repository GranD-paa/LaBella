import { describe, expect, it } from "vitest";

/**
 * How a post's `robots` metadata merges with the root layout's.
 *
 * ## Why this test exists
 *
 * The root layout puts `noindex` on every page while the site is closed before
 * launch. `app/blog/[slug]/page.tsx` also has an opinion about `robots` — the
 * admin's per-post switch — and the way those two combine is not the way it
 * looks.
 *
 * The obvious spelling is a ternary:
 *
 *     robots: post.noindex ? { index: false, follow: true } : undefined
 *
 * which reads as "override, or leave it alone". It is not. Next merges child
 * metadata over the parent's by key, and a key that is *present* wins even
 * when its value is `undefined` — so the false branch does not inherit the
 * root layout's rule, it deletes it. That is exactly what happened: the blog
 * index and the landing page carried the pre-launch `noindex` meta tag and
 * article pages silently did not.
 *
 * This is a property of object spreading, not of Next, so it can be pinned
 * here without booting a server: the fix is to omit the key entirely, and
 * these assertions are what tell the next person that `robots: undefined` is
 * not the same thing as not writing `robots` at all.
 */

type Metadata = { robots?: unknown; title?: string };

/** What the root layout contributes while the site is closed. */
const ROOT: Metadata = {
  title: "Laparli",
  robots: { index: false, follow: false, nocache: true },
};

/** The shape the page used to build, and the bug it carried. */
function withTernary(postNoindex: boolean): Metadata {
  return {
    title: "یک مطلب",
    robots: postNoindex ? { index: false, follow: true } : undefined,
  };
}

/** The shape it builds now. */
function withSpread(postNoindex: boolean): Metadata {
  return {
    title: "یک مطلب",
    ...(postNoindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Next merges child over parent; a present key wins, undefined included. */
function merge(parent: Metadata, child: Metadata): Metadata {
  return { ...parent, ...child };
}

describe("a post's robots metadata against the root layout's", () => {
  it("inherits the pre-launch noindex when the post has no opinion", () => {
    const resolved = merge(ROOT, withSpread(false));
    expect(resolved.robots).toEqual({
      index: false,
      follow: false,
      nocache: true,
    });
  });

  it("still lets a post mark itself noindex", () => {
    const resolved = merge(ROOT, withSpread(true));
    expect(resolved.robots).toEqual({ index: false, follow: true });
  });

  it("is indexable after launch, when the root layout sets nothing", () => {
    const resolved = merge({ title: "Laparli" }, withSpread(false));
    expect(resolved.robots).toBeUndefined();
  });

  it("demonstrates the bug the spread avoids", () => {
    // The regression this guards against, stated as an executable claim: the
    // ternary erases the parent's rule rather than deferring to it.
    const broken = merge(ROOT, withTernary(false));
    expect(broken.robots).toBeUndefined();

    // Same input, correct spelling.
    expect(merge(ROOT, withSpread(false)).robots).toEqual(ROOT.robots);
  });
});
