'use client';

import Image from 'next/image';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Product } from '@/lib/supabase/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-200">
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover"
          priority={false}
        />
      </div>
      <CardBody className="flex-grow flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
        <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toFixed(2)}
          </p>
          {onAddToCart && (
            <Button 
              onClick={() => onAddToCart(product)}
              size="sm"
              className="w-full"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
