/**
 * Upstash Redis Rate Limiter for Download URL Issuance.
 * Sourced according to docs/SECURITY.md Section 5 and docs/AUTH_AND_DOWNLOAD.md:
 * - 10 download requests per authenticated user per 10 minutes.
 * - 30 download requests per IP per 10 minutes as a backstop.
 * - Central limiter outage MUST fail closed with a safe retryable response on link issuance.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getEnv } from "@/lib/env";
import { SECURITY_CONFIG } from "@/lib/security/contracts";

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp in milliseconds
  failedClosed?: boolean;
}

// Singleton instances
let redisInstance: Redis | null = null;
let userLimiterInstance: Ratelimit | null = null;
let ipLimiterInstance: Ratelimit | null = null;

function getLimiterInstances() {
  const env = getEnv();

  if (!env.upstashRedisRestUrl || !env.upstashRedisRestToken) {
    return { redis: null, userLimiter: null, ipLimiter: null };
  }

  if (!redisInstance) {
    redisInstance = new Redis({
      url: env.upstashRedisRestUrl,
      token: env.upstashRedisRestToken,
    });

    userLimiterInstance = new Ratelimit({
      redis: redisInstance,
      limiter: Ratelimit.slidingWindow(
        SECURITY_CONFIG.RATE_LIMITS.USER_DOWNLOADS_PER_WINDOW,
        `${SECURITY_CONFIG.RATE_LIMITS.USER_WINDOW_SECONDS} s`
      ),
      analytics: false,
      prefix: "recall:ratelimit:user",
    });

    ipLimiterInstance = new Ratelimit({
      redis: redisInstance,
      limiter: Ratelimit.slidingWindow(
        SECURITY_CONFIG.RATE_LIMITS.IP_DOWNLOADS_PER_WINDOW,
        `${SECURITY_CONFIG.RATE_LIMITS.IP_WINDOW_SECONDS} s`
      ),
      analytics: false,
      prefix: "recall:ratelimit:ip",
    });
  }

  return {
    redis: redisInstance,
    userLimiter: userLimiterInstance,
    ipLimiter: ipLimiterInstance,
  };
}

/**
 * Checks both User ID and Client IP against the rate limiter.
 * In accordance with docs/SECURITY.md:
 * "Protected download URL issuance should fail closed with a safe retryable 503 if the central limiter is unavailable."
 */
export async function checkDownloadRateLimit(
  userId: string,
  clientIp: string
): Promise<RateLimitResult> {
  const { userLimiter, ipLimiter } = getLimiterInstances();

  // If Upstash credentials are not configured, in local dev we allow or fail closed
  // In production, failure to connect triggers fail-closed.
  if (!userLimiter || !ipLimiter) {
    // In dev without Upstash credentials configured, allow request with mock values
    // to permit testing if explicitly unconfigured
    if (process.env.NODE_ENV !== "production") {
      return {
        success: true,
        limit: SECURITY_CONFIG.RATE_LIMITS.USER_DOWNLOADS_PER_WINDOW,
        remaining: SECURITY_CONFIG.RATE_LIMITS.USER_DOWNLOADS_PER_WINDOW,
        reset: Date.now() + 600000,
      };
    }

    // Fail closed in production if rate limiter is missing
    return {
      success: false,
      limit: 0,
      remaining: 0,
      reset: Date.now() + 60000,
      failedClosed: true,
    };
  }

  try {
    // Check both user and IP in parallel
    const [userRes, ipRes] = await Promise.all([
      userLimiter.limit(userId),
      ipLimiter.limit(clientIp),
    ]);

    if (!userRes.success) {
      return {
        success: false,
        limit: userRes.limit,
        remaining: userRes.remaining,
        reset: userRes.reset,
      };
    }

    if (!ipRes.success) {
      return {
        success: false,
        limit: ipRes.limit,
        remaining: ipRes.remaining,
        reset: ipRes.reset,
      };
    }

    return {
      success: true,
      limit: Math.min(userRes.limit, ipRes.limit),
      remaining: Math.min(userRes.remaining, ipRes.remaining),
      reset: Math.max(userRes.reset, ipRes.reset),
    };
  } catch (error) {
    console.error("[RateLimit] Error connecting to Upstash Redis:", error);
    // FAIL CLOSED on network error/limiter outage as required by SECURITY.md
    return {
      success: false,
      limit: 0,
      remaining: 0,
      reset: Date.now() + 60000,
      failedClosed: true,
    };
  }
}
