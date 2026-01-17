import { Product } from '@/lib/supabase/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    description: 'High-quality sound with noise cancellation and 30-hour battery life.',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Ultra Fast USB-C Cable',
    price: 24.99,
    description: 'Durable charging cable with 100W power delivery and 6.6ft length.',
    image_url: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Smart Watch Pro',
    price: 349.99,
    description: 'Advanced fitness tracking, heart rate monitor, and 7-day battery life.',
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Portable Phone Stand',
    price: 19.99,
    description: 'Adjustable aluminum stand compatible with all smartphones and tablets.',
    image_url: 'https://images.unsplash.com/photo-1586253408c3-8cab7679965b?w=400&h=300&fit=crop',
  },
  {
    id: '5',
    name: '4K Webcam',
    price: 149.99,
    description: 'Professional-grade webcam with auto-focus and built-in microphone.',
    image_url: 'https://images.unsplash.com/photo-1598533106173-a6b812b87b86?w=400&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'Wireless Mouse',
    price: 49.99,
    description: 'Ergonomic design with precision tracking and 18-month battery life.',
    image_url: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop',
  },
];
