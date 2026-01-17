import { createServerClient, type CookieOptions } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { config } from '@/env';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    config.NEXT_PUBLIC_SUPABASE_URL,
    config.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            
          }
        },
      },
    }
  );
}
