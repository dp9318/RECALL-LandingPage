import { describe, expect, it } from "vitest";
import { checkDownloadRateLimit } from "@/lib/ratelimit";

describe("checkDownloadRateLimit in non-production", () => {
  it("allows requests when Upstash is unconfigured in development/test", async () => {
    const res = await checkDownloadRateLimit("user-test-123", "127.0.0.1");

    expect(res.success).toBe(true);
    expect(res.remaining).toBeGreaterThan(0);
  });
});
