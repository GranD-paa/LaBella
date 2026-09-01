# لندینگ‌پیج و بلاگ — سند تحویل

> نوشته شده ۳۱ اوت ۲۰۲۶ (۱۰ شهریور ۱۴۰۵) برای ادامهٔ کار در چت جدید.
> برنچ `preview`. **هیچ‌کدام از این کارها کامیت نشده است.**

---

## ۱. وضعیت قبل از این جلسه

`app/page.tsx` یک ریدایرکت ۹ خطی بود: کاربر لاگین‌کرده → `/menu`، بقیه → `/login`.
هیچ لندینگ‌پیجی وجود نداشت. بلاگ هم اصلاً ساخته نشده بود.

---

## ۲. تصمیم‌هایی که کاربر گرفت

| موضوع | تصمیم |
|---|---|
| ساخت بناهای سه‌بعدی | با کد، **بدون هیگسفیلد** (بعداً بازبینی شد — بخش ۶) |
| کدام زبان‌ها نمایش داده شوند | هر شش‌تا ساخته شود، فعلاً فقط ۴ زبان برنامهٔ درسی نمایش داده شود، تیک روشن/خاموش در پنل مدیریت |
| صفحهٔ اصلی برای کاربر لاگین‌کرده | لندینگ برای همه، هدر هوشمند |
| زبان بلاگ | **فقط فارسی** (بدون ستون locale، بدون گروه ترجمه) |

---

## ۳. چه چیزی ساخته شد

### وابستگی‌های جدید
`three@^0.169.0` · `gsap@^3.13.0` · `marked@^14.1.4` · `@types/three` (dev)

### فایل‌های جدید

**لندینگ**
- `lib/landing/languages.ts` — رجیستری زبان↔بنا. **اضافه‌کردن زبان جدید از اینجا شروع می‌شود.**
- `lib/landing/content.ts` — تمام متن‌ها در سه زبان، عمداً بیرون از `locales/*.json` (آن فایل‌ها در هر صفحه لود می‌شوند)
- `lib/landing/visibility.ts` — ادغام پیش‌فرض‌های ثابت با اورراید ادمین
- `components/landing/landmarks.ts` — شش بنای procedural
- `components/landing/stage-environment.ts` — نور، متریال، پست‌پروسس
- `components/landing/language-journey.tsx` — صحنهٔ پین‌شدهٔ سه‌بعدی
- `components/landing/landing-page.tsx` — ارکستراتور
- `components/landing/landing-header.tsx`
- `components/landing/preloader.tsx`
- `components/brand/laparli-logo.tsx` + `public/logo-mark.svg`

**بلاگ**
- `lib/blog/types.ts` · `lib/blog/markdown.ts` · `lib/blog/format.ts`
- `app/blog/page.tsx` · `app/blog/[slug]/page.tsx` · `app/blog/rss.xml/route.ts`
- `components/blog/blog-shell.tsx` · `components/blog/blog-post-card.tsx`
- `app/sitemap.ts` · `app/robots.ts` · `lib/seo/site-url.ts`

**پنل مدیریت**
- `app/admin/blog/page.tsx` · `app/admin/blog/[id]/page.tsx`
- `components/admin/blog/blog-post-list.tsx` · `blog-post-editor.tsx`
- `app/admin/landing/page.tsx` · `components/admin/landing/landing-language-panel.tsx`
- `app/admin/actions/blog.ts` · `app/admin/actions/landing.ts`
- **این دو سطح فقط فارسی‌اند** (نه از طریق locale provider) — چون محتوای بلاگ فارسی‌ست و فقط مالک سایت از آن استفاده می‌کند

**دیتابیس**
- `db/004_landing_and_blog.sql` — **هنوز اجرا نشده**

### فایل‌های تغییریافته
`app/page.tsx` · `app/layout.tsx` (فونت Instrument Serif) · `app/globals.css` (استایل بلاگ + دانه + شبکه + مارکی) · `tailwind.config.ts` (`font-display`) · `components/dashboard/admin-dashboard.tsx` (دو لینک جدید) · هر سه فایل middleware (`/blog`، `/sitemap.xml`، `/robots.txt` عمومی شدند) · هر چهار پیاده‌سازی repository

