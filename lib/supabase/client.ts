import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser client for client components.
 * Uses the public anon key and relies on secure cookies set by SSR helpers.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
