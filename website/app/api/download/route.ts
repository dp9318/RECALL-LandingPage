/**
 * Protected official download route.
 * Follows docs/ARCHITECTURE.md, docs/AUTH_AND_DOWNLOAD.md, and docs/SECURITY.md.
 *
 * NOTE: Full server authorization, Upstash rate limiting, and private Storage
 * signed URL generation are owned by Shiva (feature/landing-page-auth-security).
 * This endpoint strictly enforces authentication and refuses unauthenticated
 * or unconfigured access without faking download links.
 */

import { NextResponse } from "next/server";
import { getActiveRelease } from "@/lib/releases";
import { SECURITY_CONFIG } from "@/lib/security/contracts";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET() {
  const headers = {
    "Cache-Control": SECURITY_CONFIG.CACHE_CONTROL_PROTECTED,
    "Content-Type": "application/json",
  };

  const supabase = await createServerSupabaseClient();
  const release = getActiveRelease();

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

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      {
        error: "unauthorized",
        message: "Authentication required to access the official release binary.",
        loginUrl: "/login?returnTo=/download",
      },
      { status: 401, headers }
    );
  }

  // Once Shiva connects private Supabase Storage and rate limiting in Phase 4:
  // 1. Verify Upstash rate limit for user.id and trusted client IP.
  // 2. Call supabase.storage.from(release.storageBucket).createSignedUrl(release.objectPath, 120).
  // 3. Return 302/307 redirect to the signed URL or return { signedUrl }.
  return NextResponse.json(
    {
      status: "pending_storage_integration",
      message:
        "Authenticated session detected. Private release storage handoff is pending backend provider setup.",
      release: {
        version: release.version,
        filename: release.downloadFilename,
      },
    },
    { status: 200, headers }
  );
}
