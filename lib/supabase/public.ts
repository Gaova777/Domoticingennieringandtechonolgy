import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

/**
 * Anonymous read-only client that bypasses the cookie/session machinery.
 * Safe to use in server components AND at build time (generateStaticParams).
 * RLS still applies — only public-readable rows come back.
 */
let cached: ReturnType<typeof createClient<Database>> | undefined;

export function supabasePublic() {
  if (cached) return cached;
  cached = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return cached;
}
