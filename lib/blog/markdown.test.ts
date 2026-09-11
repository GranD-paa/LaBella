import { describe, expect, it } from "vitest";

import {
  countWords,
  extractImageUrls,
  markdownToPlainText,
  renderPost,
} from "@/lib/blog/markdown";

describe("renderPost — safety", () => {
  it("drops raw HTML instead of escaping it", () => {
    const { html } = renderPost("سلام\n\n<script>alert(1)</script>\n\nخداحافظ");
    expect(html).not.toContain("script");
    expect(html).not.toContain("&lt;script");
  });

  it("refuses a javascript: link, keeping the text", () => {
    // marked does not filter these on its own, so this is the rule doing the
    // work rather than the library.
    const { html } = renderPost("[کلیک](javascript:alert(1))");
    expect(html).not.toContain("javascript:");
    expect(html).toContain("کلیک");
  });

  it("sends off-site links out without a referrer", () => {
    const { html } = renderPost("[جایی](https://example.com)");
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');
  });

  it("leaves site-relative links in the same tab", () => {
    const { html } = renderPost("[دوره](/learn/italian)");
    expect(html).not.toContain("target=");
  });
});

describe("renderPost — headings and contents", () => {
  it("gives every heading an id and reports h2s and h3s", () => {
    const { html, toc } = renderPost(
      "## زمان گذشته\n\nمتن\n\n### مثال‌ها\n\nمتن\n\n#### ریز\n\nمتن"
    );

    expect(html).toContain('id="زمان-گذشته"');
    // h4 and below are rendered with ids but stay out of the contents list —
    // a table of contents that descends four levels is an outline, not a map.
    expect(toc).toEqual([
      { id: "زمان-گذشته", text: "زمان گذشته", level: 2 },
      { id: "مثال-ها", text: "مثال‌ها", level: 3 },
    ]);
  });

  it("turns a zero-width non-joiner into a hyphen", () => {
    // ZWNJ is invisible. Left in a fragment it produces two ids that look
    // identical and are not, so it becomes a hyphen — which is also what
    // `slugifyTitle` does to post URLs, so headings and slugs agree.
    const { toc } = renderPost("## می‌روم");
    expect(toc[0].id).toBe("می-روم");
    expect(toc[0].text).toBe("می‌روم");
  });

  it("keeps duplicate headings pointing at different places", () => {
    const { toc } = renderPost("## مثال\n\nیک\n\n## مثال\n\nدو\n\n## مثال\n\nسه");
    expect(toc.map((entry) => entry.id)).toEqual([
      "مثال",
      "مثال-2",
      "مثال-3",
    ]);
  });

  it("strips inline markup out of the contents text", () => {
    // The heading renders its emphasis; the table of contents entry is a
    // label, and `<em>` in a list of links is noise.
    const { toc } = renderPost("## واژهٔ **مهم**");
    expect(toc[0].text).toBe("واژهٔ مهم");
  });

  it("does not let two renders share their heading ids", () => {
    // The renderer accumulates state as it walks a document. If it were shared
    // between calls, the second post's first heading would come back as
    // "مثال-2" because the first post had already claimed "مثال".
    const first = renderPost("## مثال");
    const second = renderPost("## مثال");
    expect(second.toc[0].id).toBe(first.toc[0].id);
  });
});

describe("renderPost — images", () => {
  it("stamps known dimensions onto the image", () => {
    const { html } = renderPost("![نمودار](/api/blog-images/x)", {
      imageDimensions: new Map([
        ["/api/blog-images/x", { width: 1200, height: 630 }],
      ]),
    });

    expect(html).toContain('width="1200"');
    expect(html).toContain('height="630"');
    expect(html).toContain('alt="نمودار"');
  });

  it("renders an unmeasured image without the attributes", () => {
    const { html } = renderPost("![x](https://example.com/a.png)");
    expect(html).toContain("<img");
    expect(html).not.toContain("width=");
  });

  it("turns a markdown title into a visible caption", () => {
    const { html } = renderPost('![آلت](/a.png "عکس از ونیز")');
    expect(html).toContain("<figcaption>عکس از ونیز</figcaption>");
  });

  it("lists the images a post references", () => {
    const source = "![a](/api/blog-images/1)\n\ntext\n\n![b](/api/blog-images/2)";
    expect(extractImageUrls(source)).toEqual([
      "/api/blog-images/1",
      "/api/blog-images/2",
    ]);
  });
});

describe("markdownToPlainText", () => {
  it("strips syntax rather than rendering it", () => {
    const text = markdownToPlainText("## تیتر\n\nمتن **پررنگ** و [لینک](/x).");
    expect(text).toBe("تیتر متن پررنگ و لینک.");
  });

  it("cuts at a word boundary and marks the cut", () => {
    const text = markdownToPlainText("یک دو سه چهار پنج شش", 10);
    expect(text.endsWith("…")).toBe(true);
    expect(text.length).toBeLessThanOrEqual(11);
  });

  it("counts words for the post's wordCount", () => {
    expect(countWords("**یک** دو [سه](/x)")).toBe(3);
  });
});
