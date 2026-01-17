'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationError, setValidationError] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      
      if (!supabase) {
        throw new Error('Supabase client not initialized. Please check your environment variables.');
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        // Handle specific Supabase errors
        const message = signUpError.message.toLowerCase();
        if (message.includes('invalid') && message.includes('email')) {
          throw new Error('Please enter a valid email address (e.g., user@example.com)');
        }
        if (message.includes('already registered')) {
          throw new Error('This email is already registered. Try signing in instead.');
        }
        if (message.includes('password')) {
          throw new Error('Password must be at least 6 characters long');
        }
        throw new Error(signUpError.message || 'Sign up failed. Please try again.');
      }

      if (!data.user) {
        throw new Error('Account creation failed. Please try again.');
      }

      setSuccess(true);
      // Redirect to dashboard immediately
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (err) {
      console.error('Sign up error:', err);
      const message = err instanceof Error ? err.message : 'Failed to create account. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-30"
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      ></div>
      
      {/* Back Arrow Button */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-6 left-6 z-20 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Go back to home"
      >
        <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Content */}
      <div className="relative z-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Join us today</p>
        </CardHeader>

        <CardBody className="gap-6 flex flex-col">
          {error && (
            <Alert
              type="error"
              title="Sign Up Failed"
              description={error}
            />
          )}

          {success && (
            <Alert
              type="success"
              title="Account Created!"
              description="Redirecting to sign in page..."
            />
          )}

          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <Input
              id="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={validationError.email}
              disabled={isLoading}
              aria-label="Email address"
              required
            />

            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={validationError.password}
              helperText="Minimum 6 characters"
              disabled={isLoading}
              aria-label="Password"
              required
            />

            <Input
              id="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={validationError.confirmPassword}
              disabled={isLoading}
              aria-label="Confirm password"
              required
            />

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
              disabled={isLoading}
            >
              Create Account
            </Button>
          </form>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Already have an account?{' '}
              <Link
                href="/auth/sign-in"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
      </div>
    </main>
  );
}
