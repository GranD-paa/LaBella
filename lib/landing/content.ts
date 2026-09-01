import type { LandingLanguageSlug } from "@/lib/landing/languages";
import type { AppLocale } from "@/lib/i18n/types";

/**
 * Every word on the landing page, in both locales.
 *
 * The page is a server component with no copy of its own, so the whole
 * narrative lives here as data. Two consequences worth keeping: a language can
 * be added without touching a component, and the entire page is present in the
 * server-rendered HTML — which is what keeps it indexable.
 */

export type LandingCopy = {
  nav: {
    method: string;
    languages: string;
    pricing: string;
    faq: string;
    blog: string;
    signIn: string;
    signUp: string;
    dashboard: string;
    menuOpen: string;
    menuClose: string;
    skipToContent: string;
  };
  hero: {
    badge: string;
    title: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string[];
  };
  /** The marquee under the hero: a real phrase and what it means. */
  ticker: { phrase: string; lang: string; meaning: string }[];
  why: {
    title: string;
    sub: string;
    beforeLabel: string;
    afterLabel: string;
    rows: { before: string; after: string }[];
  };
  lesson: {
    title: string;
    sub: string;
    parts: { title: string; body: string }[];
  };
  features: {
    title: string;
    sub: string;
    items: { title: string; body: string }[];
  };
  steps: {
    title: string;
    sub: string;
    items: { title: string; body: string }[];
  };
  languages: {
    title: string;
    sub: string;
    comingSoon: string;
    start: string;
    lettersLabel: string;
  };
  pricing: {
    title: string;
    sub: string;
    cta: string;
    note: string;
    /** Rendered when the plans table has nothing to show. */
    fallback: string[];
  };
  day: {
    title: string;
    sub: string;
    items: { when: string; title: string; body: string }[];
  };
  faq: {
    title: string;
    sub: string;
    items: { q: string; a: string }[];
  };
  final: {
    title: string;
    sub: string;
    cta: string;
  };
  footer: {
    tagline: string;
    about: string;
    contact: string;
    blog: string;
    rights: string;
  };
};

