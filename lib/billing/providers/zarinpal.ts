/**
 * ZarinPal (زرین‌پال) — Iranian payment gateway, IRR only.
 *
 * Flow (Payment API v4):
 *   1. POST /pg/v4/payment/request.json  -> `authority` token
 *   2. Redirect the customer to /pg/StartPay/{authority}
 *   3. ZarinPal returns them to our callback with `?Authority=…&Status=OK|NOK`
 *   4. POST /pg/v4/payment/verify.json   -> `ref_id`, the receipt number
 *
 * Step 4 is not optional and not a formality: `Status=OK` in the return URL is
 * just a query parameter and anyone can type it. Only the verify call, made
 * server-to-server with our merchant id and the amount read back out of our
 * own ledger, proves money moved.
 */
import type {
  CheckoutRequest,
  CheckoutResponse,
  PaymentProvider,
  VerifyRequest,
  VerifyResponse,
} from "@/lib/billing/providers/types";

const BASE_URL = "https://payment.zarinpal.com";
const REQUEST_TIMEOUT_MS = 20_000;

type ZarinPalEnvelope<T> = {
  data?: T | never[];
  errors?: { code?: number; message?: string } | never[];
};

type RequestData = { code: number; authority: string };
type VerifyData = { code: number; ref_id: number; card_pan?: string };

/** ZarinPal returns `[]` instead of `null` for an absent object. */
function unwrap<T>(value: T | never[] | undefined): T | null {
  if (!value || Array.isArray(value)) return null;
  return value;
}

function errorMessage(envelope: ZarinPalEnvelope<unknown>, fallback: string) {
  const errors = unwrap(envelope.errors);
  if (errors?.message) {
    return `zarinpal: ${errors.message}${errors.code ? ` (${errors.code})` : ""}`;
  }
  return fallback;
}

async function postJson<T>(
  path: string,
  body: Record<string, unknown>
): Promise<ZarinPalEnvelope<T>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      signal: controller.signal,
      cache: "no-store",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(body),
    });
    return (await response.json()) as ZarinPalEnvelope<T>;
  } finally {
    clearTimeout(timeout);
  }
}

export const zarinpalProvider: PaymentProvider = {
  slug: "zarinpal",
  currencies: ["IRR"],

  async createCheckout(request: CheckoutRequest): Promise<CheckoutResponse> {
    const merchantId = process.env.ZARINPAL_MERCHANT_ID;
    if (!merchantId) {
      return { ok: false, error: "zarinpal: ZARINPAL_MERCHANT_ID is not set" };
    }
    if (request.currency !== "IRR") {
      return { ok: false, error: "zarinpal: only IRR is supported" };
    }
    if (request.amount < 10_000) {
      // ZarinPal rejects amounts under 1,000 Toman outright.
      return { ok: false, error: "zarinpal: amount below the gateway minimum" };
    }

    try {
      const envelope = await postJson<RequestData>("/pg/v4/payment/request.json", {
        merchant_id: merchantId,
        amount: request.amount,
        callback_url: request.callbackUrl,
        description: request.description,
        metadata: {
          // Carried through so the callback can find our ledger row even if
          // the query string is tampered with.
          order_id: request.paymentId,
          ...(request.customerEmail ? { email: request.customerEmail } : {}),
        },
      });

      const data = unwrap(envelope.data);
      if (!data || data.code !== 100 || !data.authority) {
        return {
          ok: false,
          error: errorMessage(envelope, "zarinpal: payment request was refused"),
        };
      }

      return {
        ok: true,
        redirectUrl: `${BASE_URL}/pg/StartPay/${data.authority}`,
        providerPaymentId: data.authority,
      };
    } catch (error) {
      return {
        ok: false,
        error: `zarinpal: ${error instanceof Error ? error.message : "request failed"}`,
      };
    }
  },

  async verify(request: VerifyRequest): Promise<VerifyResponse> {
    const merchantId = process.env.ZARINPAL_MERCHANT_ID;
    if (!merchantId) {
      return { ok: false, error: "zarinpal: ZARINPAL_MERCHANT_ID is not set" };
    }

    const authority = request.params.Authority ?? request.params.authority;
    const status = request.params.Status ?? request.params.status;

    if (!authority) {
      return { ok: false, error: "zarinpal: callback had no Authority" };
    }
    if (status !== "OK") {
      // The customer backed out at the gateway.
      return { ok: false, error: "zarinpal: payment was not completed", canceledByUser: true };
    }

    try {
      const envelope = await postJson<VerifyData>("/pg/v4/payment/verify.json", {
        merchant_id: merchantId,
        // Read from our own ledger, never from the callback query string.
        amount: request.amount,
        authority,
      });

      const data = unwrap(envelope.data);
      // 100 = verified now. 101 = already verified on an earlier callback,
      // which is a success for us: the customer refreshed the return page.
      if (!data || (data.code !== 100 && data.code !== 101)) {
        return {
          ok: false,
          error: errorMessage(envelope, "zarinpal: verification failed"),
        };
      }

      return {
        ok: true,
        providerPaymentId: authority,
        providerRef: String(data.ref_id),
      };
    } catch (error) {
      return {
        ok: false,
        error: `zarinpal: ${error instanceof Error ? error.message : "verify failed"}`,
      };
    }
  },
};
