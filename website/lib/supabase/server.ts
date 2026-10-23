/**
 * Server Supabase client helpers.
 * Follows the Supabase SSR cookie pattern for Next.js App Router.
 * Managed by Shiva (feature/landing-page-auth-security).
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { User } from "@supabase/supabase-js";

/**
 * Creates a server Supabase client bound to the incoming request's cookies.
 */
export async function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  let cookieStore;
  try {
    cookieStore = await cookies();
  } catch {
    // If called outside an active request context (e.g. isolated test environments)
    cookieStore = null;
  }

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore ? cookieStore.getAll() : [];
      },
      setAll(cookiesToSet) {
        if (!cookieStore) return;
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if middleware is refreshing user sessions.
        }
      },
    },
  });
}

/**
 * Validates the session with the Supabase Auth server and returns the verified User object.
 * NEVER trust local cookie state alone (e.g. getSession) for critical access control.
 * Follows docs/SECURITY.md Section 3: "Never use getSession() alone as the authority".
 */
export async function getAuthenticatedUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return null;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}
