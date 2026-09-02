import type { LanguageSlug } from "@/lib/curriculum/types";
import type { AppLocale } from "@/lib/i18n/types";

/**
 * Everything on the landing page that changes with the course.
 *
 * The hero is a switcher, so the page under it has to answer "what is *this*
 * course like" rather than "what is Laparli like". That means the parts a
 * visitor would use to judge a specific language — the phrases, the sample
 * lesson, the difficulties, the questions — are written four times, once per
 * course, in each of the three interface locales.
 *
 * What is deliberately *not* here: the method sections (how a module is built,
 * what you get, the three steps, a day with Laparli). Those describe Laparli,
 * not a language, so they live in `content.ts` and take the course name by
 * interpolation. Duplicating them per course would be four copies of one claim
 * to keep in step, and the first edit would forget three of them.
 *
 * Every claim here has to be one the product actually makes: an A1 path, video
 * lessons with bilingual subtitles, a quiz that gates the next section, saved
 * progress, one subscription across every open path. Nothing about tutors,
 * speech scoring or certificates — none of that exists.
 */

export type CourseDeck = {
  /** Course name in the reading locale, e.g. "ایتالیایی". */
  name: string;
  /** Endonym. Never translated. */
  nativeName: string;
  /** Two-letter badge, matching `lib/curriculum/language-codes.ts`. */
  code: string;
  /** The paragraph under the hero headline. */
  intro: string;
  /** Real lines in the target language, with what they mean. */
  ticker: { phrase: string; meaning: string }[];
  /** What is hard about *this* language, and how the path handles it. */
  hurdles: { title: string; body: string }[];
  /** Questions a visitor asks about this course specifically. */
  faq: { q: string; a: string }[];
  /** The closing pitch. */
  final: { title: string; sub: string };
};

export const COURSE_ORDER: LanguageSlug[] = [
  "italian",
  "english",
  "german",
  "turkish",
];

/* ------------------------------------------------------------------ فارسی */

