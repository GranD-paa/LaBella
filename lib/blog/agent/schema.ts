import { z } from "zod";

/**
 * The shape the writer model must return, twice.
 *
 * Once as JSON Schema, because that is what `response_format` speaks and it
 * is the only thing that makes a model reliably emit an object instead of an
 * essay. Once as a zod schema, because "the provider said it enforced the
 * schema" and "the object is actually usable" are different claims — strict
 * mode is per-provider on this gateway, and a model served by a provider
 * without it will happily return prose in the `content` field and a `title`
 * sixty words long.
 *
 * The two are written side by side rather than generated from one another.
 * Generation would need a converter, and the converter is more code than the
 * duplication it saves for a schema this size.
 */

export const articleSchema = z.object({
  /** 45–65 characters is where a Persian title survives a search result
   * without being cut. Enforced as a range rather than a hard trim: a title
   * chopped mid-word reads worse than one two characters over. */
  title: z.string().trim().min(10).max(120),

  /** English slug. Run through `slugifyTitle` before use — the model is good
   * at picking words and unreliable at punctuation, and a Persian slug it
   * sends anyway is dropped there rather than published. */
  slug: z.string().trim().min(3),

  /** The answer, in two or three sentences, before the article argues for
   * it. Published as `abstract` in the post's structured data, which is the
   * field an AI answer lifts verbatim instead of paraphrasing. */
  summary: z.string().trim().min(60).max(600),

  /** The article itself, as Markdown. */
  content: z.string().trim().min(600),

  /** Only when it should differ from `title`. Null is the common case. */
  metaTitle: z.string().trim().max(120).nullable(),

  /** 140–155 characters. Longer is truncated by Google, shorter wastes the
   * space it was given. The ceiling used to be 200 and the model wrote to it;
   * a range in the description is a suggestion, a `max` is the only number a
   * model actually respects. */
  metaDescription: z.string().trim().max(400).nullish(),

  /** Describes the cover for anyone who cannot see it. Persian. */
  coverImageAlt: z.string().trim().min(10).max(200),

  /** The brief for the image model, in English. English because the image
   * models are trained overwhelmingly on English captions and a Persian
   * prompt returns a markedly worse picture. */
  imagePrompt: z.string().trim().min(20).max(1200),

  /**
   * Which kind of cover this article needs.
   *
   * The first covers this agent drew were all `conceptual`, and for an
   * article about two specific Italian verbs that produced a book with two
   * arrows on it — a picture that would suit any article about any choice,
   * and therefore says nothing about this one. When the subject *is* a word,
   * the word has to be in the picture.
   */
  imageMode: z.enum(["typographic", "conceptual"]).default("conceptual"),

  /** The Latin-script words to set, when `imageMode` is `typographic`. At
   * most three: image models spell short words reliably and long phrases
   * badly. Empty for a conceptual cover. */
  imageWords: z.array(z.string().trim()).max(3).default([]),

  /**
   * Every target-language word the article teaches, with the Persian spelling
   * a reader would say it by.
   *
   * This lives in the schema and not in the prompt because the prompt was
   * tried first and ignored: told in prose to bracket each word's
   * pronunciation, the writer produced an article with none at all — zero
   * Persian-script brackets in twelve hundred words. The same lesson as
   * `metaDescription`, where a range described in prose was overrun and only
   * a `max` held. A field the model must fill is the only instruction it has
   * reliably obeyed here.
   *
   * Empty is allowed and correct for an article that teaches no vocabulary —
   * a piece comparing exam certificates has no words to sound out.
   */
  pronunciations: z
    .array(
      z.object({
        word: z.string().trim().min(1),
        fa: z.string().trim().min(1),
      })
    )
    .max(40)
    .default([]),

  categorySlugs: z.array(z.string()).min(1),
  languageSlugs: z.array(z.string()),

  /** The internal links the model says it placed. Checked against `content`
   * rather than trusted: a model that lists links it did not write is more
   * common than one that writes links it did not list. */
  internalLinks: z
    .array(
      z.object({
        slug: z.string().trim(),
        anchor: z.string().trim(),
      })
    )
    .default([]),
});

export type Article = z.infer<typeof articleSchema>;

