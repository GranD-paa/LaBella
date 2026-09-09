/**
 * Jalali dates, converted rather than approximated.
 *
 * An Iranian remembers a birthday as `۱۳۷۵/۰۵/۱۲`, and a Postgres `date`
 * column stores `1996-08-02`. Something has to sit between them, and it has
 * to be exact: the Jalali year is not on a fixed 4-year leap cycle, so any
 * "close enough" arithmetic drifts by a day and puts a birthday on the wrong
 * date for a whole class of users.
 *
 * The algorithm is Kazimierz Borkowski's, the one `jalaali-js` implements —
 * table-driven leap years accurate from 1178 to 3177. Written out here rather
 * than installed because the project has no date library at all, and this is
 * fifty lines against a dependency plus a lockfile plus an npm proxy that is
 * often down.
 */

const div = (a: number, b: number): number => Math.trunc(a / b);
const mod = (a: number, b: number): number => a - Math.trunc(a / b) * b;

/** Years at which the 33-year leap pattern shifts. */
const BREAKS = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097,
  2192, 2262, 2324, 2394, 2456, 3178,
];

export const MIN_JALALI_YEAR = 1178;
export const MAX_JALALI_YEAR = 3177;

export type JalaliDate = { jy: number; jm: number; jd: number };
export type GregorianDate = { gy: number; gm: number; gd: number };

type YearFacts = {
  /** 0 when the year is common, 1 when it is leap. */
  leap: number;
  gy: number;
  /** The March day in `gy` that Farvardin 1 falls on. */
  march: number;
};

function yearFacts(jy: number): YearFacts {
  if (jy < BREAKS[0] || jy >= BREAKS[BREAKS.length - 1]) {
    throw new RangeError(`Jalali year out of range: ${jy}`);
  }

  const gy = jy + 621;
  let leapJ = -14;
  let jp = BREAKS[0];
  let jump = 0;

  for (let i = 1; i < BREAKS.length; i += 1) {
    const jm = BREAKS[i];
    jump = jm - jp;
    if (jy < jm) {
      break;
    }
    leapJ += div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }

  let n = jy - jp;
  leapJ += div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) {
    leapJ += 1;
  }

  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;

  if (jump - n < 6) {
    n = n - jump + div(jump + 4, 33) * 33;
  }
  let leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) {
    leap = 4;
  }

  return { leap, gy, march };
}

/** Julian Day Number for a Gregorian date. */
function gregorianToJdn(gy: number, gm: number, gd: number): number {
  let d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d -= div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) - 752;
  return d;
}

function jdnToGregorian(jdn: number): GregorianDate {
  let j = 4 * jdn + 139361631;
  j += div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308;
  const gd = div(mod(i, 153), 5) + 1;
  const gm = mod(div(i, 153), 12) + 1;
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy, gm, gd };
}

export function isJalaliLeapYear(jy: number): boolean {
  return yearFacts(jy).leap === 0;
}

/** 31 days for Farvardin–Shahrivar, 30 for Mehr–Bahman, 29 or 30 for Esfand. */
export function jalaliMonthLength(jy: number, jm: number): number {
  if (jm <= 6) {
    return 31;
  }
  if (jm <= 11) {
    return 30;
  }
  return isJalaliLeapYear(jy) ? 30 : 29;
}

export function isValidJalaliDate(jy: number, jm: number, jd: number): boolean {
  if (!Number.isInteger(jy) || !Number.isInteger(jm) || !Number.isInteger(jd)) {
    return false;
  }
  if (jy < MIN_JALALI_YEAR || jy > MAX_JALALI_YEAR) {
    return false;
  }
  if (jm < 1 || jm > 12) {
    return false;
  }
  return jd >= 1 && jd <= jalaliMonthLength(jy, jm);
}

export function jalaliToGregorian(jy: number, jm: number, jd: number): GregorianDate {
  const facts = yearFacts(jy);
  const jdn =
    gregorianToJdn(facts.gy, 3, facts.march) +
    (jm - 1) * 31 -
    div(jm, 7) * (jm - 7) +
    jd -
    1;
  return jdnToGregorian(jdn);
}

export function gregorianToJalali(gy: number, gm: number, gd: number): JalaliDate {
  const jdn = gregorianToJdn(gy, gm, gd);
  let jy = jdnToGregorian(jdn).gy - 621;
  const facts = yearFacts(jy);
  const farvardinFirst = gregorianToJdn(facts.gy, 3, facts.march);

  let k = jdn - farvardinFirst;
  if (k >= 0) {
    if (k <= 185) {
      return { jy, jm: 1 + div(k, 31), jd: mod(k, 31) + 1 };
    }
    k -= 186;
  } else {
    jy -= 1;
    k += 179;
    if (facts.leap === 1) {
      k += 1;
    }
  }
  return { jy, jm: 7 + div(k, 30), jd: mod(k, 30) + 1 };
}

/** `1375/05/12` as `1996-08-02`, the form a Postgres `date` column takes. */
export function jalaliToISODate(jy: number, jm: number, jd: number): string {
  const g = jalaliToGregorian(jy, jm, jd);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${g.gy}-${pad(g.gm)}-${pad(g.gd)}`;
}

/** `1996-08-02` back to `{ jy: 1375, jm: 5, jd: 12 }`, for showing what was stored. */
export function isoDateToJalali(iso: string): JalaliDate | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) {
    return null;
  }
  return gregorianToJalali(Number(match[1]), Number(match[2]), Number(match[3]));
}

export function todayJalali(now: Date = new Date()): JalaliDate {
  return gregorianToJalali(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;
