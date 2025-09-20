'use client';

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { Product, CartItem } from '../types';

interface UseCartReturn {
  items: CartItem[];
  totalItems: number;
  cartTotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  getCartItem: (productId: string) => CartItem | undefined;
}

const CART_STORAGE_KEY = 'stylehub_cart';

const getStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse cart from localStorage', error);
    return [];
  }
};

const saveCartToStorage = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to localStorage', error);
  }
};

export const useCart = (): UseCartReturn => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setItems(getStoredCart());
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveCartToStorage(items);
    }
  }, [items, isInitialized]);

  const totalItems = useCallback(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const totalPrice = useCallback(
    () => items.reduce((total, item) => total + (item.price * item.quantity), 0),
    [items]
  );

  const formattedTotalPrice = useCallback(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(totalPrice());
  }, [totalPrice]);

  const getCartTotal = useCallback(() => totalPrice(), [totalPrice]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
        };
        return updatedItems;
      } else {
        return [
          ...prevItems,
          {
            ...product,
            quantity,
            addedAt: Date.now(),
          } as CartItem,
        ];
      }
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback((productId: string): boolean => {
    return items.some(item => item.id === productId);
  }, [items]);

  const getItemQuantity = useCallback((productId: string): number => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [items]);

  const getCartItem = useCallback((productId: string): CartItem | undefined => {
    return items.find(item => item.id === productId);
  }, [items]);

  return {
    items,
    totalItems: totalItems(),
    cartTotal: getCartTotal(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    getCartItem,
  };
};

const CartContext = createContext<UseCartReturn | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export const useCartContext = (): UseCartReturn => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