---

## ۴. کارهای باقی‌مانده

### الف) مایگریشن دیتابیس — بلاک‌کننده
بلاگ و تیک نمایش تا اجرای این کار نمی‌کنند. `/blog` فعلاً حالت خالی نشان می‌دهد (try/catch دارد)، ۵۰۰ نمی‌دهد.

```bash
psql "$DATABASE_URL" -f "db/004_landing_and_blog.sql"
```

### ب) فایل لوگو — بلاک‌کننده
`public/logo-mark.svg` و `components/brand/laparli-logo.tsx` **بازسازی دستی از روی تصویر** هستند، نه تریس فایل اصلی. کاربر دوبار گفت لوگوی دقیق خودش را می‌خواهد.

- به بایت‌های عکس پیست‌شده در چت دسترسی نیست؛ کل دیسک گشته شد و فایل پیدا نشد
- **هیگسفیلد اصلاً SVG نمی‌دهد** — هر ۸۷ مدلش image/video/3D/audio است
- `vtracer` نصب شده (`pip install vtracer`) و آماده است
- **لازم: کاربر فایل PNG را جایی ذخیره کند و مسیرش را بدهد** → تریس دقیق، فقط یک فایل عوض می‌شود

---

## ۵. بازخورد کاربر — مهم

کاربر به نسخهٔ اول **۵ از ۱۰۰** داد: «به شدت لخت، هیچ المانی ندارد، افتضاح».

اصلاحات انجام‌شده بعد از آن:
- کولوسئوم از حلقهٔ جعبه به **طاق‌های واقعی** با `Shape` + `ExtrudeGeometry` بازنویسی شد
- نقشهٔ محیطی PMREM، تون‌مپینگ ACES، بلوم، دانهٔ فیلم متحرک، وینیت
- ذرات معلق، هالهٔ پشتی (دیسک کف قبلی از لبه دیده می‌شد — باگ بود)
- فونت نمایشی Instrument Serif، تیتر عظیم، شبکه، لیبل‌های گوشه، واترمارک، مارکی
- آمارها از سکشن جداگانه به داخل هیرو منتقل شدند

**ولی کاربر همچنان از بناها راضی نیست:** «رنگ ندارد، رئالیستیک نیست، انگار بچهٔ دو ساله طراحی کرده». مجسمهٔ آزادی و ایاصوفیه را مشخصاً نام برد.

