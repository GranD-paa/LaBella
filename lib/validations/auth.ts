import { z } from "zod";

import { isIranianMobile, normalizePhone } from "@/lib/notify/phone";
import { isValidJalaliDate, todayJalali } from "@/lib/date/jalali";

/**
 * Every account is a phone number that answered an SMS, so the number has to
 * be one an Iranian gateway can actually reach. Someone signing up from abroad
 * supplies an Iranian number too — that is the product decision, not an
 * oversight.
 */
export function isVerifiablePhone(value: string): boolean {
  const e164 = normalizePhone(value);
  return e164 !== null && isIranianMobile(e164);
}

export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .max(20, "Phone number is too long")
  .refine(isVerifiablePhone, "Enter an Iranian mobile number");

/**
 * Six digits and nothing else.
 *
 * Trimmed and folded before it gets here, because the code arrives by SMS and
 * the two ways people get it into the box — a long-press paste and the
 * phone's own one-time-code autofill — both bring whitespace with them often
 * enough to matter.
 */
export const otpCodeSchema = z
  .string()
  .trim()
  .regex(/^\d{6}$/, "The code is six digits");

export const requestCodeSchema = z.object({ phone: phoneSchema });

export const verifyCodeSchema = z.object({
  phone: phoneSchema,
  code: otpCodeSchema,
});

/**
 * Latin letters only, and the reason is not decoration.
 *
 * These two fields are what goes on a course certificate and into the
 * SpotPlayer watermark, both of which are Latin-set. A name typed in Persian
 * arrives there as boxes, and by then the person is not around to fix it.
 * Apostrophes and hyphens stay: D'Angelo and Kaveh-Rad are names.
 */
const LATIN_NAME = /^[A-Za-z][A-Za-z'’\- ]*$/;

const latinName = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `${label} must be at least 2 characters`)
    .max(40, `${label} is too long`)
    .regex(LATIN_NAME, `${label} must be written in English letters`);

/**
 * Nobody being taught Italian was born before 1300, and nobody born after
 * today exists. Between those, the only rule is that the date is real — the
 * thirtieth of a common Esfand is not.
 */
const OLDEST_BIRTH_YEAR = 1300;

export const birthDateSchema = z
  .object({
    birthYear: z.coerce.number().int(),
    birthMonth: z.coerce.number().int().min(1).max(12),
    birthDay: z.coerce.number().int().min(1).max(31),
  })
  .refine(
    ({ birthYear, birthMonth, birthDay }) =>
      isValidJalaliDate(birthYear, birthMonth, birthDay),
    { message: "That date does not exist", path: ["birthDay"] }
  )
  .refine(({ birthYear }) => birthYear >= OLDEST_BIRTH_YEAR, {
    message: "Check the year",
    path: ["birthYear"],
  })
  .refine(({ birthYear }) => birthYear <= todayJalali().jy, {
    message: "That year has not happened yet",
    path: ["birthYear"],
  });

export const completeProfileSchema = z
  .object({
    firstName: latinName("First name"),
    lastName: latinName("Last name"),
    // Trimmed before it is judged an address: a long-press paste and iOS
    // autofill both hand over a trailing space often enough, and an address
    // with one on the end fails the format check — which the form then reports
    // as a typo the person cannot find.
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),
  })
  .and(birthDateSchema);

export type CompleteProfileValues = z.infer<typeof completeProfileSchema>;
