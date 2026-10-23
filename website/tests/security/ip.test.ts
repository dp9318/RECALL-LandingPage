import { describe, expect, it } from "vitest";
import { getClientIp } from "@/lib/security/ip";

describe("getClientIp utility", () => {
  it("prioritizes x-real-ip header", () => {
    const headers = new Headers({
      "x-real-ip": "203.0.113.195",
      "x-forwarded-for": "198.51.100.1, 192.0.2.1",
    });

    expect(getClientIp(headers)).toBe("203.0.113.195");
  });

  it("extracts the first IP from x-forwarded-for if x-real-ip is missing", () => {
    const headers = new Headers({
      "x-forwarded-for": "198.51.100.1, 192.0.2.1",
    });

    expect(getClientIp(headers)).toBe("198.51.100.1");
  });

  it("falls back to 127.0.0.1 when no headers are present", () => {
    const headers = new Headers();
    expect(getClientIp(headers)).toBe("127.0.0.1");
  });
});
