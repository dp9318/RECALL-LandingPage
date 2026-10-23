/**
 * Protected official download route.
 * Follows docs/ARCHITECTURE.md, docs/AUTH_AND_DOWNLOAD.md, and docs/SECURITY.md.
 * 
 * Flow:
 * 1. Verify server environment configuration.
 * 2. Authenticate session via server-side Supabase client (getUser).
 * 3. Enforce dual rate limits (User ID + Client IP) via Upstash with fail-closed behavior.
 * 4. Resolve fixed server-side release metadata (Bucket + ObjectPath).
 * 5. Issue short-lived 120-second signed URL via Admin Storage client.
 * 6. Safely redirect (307) or return signed URL with strict private no-store headers.
 */

import { type NextRequest, NextResponse } from "next/server";
import { getActiveRelease } from "@/lib/releases";
import { SECURITY_CONFIG } from "@/lib/security/contracts";
import { getClientIp } from "@/lib/security/ip";
import { checkDownloadRateLimit } from "@/lib/ratelimit";
import { createServerSupabaseClient, getAuthenticatedUser } from "@/lib/supabase/server";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const headers = new Headers({
    "Cache-Control": SECURITY_CONFIG.CACHE_CONTROL_PROTECTED,
  });

  const release = getActiveRelease();
  const supabase = await createServerSupabaseClient();

  // 1. Check if public client is configured
  if (!supabase) {
    return NextResponse.json(
      {
        error: "service_unconfigured",
        message:
          "Authentication and download service is not yet configured. Please verify environment settings.",
        version: release.version,
      },
      { status: 503, headers }
    );
  }

  // 2. Server-side session verification
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json(
      {
        error: "unauthorized",
        message: "Authentication required to access the official release binary.",
        loginUrl: "/login?returnTo=/download",
      },
      { status: 401, headers }
    );
  }

  // 3. Rate limiting check (User ID & Client IP)
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = await checkDownloadRateLimit(user.id, clientIp);

  if (!rateLimitResult.success) {
    // If rate limiter failed closed (outage or Redis error)
    if (rateLimitResult.failedClosed) {
      headers.set("Retry-After", "60");
      return NextResponse.json(
        {
          error: "rate_limiter_unavailable",
          message: "Rate limiting verification service is temporarily unavailable. Please retry shortly.",
        },
        { status: 503, headers }
      );
    }

    // Standard rate limit exceeded (HTTP 429)
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
    );
    headers.set("Retry-After", String(retryAfterSeconds));

    return NextResponse.json(
      {
        error: "rate_limit_exceeded",
        message: `Too many download attempts. Please wait ${retryAfterSeconds} seconds before requesting a new link.`,
        retryAfter: retryAfterSeconds,
      },
      { status: 429, headers }
    );
  }

  // 4. Generate signed URL from private Storage using admin client
  const adminClient = createAdminSupabaseClient();
  if (!adminClient) {
    // If admin key is missing in production, storage handoff cannot complete securely
    return NextResponse.json(
      {
        error: "storage_unconfigured",
        message: "Secure release storage backend is not yet fully configured.",
        release: {
          version: release.version,
          filename: release.downloadFilename,
        },
      },
      { status: 503, headers }
    );
  }

  try {
    const { data, error: storageError } = await adminClient.storage
      .from(release.storageBucket)
      .createSignedUrl(
        release.objectPath,
        SECURITY_CONFIG.SIGNED_URL_EXPIRY_SECONDS,
        {
          download: release.downloadFilename,
        }
      );

    if (storageError || !data?.signedUrl) {
      console.error("[Download] Storage signed URL error:", storageError?.message);
      return NextResponse.json(
        {
          error: "release_unavailable",
          message: "The requested release package is currently unavailable. Please verify release status.",
        },
        { status: 404, headers }
      );
    }

    // 5. Check if request prefers JSON (e.g. from fetch) or direct navigation
    const acceptHeader = request.headers.get("accept") || "";
    if (acceptHeader.includes("application/json")) {
      return NextResponse.json(
        {
          version: release.version,
          filename: release.downloadFilename,
          signedUrl: data.signedUrl,
          expiresIn: SECURITY_CONFIG.SIGNED_URL_EXPIRY_SECONDS,
        },
        { status: 200, headers }
      );
    }

    // Direct browser navigation: redirect to the signed URL
    return NextResponse.redirect(data.signedUrl, {
      status: 307,
      headers,
    });
  } catch (err) {
    console.error("[Download] Unexpected server error during download issuance:", err);
    return NextResponse.json(
      {
        error: "internal_error",
        message: "An error occurred while generating the secure download URL.",
      },
      { status: 500, headers }
    );
  }
}
