'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { CartProvider as ShoppingCartProvider, useShoppingCart } from 'use-shopping-cart';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '').then(stripe => stripe || null);

interface CartContextType {
  cartCount: number | undefined;
  cartDetails: Record<string, any> | undefined;
  totalPrice: number | undefined;
  formattedTotalPrice: string | undefined;
  redirectToCheckout: (sessionId?: string) => Promise<void>;
  addItem: (item: any) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  setItemQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <ShoppingCartProvider
      mode="payment"
      cartMode="client-only"
      stripe={stripePromise as any} // Type assertion needed due to type mismatch in the library
      successUrl={`${window.location.origin}/success`}
      cancelUrl={`${window.location.origin}/cart`}
      currency="USD"
      allowedCountries={['US', 'CA', 'GB']}
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      <CartContextProvider>{children}</CartContextProvider>
    </ShoppingCartProvider>
  );
}

function CartContextProvider({ children }: { children: ReactNode }) {
  const shoppingCart = useShoppingCart();
  
  const value = {
    cartCount: shoppingCart.cartCount,
    cartDetails: shoppingCart.cartDetails,
    totalPrice: shoppingCart.totalPrice,
    formattedTotalPrice: shoppingCart.formattedTotalPrice,
    redirectToCheckout: shoppingCart.redirectToCheckout,
    addItem: shoppingCart.addItem,
    removeItem: shoppingCart.removeItem,
    clearCart: shoppingCart.clearCart,
    incrementItem: shoppingCart.incrementItem,
    decrementItem: shoppingCart.decrementItem,
    setItemQuantity: shoppingCart.setItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price / 100);
}

export default CartProvider;
