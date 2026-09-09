import { z } from "zod";

import { isValidJalaliDate, todayJalali } from "@/lib/date/jalali";
import { isVerifiablePhone } from "@/lib/validations/auth";

type Translator = (key: string, params?: Record<string, string | number>) => string;

/**
 * The same rules as `lib/validations/auth.ts`, worded in the user's language.
 *
 * Two files rather than one because the server actions validate without a
 * locale in hand and the forms validate with one. They must be changed
 * together; a rule that exists in only one of them is a form that accepts what
 * the action rejects, which reads to the user as the button doing nothing.
 */

export function createPhoneSchema(t: Translator) {
  return z.object({
    phone: z
      .string()
      .trim()
      .min(1, t("auth.validation.phoneRequired"))
      .max(20, t("auth.validation.phoneMax"))
      .refine(isVerifiablePhone, t("auth.validation.phoneIran")),
  });
}

export function createCodeSchema(t: Translator) {
  return z.object({
    code: z
      .string()
      .trim()
      .regex(/^\d{6}$/, t("auth.validation.codeDigits")),
  });
}

const LATIN_NAME = /^[A-Za-z][A-Za-z'’\- ]*$/;

export function createCompleteProfileSchema(t: Translator) {
  const latinName = (minKey: string, maxKey: string, latinKey: string) =>
    z
      .string()
      .trim()
      .min(2, t(minKey))
      .max(40, t(maxKey))
      .regex(LATIN_NAME, t(latinKey));

  return z
    .object({
      firstName: latinName(
        "auth.validation.firstNameMin",
        "auth.validation.firstNameMax",
        "auth.validation.nameLatin"
      ),
      lastName: latinName(
        "auth.validation.lastNameMin",
        "auth.validation.lastNameMax",
        "auth.validation.nameLatin"
      ),
      email: z
        .string()
        .trim()
        .min(1, t("auth.validation.emailRequired"))
        .email(t("auth.validation.invalidEmail")),
      // Plain numbers, not `z.coerce`: the picker hands over numbers already,
      // and coercing would make the form's input type `unknown` and put every
      // field it touches out of step with react-hook-form. The server keeps
      // the coercion — it is the boundary, and it takes what arrives.
      birthYear: z.number({ message: t("auth.validation.birthDateRequired") }).int(),
      birthMonth: z
        .number({ message: t("auth.validation.birthDateRequired") })
        .int()
        .min(1)
        .max(12),
      birthDay: z
        .number({ message: t("auth.validation.birthDateRequired") })
        .int()
        .min(1)
        .max(31),
    })
    .refine(
      ({ birthYear, birthMonth, birthDay }) =>
        isValidJalaliDate(birthYear, birthMonth, birthDay),
      { message: t("auth.validation.birthDateReal"), path: ["birthDay"] }
    )
    .refine(({ birthYear }) => birthYear >= 1300, {
      message: t("auth.validation.birthYearRange"),
      path: ["birthYear"],
    })
    .refine(({ birthYear }) => birthYear <= todayJalali().jy, {
      message: t("auth.validation.birthYearFuture"),
      path: ["birthYear"],
    });
}