/**
 * A meta description that is always inside Google's window.
 *
 * The model is asked for one and usually writes a good one, but "usually" was
 * being enforced by throwing the whole article away: a run that had already
 * paid for eight thousand prompt tokens and a finished article failed on a
 * missing field and cost 5,844 toman for nothing. Nothing about the article
 * was wrong — one field of fourteen was absent.
 *
 * So the range is repaired here instead. `summary` is guaranteed by the schema
 * to be sixty characters or more and is written to be the article's answer in
 * two or three sentences, which is exactly what a meta description wants, so
 * it is the fallback. A description that runs long is cut at a word boundary
 * rather than mid-word.
 */
export function fitMetaDescription(
  proposed: string | null | undefined,
  summary: string,
  notes: string[]
): string {
  const CEILING = 155;
  const FLOOR = 80;

  let text = (proposed ?? "").trim();
  const fellBack = text.length < FLOOR;
  if (fellBack) {
    notes.push(
      text.length === 0
        ? "مدل توضیح متا ننوشت؛ از خلاصهٔ مقاله ساخته شد."
        : "توضیح متای مدل کوتاه‌تر از حد لازم بود؛ از خلاصهٔ مقاله ساخته شد."
    );
    text = summary.trim();
  }
  if (text.length <= CEILING) return text;

  const cut = text.slice(0, CEILING + 1);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = (lastSpace > FLOOR ? cut.slice(0, lastSpace) : text.slice(0, CEILING))
    .replace(/[\s،؛:-]+$/, "")
    .trim();
  // A summary is written to be longer than a meta description, so shortening
  // one is the expected path and not worth a line in the run log. Only the
  // model overrunning its own ceiling is worth saying.
  if (!fellBack) notes.push("توضیح متا بلندتر از سقف بود و از مرز کلمه کوتاه شد.");
  return trimmed;
}

const ARTICLE_TITLE_RULE =
  "عنوان فارسی مقاله، بین ۴۵ تا ۶۵ کاراکتر. موضوعی که به تو داده شده «سفارش» است، نه عنوان؛ آن را عیناً کپی نکن. عنوان باید دو چیز داشته باشد: گیرِ مشخصی که خواننده با آن آمده، و یک جزء مشخص از خود مقاله — کلمه‌ای که یاد می‌دهد یا تفاوتی که نشان می‌دهد. کلیدواژهٔ اصلی باید در عنوان باشد، ولی لازم نیست اول آن بیاید. عدد را فقط وقتی بنویس که در متن شمرده باشی.";

/**
 * The same shape as JSON Schema, with the site's real category and language
 * slugs baked in as enums.
 *
 * Passing the lists as enums rather than describing them in the prompt is
 * what stops the model inventing a seventh language. `lib/blog/languages.ts`
 * silently drops unknown slugs on the way in, so an invented one would not
 * error — it would just quietly fail to appear, which is worse.
 *
 * `strict: true` additionally requires every property to be listed in
 * `required` and `additionalProperties: false` throughout, which is why
 * nullable fields are spelled as a two-member type rather than left optional.
 */
/**
 * The retitle pass, which asks for one field and nothing else.
 *
 * A title emitted as one field inside the full article generation scores 29
 * to 41 on `titleGrip`; the same rule asked on its own, with the finished
 * article in hand, scores 47 to 63. The difference is attention, not
 * ordering — moving `title` after `content` in this schema changed nothing.
 */
export const TITLE_ONLY_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  additionalProperties: false,
  required: ["title"],
  properties: {
    title: {
      type: "string",
      description: ARTICLE_TITLE_RULE,
    },
  },
};

