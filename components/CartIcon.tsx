'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../providers/CartProvider';

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <div className="relative">
      <Link 
        href="/cart" 
        className="flex items-center justify-center p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
        aria-label={`Shopping cart with ${cartCount || 0} items`}
      >
        <ShoppingCart className="h-6 w-6" />
        {(cartCount || 0) > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount && cartCount > 9 ? '9+' : cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}
