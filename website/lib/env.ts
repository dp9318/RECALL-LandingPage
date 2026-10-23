/**
 * Central typed environment configuration.
 * Adheres to docs/TECH_STACK.md and docs/SECURITY.md.
 * Secret keys MUST NEVER be prefixed with NEXT_PUBLIC_.
 */

export interface AppEnv {
  // Public browser-safe variables
  siteUrl: string;
  supabaseUrl?: string;
  supabasePublishableKey?: string;
  turnstileSiteKey?: string;

  // Server-only variables (never exposed to browser)
  supabaseSecretKey?: string;
  supabaseReleaseBucket: string;
  supabaseReleaseObjectPath: string;
  currentReleaseVersion: string;
  upstashRedisRestUrl?: string;
  upstashRedisRestToken?: string;
  turnstileSecretKey?: string;
}

export function getEnv(): AppEnv {
  return {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabasePublishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,

    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY,
    supabaseReleaseBucket: process.env.SUPABASE_RELEASE_BUCKET || "recall-releases",
    supabaseReleaseObjectPath:
      process.env.SUPABASE_RELEASE_OBJECT_PATH || "recall-windows.zip",
    currentReleaseVersion: process.env.CURRENT_RELEASE_VERSION || "2.1.1",
    upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL,
    upstashRedisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY,
  };
}
