export type { Session, User } from '@supabase/supabase-js';

export interface SignUpCredentials {
  email: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthError {
  message: string;
  status?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
}
