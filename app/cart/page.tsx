'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../providers/CartProvider';

export default function CartPage() {
  const { 
    cartCount,
        cartDetails,
       totalPrice,
    removeItem,
      setItemQuantity,
    clearCart
      } = useCart();

  const items = Object.values(cartDetails || {});

  if (cartCount === 0) {
    return (
         <div className="min-h-screen pt-32 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-4 text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-gray-500">Looks like you haven't added anything to your cart yet.</p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                Continue Shopping
              </Link>
                </div>
          </div>
            </div>
      </div>
    );
  }

  return (
            <div className="min-h-screen pt-32 pb-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Your Items</h2>
          </div>
          
              <div className="border-t border-gray-200">
            {items.map((item) => (
               <div key={item.id} className="px-4 py-5 sm:px-6 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-base font-medium text-gray-900">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                    <div className="mt-2 flex items-center">
                      <button
                        type="button"
                        onClick={() => setItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <span className="sr-only">Decrease quantity</span>
                        <span className="text-xl">-</span>
                      </button>
                      <span className="mx-2 text-gray-700">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setItemQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <span className="sr-only">Increase quantity</span>
                        <span className="text-xl">+</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-base font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="mt-6 flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
                 <p>${((totalPrice ?? 0) / 100).toFixed(2)}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  // Handle checkout
                  alert('Proceeding to checkout!');
                }}
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Checkout
                </button>
            </div>
            <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
              <p>
                   or{' '}
                <Link
                  href="/shop"
                  className="text-primary-600 font-medium hover:text-primary-500"
                >
                  Continue Shopping<span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
               </div>
            </div>
                 </div>
      </div>
    </div>
  );
}