const fa: LandingCopy = {
  nav: {
    method: "روش کار",
    languages: "زبان‌ها",
    pricing: "اشتراک",
    faq: "پرسش‌ها",
    blog: "وبلاگ",
    signIn: "ورود",
    signUp: "ثبت‌نام رایگان",
    dashboard: "داشبورد من",
    menuOpen: "باز کردن منو",
    menuClose: "بستن منو",
    skipToContent: "رفتن به محتوا",
  },
  hero: {
    badge: "مسیر ایتالیایی کامل شد",
    title: "زبان را از جمله شروع کن، نه از جدول صرف فعل",
    sub: "هر درس یک تکه از یک روز واقعی است — سفارش دادن، پرسیدن راه، عذرخواهی کردن. قاعده وقتی می‌آید که لازمش داری.",
    ctaPrimary: "شروع رایگان",
    ctaSecondary: "ببین درس چه شکلی است",
    trust: [
      "مسیر A1 کامل",
      "درس تصویری با زیرنویس دوزبانه",
      "آزمون در پایان هر بخش",
    ],
  },
  ticker: [
    { phrase: "Un caffè, per favore", lang: "IT", meaning: "یک قهوه، لطفاً" },
    { phrase: "Dov'è la stazione?", lang: "IT", meaning: "ایستگاه کجاست؟" },
    { phrase: "Ich habe mich verlaufen", lang: "DE", meaning: "گم شده‌ام" },
    { phrase: "Was kostet das?", lang: "DE", meaning: "این چند است؟" },
    { phrase: "Hesap, lütfen", lang: "TR", meaning: "صورت‌حساب، لطفاً" },
    {
      phrase: "Anlamadım, tekrar eder misiniz?",
      lang: "TR",
      meaning: "نفهمیدم، دوباره می‌گویید؟",
    },
    {
      phrase: "Could you say that again?",
      lang: "EN",
      meaning: "می‌شود دوباره بگویید؟",
    },
    {
      phrase: "I'd like to change my ticket",
      lang: "EN",
      meaning: "می‌خواهم بلیتم را عوض کنم",
    },
  ],
  why: {
    title: "از حفظ کردن تا حرف زدن",
    sub: "فرق لاپارلی با کلاسی که یک‌بار رفتی و ول کردی، در ترتیب است — نه در حجم.",
    beforeLabel: "کلاس معمولی",
    afterLabel: "لاپارلی",
    rows: [
      {
        before: "اول جدول صرف فعل، بعد شاید جمله",
        after: "اول جمله، قاعده وقتی لازم شد",
      },
      {
        before: "فهرست پانصد واژه، بی‌بستر",
        after: "هر واژه در جمله‌ای که دیده‌ای‌اش",
      },
      {
        before: "متن کتاب روان، گفتار واقعی نامفهوم",
        after: "صدای طبیعی از درس اول، با زیرنویس دوزبانه",
      },
      {
        before: "امتحان آخر ترم، سه ماه دیر",
        after: "آزمون پایان هر بخش، همان‌جا",
      },
      {
        before: "درسی که نمی‌دانی کجای مسیری",
        after: "مسیر A1 با نقشهٔ روشن و پیشرفت ذخیره‌شده",
      },
    ],
  },
  lesson: {
    title: "چهار بخش، یک درس",
    sub: "هر ماژول همین چهار تکه را دارد. نه بیشتر، نه کمتر — و هیچ‌کدام اختیاری نیست.",
    parts: [
      {
        title: "درس تصویری",
        body: "ویدیوی کوتاه با زیرنویس فارسی و زبان مقصد. هر جمله را می‌شود جدا تکرار کرد تا گوش عادت کند.",
      },
      {
        title: "دستور زبان",
        body: "توضیح فارسی و بی‌اصطلاح، با مثال‌هایی از همین درس نه از یک کتاب دیگر.",
      },
      {
        title: "واژگان",
        body: "کلمه با تلفظ، جنسیت و جملهٔ نمونه. هر واژه در جایی که قبلاً دیده‌ای‌اش.",
      },
      {
        title: "آزمون",
        body: "چند سؤال کوتاه در پایان بخش. تا قبولش نشوی بخش بعدی باز نمی‌شود.",
      },
    ],
  },
  features: {
    title: "ساخته‌شده برای همان جایی که گیر می‌کنی",
    sub: "چیزهایی که موقع یاد گرفتن واقعاً اذیت می‌کنند، نه آنچه در فهرست ویژگی‌ها قشنگ به نظر می‌رسد.",
    items: [
      {
        title: "زیرنویس دوزبانه",
        body: "فارسی و زبان مقصد کنار هم. هر بار که کمتر به فارسی نگاه کنی، خودت می‌فهمی جلو رفته‌ای.",
      },
      {
        title: "تکرار جمله‌به‌جمله",
        body: "هر خط ویدیو را می‌شود جدا برگرداند و دوباره شنید، بدون عقب بردن دستی نوار.",
      },
      {
        title: "پیشرفت ذخیره‌شده",
        body: "مسیر از همان‌جا که رها کردی ادامه پیدا می‌کند، روی هر دستگاهی که وارد شوی.",
      },
      {
        title: "قفل تا وقتی یاد نگرفتی",
        body: "بخش بعدی با رد شدن از آزمون باز می‌شود. جلو رفتن الکی ممکن نیست، و همین نکته است.",
      },
      {
        title: "منبع کلاس‌های واقعی",
        body: "مسیر ایتالیایی روی کتاب‌های مرجعی بسته شده که در کلاس‌های خود ایتالیا استفاده می‌شوند.",
      },
      {
        title: "روی موبایل، بدون نصب",
        body: "درس‌ها اندازه‌ای هستند که در یک مسیر مترو تمام شوند. مرورگر کافی است.",
      },
    ],
  },
  steps: {
    title: "سه گام تا اولین جمله",
    sub: "بدون کارت بانکی، بدون تماس فروش.",
    items: [
      {
        title: "حساب رایگان بساز",
        body: "ایمیل و شماره کافی است. چند ثانیه بیشتر طول نمی‌کشد.",
      },
      {
        title: "زبانت را انتخاب کن",
        body: "مسیر از صفر شروع می‌شود؛ لازم نیست چیزی از قبل بدانی.",
      },
      {
        title: "اولین ماژول را ببین",
        body: "ویدیو، دستور، واژگان و آزمون. اگر روشش به تو نخورد، چیزی از دست نداده‌ای.",
      },
    ],
  },
  languages: {
    title: "از کجا شروع کنیم",
    sub: "هر زبان یک مسیر کامل از صفر است. مسیرها یکی‌یکی باز می‌شوند و هر کدام آماده شود همین‌جا اضافه می‌شود.",
    comingSoon: "به‌زودی",
    start: "شروع دوره",
    lettersLabel: "حرف‌هایی که فارسی ندارد",
  },
  pricing: {
    title: "یک اشتراک، همهٔ مسیرها",
    sub: "لازم نیست برای هر زبان جدا حساب کنی. تا وقتی اشتراکت فعال است، هر مسیری که باز باشد در دسترس توست.",
    cta: "دیدن پلن‌ها",
    note: "قیمت‌ها در صفحهٔ اشتراک به‌روز است.",
    fallback: [
      "دسترسی به همهٔ زبان‌های فعال",
      "درس‌های تازه بدون هزینهٔ اضافه",
      "ادامهٔ مسیر از همان‌جا که رها کردی",
      "روی موبایل و کامپیوتر، بدون نصب",
    ],
  },
  day: {
    title: "درس کجای روزت می‌نشیند",
    sub: "ماژول‌ها کوتاه‌اند چون قرار است واقعاً انجام شوند، نه اینکه در فهرست کارها بمانند.",
    items: [
      {
        when: "صبح",
        title: "یک ویدیو در راه",
        body: "درس تصویری کوتاه‌تر از یک مسیر مترو است. زیرنویس روشن، صدا در گوشی.",
      },
      {
        when: "میان روز",
        title: "ده دقیقه واژگان",
        body: "همان کلمه‌هایی که صبح شنیدی، این‌بار با تلفظ و جملهٔ نمونه.",
      },
      {
        when: "شب",
        title: "آزمون بخش",
        body: "پنج سؤال تا ببینی چه ماند. اگر ماند، بخش بعدی باز می‌شود.",
      },
    ],
  },
  faq: {
    title: "چیزهایی که معمولاً می‌پرسند",
    sub: "اگر جوابت اینجا نبود، از صفحهٔ تماس بپرس.",
    items: [
      {
        q: "از صفر شروع می‌شود؟",
        a: "بله. مسیر از الفبا و اولین جمله‌ها شروع می‌شود و لازم نیست هیچ پیش‌زمینه‌ای داشته باشی. اگر قبلاً چیزی خوانده‌ای، می‌توانی سریع‌تر رد شوی چون آزمون هر بخش جلوی وقت تلف کردن را می‌گیرد.",
      },
      {
        q: "چقدر طول می‌کشد تا بتوانم حرف بزنم؟",
        a: "بستگی به خودت دارد و ما عدد الکی نمی‌دهیم. چیزی که می‌توانیم بگوییم این است که از همان ماژول اول جملهٔ کامل می‌سازی، نه اینکه چند ماه صبر کنی تا نوبت مکالمه برسد.",
      },
      {
        q: "با موبایل هم می‌شود؟",
        a: "بله. همه‌چیز در مرورگر کار می‌کند و چیزی برای نصب نیست. درس‌ها اندازه‌ای هستند که در یک مسیر رفت‌وآمد تمام شوند.",
      },
      {
        q: "اشتراک برای هر زبان جداست؟",
        a: "نه. یک اشتراک همهٔ زبان‌های فعال را باز می‌کند. زبانی هم که بعداً اضافه شود بدون هزینهٔ جدید در دسترست است.",
      },
      {
        q: "می‌توانم اول امتحانش کنم؟",
        a: "بله. حساب رایگان بساز و اولین ماژول را کامل ببین — ویدیو، دستور زبان، واژگان و آزمونش. برای این کار کارت بانکی لازم نیست.",
      },
      {
        q: "چرا بخش بعدی قفل است؟",
        a: "تا وقتی آزمون بخش فعلی را رد نکنی باز نمی‌شود. اولش اذیت‌کننده است، ولی همین چیزی است که نمی‌گذارد بدون یاد گرفتن جلو بروی و سه ماه بعد بفهمی پایه‌ات سست است.",
      },
    ],
  },
  final: {
    title: "اولین درس همین امروز",
    sub: "حساب رایگان بساز و اولین ماژول را ببین. اگر روشش به تو نخورد، چیزی از دست نداده‌ای.",
    cta: "شروع رایگان",
  },
  footer: {
    tagline: "هر درس، یک قدم به روانی",
    about: "دربارهٔ ما",
    contact: "تماس",
    blog: "وبلاگ",
    rights: "همهٔ حقوق محفوظ است.",
  },
};

