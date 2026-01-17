import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, 'Supabase anonymous key is required'),
});

type Env = z.infer<typeof envSchema>;

let env: Env;

try {
  env = envSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Environment validation failed:', error.flatten());
    throw new Error('Invalid environment variables');
  }
  throw error;
}

export const config = env;
