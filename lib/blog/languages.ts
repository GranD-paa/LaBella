/**
 * The languages a blog post can be about, and the hub page each one gets.
 *
 * ## Why this list is not `LANDING_LANGUAGES`
 *
 * The landing page's list exists to drive a 3D stage: every entry needs a
 * landmark mesh, an accent colour for its rim light, and a visibility toggle
 * a super admin flips when the course is ready to be teased. A blog hub needs
 * none of that and needs two things that list has no reason to carry — a
 * Persian name to print in Persian prose, and a sentence of copy that reads
 * as a page introduction rather than as a caption under a monument.
 *
 * The slugs are deliberately the same strings, so a post tagged `italian`
 * lines up with `/learn/italian` and with the landing showcase without any
 * translation table in between.
 */

export type BlogLanguageSlug =
  | "italian"
  | "english"
  | "german"
  | "turkish"
  | "french"
  | "spanish";

export type BlogLanguage = {
  slug: BlogLanguageSlug;
  /** Persian name. The blog is Persian-only, so this is what gets printed. */
  name: string;
  /** Endonym, for the chip's second line and for `lang` on that fragment. */
  nativeName: string;
  /** BCP-47 tag, for `inLanguage` on the hub's structured data. */
  bcp47: string;
  /** Page introduction. Written to stand alone in a search result. */
  description: string;
  /** The course, when there is one to link to. */
  courseHref: string | null;
};

export const BLOG_LANGUAGES: BlogLanguage[] = [
  {
    slug: "italian",
    name: "ایتالیایی",
    nativeName: "Italiano",
    bcp47: "it",
    description:
      "هرچه برای یادگیری ایتالیایی لازم داری: دستور زبان از حرف تعریف تا زمان‌های گذشته، واژگان روزمره، تلفظ، و نکته‌هایی که فقط وقتی در ایتالیا زندگی کرده باشی به دستت می‌آید.",
    courseHref: "/learn/italian",
  },
  {
    slug: "english",
    name: "انگلیسی",
    nativeName: "English",
    bcp47: "en",
    description:
      "انگلیسی را از جایی شروع کن که واقعاً به کار می‌آید — جمله‌های پرکاربرد، اشتباه‌های همیشگی فارسی‌زبان‌ها، و روش‌هایی که شنیدن و حرف‌زدن را از خواندن جا نمی‌گذارند.",
    courseHref: "/learn/english",
  },
  {
    slug: "german",
    name: "آلمانی",
    nativeName: "Deutsch",
    bcp47: "de",
    description:
      "آلمانی سخت نیست، فقط منظم است. حالت‌ها، جنسیت اسم‌ها، فعل‌های جداشدنی و هر چیز دیگری که اولش دلهره‌آور به نظر می‌رسد، با مثال و بدون اصطلاح اضافه.",
    courseHref: "/learn/german",
  },
  {
    slug: "turkish",
    name: "ترکی",
    nativeName: "Türkçe",
    bcp47: "tr",
    description:
      "ترکی استانبولی برای فارسی‌زبان‌ها آسان‌تر از چیزی است که فکر می‌کنی — واژه‌های مشترک، ساختار پسوندی، و مسیری که از صفر تا مکالمهٔ روزمره می‌رسد.",
    courseHref: "/learn/turkish",
  },
  {
    slug: "french",
    name: "فرانسوی",
    nativeName: "Français",
    bcp47: "fr",
    description:
      "فرانسوی، از تلفظ‌هایی که روی کاغذ دیده نمی‌شوند تا واژگانی که در فارسی هم هستند و خودمان خبر نداریم.",
    courseHref: null,
  },
  {
    slug: "spanish",
    name: "اسپانیایی",
    nativeName: "Español",
    bcp47: "es",
    description:
      "اسپانیایی را بیست کشور حرف می‌زنند و همه هم مثل هم حرف نمی‌زنند. از دستور زبان تا تفاوت‌های اسپانیا و آمریکای لاتین.",
    courseHref: null,
  },
];

const BY_SLUG = new Map(BLOG_LANGUAGES.map((entry) => [entry.slug, entry]));

export function getBlogLanguage(slug: string): BlogLanguage | undefined {
  return BY_SLUG.get(slug as BlogLanguageSlug);
}

/**
 * Keeps only slugs this build knows about.
 *
 * Rows outlive code: a language can be dropped from the list above while posts
 * tagged with it are still in the database. Filtering on read means those
 * posts stay published and simply stop showing a chip, rather than rendering
 * a link to a hub that 404s.
 */
export function resolveBlogLanguages(slugs: string[]): BlogLanguage[] {
  return slugs
    .map((slug) => BY_SLUG.get(slug as BlogLanguageSlug))
    .filter((entry): entry is BlogLanguage => Boolean(entry));
}
