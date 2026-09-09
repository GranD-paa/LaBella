"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { ArrowRight, Loader2, Smartphone } from "lucide-react";

import { getAuthChallenge, requestPhoneCode, verifyPhoneCode } from "@/app/actions/auth";
import { OtpInput } from "@/components/auth/otp-input";
import { useTranslations } from "@/components/providers/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { solveChallenge } from "@/lib/auth/otp-challenge-solver";
import type { AuthMode, Challenge, SolvedChallenge } from "@/lib/auth/phone-auth-types";
import { countdownTickMs, formatCountdown } from "@/lib/i18n/duration";
import { resolveMessage } from "@/lib/i18n/resolve-message";
import { foldDigits } from "@/lib/notify/phone";
import { cn } from "@/lib/utils";

/**
 * The one door.
 *
 * Two steps on one screen rather than two pages: the second step is about a
 * number the user just typed on the first, and a navigation between them
 * loses that context on a back button and costs a round trip on a connection
 * that may not have one to spare.
 *
 * The heading changes from "ورود / عضویت" to whichever the number turned out
 * to be. Until a number is entered, claiming either would be a guess.
 */
export function PhoneAuthForm({ redirectTo }: { redirectTo?: string }) {
  const { t } = useTranslations();
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState<"phone" | "code">("phone");
  const [mode, setMode] = useState<AuthMode | null>(null);
  const [rawPhone, setRawPhone] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [resendAt, setResendAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const trap = useRef<HTMLInputElement>(null);

  const ticket = useSolvedChallenge();

  const msLeft = resendAt === null ? 0 : Math.max(0, resendAt - now);
  const waiting = msLeft > 0;

  // One ticking clock for the resend countdown, running only while there is
  // something to count down to — and only as fast as the text it redraws
  // actually changes. A minute-and-second clock needs every second; a wait
  // measured in hours does not, and a day of one-second wake-ups to redraw an
  // unchanged sentence is a battery cost paid for nothing.
  useEffect(() => {
    if (resendAt === null || resendAt <= now) {
      return;
    }
    const timer = setInterval(
      () => setNow(Date.now()),
      countdownTickMs(resendAt - now)
    );
    return () => clearInterval(timer);
  }, [resendAt, now]);

  function fail(key: string, retryAfterMs?: number) {
    setError(resolveMessage(t, key));
    if (retryAfterMs && retryAfterMs > 0) {
      setResendAt(Date.now() + retryAfterMs);
      setNow(Date.now());
    }
  }

  function submitPhone() {
    setError(null);
    startTransition(async () => {
      // The ticket is solved while the user types, so this almost never
      // waits. When it does — a very slow phone, or a submit two seconds
      // after load — waiting beats sending them away empty-handed.
      const solved = await ticket.get();

      const result = await requestPhoneCode({
        phone: rawPhone,
        challenge: solved,
        trap: trap.current?.value ?? "",
      });

      if (!result.ok) {
        fail(result.error, result.retryAfterMs);
        return;
      }

      setMode(result.mode);
      setSentTo(result.phone);
      setStep("code");
      setCode("");
      setResendAt(Date.now() + result.resendAfterMs);
      setNow(Date.now());
      // A fresh ticket for the resend, earned in the background again.
      ticket.renew();
    });
  }

  const submitCode = useCallback(
    (entered: string) => {
      setError(null);
      startTransition(async () => {
        const result = await verifyPhoneCode({
          phone: sentTo,
          code: entered,
          redirectTo,
        });
        // Success redirects, so anything returned here is a refusal.
        if (result && !result.ok) {
          setError(resolveMessage(t, result.error));
          setCode("");
          if (result.retryAfterMs) {
            setResendAt(Date.now() + result.retryAfterMs);
            setNow(Date.now());
          }
        }
      });
    },
    [redirectTo, sentTo, t]
  );

  const heading =
    step === "phone"
      ? t("auth.phoneGateTitle")
      : mode === "signin"
        ? t("auth.signIn")
        : t("auth.signUp");

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {heading}
        </h1>
        <p className="text-sm text-muted-foreground">
          {step === "phone"
            ? t("auth.phoneGateSubtitle")
            : t("auth.codeSentTo", { phone: toPersianDigits(localFormat(sentTo)) })}
        </p>
      </header>

      {step === "phone" ? (
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            submitPhone();
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="phone">{t("auth.phone")}</Label>
            <div className="relative">
              <Smartphone
                aria-hidden
                className="pointer-events-none absolute inset-y-0 my-auto h-4 w-4 text-muted-foreground ltr:left-3 rtl:right-3"
              />
              <Input
                id="phone"
                name="phone"
                type="tel"
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
                autoFocus
                maxLength={16}
                disabled={isPending}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "phone-error" : "phone-hint"}
                placeholder={t("auth.phonePlaceholder")}
                value={rawPhone}
                onChange={(event) =>
                  setRawPhone(foldDigits(event.target.value).replace(/[^\d+]/g, ""))
                }
                className="text-left font-mono tabular-nums ltr:pl-10 rtl:pr-10"
              />
            </div>
            {error ? (
              <p id="phone-error" role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : (
              <p id="phone-hint" className="text-xs text-muted-foreground">
                {t("auth.phoneGateHint")}
              </p>
            )}
          </div>

          {/* Not for people. Anything in it is a form filler walking the DOM. */}
          <input
            ref={trap}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="absolute h-0 w-0 overflow-hidden opacity-0"
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 aria-hidden className="me-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight aria-hidden className="me-2 h-4 w-4 rtl-flip" />
            )}
            {t("auth.continue")}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="code-0">{t("auth.codeLabel")}</Label>
            <OtpInput
              value={code}
              onChange={setCode}
              onComplete={submitCode}
              disabled={isPending}
              invalid={Boolean(error)}
              autoFocus
              label={t("auth.codeLabel")}
              describedBy={error ? "code-error" : "code-hint"}
            />
            {error ? (
              <p id="code-error" role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : (
              <p id="code-hint" className="text-xs text-muted-foreground">
                {t("auth.codeHint")}
              </p>
            )}
          </div>

          <Button
            type="button"
            className="w-full"
            disabled={isPending || code.length < 6}
            onClick={() => submitCode(code)}
          >
            {isPending ? (
              <Loader2 aria-hidden className="me-2 h-4 w-4 animate-spin" />
            ) : null}
            {mode === "signin" ? t("auth.signIn") : t("auth.createAccount")}
          </Button>

          <div className="flex items-center justify-between text-sm">
            <button
              type="button"
              className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              onClick={() => {
                setStep("phone");
                setError(null);
                setCode("");
              }}
            >
              {t("auth.wrongNumber")}
            </button>

            <button
              type="button"
              disabled={isPending || waiting}
              onClick={submitPhone}
              className={cn(
                "underline-offset-4",
                waiting
                  ? "cursor-not-allowed text-muted-foreground"
                  : "text-primary hover:underline"
              )}
            >
              {waiting
                ? t("auth.resendIn", {
                    time: toPersianDigits(formatCountdown(msLeft, t)),
                  })
                : t("auth.resend")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Keeps a solved challenge ready before it is asked for.
 *
 * The whole point of solving it here rather than on submit: the user spends
 * several seconds typing eleven digits, and the browser spends a fraction of
 * one of them on the proof-of-work. Doing it the other way round would put a
 * visible pause between pressing the button and anything happening, for a
 * measure whose entire value is that nobody notices it.
 */
function useSolvedChallenge() {
  const solved = useRef<Promise<SolvedChallenge | null> | null>(null);
  const abort = useRef<AbortController | null>(null);

  const start = useCallback(() => {
    abort.current?.abort();
    const controller = new AbortController();
    abort.current = controller;

    solved.current = getAuthChallenge()
      .then((challenge: Challenge | null) =>
        // Local development issues no challenge; there is nothing to protect
        // when nothing is sent and nothing is billed.
        challenge ? solveChallenge(challenge, controller.signal) : null
      )
      .catch(() => null);
  }, []);

  useEffect(() => {
    start();
    return () => abort.current?.abort();
  }, [start]);

  return useMemo(
    () => ({
      get: () => solved.current ?? Promise.resolve(null),
      renew: start,
    }),
    [start]
  );
}

/** `+989121234567` shown back as `۰۹۱۲ ۱۲۳ ۴۵۶۷`. */
function localFormat(e164: string): string {
  if (!e164.startsWith("+98")) {
    return e164;
  }
  const national = `0${e164.slice(3)}`;
  return `${national.slice(0, 4)} ${national.slice(4, 7)} ${national.slice(7)}`;
}

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

function toPersianDigits(text: string): string {
  return text.replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}
