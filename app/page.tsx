'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';

export default function Home() {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Image 
              src="/TechHub make logo image.jpg" 
              alt="TechHub Logo"
              width={190}
              height={70}
              className="rounded-lg object-cover"
            />
          </button>
          <div className="flex gap-4">
            <Link href="/auth/sign-in">
              <Button variant="secondary">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-blue-600 dark:text-blue-400">TechHub</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">
            Your one-stop destination for premium tech products and accessories. From wireless audio equipment to smart wearables, portable stands, professional webcams, and ergonomic peripherals — we have everything you need to enhance your digital lifestyle.
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-500 mb-8 max-w-3xl mx-auto">
            Discover our curated collection of high-quality tech products at competitive prices. Sign in to browse our exclusive catalog and secure your items today.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg">Create Account</Button>
            </Link>
            <Link href="/auth/sign-in">
              <Button variant="secondary" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: '�',
              title: 'Premium Quality',
              description: 'Carefully selected tech products from trusted brands',
            },
            {
              icon: '🚚',
              title: 'Fast Shipping',
              description: 'Quick and reliable delivery to your doorstep',
            },
            {
              icon: '🛡️',
              title: 'Secure Checkout',
              description: 'Safe and encrypted payment processing',
            },
          ].map((feature, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardBody className="text-center py-8">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Product Preview */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Our Product Categories
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            TechHub specializes in premium tech accessories including wireless headphones, charging cables, smart watches, phone stands, webcams, and ergonomic mice — everything you need for a connected digital life.
          </p>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg p-12 text-center border border-blue-200 dark:border-gray-600">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Sign in to explore our complete catalog of carefully curated tech products.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/auth/sign-in">
                <Button>Sign In to Shop</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button variant="secondary">Create Account</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; 2026 TechHub. Your trusted source for premium tech products.
          </p>
        </div>
      </footer>
    </main>
  );
}
