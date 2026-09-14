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
  it("numbers every heading and lists only the h2s", () => {
    const { html, toc } = renderPost(
      "## زمان گذشته\n\nمتن\n\n### مثال‌ها\n\nمتن\n\n#### ریز\n\nمتن\n\n## تمرین"
    );

    expect(html).toContain('<h2 id="section-1"');
    expect(html).toContain('<h3 id="section-2"');
    expect(html).toContain('<h4 id="section-3"');
    // Subsections keep an id a reader can link to, but stay out of the
    // contents list: it is the article's handful of questions, not an outline.
    expect(toc).toEqual([
      { id: "section-1", text: "زمان گذشته" },
      { id: "section-4", text: "تمرین" },
    ]);
  });

  it("keeps the fragment short and Latin whatever the heading says", () => {
    // A Persian fragment is percent-encoded the moment a link is copied, which
    // is how three-hundred-character section links ended up being shared.
    const { toc } = renderPost("## چرا s در studente باعث استفاده از lo می‌شود؟");
    expect(toc[0].id).toBe("section-1");
    expect(toc[0].text).toBe("چرا s در studente باعث استفاده از lo می‌شود؟");
  });

  it("keeps duplicate headings pointing at different places", () => {
    const { toc } = renderPost("## مثال\n\nیک\n\n## مثال\n\nدو\n\n## مثال\n\nسه");
    expect(toc.map((entry) => entry.id)).toEqual([
      "section-1",
      "section-2",
      "section-3",
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
    // "section-2" because the first post had already counted one.
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
