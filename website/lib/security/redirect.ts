/**
 * Safe redirect validator to prevent open redirects.
 * Follows docs/AUTH_AND_DOWNLOAD.md and docs/SECURITY.md.
 */

const ALLOWED_INTERNAL_PATHS = new Set(["/", "/download", "/login"]);

const DEFAULT_FALLBACK_PATH = "/download";

/**
 * Validates a returnTo / next parameter.
 * Rejects absolute URLs, protocol-relative URLs (//...), schemes, CRLF, and path traversal.
 */
export function validateReturnPath(
  candidatePath: string | null | undefined,
  fallback: string = DEFAULT_FALLBACK_PATH
): string {
  if (!candidatePath || typeof candidatePath !== "string") {
    return fallback;
  }

  const trimmed = candidatePath.trim();

  // Must begin with a single slash, but not two slashes (protocol-relative //)
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.startsWith("/\\")) {
    return fallback;
  }

  // Reject CRLF, tab, null bytes, backslashes
  if (/[\r\n\t\0\\]/.test(trimmed)) {
    return fallback;
  }

  // Reject potential scheme smuggling (e.g. /http: or /javascript:)
  if (/^\/[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return fallback;
  }

  // Reject directory traversal attempts
  if (trimmed.includes("..")) {
    return fallback;
  }

  // Extract the pathname before any query string or hash
  const pathname = trimmed.split("?")[0].split("#")[0];

  if (!ALLOWED_INTERNAL_PATHS.has(pathname)) {
    return fallback;
  }

  return trimmed;
}
