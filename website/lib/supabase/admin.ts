/**
 * Server-only Admin Supabase client.
 * Uses SUPABASE_SECRET_KEY to generate short-lived signed download URLs
 * from the private storage bucket.
 * 
 * NEVER expose this client or SUPABASE_SECRET_KEY to browser bundles.
 * Follows docs/SECURITY.md and docs/AUTH_AND_DOWNLOAD.md.
 */

import { createClient } from "@supabase/supabase-js";
import { getEnv } from "@/lib/env";

export function createAdminSupabaseClient() {
  const env = getEnv();

  if (!env.supabaseUrl || !env.supabaseSecretKey) {
    return null;
  }

  return createClient(env.supabaseUrl, env.supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
