import { Button } from '../common/Button';

interface CartSummaryProps {
  subtotal: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  onCheckout?: () => void;
  checkoutDisabled?: boolean;
  className?: string;
}

export function CartSummary({
  subtotal,
  tax = 0,
  shipping = 0,
  discount = 0,
  onCheckout,
  checkoutDisabled = false,
  className = '',
}: CartSummaryProps) {
  const total = subtotal + tax + shipping - discount;

  return (
    <section aria-labelledby="summary-heading" className={className}>
      <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8">
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
          Order Summary
        </h2>

        <dl className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-600">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
          </div>

          {shipping > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</dd>
            </div>
          )}

          {tax > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">
                <span>Tax estimate</span>
              </dt>
              <dd className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</dd>
            </div>
          )}

          {discount > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="flex text-sm text-gray-600">
                <span>Discount</span>
              </dt>
              <dd className="text-sm font-medium text-red-600">-${discount.toFixed(2)}</dd>
            </div>
          )}

          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt className="text-base font-medium text-gray-900">Order total</dt>
            <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
          </div>
        </dl>

        <div className="mt-6">
          <Button
            onClick={onCheckout}
            disabled={checkoutDisabled}
            fullWidth
            className={checkoutDisabled ? 'opacity-70 cursor-not-allowed' : ''}
          >
            {checkoutDisabled ? 'Your cart is empty' : 'Checkout'}
          </Button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-500">
            or{' '}
            <a href="/products" className="font-medium text-primary-600 hover:text-primary-500">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