const en: LandingCopy = {
  nav: {
    method: "Method",
    languages: "Languages",
    pricing: "Pricing",
    faq: "FAQ",
    blog: "Blog",
    signIn: "Sign in",
    signUp: "Start free",
    dashboard: "My dashboard",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    skipToContent: "Skip to content",
  },
  hero: {
    badge: "The Italian path is complete",
    title: "Start a language at the sentence, not the conjugation table",
    sub: "Every lesson is a piece of a real day — ordering, asking directions, apologising. The rule arrives when you need it.",
    ctaPrimary: "Start free",
    ctaSecondary: "See what a lesson looks like",
    trust: [
      "A complete A1 path",
      "Video lessons subtitled in both languages",
      "A quiz closing every section",
    ],
  },
  ticker: [
    { phrase: "Un caffè, per favore", lang: "IT", meaning: "A coffee, please" },
    { phrase: "Dov'è la stazione?", lang: "IT", meaning: "Where is the station?" },
    { phrase: "Ich habe mich verlaufen", lang: "DE", meaning: "I'm lost" },
    { phrase: "Was kostet das?", lang: "DE", meaning: "How much is this?" },
    { phrase: "Hesap, lütfen", lang: "TR", meaning: "The bill, please" },
    {
      phrase: "Anlamadım, tekrar eder misiniz?",
      lang: "TR",
      meaning: "I didn't catch that — again?",
    },
    {
      phrase: "Could you say that again?",
      lang: "EN",
      meaning: "Asking someone to repeat",
    },
    {
      phrase: "I'd like to change my ticket",
      lang: "EN",
      meaning: "At the counter",
    },
  ],
  why: {
    title: "From memorising to speaking",
    sub: "What separates this from the class you quit is the order things come in — not how much of them there is.",
    beforeLabel: "The usual class",
    afterLabel: "Laparli",
    rows: [
      {
        before: "Conjugation tables first, sentences maybe later",
        after: "Sentence first, the rule when it is needed",
      },
      {
        before: "Five hundred words on a list, no context",
        after: "Every word inside a sentence you have met",
      },
      {
        before: "The textbook reads fine, real speech doesn't",
        after: "Natural speed from lesson one, subtitled in both",
      },
      {
        before: "An end-of-term exam, three months late",
        after: "A quiz at the end of each section, on the spot",
      },
      {
        before: "No idea where you are on the path",
        after: "A mapped A1 route with your progress saved",
      },
    ],
  },
  lesson: {
    title: "Four parts, one lesson",
    sub: "Every module holds the same four pieces. No more, no fewer — and none of them optional.",
    parts: [
      {
        title: "Video lesson",
        body: "A short film subtitled in both languages, with every line replayable on its own until your ear catches it.",
      },
      {
        title: "Grammar",
        body: "Explained plainly, with examples drawn from this lesson rather than from some other book.",
      },
      {
        title: "Vocabulary",
        body: "Words with pronunciation, gender and a sample sentence — each where you already met it.",
      },
      {
        title: "Quiz",
        body: "A handful of questions closing the section. The next one stays shut until you pass.",
      },
    ],
  },
  features: {
    title: "Built for the places you actually get stuck",
    sub: "The things that genuinely slow a learner down, rather than the ones that look good on a feature list.",
    items: [
      {
        title: "Subtitles in both languages",
        body: "Persian and the target side by side. Each time you need the Persian less, you can see it for yourself.",
      },
      {
        title: "Line-by-line replay",
        body: "Send any line of the video back and hear it again, without scrubbing the timeline by hand.",
      },
      {
        title: "Progress that persists",
        body: "The path resumes where you left it, on whatever device you sign in from.",
      },
      {
        title: "Locked until it lands",
        body: "The next section opens when you pass the quiz. Coasting forward isn't possible, and that is the point.",
      },
      {
        title: "Real classroom sources",
        body: "The Italian path is built on the textbooks Italian classrooms actually teach from.",
      },
      {
        title: "On the phone, nothing to install",
        body: "Lessons are sized to finish in one commute. A browser is enough.",
      },
    ],
  },
  steps: {
    title: "Three steps to the first sentence",
    sub: "No card, no sales call.",
    items: [
      {
        title: "Make a free account",
        body: "An email and a number. It takes a few seconds.",
      },
      {
        title: "Choose your language",
        body: "The path starts at zero; you don't need to know anything going in.",
      },
      {
        title: "Take the first module",
        body: "Video, grammar, vocabulary and the quiz. If the method isn't for you, you've lost nothing.",
      },
    ],
  },
  languages: {
    title: "Where to begin",
    sub: "Every language is a complete path from zero. They open one at a time, and each new one appears here as it is finished.",
    comingSoon: "Coming soon",
    start: "Start the course",
    lettersLabel: "Letters Persian doesn't have",
  },
  pricing: {
    title: "One subscription, every path",
    sub: "No separate account per language. While your subscription is active, every open path is yours.",
    cta: "See the plans",
    note: "Current prices live on the subscription page.",
    fallback: [
      "Access to every active language",
      "New lessons at no extra cost",
      "Pick the path up where you left it",
      "On phone and desktop, nothing to install",
    ],
  },
  day: {
    title: "Where a lesson fits in your day",
    sub: "Modules are short because they are meant to actually get done, not to sit on a list.",
    items: [
      {
        when: "Morning",
        title: "One video on the way",
        body: "The video lesson is shorter than a metro ride. Subtitles on, sound in your headphones.",
      },
      {
        when: "Midday",
        title: "Ten minutes of vocabulary",
        body: "The same words you heard this morning, now with pronunciation and a sample sentence.",
      },
      {
        when: "Evening",
        title: "The section quiz",
        body: "Five questions to see what stuck. If it stuck, the next section opens.",
      },
    ],
  },
  faq: {
    title: "What people usually ask",
    sub: "If your question isn't here, send it from the contact page.",
    items: [
      {
        q: "Does it start from zero?",
        a: "Yes. The path begins at the alphabet and the first sentences, and assumes nothing. If you have studied before you can move faster — the section quizzes stop you wasting time on what you already know.",
      },
      {
        q: "How long until I can speak?",
        a: "That depends on you, and we won't invent a number. What we can say is that you build complete sentences from the first module rather than waiting months for conversation to come round.",
      },
      {
        q: "Does it work on a phone?",
        a: "Yes. Everything runs in the browser with nothing to install, and lessons are sized to finish in one commute.",
      },
      {
        q: "Is the subscription per language?",
        a: "No. One subscription opens every active language, and any language added later is included at no extra cost.",
      },
      {
        q: "Can I try it first?",
        a: "Yes. Make a free account and take the whole first module — video, grammar, vocabulary and its quiz. No card required.",
      },
      {
        q: "Why is the next section locked?",
        a: "It opens once you pass the current section's quiz. It is annoying at first, and it is also the thing that stops you moving on without learning and discovering three months later that the foundation is thin.",
      },
    ],
  },
  final: {
    title: "The first lesson, today",
    sub: "Make a free account and take the first module. If the method isn't for you, you've lost nothing.",
    cta: "Start free",
  },
  footer: {
    tagline: "Every lesson, a step towards fluency",
    about: "About",
    contact: "Contact",
    blog: "Blog",
    rights: "All rights reserved.",
  },
};

