import { z } from "zod";

type Translator = (key: string, params?: Record<string, string | number>) => string;

export function createSignInSchema(t: Translator) {
  return z.object({
    email: z
      .string()
      .min(1, t("auth.validation.emailRequired"))
      .email(t("auth.validation.invalidEmail")),
    password: z.string().min(1, t("auth.validation.passwordRequired")),
    rememberMe: z.boolean(),
  });
}

export function createSignUpSchema(t: Translator) {
  return z
    .object({
      // Answered before the rest of the form: it picks the verification path
      // (SMS inside Iran, email link abroad).
      region: z.enum(["ir", "intl"]),
      phone: z
        .string()
        .min(1, t("auth.validation.phoneRequired"))
        .max(20, t("auth.validation.phoneMax")),
      fullName: z
        .string()
        .min(2, t("auth.validation.fullNameMin"))
        .max(80, t("auth.validation.fullNameMax")),
      email: z
        .string()
        .min(1, t("auth.validation.emailRequired"))
        .email(t("auth.validation.invalidEmail")),
      password: z
        .string()
        .min(8, t("auth.validation.passwordMin"))
        .regex(/[a-z]/, t("auth.validation.passwordLowercase"))
        .regex(/[A-Z]/, t("auth.validation.passwordUppercase"))
        .regex(/[0-9]/, t("auth.validation.passwordNumber")),
      confirmPassword: z
        .string()
        .min(1, t("auth.validation.confirmPasswordRequired")),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("auth.validation.passwordsMismatch"),
      path: ["confirmPassword"],
    });
}
