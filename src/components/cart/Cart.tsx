import { useState } from 'react';
import { Button } from '../common/Button';
import { CartItem, CartItem as CartItemType } from './CartItem';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';
import { useRouter } from 'next/navigation';

interface CartProps {
  items?: CartItemType[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onClearCart?: () => void;
  className?: string;
}

export function Cart({
  items = [],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onClearCart = () => {},
  className = '',
}: CartProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Here you would typically integrate with your checkout flow
      // For example, create a checkout session with your payment processor
      console.log('Initiating checkout with items:', items);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to checkout page
      router.push('/checkout');
    } catch (error) {
      console.error('Checkout error:', error);
      // Handle error (show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    onUpdateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    onRemoveItem(id);
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className={cn('bg-white', className)}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Shopping Cart
        </h1>

        <div className="mt-8 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <div className="flex items-center justify-between">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <p className="text-sm font-medium text-gray-700">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  if (confirm('Are you sure you want to clear your cart?')) {
                    onClearCart();
                  }
                }}
                className="text-red-600 hover:text-red-700"
              >
                Clear cart
              </Button>
            </div>

            <ul
              role="list"
              className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {items.map((item) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <CartItem
                    {...item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                </li>
              ))}
            </ul>
          </section>

          {/* Order summary */}
          <CartSummary
            subtotal={subtotal}
            tax={subtotal * 0.1} // 10% tax for example
            shipping={subtotal > 0 ? 5.99 : 0} // Free shipping over $100
            className="mt-16 lg:col-span-5 lg:mt-0"
            onCheckout={handleCheckout}
            checkoutDisabled={items.length === 0 || isLoading}
          />
        </div>
      </div>
    </div>
  );
}

// Utility function to handle class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
