---
name: farsi-bidi
description: Write Persian text that stays readable when Latin words, code identifiers, numbers, and URLs are mixed into it. Use whenever writing Persian prose for this user — chat replies, commit messages, UI strings, documentation, support tickets — and whenever reviewing Persian text that renders scrambled. Also use when the user says "به‌هم ریخته", "قاطی شده", "جای کلمه‌ها عوض شده", "bidi", or complains that mixed Persian/English text is hard to read.
---

# Persian text with Latin in it

## The problem this solves

Persian is right-to-left. Latin letters, digits, and most punctuation are
left-to-right. When they share a line, the Unicode bidirectional algorithm
decides the visual order, and its decision is frequently not the one the
writer intended. Characters that belong to neither direction — space, comma,
colon, parentheses, question mark, slash, dash — take their direction from
whatever sits next to them, which is how a sentence ends up with its verb
before its subject on screen while the underlying string is perfectly correct.

This is not a font problem or a terminal bug. The string is fine; the
rendering is ambiguous, and the ambiguity is the writer's to remove.

A real example from this project — the title typed into a support form:

    written:  تایم‌اوت اتصال در AIaaS هنگام درخواست‌های طولانی
    rendered: هنگام درخواست‌های طولانی AIaaS تایم‌اوت اتصال در

Nothing was mistyped. `AIaaS` became an LTR island, the neutral spaces around
it attached to the wrong side, and the two Persian runs swapped places.

## Rules

### 1. Put every Latin run in backticks

Backticks are the single highest-value habit. They give the Latin run a
visual boundary, and in most renderers the code span becomes one atomic unit
that the surrounding Persian cannot reorder across.

    bad:   مدل GPT-5.6-Luna در 27 ثانیه جواب داد
    good:  مدل `GPT-5.6-Luna` در ۲۷ ثانیه جواب داد

This applies to every identifier, model name, file path, flag, env var,
function, and brand written in Latin script — not only to code.

### 2. Never let a line begin or end with Latin

The first and last strong character of a paragraph anchors the whole
paragraph's base direction. A Persian sentence that opens with `OpenRouter`
will often render the entire line left-aligned and reordered.

    bad:   OpenRouter از IP ایران درخواست قبول نمی‌کند.
    good:  سرویس `OpenRouter` از آی‌پی ایران درخواست قبول نمی‌کند.

Start with a Persian word — even a small one like «سرویس»، «مدل»، «فایل»،
«دستور» — and end with Persian or with the sentence's full stop.

### 3. Keep punctuation on the Persian side

A comma, colon, parenthesis or question mark placed immediately after a Latin
run inherits that run's direction and jumps to the wrong end of the line.

    bad:   سه مدل تست شد: GLM-5.3, GPT-5.6-Luna, Gemini-3.1-Flash-Lite.
    good:  سه مدل تست شد: `GLM-5.3` و `GPT-5.6-Luna` و `Gemini-3.1-Flash-Lite`.

Prefer the Persian «و» over a Latin comma when listing Latin items inline.
Use Persian punctuation: «،» not ","، and «؟» not "?".

### 4. Move any list of Latin items out of the prose

Two or more Latin identifiers in one sentence is the point where a table or a
list becomes clearly better. A table cell has its own direction context, so
nothing reorders across cells.

    bad:   GLM-5.3 در ۳۸۱ ثانیه و GPT-5.6-Terra در ۳۴۵ ثانیه قطع شدند ولی
           GPT-5.6-Luna در ۲۷ ثانیه و Gemini-3.1-Flash-Lite در ۸ ثانیه موفق بودند.

    good:  | مدل | زمان | نتیجه |
           |---|---|---|
           | `Gemini-3.1-Flash-Lite` | ۸ ثانیه | موفق |
           | `GPT-5.6-Luna` | ۲۷ ثانیه | موفق |
           | `GPT-5.6-Terra` | ۳۴۵ ثانیه | قطع شد |
           | `GLM-5.3` | ۳۸۱ ثانیه | قطع شد |

### 5. Persian digits in prose, Latin digits in code

Persian digits (۰۱۲۳۴۵۶۷۸۹) are strong RTL characters and never reorder. Latin
digits are weak and drag neighbouring punctuation around with them.

    bad:   بین 345 تا 385 ثانیه قطع می‌شود.
    good:  بین ۳۴۵ تا ۳۸۵ ثانیه قطع می‌شود.

Inside backticks, code blocks, file paths, commands, version numbers and
anything the reader will copy, keep Latin digits — `max_tokens: 16000`,
`Next.js 14.2.35`, `30 9 * * *`. Correctness beats consistency there.

### 6. Never put a bare URL in a sentence

    bad:   مستنداتش در https://docs.arvancloud.ir/fa/aiaas/ است.
    good:  مستنداتش [اینجا](https://docs.arvancloud.ir/fa/aiaas/) است.

A markdown link keeps the URL out of the text flow entirely. A bare URL is the
worst case for bidi because it is long, Latin, and full of neutral slashes and
dots.

### 7. Prefer a Persian word when a real one exists

Every Latin word avoided is a reordering avoided. Use the Persian where it is
genuinely the normal term, and keep the Latin only where the Persian would be
unclear or where the reader needs the exact string.

| به‌جای | بنویس |
|---|---|
| timeout | مهلت زمانی، تایم‌اوت |
| deploy | استقرار، بالا بردن |
| endpoint | اندپوینت |
| prompt | پرامپت |
| token | توکن |
| gateway | درگاه، gateway در بک‌تیک |
| IP | آی‌پی |
| database | دیتابیس |

Do not force a translation nobody uses — «درخواست‌نامه» for a prompt helps no
one. The test is whether a Persian-speaking developer would say it out loud.

### 8. Code blocks over inline code for anything long

A single identifier inline is fine. A whole command, a JSON body, or a path
with several segments belongs in a fenced block, where direction is fixed and
nothing negotiates with the Persian around it.

## Quick checklist

Before sending Persian text that contains any Latin:

- [ ] Every Latin run is in backticks
- [ ] No line starts or ends with a Latin character
- [ ] Punctuation sits against Persian, not against Latin
- [ ] Two or more Latin items are in a table or list, not in a sentence
- [ ] Digits in prose are Persian; digits in code are Latin
- [ ] URLs are markdown links, never bare
- [ ] Commands and multi-line output are in fenced blocks

## What not to do

Do not insert bidi control characters (`U+200E`, `U+200F`, `U+2068`, `U+2069`)
into the text. They fix the display in one renderer and leave invisible
characters that break `grep`, corrupt copy-paste, and turn up as mojibake in a
database column. The structural rules above solve the same problem visibly and
survive being copied anywhere.
