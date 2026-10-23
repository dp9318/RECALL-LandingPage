/**
 * Trusted Client IP Extractor.
 * Follows docs/SECURITY.md Section 5:
 * "Use carefully derived network identifier for abuse protection.
 * Avoid untrusted forwarded headers unless using platform-documented trusted IP extraction."
 */

export function getClientIp(headers: Headers): string {
  // 1. Vercel trusted IP header
  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }

  // 2. Standard Forwarded header
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    // The first IP in the list is the original client IP
    const clientIp = xForwardedFor.split(",")[0].trim();
    if (clientIp) {
      return clientIp;
    }
  }

  // 3. Fallback identifier for local dev or unexpected environments
  return "127.0.0.1";
}
