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
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      `Supabase env vars missing — NEXT_PUBLIC_SUPABASE_URL=${
        url ? 'OK' : 'MISSING'
      } NEXT_PUBLIC_SUPABASE_ANON_KEY=${
        anonKey ? 'OK' : 'MISSING'
      }. Check .env.local (dev) and Vercel project env vars (build).`,
    );
  }
  cached = createClient<Database>(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
