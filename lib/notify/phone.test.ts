import { describe, expect, it } from "vitest";

import {
  foldDigits,
  isIranianMobile,
  isIranianPhone,
  normalizePhone,
  toLocalIranFormat,
} from "./phone";

describe("foldDigits", () => {
  it("rewrites Persian digits as ASCII", () => {
    expect(foldDigits("۰۹۱۲۱۲۳۴۵۶۷")).toBe("09121234567");
  });

  it("rewrites Arabic-Indic digits as ASCII", () => {
    expect(foldDigits("٠٩١٢١٢٣٤٥٦٧")).toBe("09121234567");
  });

  it("leaves everything that is not a digit alone", () => {
    expect(foldDigits("+۹۸ (۹۱۲) ۱۲۳-۴۵۶۷")).toBe("+98 (912) 123-4567");
  });
});

describe("normalizePhone", () => {
  const expected = "+989121234567";

  it.each([
    "09121234567",
    "9121234567",
    "+989121234567",
    "00989121234567",
    "989121234567",
    "0912 123 4567",
    "0912-123-4567",
    "۰۹۱۲۱۲۳۴۵۶۷",
    "+۹۸۹۱۲۱۲۳۴۵۶۷",
  ])("reads %s as one number", (input) => {
    expect(normalizePhone(input)).toBe(expected);
  });

  it("strips the zero-width marks a Persian keyboard leaves behind", () => {
    expect(normalizePhone("\u200f۰۹۱۲۱۲۳۴۵۶۷\u200e")).toBe(expected);
  });

  it("keeps a foreign number in E.164 rather than guessing at it", () => {
    expect(normalizePhone("+393331234567")).toBe("+393331234567");
  });

  it.each(["", "0912123456", "091212345678", "hello", "+98912"])(
    "refuses %s",
    (input) => {
      expect(normalizePhone(input)).toBeNull();
    }
  );
});

describe("isIranianPhone", () => {
  it("asks only which country the number belongs to", () => {
    expect(isIranianPhone("+989121234567")).toBe(true);
    expect(isIranianPhone("+393331234567")).toBe(false);
  });
});

describe("isIranianMobile", () => {
  it.each(["+989121234567", "+989031234567", "+989211234567", "+989901234567", "+989411234567"])(
    "accepts the allocated range %s",
    (e164) => {
      expect(isIranianMobile(e164)).toBe(true);
    }
  );

  it.each(["+989551234567", "+989671234567", "+989751234567"])(
    "refuses the unallocated range %s",
    (e164) => {
      expect(isIranianMobile(e164)).toBe(false);
    }
  );

  it("refuses a number that was counted to rather than dialled", () => {
    expect(isIranianMobile("+989999999999")).toBe(false);
    expect(isIranianMobile("+989876543210")).toBe(false);
  });

  it("keeps a repeated block that real numbers do use", () => {
    expect(isIranianMobile("+989111111111")).toBe(true);
  });

  it("refuses a foreign number however well formed", () => {
    expect(isIranianMobile("+393331234567")).toBe(false);
  });
});

describe("toLocalIranFormat", () => {
  it("hands the gateway the national form it expects", () => {
    expect(toLocalIranFormat("+989121234567")).toBe("09121234567");
  });
});
