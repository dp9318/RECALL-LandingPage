/**
 * OAuth Callback Handler.
 * Follows docs/AUTH_AND_DOWNLOAD.md and docs/SECURITY.md.
 */

import { type NextRequest, NextResponse } from "next/server";
import { validateReturnPath } from "@/lib/security/redirect";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const rawNext = requestUrl.searchParams.get("next") || requestUrl.searchParams.get("returnTo");
  const safeNext = validateReturnPath(rawNext, "/download");

  if (code) {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(new URL(safeNext, requestUrl.origin));
      }
      console.error("[AuthCallback] Exchange code error:", error.message);
    }
  }

  // If code exchange failed or supabase unconfigured, safely redirect back to login
  const errorRedirect = new URL("/login?error=auth_exchange_failed", requestUrl.origin);
  return NextResponse.redirect(errorRedirect);
}
