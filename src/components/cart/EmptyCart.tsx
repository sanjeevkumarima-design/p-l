import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Button } from '../common/Button';

export function EmptyCart({ className = '' }: { className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12', className)}>
      <div className="mx-auto max-w-md px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <ShoppingBagIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
          Your cart is empty
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Looks like you haven't added any items to your cart yet.
        </p>
        <div className="mt-6">
          <Link href="/products">
            <Button>
              <span className="ml-2">Continue Shopping</span>
              <span aria-hidden="true"> &rarr;</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Utility function to handle class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
