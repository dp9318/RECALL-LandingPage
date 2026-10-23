import { describe, expect, it } from "vitest";
import { SECURITY_CONFIG } from "@/lib/security/contracts";

describe("SECURITY_CONFIG constants", () => {
  it("enforces documented short-lived signed URL expiry and rate limits", () => {
    expect(SECURITY_CONFIG.SIGNED_URL_EXPIRY_SECONDS).toBe(120);
    expect(SECURITY_CONFIG.RATE_LIMITS.USER_DOWNLOADS_PER_WINDOW).toBe(10);
    expect(SECURITY_CONFIG.RATE_LIMITS.USER_WINDOW_SECONDS).toBe(600);
    expect(SECURITY_CONFIG.RATE_LIMITS.IP_DOWNLOADS_PER_WINDOW).toBe(30);
    expect(SECURITY_CONFIG.RATE_LIMITS.IP_WINDOW_SECONDS).toBe(600);
    expect(SECURITY_CONFIG.CACHE_CONTROL_PROTECTED).toContain("no-store");
  });
});