const fa: Record<LanguageSlug, CourseDeck> = {
  italian: {
    name: "ایتالیایی",
    nativeName: "Italiano",
    code: "IT",
    intro:
      "از یک «چائو» ساده تا گفت‌وگوی روان؛ ایتالیایی را همان‌طور یاد بگیر که در رم حرف می‌زنند، نه آن‌طور که در جدول صرف فعل نوشته شده.",
    ticker: [
      { phrase: "Un caffè, per favore", meaning: "یک قهوه، لطفاً" },
      { phrase: "Dov'è la stazione?", meaning: "ایستگاه کجاست؟" },
      { phrase: "Quanto costa?", meaning: "چند است؟" },
      { phrase: "Non ho capito", meaning: "نفهمیدم" },
      { phrase: "Mi chiamo Sara", meaning: "اسم من سارا است" },
      { phrase: "Scusi, dov'è il bagno?", meaning: "ببخشید، سرویس کجاست؟" },
      { phrase: "Vorrei prenotare un tavolo", meaning: "می‌خواهم یک میز رزرو کنم" },
      { phrase: "Ci vediamo domani", meaning: "فردا می‌بینمت" },
    ],
    hurdles: [
      {
        title: "هر اسم جنسیت دارد",
        body: "il و la تصادفی نیستند ولی قاعده‌شان هم کامل نیست. واژگان هر درس جنسیت را کنار خود کلمه نشان می‌دهد تا از اول درست در ذهن بنشیند.",
      },
      {
        title: "حرف‌های دوتایی معنا عوض می‌کنند",
        body: "nono با nonno یکی نیست. زیرنویس دوزبانه و تکرار جمله‌به‌جمله برای همین است که گوش این تفاوت را بگیرد.",
      },
      {
        title: "فعل‌ها زود شخصی می‌شوند",
        body: "ایتالیایی ضمیر را حذف می‌کند و بار معنا روی انتهای فعل می‌افتد. درس‌ها با جمله‌های کامل شروع می‌کنند تا این الگو شنیده شود، نه حفظ.",
      },
    ],
    faq: [
      {
        q: "مسیر ایتالیایی از کجا شروع می‌شود؟",
        a: "از A1، یعنی از الفبا و اولین جمله‌ها. لازم نیست از قبل چیزی بدانی و هیچ آزمون ورودی‌ای در کار نیست.",
      },
      {
        q: "این مسیر بر چه اساسی بسته شده؟",
        a: "روی همان کتاب‌های مرجعی که در کلاس‌های زبان در خود ایتالیا استفاده می‌شوند، نه روی فهرستی که ما از خودمان درآورده باشیم.",
      },
      {
        q: "تلفظ ایتالیایی سخت نیست؟",
        a: "در مقایسه با انگلیسی نه — ایتالیایی تقریباً همان‌طور خوانده می‌شود که نوشته می‌شود. سخت‌ترین بخشش همان حرف‌های دوتایی است که از درس اول در ویدیوها می‌شنوی.",
      },
    ],
    final: {
      title: "اولین جملهٔ ایتالیایی‌ات، همین امروز",
      sub: "حساب رایگان بساز و اولین ماژول ایتالیایی را کامل ببین — ویدیو، دستور زبان، واژگان و آزمونش.",
    },
  },

  english: {
    name: "انگلیسی",
    nativeName: "English",
    code: "EN",
    intro:
      "زبانی که در کار، سفر و تمام اینترنت هست؛ انگلیسی را به مهارتی تبدیل کن که واقعاً استفاده می‌شود، نه نمره‌ای که یک بار گرفته‌ای.",
    ticker: [
      { phrase: "Could I get a coffee?", meaning: "می‌شود یک قهوه بگیرم؟" },
      { phrase: "Where's the station?", meaning: "ایستگاه کجاست؟" },
      { phrase: "How much is this?", meaning: "این چند است؟" },
      { phrase: "Could you say that again?", meaning: "می‌شود دوباره بگویید؟" },
      { phrase: "I'm not sure I follow", meaning: "مطمئن نیستم متوجه شده باشم" },
      { phrase: "Sorry, I'm running late", meaning: "ببخشید، دیرم شده" },
      { phrase: "I'd like to change my ticket", meaning: "می‌خواهم بلیتم را عوض کنم" },
      { phrase: "Nice to meet you", meaning: "از دیدنت خوشحالم" },
    ],
    hurdles: [
      {
        title: "نوشتار و تلفظ یکی نیستند",
        body: "through، though و tough سه صدای متفاوت‌اند. زیرنویس دوزبانه و امکان تکرار هر جمله برای همین ناهمخوانی گذاشته شده.",
      },
      {
        title: "فعل‌های دوکلمه‌ای",
        body: "give up با give یکی نیست. این‌ها را نمی‌شود از قاعده ساخت، پس در واژگان درس به‌صورت یک واحد و در جملهٔ خودشان می‌آیند.",
      },
      {
        title: "زمان‌ها زیادند ولی چندتایش کافی است",
        body: "مسیر با زمان‌هایی شروع می‌کند که در گفتار واقعی بیشترین سهم را دارند، نه با فهرست کامل دوازده‌تایی.",
      },
    ],
    faq: [
      {
        q: "مسیر انگلیسی از چه سطحی شروع می‌شود؟",
        a: "از A1، از صفر. اگر انگلیسی مدرسه‌ای داری، آزمون پایان هر بخش می‌گذارد سریع‌تر رد شوی بدون اینکه چیزی جا بیفتد.",
      },
      {
        q: "برای آیلتس و تافل مناسب است؟",
        a: "این مسیر برای زبان روزمره و گفت‌وگوی واقعی ساخته شده، نه برای آماده‌سازی آزمون. پایه‌ای که می‌سازد به کار آزمون هم می‌آید ولی جای دورهٔ اختصاصی آزمون را نمی‌گیرد.",
      },
      {
        q: "لهجه‌اش آمریکایی است یا بریتانیایی؟",
        a: "پرچمی که می‌بینی آمریکایی است و صدای درس‌ها هم همان است، ولی تفاوت‌های مهم بریتانیایی در واژگان علامت‌گذاری می‌شود.",
      },
    ],
    final: {
      title: "اولین جملهٔ انگلیسی‌ات، همین امروز",
      sub: "حساب رایگان بساز و اولین ماژول انگلیسی را کامل ببین — ویدیو، دستور زبان، واژگان و آزمونش.",
    },
  },

  german: {
    name: "آلمانی",
    nativeName: "Deutsch",
    code: "DE",
    intro:
      "دقیق، منظم و شگفت‌آور خوش‌آهنگ؛ آلمانی را با درس‌هایی یاد بگیر که ساختارش را روشن می‌کنند، نه با جدولی که باید حفظ شود.",
    ticker: [
      { phrase: "Einen Kaffee, bitte", meaning: "یک قهوه، لطفاً" },
      { phrase: "Wo ist der Bahnhof?", meaning: "ایستگاه قطار کجاست؟" },
      { phrase: "Was kostet das?", meaning: "این چند است؟" },
      { phrase: "Ich habe mich verlaufen", meaning: "گم شده‌ام" },
      { phrase: "Können Sie das wiederholen?", meaning: "می‌شود دوباره بگویید؟" },
      { phrase: "Ich heiße Sara", meaning: "اسم من سارا است" },
      { phrase: "Wo ist die Toilette?", meaning: "سرویس کجاست؟" },
      { phrase: "Bis morgen", meaning: "تا فردا" },
    ],
    hurdles: [
      {
        title: "der، die یا das",
        body: "جنسیت اسم را نمی‌شود از خود کلمه حدس زد. واژگان هر درس حرف تعریف را چسبیده به اسم نشان می‌دهد تا با هم در ذهن بنشینند.",
      },
      {
        title: "حالت‌ها جمله را عوض می‌کنند",
        body: "همان اسم بسته به نقشش در جمله شکل حرف تعریفش را عوض می‌کند. مسیر این را از جملهٔ واقعی شروع می‌کند، نه از جدول چهار در چهار.",
      },
      {
        title: "فعل که به آخر جمله می‌رود",
        body: "در جمله‌های وابسته فعل به انتها می‌رود و شنیدنش تمرین می‌خواهد. تکرار جمله‌به‌جمله دقیقاً برای همین لحظه‌هاست.",
      },
    ],
    faq: [
      {
        q: "مسیر آلمانی از کجا شروع می‌شود؟",
        a: "از A1، از الفبا و اولین جمله‌ها. حالت‌ها یک‌باره و به‌صورت جدول نمی‌آیند؛ هر کدام وقتی وارد می‌شوند که جمله‌ای لازمشان داشته باشد.",
      },
      {
        q: "آلمانی واقعاً آن‌قدر سخت است که می‌گویند؟",
        a: "قاعده‌هایش زیاد است ولی برخلاف انگلیسی تقریباً همیشه سر جایشان می‌مانند. سختی‌اش در شروع است، نه در ادامه.",
      },
      {
        q: "برای مهاجرت و آزمون‌های زبان به کار می‌آید؟",
        a: "مسیر روی زبان روزمره بسته شده و پایهٔ A1 را کامل می‌سازد، ولی خودش دورهٔ آمادگی آزمون نیست.",
      },
    ],
    final: {
      title: "اولین جملهٔ آلمانی‌ات، همین امروز",
      sub: "حساب رایگان بساز و اولین ماژول آلمانی را کامل ببین — ویدیو، دستور زبان، واژگان و آزمونش.",
    },
  },

  turkish: {
    name: "ترکی",
    nativeName: "Türkçe",
    code: "TR",
    intro:
      "آشناترین دستور زبانی که خواهی دید؛ ترکی را از الگوهای ساده تا گفت‌وگوی روزمره پیش ببر، با کلمه‌هایی که خیلی‌شان را از قبل می‌شناسی.",
    ticker: [
      { phrase: "Bir kahve, lütfen", meaning: "یک قهوه، لطفاً" },
      { phrase: "Hesap, lütfen", meaning: "صورت‌حساب، لطفاً" },
      { phrase: "İstasyon nerede?", meaning: "ایستگاه کجاست؟" },
      { phrase: "Bu ne kadar?", meaning: "این چند است؟" },
      { phrase: "Anlamadım, tekrar eder misiniz?", meaning: "نفهمیدم، دوباره می‌گویید؟" },
      { phrase: "Benim adım Sara", meaning: "اسم من سارا است" },
      { phrase: "Tuvalet nerede?", meaning: "سرویس کجاست؟" },
      { phrase: "Yarın görüşürüz", meaning: "فردا می‌بینمت" },
    ],
    hurdles: [
      {
        title: "پسوندها روی هم سوار می‌شوند",
        body: "یک کلمه می‌تواند چند پسوند پشت سر هم بگیرد و بلند شود. مسیر آن‌ها را یکی‌یکی و در جملهٔ واقعی اضافه می‌کند، نه در یک فهرست.",
      },
      {
        title: "هماهنگی واکه‌ها",
        body: "شکل پسوند به واکه‌های خود کلمه بستگی دارد. یک قاعدهٔ کوچک است که وقتی بگیری‌اش، نصف املا خودش درست می‌شود.",
      },
      {
        title: "فعل آخر جمله می‌آید",
        body: "ترتیب جمله در ترکی به فارسی نزدیک‌تر است تا به انگلیسی — این یکی به سودت است و از درس اول حسش می‌کنی.",
      },
    ],
    faq: [
      {
        q: "چون فارسی‌زبانم ترکی برایم راحت‌تر است؟",
        a: "در بخش‌هایی بله. ترتیب جمله نزدیک است و کلمه‌های مشترک کم نیستند. آنچه تازه است پسوندها و هماهنگی واکه‌هاست که مسیر از اول رویشان تمرکز می‌کند.",
      },
      {
        q: "الفبایش لاتین است؟",
        a: "بله، با چند حرف اضافه مثل ç، ğ، ı، ö، ş و ü. خواندنش از روز اول ممکن است چون تقریباً همان‌طور خوانده می‌شود که نوشته می‌شود.",
      },
      {
        q: "برای سفر به ترکیه کافی است؟",
        a: "مسیر A1 دقیقاً همان جمله‌هایی را می‌سازد که در سفر لازم می‌شوند — سفارش دادن، پرسیدن راه، قیمت گرفتن و عذرخواهی کردن.",
      },
    ],
    final: {
      title: "اولین جملهٔ ترکی‌ات، همین امروز",
      sub: "حساب رایگان بساز و اولین ماژول ترکی را کامل ببین — ویدیو، دستور زبان، واژگان و آزمونش.",
    },
  },
};

