import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { config } from '@/env';

export function createClient() {
  return createBrowserClient(
    config.NEXT_PUBLIC_SUPABASE_URL,
    config.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
