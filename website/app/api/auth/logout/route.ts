/**
 * Sign out / logout API route.
 * Clears the server-side Supabase cookie session and redirects safely.
 */

import { type NextRequest, NextResponse } from "next/server";
import { validateReturnPath } from "@/lib/security/redirect";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  const referer = request.headers.get("referer");
  let returnPath = "/";
  if (referer) {
    try {
      const url = new URL(referer);
      returnPath = validateReturnPath(url.pathname, "/");
    } catch {
      returnPath = "/";
    }
  }

  return NextResponse.redirect(new URL(returnPath, request.url), {
    status: 303,
  });
}