/* --------------------------------------------------------------- English */

const en: Record<LanguageSlug, CourseDeck> = {
  italian: {
    name: "Italian",
    nativeName: "Italiano",
    code: "IT",
    intro:
      "From your first ciao to real conversation — learn Italian the way it is spoken in Rome, not the way it is printed in a conjugation table.",
    ticker: [
      { phrase: "Un caffè, per favore", meaning: "A coffee, please" },
      { phrase: "Dov'è la stazione?", meaning: "Where is the station?" },
      { phrase: "Quanto costa?", meaning: "How much is it?" },
      { phrase: "Non ho capito", meaning: "I didn't understand" },
      { phrase: "Mi chiamo Sara", meaning: "My name is Sara" },
      { phrase: "Scusi, dov'è il bagno?", meaning: "Excuse me, where is the bathroom?" },
      { phrase: "Vorrei prenotare un tavolo", meaning: "I'd like to book a table" },
      { phrase: "Ci vediamo domani", meaning: "See you tomorrow" },
    ],
    hurdles: [
      {
        title: "Every noun has a gender",
        body: "il and la are not random, but the rule has holes. Each lesson's vocabulary shows the gender attached to the word, so the two are learned as one thing.",
      },
      {
        title: "Double letters change the meaning",
        body: "nono is not nonno. Bilingual subtitles and line-by-line replay exist for exactly this: the ear has to catch the difference.",
      },
      {
        title: "Verbs carry the person",
        body: "Italian drops the pronoun and lets the verb ending do the work. Lessons start from whole sentences so the pattern is heard rather than memorised.",
      },
    ],
    faq: [
      {
        q: "Where does the Italian path start?",
        a: "At A1 — the alphabet and the first sentences. No prior knowledge is assumed and there is no entrance test.",
      },
      {
        q: "What is the path built on?",
        a: "The reference textbooks used in language classrooms in Italy itself, rather than a syllabus we invented.",
      },
      {
        q: "Is Italian pronunciation hard?",
        a: "Not compared to English — Italian is read very close to how it is written. The hardest part is the double consonants, which you hear in the videos from lesson one.",
      },
    ],
    final: {
      title: "Your first Italian sentence, today",
      sub: "Create a free account and work through the whole first Italian module — video, grammar, vocabulary and its quiz.",
    },
  },

  english: {
    name: "English",
    nativeName: "English",
    code: "EN",
    intro:
      "The language of work, travel and the whole internet — turn your English into a skill you actually use, not a grade you once received.",
    ticker: [
      { phrase: "Could I get a coffee?", meaning: "A request, not an order" },
      { phrase: "Where's the station?", meaning: "The everyday contraction" },
      { phrase: "How much is this?", meaning: "The question that saves money" },
      { phrase: "Could you say that again?", meaning: "The most useful sentence you will learn" },
      { phrase: "I'm not sure I follow", meaning: "How to admit it politely" },
      { phrase: "Sorry, I'm running late", meaning: "The one everybody needs" },
      { phrase: "I'd like to change my ticket", meaning: "Polite, and it works at any desk" },
      { phrase: "Nice to meet you", meaning: "How a first meeting closes" },
    ],
    hurdles: [
      {
        title: "Spelling and sound disagree",
        body: "through, though and tough are three different sounds. Bilingual subtitles and per-line replay are built around that mismatch.",
      },
      {
        title: "Two-word verbs",
        body: "give up is not give. These cannot be derived from a rule, so vocabulary treats them as single units inside their own sentence.",
      },
      {
        title: "Many tenses, a few that matter",
        body: "The path starts with the tenses that carry most of real speech, not with the full list of twelve.",
      },
    ],
    faq: [
      {
        q: "What level does the English path start at?",
        a: "A1, from zero. If you already have school English, the quiz at the end of each section lets you move faster without skipping anything.",
      },
      {
        q: "Is it suitable for IELTS or TOEFL?",
        a: "The path is built for everyday language and real conversation, not exam preparation. The base it builds helps, but it does not replace a dedicated exam course.",
      },
      {
        q: "American or British English?",
        a: "The flag you see is American and so is the audio, but the British differences that matter are marked in the vocabulary.",
      },
    ],
    final: {
      title: "Your first English sentence, today",
      sub: "Create a free account and work through the whole first English module — video, grammar, vocabulary and its quiz.",
    },
  },

  german: {
    name: "German",
    nativeName: "Deutsch",
    code: "DE",
    intro:
      "Precise, ordered and surprisingly musical — learn German with lessons that make its structure click, instead of a table to be memorised.",
    ticker: [
      { phrase: "Einen Kaffee, bitte", meaning: "A coffee, please" },
      { phrase: "Wo ist der Bahnhof?", meaning: "Where is the station?" },
      { phrase: "Was kostet das?", meaning: "How much is that?" },
      { phrase: "Ich habe mich verlaufen", meaning: "I am lost" },
      { phrase: "Können Sie das wiederholen?", meaning: "Could you repeat that?" },
      { phrase: "Ich heiße Sara", meaning: "My name is Sara" },
      { phrase: "Wo ist die Toilette?", meaning: "Where is the bathroom?" },
      { phrase: "Bis morgen", meaning: "See you tomorrow" },
    ],
    hurdles: [
      {
        title: "der, die or das",
        body: "A noun's gender cannot be guessed from the word itself. Vocabulary always shows the article stuck to the noun so the two are learned together.",
      },
      {
        title: "Cases reshape the sentence",
        body: "The same noun changes its article depending on the job it does. The path introduces this from a real sentence, not from a four-by-four grid.",
      },
      {
        title: "The verb that moves to the end",
        body: "In subordinate clauses the verb goes last, and hearing it takes practice. Line-by-line replay exists for precisely those moments.",
      },
    ],
    faq: [
      {
        q: "Where does the German path start?",
        a: "At A1 — the alphabet and the first sentences. Cases do not arrive all at once as a table; each one shows up when a sentence needs it.",
      },
      {
        q: "Is German really as hard as people say?",
        a: "It has many rules, but unlike English they almost always hold. The difficulty is front-loaded, not permanent.",
      },
      {
        q: "Does it help with emigration or language exams?",
        a: "The path is built around everyday language and completes the A1 base, but it is not itself an exam preparation course.",
      },
    ],
    final: {
      title: "Your first German sentence, today",
      sub: "Create a free account and work through the whole first German module — video, grammar, vocabulary and its quiz.",
    },
  },

  turkish: {
    name: "Turkish",
    nativeName: "Türkçe",
    code: "TR",
    intro:
      "The friendliest grammar you will meet — build Turkish from simple patterns to everyday conversation, with a vocabulary that is half familiar already.",
    ticker: [
      { phrase: "Bir kahve, lütfen", meaning: "A coffee, please" },
      { phrase: "Hesap, lütfen", meaning: "The bill, please" },
      { phrase: "İstasyon nerede?", meaning: "Where is the station?" },
      { phrase: "Bu ne kadar?", meaning: "How much is this?" },
      { phrase: "Anlamadım, tekrar eder misiniz?", meaning: "I didn't catch that, could you repeat it?" },
      { phrase: "Benim adım Sara", meaning: "My name is Sara" },
      { phrase: "Tuvalet nerede?", meaning: "Where is the bathroom?" },
      { phrase: "Yarın görüşürüz", meaning: "See you tomorrow" },
    ],
    hurdles: [
      {
        title: "Suffixes stack",
        body: "One word can take several suffixes in a row and grow long. The path adds them one at a time inside real sentences, never as a list.",
      },
      {
        title: "Vowel harmony",
        body: "A suffix changes shape to match the vowels in its word. It is a small rule, and once it clicks half of the spelling takes care of itself.",
      },
      {
        title: "The verb comes last",
        body: "Turkish word order sits closer to Persian than to English — this one is in your favour, and you feel it from the first lesson.",
      },
    ],
    faq: [
      {
        q: "Is Turkish easier for a Persian speaker?",
        a: "In places, yes. The word order is close and shared vocabulary is common. What is new is the suffixes and vowel harmony, which the path focuses on from the start.",
      },
      {
        q: "Does it use the Latin alphabet?",
        a: "Yes, with a few extra letters: ç, ğ, ı, ö, ş and ü. You can read from day one because it is written very close to how it sounds.",
      },
      {
        q: "Is it enough for a trip to Turkey?",
        a: "The A1 path builds exactly the sentences a trip needs — ordering, asking directions, asking a price and apologising.",
      },
    ],
    final: {
      title: "Your first Turkish sentence, today",
      sub: "Create a free account and work through the whole first Turkish module — video, grammar, vocabulary and its quiz.",
    },
  },
};

