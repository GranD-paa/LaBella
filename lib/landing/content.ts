import type { AppLocale } from "@/lib/i18n/types";

/**
 * The parts of the landing page that do not change with the course.
 *
 * The split against `decks.ts` is deliberate. A sentence that describes a
 * language belongs to that language and is written four times; a sentence that
 * describes Laparli is written once and takes the course name through
 * `{course}`. Copying the method sections per course would be four copies of a
 * single claim, and the first edit would update one of them.
 *
 * Every placeholder is `{course}`, filled with the featured course's name in
 * the reading locale — so a Persian visitor looking at the German path reads
 * "آلمانی" everywhere, not a generic "your language".
 */

export type LandingCopy = {
  /** What a search result and a shared link say. No `{course}` here — the
      page is a home page first and a course page second. */
  seo: { title: string; description: string };
  nav: {
    pricing: string;
    faq: string;
    blog: string;
    signIn: string;
    signUp: string;
    dashboard: string;
    menuOpen: string;
    menuClose: string;
    skipToContent: string;
    /** Accessible name for the locale switcher — it is a group of buttons
        whose labels are language codes, which say nothing on their own. */
    language: string;
  };
  hero: {
    /** Sits above the course name. */
    eyebrow: string;
    cta: string;
    /** The prompt on the scroll cue. `{course}` allowed. */
    scrollHint: string;
    /** Accessible name for a side globe. `{course}` is the target. */
    showCourse: string;
    /** Accessible name for the scroll control. */
    scrollLabel: string;
  };
  /** Badge on a course that is priced but not open yet. */
  comingSoon: string;
  ticker: { title: string };
  hurdles: { title: string; sub: string };
  lesson: {
    title: string;
    sub: string;
    /** The four pieces every module is made of. */
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
  pricing: {
    title: string;
    sub: string;
    cta: string;
    note: string;
    tomanNote: string;
    comingSoonNote: string;
    periodLabel: string;
    currencyLabel: string;
    monthly: string;
    quarterly: string;
    euro: string;
    toman: string;
    popular: string;
    /** `{percent}` — the quarterly incentive. */
    save: string;
    /** `{percent}` — a plan's own discount. */
    off: string;
    /** `{amount}` — the per-month equivalent of a quarterly price. */
    perMonth: string;
    perMonthUnit: string;
    perQuarter: string;
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
    /** Asked about Laparli rather than about one course. */
    items: { q: string; a: string }[];
  };
  final: { cta: string };
  footer: {
    tagline: string;
    about: string;
    contact: string;
    blog: string;
    rights: string;
  };
};

const fa: LandingCopy = {
  seo: {
    title: "زبان تازه‌ات را از جمله شروع کن",
    description:
      "چهار مسیر کامل از صفر — ایتالیایی، انگلیسی، آلمانی و ترکی. هر درس یک ویدیوی کوتاه با زیرنویس دوزبانه است، به‌علاوهٔ دستور زبان، واژگان و آزمونی که تا قبولش نشوی بخش بعدی باز نمی‌شود.",
  },
  nav: {
    pricing: "اشتراک",
    faq: "پرسش‌ها",
    blog: "وبلاگ",
    signIn: "ورود",
    signUp: "ثبت‌نام",
    dashboard: "داشبورد من",
    menuOpen: "باز کردن منو",
    menuClose: "بستن منو",
    skipToContent: "رفتن به محتوا",
    language: "زبان سایت",
  },
  hero: {
    eyebrow: "زبان",
    cta: "شروع کنید",
    scrollHint: "همه چیز دربارهٔ {course}",
    showCourse: "{course} را نشان بده",
    scrollLabel: "اسکرول به بخش بعدی",
  },
  comingSoon: "به‌زودی",
  ticker: {
    title: "چیزهایی که در هفتهٔ اول {course} می‌گویی",
  },
  hurdles: {
    title: "{course} کجا سخت می‌شود",
    sub: "هر زبان جای گیر کردن خودش را دارد. این‌ها جاهایی‌اند که {course} زبان‌آموز را زمین می‌زند — و کاری که مسیر با هرکدام می‌کند.",
  },
  lesson: {
    title: "چهار بخش، یک درس",
    sub: "هر ماژول {course} همین چهار تکه را دارد. نه بیشتر، نه کمتر — و هیچ‌کدام اختیاری نیست.",
    parts: [
      {
        title: "درس تصویری",
        body: "ویدیوی کوتاه با زیرنویس فارسی و {course}. هر جمله را می‌شود جدا تکرار کرد تا گوش عادت کند.",
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
    sub: "چیزهایی که موقع یاد گرفتن {course} واقعاً اذیت می‌کنند، نه آنچه در فهرست ویژگی‌ها قشنگ به نظر می‌رسد.",
    items: [
      {
        title: "زیرنویس دوزبانه",
        body: "فارسی و {course} کنار هم. هر بار که کمتر به فارسی نگاه کنی، خودت می‌فهمی جلو رفته‌ای.",
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
        body: "مسیر روی کتاب‌های مرجعی بسته شده که در کلاس‌های واقعی همان زبان استفاده می‌شوند.",
      },
      {
        title: "روی موبایل، بدون نصب",
        body: "درس‌ها اندازه‌ای هستند که در یک مسیر مترو تمام شوند. مرورگر کافی است.",
      },
    ],
  },
  steps: {
    title: "سه گام تا اولین جملهٔ {course}",
    sub: "بدون کارت بانکی، بدون تماس فروش.",
    items: [
      {
        title: "حساب رایگان بساز",
        body: "ایمیل و شماره کافی است. چند ثانیه بیشتر طول نمی‌کشد.",
      },
      {
        title: "{course} را انتخاب کن",
        body: "مسیر از صفر شروع می‌شود؛ لازم نیست چیزی از قبل بدانی.",
      },
      {
        title: "اولین ماژول را ببین",
        body: "ویدیو، دستور، واژگان و آزمون. اگر روشش به تو نخورد، چیزی از دست نداده‌ای.",
      },
    ],
  },
  pricing: {
    title: "قیمت {course}",
    sub: "یک اشتراک همهٔ مسیرهای باز را باز می‌کند. این عددی است که برای {course} پرداخت می‌کنی.",
    cta: "تهیهٔ اشتراک",
    note: "همین قیمت است. پرداخت بعد از ساختن حساب انجام می‌شود.",
    tomanNote:
      "مبلغ تومانی با نرخ روز حساب می‌شود و تا لحظهٔ پرداخت ممکن است کمی جابه‌جا شود.",
    comingSoonNote:
      "مسیر {course} هنوز باز نشده. قیمت‌ها همان‌هایی است که روز افتتاح اعمال می‌شود.",
    periodLabel: "دورهٔ پرداخت",
    currencyLabel: "واحد پول",
    monthly: "۱ ماهه",
    quarterly: "۳ ماهه",
    euro: "یورو",
    toman: "تومان",
    popular: "محبوب‌ترین",
    save: "{percent}٪ کمتر",
    off: "{percent}٪ تخفیف",
    perMonth: "ماهانه {amount}",
    perMonthUnit: "/ ماه",
    perQuarter: "/ ۳ ماه",
    fallback: [
      "دسترسی به همهٔ زبان‌های فعال",
      "درس‌های تازه بدون هزینهٔ اضافه",
      "ادامهٔ مسیر از همان‌جا که رها کردی",
      "روی موبایل و کامپیوتر، بدون نصب",
    ],
  },
  day: {
    title: "{course} کجای روزت می‌نشیند",
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
  final: { cta: "شروع رایگان" },
  footer: {
    tagline: "هر درس، یک قدم به روانی",
    about: "دربارهٔ ما",
    contact: "تماس",
    blog: "وبلاگ",
    rights: "همهٔ حقوق محفوظ است.",
  },
};

const en: LandingCopy = {
  seo: {
    title: "Start your next language from a sentence",
    description:
      "Four complete paths from zero — Italian, English, German and Turkish. Every lesson is a short video with bilingual subtitles, plus grammar, vocabulary and a quiz that keeps the next section locked until you pass it.",
  },
  nav: {
    pricing: "Pricing",
    faq: "Questions",
    blog: "Blog",
    signIn: "Sign in",
    signUp: "Sign up",
    dashboard: "My dashboard",
    menuOpen: "Open navigation",
    menuClose: "Close navigation",
    skipToContent: "Skip to content",
    language: "Site language",
  },
  hero: {
    eyebrow: "LANGUAGE",
    cta: "GET STARTED",
    scrollHint: "Everything about {course}",
    showCourse: "Show {course}",
    scrollLabel: "Scroll to next section",
  },
  comingSoon: "Coming soon",
  ticker: {
    title: "What you say in your first week of {course}",
  },
  hurdles: {
    title: "Where {course} gets hard",
    sub: "Every language has its own place to get stuck. These are the ones {course} trips people on — and what the path does about each.",
  },
  lesson: {
    title: "Four parts, one lesson",
    sub: "Every {course} module is these four pieces. No more, no less, and none of them optional.",
    parts: [
      {
        title: "Video lesson",
        body: "A short video with subtitles in both your language and {course}. Any line can be replayed on its own until the ear settles.",
      },
      {
        title: "Grammar",
        body: "Explained in plain language, with examples from this lesson rather than from some other book.",
      },
      {
        title: "Vocabulary",
        body: "Each word with its pronunciation, gender and a sample sentence — in the place you already met it.",
      },
      {
        title: "Quiz",
        body: "A few short questions at the end of the section. The next one stays locked until you pass.",
      },
    ],
  },
  features: {
    title: "Built for the place you actually get stuck",
    sub: "The things that genuinely get in the way of learning {course}, rather than the ones that look good in a feature list.",
    items: [
      {
        title: "Bilingual subtitles",
        body: "Your language and {course} side by side. Every time you glance at the left one less, you can feel the progress yourself.",
      },
      {
        title: "Line-by-line replay",
        body: "Any line of the video can be rewound and heard again on its own, without dragging the scrubber back by hand.",
      },
      {
        title: "Saved progress",
        body: "The path picks up where you left it, on any device you sign in from.",
      },
      {
        title: "Locked until you have it",
        body: "The next section opens by passing the quiz. Coasting through is not possible, and that is the point.",
      },
      {
        title: "Built on real classroom books",
        body: "The path is built on the reference textbooks used in actual classrooms for that language.",
      },
      {
        title: "On mobile, nothing to install",
        body: "Lessons are sized to finish in one commute. A browser is enough.",
      },
    ],
  },
  steps: {
    title: "Three steps to your first {course} sentence",
    sub: "No card, no sales call.",
    items: [
      {
        title: "Create a free account",
        body: "An email and a number is all it takes. It is a matter of seconds.",
      },
      {
        title: "Choose {course}",
        body: "The path starts from zero; nothing is assumed.",
      },
      {
        title: "Watch the first module",
        body: "Video, grammar, vocabulary and quiz. If the method is not for you, you have lost nothing.",
      },
    ],
  },
  pricing: {
    title: "What {course} costs",
    sub: "One subscription opens every path that is live. This is the number you pay for {course}.",
    cta: "Get the subscription",
    note: "This is the price. Payment happens after the account exists.",
    tomanNote:
      "The Toman figure is calculated at today's rate and may shift slightly before payment.",
    comingSoonNote:
      "The {course} path has not opened yet. These are the prices that will apply on the day it does.",
    periodLabel: "Billing period",
    currencyLabel: "Currency",
    monthly: "1 month",
    quarterly: "3 months",
    euro: "Euro",
    toman: "Toman",
    popular: "Most popular",
    save: "{percent}% less",
    off: "{percent}% off",
    perMonth: "{amount} a month",
    perMonthUnit: "/ month",
    perQuarter: "/ 3 months",
    fallback: [
      "Access to every live language",
      "New lessons at no extra cost",
      "Continue from where you left off",
      "On mobile and desktop, nothing to install",
    ],
  },
  day: {
    title: "Where {course} sits in your day",
    sub: "Modules are short because they are meant to actually happen, not to sit on a list.",
    items: [
      {
        when: "Morning",
        title: "One video on the way",
        body: "The video lesson is shorter than a metro ride. Subtitles on, audio in your ear.",
      },
      {
        when: "Midday",
        title: "Ten minutes of vocabulary",
        body: "The same words you heard this morning, now with pronunciation and a sample sentence.",
      },
      {
        when: "Evening",
        title: "The section quiz",
        body: "Five questions to see what stayed. If it did, the next section opens.",
      },
    ],
  },
  faq: {
    title: "What people usually ask",
    sub: "If your answer is not here, ask from the contact page.",
    items: [
      {
        q: "Does it work on a phone?",
        a: "Yes. Everything runs in the browser and there is nothing to install. Lessons are sized to finish in one commute.",
      },
      {
        q: "Is the subscription per language?",
        a: "No. One subscription opens every live language, and any language added later is included at no new cost.",
      },
      {
        q: "Can I try it first?",
        a: "Yes. Create a free account and work through the whole first module — video, grammar, vocabulary and its quiz. No card is needed.",
      },
      {
        q: "Why is the next section locked?",
        a: "It stays locked until you pass the current section's quiz. It is annoying at first, but it is what stops you from moving on without learning and finding out three months later that the base was hollow.",
      },
    ],
  },
  final: { cta: "Start free" },
  footer: {
    tagline: "Every lesson, one step closer to fluent",
    about: "About",
    contact: "Contact",
    blog: "Blog",
    rights: "All rights reserved.",
  },
};

const it: LandingCopy = {
  seo: {
    title: "Inizia la tua prossima lingua da una frase",
    description:
      "Quattro percorsi completi da zero: italiano, inglese, tedesco e turco. Ogni lezione è un video breve con sottotitoli bilingui, più grammatica, vocabolario e un quiz che tiene chiusa la sezione successiva finché non lo superi.",
  },
  nav: {
    pricing: "Prezzi",
    faq: "Domande",
    blog: "Blog",
    signIn: "Accedi",
    signUp: "Iscriviti",
    dashboard: "La mia dashboard",
    menuOpen: "Apri il menu",
    menuClose: "Chiudi il menu",
    skipToContent: "Vai al contenuto",
    language: "Lingua del sito",
  },
  hero: {
    eyebrow: "LINGUA",
    cta: "INIZIA ORA",
    scrollHint: "Tutto su {course}",
    showCourse: "Mostra {course}",
    scrollLabel: "Scorri alla sezione successiva",
  },
  comingSoon: "Presto",
  ticker: {
    title: "Cosa dici nella prima settimana di {course}",
  },
  hurdles: {
    title: "{course}: dove si complica",
    sub: "Ogni lingua ha il suo punto in cui ci si blocca. Questi sono quelli su cui {course} fa inciampare — e cosa fa il percorso per ciascuno.",
  },
  lesson: {
    title: "Quattro parti, una lezione",
    sub: "Ogni modulo di {course} è fatto di questi quattro pezzi. Non di più, non di meno, e nessuno è facoltativo.",
    parts: [
      {
        title: "Lezione video",
        body: "Un video breve con sottotitoli nella tua lingua e in {course}. Ogni riga si può ripetere da sola finché l’orecchio non si abitua.",
      },
      {
        title: "Grammatica",
        body: "Spiegata senza gergo, con esempi presi da questa lezione e non da un altro libro.",
      },
      {
        title: "Vocabolario",
        body: "Ogni parola con pronuncia, genere e frase d’esempio — nel punto in cui l’hai già incontrata.",
      },
      {
        title: "Quiz",
        body: "Poche domande alla fine della sezione. La successiva resta chiusa finché non la superi.",
      },
    ],
  },
  features: {
    title: "Costruito per il punto in cui ti blocchi davvero",
    sub: "Le cose che ostacolano davvero l’apprendimento di {course}, non quelle che stanno bene in un elenco di funzionalità.",
    items: [
      {
        title: "Sottotitoli bilingui",
        body: "La tua lingua e {course} affiancate. Ogni volta che guardi meno la prima, senti da solo di essere avanzato.",
      },
      {
        title: "Ripetizione riga per riga",
        body: "Ogni riga del video si può riascoltare da sola, senza riportare indietro la barra a mano.",
      },
      {
        title: "Progressi salvati",
        body: "Il percorso riparte da dove l’hai lasciato, su qualsiasi dispositivo con cui accedi.",
      },
      {
        title: "Chiuso finché non l’hai imparato",
        body: "La sezione successiva si apre superando il quiz. Andare avanti a vuoto non è possibile, ed è proprio il punto.",
      },
      {
        title: "Basato su manuali veri",
        body: "Il percorso è costruito sui manuali di riferimento usati nelle classi reali di quella lingua.",
      },
      {
        title: "Su mobile, senza installare nulla",
        body: "Le lezioni durano quanto un tragitto in metro. Basta un browser.",
      },
    ],
  },
  steps: {
    title: "Tre passi alla tua prima frase in {course}",
    sub: "Nessuna carta, nessuna telefonata commerciale.",
    items: [
      {
        title: "Crea un account gratuito",
        body: "Bastano un’email e un numero. È questione di secondi.",
      },
      {
        title: "Scegli {course}",
        body: "Il percorso parte da zero: non si dà nulla per scontato.",
      },
      {
        title: "Guarda il primo modulo",
        body: "Video, grammatica, vocabolario e quiz. Se il metodo non fa per te, non hai perso niente.",
      },
    ],
  },
  pricing: {
    title: "{course}: quanto costa",
    sub: "Un solo abbonamento apre tutti i percorsi attivi. Questa è la cifra che paghi per {course}.",
    cta: "Attiva l’abbonamento",
    note: "Il prezzo è questo. Il pagamento avviene dopo aver creato l’account.",
    tomanNote:
      "L’importo in toman è calcolato al cambio del giorno e può variare leggermente fino al pagamento.",
    comingSoonNote:
      "Il percorso di {course} non è ancora aperto. Questi sono i prezzi che si applicheranno il giorno dell’apertura.",
    periodLabel: "Periodo di fatturazione",
    currencyLabel: "Valuta",
    monthly: "1 mese",
    quarterly: "3 mesi",
    euro: "Euro",
    toman: "Toman",
    popular: "Il più scelto",
    save: "{percent}% in meno",
    off: "{percent}% di sconto",
    perMonth: "{amount} al mese",
    perMonthUnit: "/ mese",
    perQuarter: "/ 3 mesi",
    fallback: [
      "Accesso a tutte le lingue attive",
      "Nuove lezioni senza costi aggiuntivi",
      "Riprendi da dove avevi lasciato",
      "Su mobile e desktop, senza installare nulla",
    ],
  },
  day: {
    title: "{course} nella tua giornata",
    sub: "I moduli sono brevi perché devono essere fatti davvero, non restare in una lista.",
    items: [
      {
        when: "Mattina",
        title: "Un video per strada",
        body: "La lezione video dura meno di un tragitto in metro. Sottotitoli accesi, audio nell’orecchio.",
      },
      {
        when: "Metà giornata",
        title: "Dieci minuti di vocabolario",
        body: "Le stesse parole ascoltate la mattina, stavolta con pronuncia e frase d’esempio.",
      },
      {
        when: "Sera",
        title: "Il quiz della sezione",
        body: "Cinque domande per vedere cosa è rimasto. Se è rimasto, la sezione successiva si apre.",
      },
    ],
  },
  faq: {
    title: "Quello che chiedono di solito",
    sub: "Se la tua risposta non è qui, scrivici dalla pagina contatti.",
    items: [
      {
        q: "Funziona da telefono?",
        a: "Sì. Tutto gira nel browser e non c’è nulla da installare. Le lezioni durano quanto un tragitto casa-lavoro.",
      },
      {
        q: "L’abbonamento è per singola lingua?",
        a: "No. Un abbonamento apre tutte le lingue attive, e ogni lingua aggiunta in seguito è inclusa senza costi nuovi.",
      },
      {
        q: "Posso provarlo prima?",
        a: "Sì. Crea un account gratuito e completa il primo modulo — video, grammatica, vocabolario e quiz. Non serve la carta.",
      },
      {
        q: "Perché la sezione successiva è bloccata?",
        a: "Resta chiusa finché non superi il quiz di quella corrente. All’inizio dà fastidio, ma è ciò che impedisce di andare avanti senza imparare e scoprire tre mesi dopo che le basi non c’erano.",
      },
    ],
  },
  final: { cta: "Inizia gratis" },
  footer: {
    tagline: "Ogni lezione, un passo verso la fluenza",
    about: "Chi siamo",
    contact: "Contatti",
    blog: "Blog",
    rights: "Tutti i diritti riservati.",
  },
};

const LANDING_COPY: Record<AppLocale, LandingCopy> = { fa, en, it };

/** Chrome and method copy for a locale, Persian as the fallback. */
export function getLandingCopy(locale: AppLocale): LandingCopy {
  return LANDING_COPY[locale] ?? fa;
}

/**
 * Fills `{course}` — and anything else passed — into a copy string.
 *
 * Kept here rather than reaching for the billing interpolator because this is
 * the only substitution the page makes and it has to run on the client, where
 * the featured course changes without a request.
 */
export function fill(
  text: string,
  values: Record<string, string | number>
): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match
  );
}