const LANDING_COPY: Partial<Record<AppLocale, LandingCopy>> = { fa, en };

/**
 * Per-language copy for the rail.
 *
 * `letters` is the typographic detail that gives each card an identity without
 * a photograph: the characters that language has and Persian does not. It is
 * real information about the language, which is more than a stock photo of a
 * monument would have carried.
 */
export type LandingLanguageCopy = {
  region: string;
  title: string;
  letters: string;
  body: string;
};

const LANDING_LANGUAGE_COPY: Partial<
  Record<AppLocale, Partial<Record<LandingLanguageSlug, LandingLanguageCopy>>>
> = {
  fa: {
    italian: {
      region: "ایتالیا",
      title: "ایتالیایی",
      letters: "à è é ì ò ù",
      body: "کامل‌ترین مسیر ما. دوره‌ای بر پایهٔ کتاب‌های مرجع کلاس‌های ایتالیا، با دستور زبان، واژگان، درس تصویری و آزمون در هر بخش.",
    },
    english: {
      region: "بریتانیا و آمریکا",
      title: "انگلیسی",
      letters: "th gh ough",
      body: "از الفبا تا مکالمهٔ روان. همان ساختاری که در ایتالیایی جواب داده، این‌بار برای زبانی که همه‌جا لازمش داری.",
    },
    german: {
      region: "آلمان",
      title: "آلمانی",
      letters: "ä ö ü ß",
      body: "زبانی که شهرتش سخت بودن است و مشکلش فقط ترتیب یاد دادن. از جمله‌های کوتاه شروع می‌کنیم و حالت‌ها را وقتی می‌آوریم که لازم شده‌اند.",
    },
    turkish: {
      region: "ترکیه",
      title: "ترکی",
      letters: "ç ğ ı ö ş ü",
      body: "نزدیک‌ترین زبان به گوش فارسی‌زبان‌ها و پرکاربردترین‌شان در سفر. از خواندن و گفتن شروع می‌کنیم، نه از جدول صرف فعل.",
    },
    french: {
      region: "فرانسه",
      title: "فرانسوی",
      letters: "ç é è ê œ",
      body: "مسیر فرانسوی در حال ساخت است. به‌محض آماده شدن اولین ماژول، همین‌جا باز می‌شود.",
    },
    spanish: {
      region: "اسپانیا",
      title: "اسپانیایی",
      letters: "ñ á í ó ¿ ¡",
      body: "مسیر اسپانیایی در حال ساخت است. به‌محض آماده شدن اولین ماژول، همین‌جا باز می‌شود.",
    },
  },
  en: {
    italian: {
      region: "Italy",
      title: "Italian",
      letters: "à è é ì ò ù",
      body: "Our most complete path. Built on the textbooks Italian classrooms actually use, with grammar, vocabulary, a video lesson and a quiz in every module.",
    },
    english: {
      region: "Britain & the US",
      title: "English",
      letters: "th gh ough",
      body: "From the alphabet to fluent conversation. The structure that worked for Italian, turned on the language you need everywhere.",
    },
    german: {
      region: "Germany",
      title: "German",
      letters: "ä ö ü ß",
      body: "A language with a reputation for being hard, whose real problem is the order it gets taught in. Short sentences first, cases once they are needed.",
    },
    turkish: {
      region: "Türkiye",
      title: "Turkish",
      letters: "ç ğ ı ö ş ü",
      body: "The easiest of these on a Persian ear and the most useful on the road. Reading and speaking first, not conjugation tables.",
    },
    french: {
      region: "France",
      title: "French",
      letters: "ç é è ê œ",
      body: "The French path is being built. It opens here the moment the first module is ready.",
    },
    spanish: {
      region: "Spain",
      title: "Spanish",
      letters: "ñ á í ó ¿ ¡",
      body: "The Spanish path is being built. It opens here the moment the first module is ready.",
    },
  },
};

/**
 * Copy for a locale, falling back to Persian.
 *
 * The app carries an Italian UI locale this page has no translation for yet.
 * Falling back keeps the page rendering instead of throwing at request time,
 * and makes adding a locale one entry above rather than a change here.
 */
export function getLandingCopy(locale: AppLocale): LandingCopy {
  return LANDING_COPY[locale] ?? fa;
}

export function getLandingLanguageCopy(
  locale: AppLocale
): Partial<Record<LandingLanguageSlug, LandingLanguageCopy>> {
  return LANDING_LANGUAGE_COPY[locale] ?? LANDING_LANGUAGE_COPY.fa!;
}
