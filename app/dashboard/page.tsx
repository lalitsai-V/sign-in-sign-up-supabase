'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/supabase/types';

interface DummyJSONProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
}

interface ProductCategory {
  name: string;
  keywords: string[];
  products: Product[];
}

const PRODUCT_CATEGORIES: { name: string; keywords: string[] }[] = [
  { name: 'Mouse', keywords: ['mouse', 'wireless mouse', 'gaming mouse'] },
  { name: 'Keyboard', keywords: ['keyboard', 'mechanical keyboard', 'wireless keyboard'] },
  { name: 'Monitor', keywords: ['monitor', 'display', 'screen', '4k monitor'] },
  { name: 'Headphones', keywords: ['headphone', 'earphone', 'headset', 'audio'] },
  { name: 'Speaker', keywords: ['speaker', 'bluetooth speaker', 'sound'] },
  { name: 'Laptop', keywords: ['laptop', 'notebook', 'computer', 'macbook'] },
  { name: 'Webcam', keywords: ['webcam', 'camera', 'hd camera'] },
  { name: 'USB Cable', keywords: ['usb', 'cable', 'charger', 'charging'] },
  { name: 'RAM', keywords: ['ram', 'memory', 'ddr'] },
  { name: 'Storage', keywords: ['ssd', 'hard disk', 'storage', 'hdd', 'disk'] },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categorizedProducts, setCategorizedProducts] = useState<ProductCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Product[]>([]);
  const [cartNotification, setCartNotification] = useState<string | null>(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push('/auth/sign-in');
          return;
        }

        setUser(user);
      } catch (err) {
        console.error('Error fetching user:', err);
        router.push('/auth/sign-in');
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsError(null);
        // Fetch electronics/computer accessories from Fake Store API
        const response = await fetch(
          'https://fakestoreapi.com/products/category/electronics',
          { 
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }

        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format from API');
        }
        
        // Transform API response
        const transformedProducts: Product[] = data.map(
          (product: any) => ({
            id: product.id.toString(),
            name: product.title,
            price: product.price,
            description: product.description,
            image_url: product.image,
          })
        );

        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);
        
        // Categorize products
        const categorized: ProductCategory[] = PRODUCT_CATEGORIES.map((category) => ({
          ...category,
          products: transformedProducts.filter((product) => {
            const titleLower = product.name.toLowerCase();
            const descLower = product.description.toLowerCase();
            return category.keywords.some(
              (keyword) => titleLower.includes(keyword) || descLower.includes(keyword)
            );
          }),
        })).filter((cat) => cat.products.length > 0);
        
        console.log('Categorized products:', categorized);
        setCategorizedProducts(categorized);
      } catch (err) {
        console.error('Error fetching products:', err);
        setProductsError(
          err instanceof Error ? err.message : 'Failed to load products'
        );
      }
    };

    // Fetch products immediately when component mounts
    fetchProducts();
  }, []);

  // Filter products based on search query and update categories
  useEffect(() => {
    let filtered = products;
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredProducts(filtered);
    
    // Categorize filtered products
    const categorized: ProductCategory[] = PRODUCT_CATEGORIES.map((category) => ({
      ...category,
      products: filtered.filter((product) => {
        const titleLower = product.name.toLowerCase();
        const descLower = product.description.toLowerCase();
        return category.keywords.some(
          (keyword) => titleLower.includes(keyword) || descLower.includes(keyword)
        );
      }),
    })).filter((cat) => cat.products.length > 0);
    
    setCategorizedProducts(categorized);
  }, [searchQuery, products]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: signOutError } = await supabase.auth.signOut();

      if (signOutError) {
        throw signOutError;
      }

      router.push('/');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      setError(message);
      setIsSigningOut(false);
    }
  };
  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    setCartNotification(`${product.name} added to cart!`);
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      setCartNotification(null);
    }, 3000);
  };

  const handleRemoveFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="h-12 w-12 animate-spin text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Loading"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Welcome, <span className="font-semibold">{user?.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowCartModal(!showCartModal)}
              className="bg-gray-600 hover:bg-blue-700 text-white px-2 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <span>🛒</span>
              <div className="text-right">
                <p className="text-xs font-semibold">Cart</p>
                <p className="text-lg font-bold">{cart.length}</p>
              </div>
            </button>
            <Button
              onClick={handleSignOut}
              disabled={isSigningOut}
              isLoading={isSigningOut}
              variant="danger"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Cart Notification */}
      {cartNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-40 animate-pulse">
          {cartNotification}
        </div>
      )}

      {/* Cart Sidebar Modal */}
      {showCartModal && (
        <>
          {/* Background Overlay */}
          <div 
            className="fixed inset-0  bg-opacity-0 z-40 transition-opacity duration-300"
            onClick={() => setShowCartModal(false)}
          ></div>
          
          {/* Sliding Cart Sidebar */}
          <div className="fixed top-0 right-0 h-screen w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h2>
              <button
                onClick={() => setShowCartModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-3xl font-light transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto">
              {cart.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cart.map((item, index) => (
                    <div key={index} className="p-4 flex justify-between items-start gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400 font-bold mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors flex-shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center flex flex-col items-center justify-center h-full">
                  <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg">🛒</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Add products to your cart to get started
                  </p>
                </div>
              )}
            </div>

            {/* Footer with Checkout */}
            {cart.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 space-y-3">
                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Total Items:
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {cart.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Total Price:
                    </span>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error && (
          <Alert type="error" title="Error" description={error} className="mb-8" />
        )}

        {/* Products Section */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Electronics
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Browse our collection of premium tech products
            </p>
            
            {/* Search Bar */}
            <div className="mb-8">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {productsError && (
            <Alert
              type="error"
              title="Error Loading Products"
              description={productsError}
              className="mb-8"
            />
          )}

          {/* Products by Category */}
          {categorizedProducts.length > 0 ? (
            <div className="space-y-12">
              {categorizedProducts.map((category) => (
                <div key={category.name}>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <div className="w-16 h-1 bg-blue-600 rounded"></div>
                  </div>
                  
                  {/* Category Products Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.products.map((product) => (
                      <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                    ))}  
                  </div>
                </div>
              ))}
              
              {/* Uncategorized Products */}
              {(() => {
                const categorizedIds = new Set<string>();
                categorizedProducts.forEach(cat => {
                  cat.products.forEach(product => {
                    categorizedIds.add(product.id);
                  });
                });
                const uncategorized = filteredProducts.filter(p => !categorizedIds.has(p.id));
                
                if (uncategorized.length > 0) {
                  return (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          Other Products
                        </h3>
                        <div className="w-16 h-1 bg-blue-600 rounded"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {uncategorized.map((product) => (
                          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                        ))}
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery ? 'No products found matching your search' : 'Loading products...'}
              </p>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardBody className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Products</p>
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                {filteredProducts.length}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Categories</p>
              <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mt-2">
                {categorizedProducts.length}
              </p>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Last Login</p>
              <p className="text-sm text-gray-900 dark:text-white font-semibold mt-2">
                {user?.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleDateString()
                  : 'Just now'}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}
