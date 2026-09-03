import { z } from "zod";

import { isIranianPhone, normalizePhone } from "@/lib/notify/phone";

/**
 * Every account is confirmed by an SMS code, so the number has to be one an
 * Iranian gateway can reach. Someone signing up from abroad supplies an
 * Iranian number too — that is the product decision, not an oversight.
 */
export function isVerifiablePhone(value: string): boolean {
  const e164 = normalizePhone(value);
  return e164 !== null && isIranianPhone(e164);
}

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export type SignInValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(20, "Phone number is too long")
      .refine(isVerifiablePhone, "Enter an Iranian mobile number"),
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(80, "Full name is too long"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpValues = z.infer<typeof signUpSchema>;
