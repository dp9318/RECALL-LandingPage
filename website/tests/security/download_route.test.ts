import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET } from "@/app/api/download/route";

describe("Protected /api/download route authorization", () => {
  it("rejects unauthenticated requests with HTTP 401 or 503 if unconfigured", async () => {
    const request = new NextRequest("http://localhost:3000/api/download", {
      headers: {
        accept: "application/json",
      },
    });

    const response = await GET(request);
    // Since environment variables for Supabase are not populated in testing,
    // it will return 503 (service_unconfigured) or 401 (unauthorized)
    expect([401, 503]).toContain(response.status);

    const data = await response.json();
    expect(data.error).toBeDefined();

    // Cache-Control header MUST contain no-store for protected endpoints
    expect(response.headers.get("Cache-Control")).toContain("no-store");
  });
});
