"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { completeProfile } from "@/app/actions/auth";
import { DateOfBirthField } from "@/components/ui/date-of-birth-field";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { createCompleteProfileSchema } from "@/lib/validations/i18n/auth-schemas";

type Values = {
  firstName: string;
  lastName: string;
  email: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
};

/**
 * The one screen between verifying a number and using the product.
 *
 * Everything here is asked once and never again, which is the argument for
 * asking it here rather than sprinkling it through the product later: the
 * person has just proved they own the number and is already committed. Four
 * fields is the whole of it.
 *
 * The two names are separate and Latin-only because they end up on a
 * certificate and in the SpotPlayer watermark, both of which are Latin-set —
 * a Persian name arrives there as boxes, and by then nobody is around to fix
 * it. The rule is enforced, but the message says why rather than just "no".
 */
export function CompleteProfileForm({ redirectTo }: { redirectTo?: string }) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  const schema = useMemo(() => createCompleteProfileSchema(t), [t]);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    // Errors on blur rather than on every keystroke: telling someone their
    // name is too short while they are still typing it is noise.
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthYear: undefined as unknown as number,
      birthMonth: undefined as unknown as number,
      birthDay: undefined as unknown as number,
    },
  });

  function onSubmit(values: Values) {
    setFormError(null);
    startTransition(async () => {
      const result = await completeProfile(values, redirectTo);
      // Success redirects; anything returned is a refusal.
      if (result && "error" in result) {
        const message = resolveMessage(t, result.error);
        setFormError(message);
        toast.error(message);
      }
    });
  }

  const birth = form.watch(["birthYear", "birthMonth", "birthDay"]);
  const birthError =
    form.formState.errors.birthYear?.message ??
    form.formState.errors.birthMonth?.message ??
    form.formState.errors.birthDay?.message ??
    null;

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {t("auth.welcomeTitle")}
        </h1>
        <p className="text-sm text-muted-foreground">{t("auth.welcomeSubtitle")}</p>
      </header>

      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.firstName")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      dir="ltr"
                      autoComplete="given-name"
                      autoFocus
                      disabled={isPending}
                      placeholder="Ali"
                      className="text-left"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.lastName")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      dir="ltr"
                      autoComplete="family-name"
                      disabled={isPending}
                      placeholder="Rezaei"
                      className="text-left"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="-mt-2 text-xs text-muted-foreground">
            {t("auth.nameLatinHint")}
          </p>

          <DateOfBirthField
            disabled={isPending}
            error={birthError}
            value={{
              year: birth[0] ?? null,
              month: birth[1] ?? null,
              day: birth[2] ?? null,
            }}
            onChange={(next) => {
              const set = (name: keyof Values, v: number | null) =>
                form.setValue(name, v as never, { shouldValidate: false });
              set("birthYear", next.year);
              set("birthMonth", next.month);
              set("birthDay", next.day);
              if (next.year && next.month && next.day) {
                void form.trigger(["birthYear", "birthMonth", "birthDay"]);
              }
            }}
            labels={{
              legend: t("auth.birthDate"),
              year: t("auth.birthYear"),
              month: t("auth.birthMonth"),
              day: t("auth.birthDay"),
            }}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    dir="ltr"
                    autoComplete="email"
                    disabled={isPending}
                    placeholder="you@example.com"
                    className="text-left"
                  />
                </FormControl>
                <FormDescription>{t("auth.emailReceiptsHint")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {formError ? (
            <p role="alert" className="text-sm text-destructive">
              {formError}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 aria-hidden className="me-2 h-4 w-4 animate-spin" />
            ) : null}
            {t("auth.finish")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