export function buildArticleJsonSchema(
  categorySlugs: string[],
  languageSlugs: string[]
): Record<string, unknown> {
  return {
    type: "object",
    additionalProperties: false,
    required: [
      "title",
      "slug",
      "summary",
      "content",
      "metaTitle",
      "metaDescription",
      "coverImageAlt",
      "imagePrompt",
      "imageMode",
      "imageWords",
      "pronunciations",
      "categorySlugs",
      "languageSlugs",
      "internalLinks",
    ],
    properties: {
      title: {
        type: "string",
        description:
          ARTICLE_TITLE_RULE,
      },
      slug: {
        type: "string",
        description:
          "نشانی انگلیسی مقاله برای آدرس صفحه: سه تا شش کلمه‌ی کلیدی به انگلیسی، فقط حروف کوچک انگلیسی و عدد، با خط تیره بین کلمات. هیچ حرف فارسی نگذار. مثال: italian-definite-articles-il-lo-la",
      },
      summary: {
        type: "string",
        description:
          "دو تا سه جمله که مستقیماً به سؤال اصلی مقاله جواب می‌دهد. مستقل و کامل، بدون ارجاع به ادامه متن.",
      },
      content: {
        type: "string",
        description:
          "متن کامل مقاله در قالب مارک‌داون. حداکثر ۶ بخش با ## و زیربخش‌ها با ###. بدون تکرار عنوان اصلی در ابتدای متن.",
      },
      metaTitle: {
        type: ["string", "null"],
        description:
          "فقط اگر با عنوان مقاله فرق دارد. در غیر این صورت null.",
      },
      metaDescription: {
        type: "string",
        description:
          "توضیح متا. سقف قطعی ۱۵۵ کاراکتر است و بیشتر از آن در نتایج گوگل بریده می‌شود؛ قبل از پایان‌دادن، کاراکترها را بشمار. شامل کلیدواژه اصلی.",
      },
      coverImageAlt: {
        type: "string",
        description: "توضیح فارسی تصویر شاخص برای کسی که آن را نمی‌بیند.",
      },
      imagePrompt: {
        type: "string",
        description:
          "English. The subject of the cover. For imageMode 'typographic', describe the small icon that belongs beside EACH word (e.g. 'beside avere a hand holding a box; beside essere a standing human figure') — the words themselves are placed automatically from imageWords. For imageMode 'conceptual', describe ONE concrete recognisable scene: specific objects a person could point at, never an abstract metaphor. Do not mention colours, lighting or art style; those are appended separately.",
      },
      imageMode: {
        type: "string",
        enum: ["typographic", "conceptual"],
        description:
          "اگر موضوع مقاله یک یا چند کلمه/ساختار مشخص در زبان مقصد است (مثلاً تفاوت دو فعل، یک زمان دستوری، یک حرف اضافه)، «typographic» را انتخاب کن تا همان کلمات لاتین روی تصویر بیایند. اگر موضوع مفهومی و عمومی است (مثلاً روش مطالعه، انگیزه، برنامه‌ریزی)، «conceptual» را انتخاب کن.",
      },
      pronunciations: {
        type: "array",
        maxItems: 40,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["word", "fa"],
          properties: {
            word: { type: "string", description: "کلمه به همان شکلی که در زبان مقصد نوشته می‌شود، با حروف لاتین." },
            fa: { type: "string", description: "تلفظ همان کلمه با حروف فارسی، همان‌طور که یک فارسی‌زبان آن را می‌خواند. مثلاً برای Dolce بنویس «دُلچه»." },
          },
        },
        description:
          "هر کلمه‌ی زبان مقصد که در این مقاله یاد می‌دهی، با تلفظ فارسی‌اش. همین کلمه‌ها باید داخل متن هم، اولین باری که می‌آیند، تلفظشان در پرانتز کنارشان باشد — مثل «**Dolce** (دُلچه) — دسر». اگر مقاله هیچ واژه‌ای از زبان مقصد یاد نمی‌دهد، آرایه را خالی بگذار.",
      },
      imageWords: {
        type: "array",
        maxItems: 3,
        items: { type: "string" },
        description:
          "برای حالت typographic: حداکثر سه کلمه‌ی کوتاه با حروف لاتین، دقیقاً همان‌طور که باید نوشته شوند (مثلاً [\"avere\", \"essere\"]). برای حالت conceptual آرایه را خالی بگذار. هرگز کلمه‌ی فارسی نگذار.",
      },
      categorySlugs: {
        type: "array",
        minItems: 1,
        maxItems: 2,
        items: { type: "string", enum: categorySlugs },
      },
      languageSlugs: {
        type: "array",
        maxItems: 3,
        items: { type: "string", enum: languageSlugs },
      },
      internalLinks: {
        type: "array",
        maxItems: 6,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["slug", "anchor"],
          properties: {
            slug: {
              type: "string",
              description: "اسلاگ یکی از مطلب‌های موجود که در متن به آن لینک داده‌ای.",
            },
            anchor: {
              type: "string",
              description: "متن لینک، همان‌طور که در مارک‌داون نوشته‌ای.",
            },
          },
        },
      },
    },
  };
}
