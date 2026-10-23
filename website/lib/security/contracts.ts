/**
 * Security policy and throttling constants.
 * Sourced from docs/SECURITY.md and docs/AUTH_AND_DOWNLOAD.md.
 */

export const SECURITY_CONFIG = {
  // Signed URL expiry duration in seconds
  SIGNED_URL_EXPIRY_SECONDS: 120,

  // Rate limiting policy
  RATE_LIMITS: {
    USER_DOWNLOADS_PER_WINDOW: 10,
    USER_WINDOW_SECONDS: 600, // 10 minutes
    IP_DOWNLOADS_PER_WINDOW: 30,
    IP_WINDOW_SECONDS: 600, // 10 minutes
  },

  // HTTP Header protection defaults
  CACHE_CONTROL_PROTECTED: "private, no-cache, no-store, max-age=0, must-revalidate",
} as const;