/* --------------------------------------------------------------- Italiano */

const it: Record<LanguageSlug, CourseDeck> = {
  italian: {
    name: "Italiano",
    nativeName: "Italiano",
    code: "IT",
    intro:
      "Dal primo ciao alla conversazione vera: impara l’italiano come si parla a Roma, non come è stampato in una tabella di coniugazione.",
    ticker: [
      { phrase: "Un caffè, per favore", meaning: "L'ordinazione più comune del paese" },
      { phrase: "Dov'è la stazione?", meaning: "La domanda che salva ogni viaggio" },
      { phrase: "Quanto costa?", meaning: "Da chiedere sempre, prima" },
      { phrase: "Non ho capito", meaning: "Meglio dirlo che fingere" },
      { phrase: "Mi chiamo Sara", meaning: "Come ci si presenta" },
      { phrase: "Scusi, dov'è il bagno?", meaning: "La domanda più cercata all'estero" },
      { phrase: "Vorrei prenotare un tavolo", meaning: "Al telefono, con il condizionale" },
      { phrase: "Ci vediamo domani", meaning: "Come si chiude una conversazione" },
    ],
    hurdles: [
      {
        title: "Ogni nome ha un genere",
        body: "il e la non sono casuali, ma la regola ha eccezioni. Il vocabolario di ogni lezione mostra il genere attaccato alla parola, così i due si imparano insieme.",
      },
      {
        title: "Le doppie cambiano il senso",
        body: "nono non è nonno. I sottotitoli bilingui e la ripetizione riga per riga servono proprio a far cogliere questa differenza all’orecchio.",
      },
      {
        title: "Il verbo porta la persona",
        body: "L’italiano lascia cadere il pronome e affida tutto alla desinenza. Le lezioni partono da frasi intere, così lo schema si ascolta invece di impararlo a memoria.",
      },
    ],
    faq: [
      {
        q: "Da dove parte il percorso di italiano?",
        a: "Dall’A1: alfabeto e prime frasi. Non serve alcuna base e non c’è nessun test d’ingresso.",
      },
      {
        q: "Su cosa è costruito il percorso?",
        a: "Sui manuali di riferimento usati nelle classi di lingua in Italia, non su un programma inventato da noi.",
      },
      {
        q: "La pronuncia italiana è difficile?",
        a: "Non rispetto all’inglese: l’italiano si legge quasi come si scrive. La parte più difficile sono le doppie, che senti nei video fin dalla prima lezione.",
      },
    ],
    final: {
      title: "La tua prima frase in italiano, oggi",
      sub: "Crea un account gratuito e completa il primo modulo di italiano: video, grammatica, vocabolario e quiz.",
    },
  },

  english: {
    name: "Inglese",
    nativeName: "English",
    code: "EN",
    intro:
      "La lingua del lavoro, dei viaggi e di tutto internet: trasforma il tuo inglese in una competenza che usi davvero, non in un voto preso una volta.",
    ticker: [
      { phrase: "Could I get a coffee?", meaning: "Una richiesta, non un ordine" },
      { phrase: "Where's the station?", meaning: "La contrazione di ogni giorno" },
      { phrase: "How much is this?", meaning: "La domanda che fa risparmiare" },
      { phrase: "Could you say that again?", meaning: "La frase più utile che imparerai" },
      { phrase: "I'm not sure I follow", meaning: "Come ammetterlo con garbo" },
      { phrase: "Sorry, I'm running late", meaning: "Quella che serve a tutti" },
      { phrase: "I'd like to change my ticket", meaning: "Cortese, e funziona a ogni sportello" },
      { phrase: "Nice to meet you", meaning: "Come si chiude un primo incontro" },
    ],
    hurdles: [
      {
        title: "Scrittura e suono non coincidono",
        body: "through, though e tough sono tre suoni diversi. I sottotitoli bilingui e la ripetizione riga per riga nascono da questo scarto.",
      },
      {
        title: "I verbi in due parole",
        body: "give up non è give. Non si ricavano da una regola, quindi il vocabolario li tratta come unità dentro la loro frase.",
      },
      {
        title: "Molti tempi, pochi indispensabili",
        body: "Il percorso parte dai tempi che reggono la maggior parte del parlato reale, non dalla lista completa.",
      },
    ],
    faq: [
      {
        q: "Da che livello parte il percorso di inglese?",
        a: "Dall’A1, da zero. Se hai già l’inglese scolastico, il quiz alla fine di ogni sezione ti fa avanzare più in fretta senza saltare nulla.",
      },
      {
        q: "Va bene per IELTS o TOEFL?",
        a: "Il percorso è costruito per la lingua di tutti i giorni e la conversazione reale, non per la preparazione agli esami. La base aiuta, ma non sostituisce un corso dedicato.",
      },
      {
        q: "Inglese americano o britannico?",
        a: "La bandiera che vedi è americana e così è l’audio, ma le differenze britanniche che contano sono segnalate nel vocabolario.",
      },
    ],
    final: {
      title: "La tua prima frase in inglese, oggi",
      sub: "Crea un account gratuito e completa il primo modulo di inglese: video, grammatica, vocabolario e quiz.",
    },
  },

  german: {
    name: "Tedesco",
    nativeName: "Deutsch",
    code: "DE",
    intro:
      "Preciso, ordinato e sorprendentemente musicale: impara il tedesco con lezioni che ne chiariscono la struttura, invece di una tabella da mandare a memoria.",
    ticker: [
      { phrase: "Einen Kaffee, bitte", meaning: "Un caffè, per favore" },
      { phrase: "Wo ist der Bahnhof?", meaning: "Dov'è la stazione?" },
      { phrase: "Was kostet das?", meaning: "Quanto costa?" },
      { phrase: "Ich habe mich verlaufen", meaning: "Mi sono perso" },
      { phrase: "Können Sie das wiederholen?", meaning: "Può ripetere?" },
      { phrase: "Ich heiße Sara", meaning: "Mi chiamo Sara" },
      { phrase: "Wo ist die Toilette?", meaning: "Dov'è il bagno?" },
      { phrase: "Bis morgen", meaning: "A domani" },
    ],
    hurdles: [
      {
        title: "der, die o das",
        body: "Il genere non si indovina dalla parola. Il vocabolario mostra sempre l’articolo attaccato al nome, così si imparano insieme.",
      },
      {
        title: "I casi rimodellano la frase",
        body: "Lo stesso nome cambia articolo secondo la funzione che svolge. Il percorso lo introduce da una frase vera, non da una griglia.",
      },
      {
        title: "Il verbo che va in fondo",
        body: "Nelle subordinate il verbo finisce in ultima posizione, e sentirlo richiede allenamento. La ripetizione riga per riga serve proprio lì.",
      },
    ],
    faq: [
      {
        q: "Da dove parte il percorso di tedesco?",
        a: "Dall’A1: alfabeto e prime frasi. I casi non arrivano tutti insieme come tabella; ognuno compare quando una frase ne ha bisogno.",
      },
      {
        q: "Il tedesco è davvero difficile come dicono?",
        a: "Ha molte regole, ma a differenza dell’inglese quasi sempre reggono. La difficoltà sta all’inizio, non per sempre.",
      },
      {
        q: "Serve per trasferirsi o per gli esami di lingua?",
        a: "Il percorso è costruito sulla lingua quotidiana e completa la base A1, ma non è un corso di preparazione agli esami.",
      },
    ],
    final: {
      title: "La tua prima frase in tedesco, oggi",
      sub: "Crea un account gratuito e completa il primo modulo di tedesco: video, grammatica, vocabolario e quiz.",
    },
  },

  turkish: {
    name: "Turco",
    nativeName: "Türkçe",
    code: "TR",
    intro:
      "La grammatica più amichevole che incontrerai: costruisci il turco dai modelli semplici alla conversazione quotidiana, con un vocabolario già in parte familiare.",
    ticker: [
      { phrase: "Bir kahve, lütfen", meaning: "Un caffè, per favore" },
      { phrase: "Hesap, lütfen", meaning: "Il conto, per favore" },
      { phrase: "İstasyon nerede?", meaning: "Dov'è la stazione?" },
      { phrase: "Bu ne kadar?", meaning: "Quanto costa?" },
      { phrase: "Anlamadım, tekrar eder misiniz?", meaning: "Non ho capito, può ripetere?" },
      { phrase: "Benim adım Sara", meaning: "Mi chiamo Sara" },
      { phrase: "Tuvalet nerede?", meaning: "Dov'è il bagno?" },
      { phrase: "Yarın görüşürüz", meaning: "A domani" },
    ],
    hurdles: [
      {
        title: "I suffissi si impilano",
        body: "Una parola può prendere più suffissi di fila e allungarsi. Il percorso li aggiunge uno alla volta dentro frasi vere, mai come elenco.",
      },
      {
        title: "L’armonia vocalica",
        body: "Il suffisso cambia forma per accordarsi alle vocali della parola. È una regola piccola: quando scatta, metà dell’ortografia si sistema da sola.",
      },
      {
        title: "Il verbo arriva alla fine",
        body: "L’ordine delle parole in turco è più vicino al persiano che all’inglese, e lo senti dalla prima lezione.",
      },
    ],
    faq: [
      {
        q: "Il turco è più facile per chi parla persiano?",
        a: "In parte sì. L’ordine delle parole è vicino e il lessico condiviso non è poco. La novità sono i suffissi e l’armonia vocalica, su cui il percorso lavora fin dall’inizio.",
      },
      {
        q: "Usa l’alfabeto latino?",
        a: "Sì, con qualche lettera in più: ç, ğ, ı, ö, ş e ü. Si legge dal primo giorno, perché si scrive quasi come suona.",
      },
      {
        q: "Basta per un viaggio in Turchia?",
        a: "Il percorso A1 costruisce esattamente le frasi che servono in viaggio: ordinare, chiedere la strada, chiedere il prezzo e scusarsi.",
      },
    ],
    final: {
      title: "La tua prima frase in turco, oggi",
      sub: "Crea un account gratuito e completa il primo modulo di turco: video, grammatica, vocabolario e quiz.",
    },
  },
};

const DECKS: Record<AppLocale, Record<LanguageSlug, CourseDeck>> = {
  fa,
  en,
  it,
};

/** Every course's deck for one reading locale, Persian as the fallback. */
export function getCourseDecks(
  locale: AppLocale
): Record<LanguageSlug, CourseDeck> {
  return DECKS[locale] ?? fa;
}
