import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

/**
 * Server client for Server Components, Route Handlers, and Server Actions.
 * Cookie read/write support enables Supabase SSR auth token refresh.
 */
export async function createClient() {
  const cookieStore = await cookies();

  type CookieSetPayload = {
    name: string;
    value: string;
    options?: Parameters<typeof cookieStore.set>[2];
  };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieSetPayload[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}