**علت واقعی:** هندسهٔ procedural سقف دارد. مرجع کاربر یک ریلز اینستاگرام است ([`DashOnixcy3`](https://www.instagram.com/reels/DashOnixcy3/)) که مجسمهٔ اسکن‌شده با فوتوگرامتری و تکسچر PBR داشت. با کد نمی‌شود آن را ساخت.

---

## ۶. تحقیق انجام‌شده برای حل مشکل

### ابزارهایی که **همین الان** روی دیسک هستند
`node_modules/three/examples/jsm` دارد: `GLTFLoader` · `DRACOLoader` · `KTX2Loader` · `RGBELoader` · `EXRLoader` · `GTAOPass` · سایه‌های آبشاری (CSM) · `postprocessing/*`
→ **سمت لود و رندر صفر وابستگی جدید لازم دارد. مشکل دارایی است، نه ابزار.**

### منابع پیدا شده
| منبع | لایسنس | نکته |
|---|---|---|
| [tsogjavklann/awwwards-3d](https://github.com/tsogjavklann/awwwards-3d) | MIT | اسکیل Claude Code: Three.js 0.170 + GSAP + **Lenis** + تمپلیت‌های پست‌پروسس |
| [Meshy گالری آماده](https://www.meshy.ai/tags/colosseum) | **CC0، بدون ذکر منبع** | مدل‌های تولیدی خودت روی پلن رایگان CC BY است، نه CC0 |
| [Sketchfab](https://sketchfab.com/tags/statue-of-liberty) | متغیر | اسکن‌های واقعی |
| [Poly Haven](https://polyhaven.com/hdris/studio) | **CC0** | HDRI — جایگزین گرادیان دست‌ساز فعلی |
| [glTF-Transform](https://gltf-transform.dev/cli) | — | `optimize --compress draco --simplify` → ۸۰-۹۰٪ کاهش حجم |
| [threepipe](https://github.com/repalash/threepipe) | Apache 2.0 | تولکیت فوتورئال، **بتا** |

**21st.dev چیزی نداشت** — همه‌اش افکت انتزاعی procedural، هیچ‌کدام مدل واقعی لود نمی‌کنند.

---

## ۷. آخرین جهت بحث — ویدیوی اسکرول‌محور

کاربر خودش تحقیق کرد و گفت اکثر این سایت‌ها **ویدیوی رسپانسیو به اسکرول** هستند و خواست راه ساخت ویدیوی بدون پس‌زمینه بررسی شود.

### یافته‌های هیگسفیلد (چک‌شده)
- **`sam_3_video`** «Remove Background» — پارامتر `prompt` (می‌گویی چه بماند) + `apply_mask`. promptable، بهتر.
- **`video_background_remover`** — بدون کنترل.
- **نامعلوم:** آیا خروجی آلفای واقعی دارد یا پس‌زمینه را یک‌رنگ می‌کند. بدون خرج کردن کردیت قابل تعیین نبود.

### هزینه‌ها
`kling2_6` ۱۰ · `seedance_2_0_mini` ۱۲.۵ · `wan2_6` ۱۳ · `seedance_2_0` ۲۲.۵ · `nano_banana_pro` (تصویر) ۲ · `gpt_image_2` (تصویر) ۸.۵ · `tripo_3d` (سه‌بعدی) ۵
**موجودی: ۵۵۰.۵ کردیت، پلن pro**

### دو تلهٔ فنی که باید بداند
1. **ویدیوی شفاف با یک فایل کار نمی‌کند** — VP9/WebM با آلفا در سافاری نیست؛ HEVC با آلفا فقط در سافاری است. دو انکود لازم است.
2. **اسکراب ویدیو با اسکرول قابل اتکا نیست** — `currentTime` باعث seek می‌شود و seek فقط روی کی‌فریم سریع است. اسکراب نرم یعنی all-intra یعنی انفجار حجم. iOS بدترین است. **صفحه‌های معروف اپل دنبالهٔ تصویر روی canvas هستند، نه ویدیو.**

### مسیر پیشنهادی (ترکیبی)
1. ساخت پلان با `kling2_6` — چرخش آرام، پس‌زمینهٔ مشکی
2. حذف پس‌زمینه با `sam_3_video`
3. **استخراج فریم → دنبالهٔ WebP** با ffmpeg
4. کشیدن روی canvas، اسکرول ایندکس فریم را می‌دهد

**میان‌بری که کلاً آلفا را حذف می‌کند:** پس‌زمینهٔ سایت `#090014` است. روی مشکی خالص تولید کن و با `mix-blend-mode: screen` سوار کن — مشکی ناپدید می‌شود، نه حذف پس‌زمینه لازم است نه دو انکود.

**حجم:** ۳۶ فریم در عرض ۷۰۰ ≈ ۱.۴ مگ هر بنا. شش‌تا ۸.۶ مگ → فقط بنای فعال لود شود.

**پیشنهاد:** یک بنا (کولوسئوم) کامل از این خط رد شود، حدود ۲۵ کردیت، قبل از تعهد به شش‌تا.

### پیش‌نیاز
**`ffmpeg` روی سیستم نصب نیست:**
```bash
winget install Gyan.FFmpeg
```

---

## ۸. وضعیت کیفیت
تایپ‌چک تمیز · لینت تمیز · **۲۵۶ تست در ۲۱ فایل، همه سبز** · گراف graphify به‌روز (۲۰۱۸ نود)

## ۹. سرور توسعه
```bash
npm run dev   # پورت ۳۰۰۱
```
`.claude/launch.json` کانفیگ `laparli-local` را دارد.
