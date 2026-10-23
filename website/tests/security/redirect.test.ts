import { describe, expect, it } from "vitest";
import { validateReturnPath } from "@/lib/security/redirect";

describe("validateReturnPath", () => {
  it("allows valid internal routes", () => {
    expect(validateReturnPath("/download")).toBe("/download");
    expect(validateReturnPath("/login")).toBe("/login");
    expect(validateReturnPath("/")).toBe("/");
  });

  it("falls back to /download for empty or null inputs", () => {
    expect(validateReturnPath(null)).toBe("/download");
    expect(validateReturnPath(undefined)).toBe("/download");
    expect(validateReturnPath("")).toBe("/download");
    expect(validateReturnPath("   ")).toBe("/download");
  });

  it("rejects absolute URLs and falls back safely", () => {
    expect(validateReturnPath("https://evil.com")).toBe("/download");
    expect(validateReturnPath("http://evil.com/download")).toBe("/download");
  });

  it("rejects protocol-relative URLs", () => {
    expect(validateReturnPath("//evil.com")).toBe("/download");
    expect(validateReturnPath("//download")).toBe("/download");
    expect(validateReturnPath("/\\evil.com")).toBe("/download");
  });

  it("rejects CRLF and control characters", () => {
    expect(validateReturnPath("/download\r\nSet-Cookie: evil=1")).toBe("/download");
    expect(validateReturnPath("/download\nevil")).toBe("/download");
    expect(validateReturnPath("/download\0evil")).toBe("/download");
  });

  it("rejects directory traversal", () => {
    expect(validateReturnPath("/download/../../etc/passwd")).toBe("/download");
    expect(validateReturnPath("/../login")).toBe("/download");
  });

  it("rejects unapproved internal routes", () => {
    expect(validateReturnPath("/admin")).toBe("/download");
    expect(validateReturnPath("/settings")).toBe("/download");
  });
});
