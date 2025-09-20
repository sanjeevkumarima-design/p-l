import Image from 'next/image';
import { Button } from '../common/Button';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
  maxQuantity?: number;
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
  className?: string;
}

export function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  color,
  size,
  maxQuantity = 10,
  onRemove,
  onQuantityChange,
  className = '',
}: CartItemProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      onQuantityChange(id, quantity + 1);
    }
  };

  const subtotal = price * quantity;

  return (
    <div className={cn('flex py-6', className)}>
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={image}
          alt={name}
          width={96}
          height={96}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <a href={`/products/${id}`} className="hover:text-primary-600">
                {name}
              </a>
            </h3>
            <p className="ml-4">${price.toFixed(2)}</p>
          </div>
          {(color || size) && (
            <div className="mt-1 text-sm text-gray-500">
              {color && <span>Color: {color}</span>}
              {size && <span className={cn(color ? 'ml-2' : '')}>Size: {size}</span>}
            </div>
          )}
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center">
            <span className="mr-2 text-gray-500">Qty:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={quantity <= 1}
                className={cn(
                  'px-2 py-1 text-gray-600 hover:bg-gray-100',
                  quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                )}
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                type="button"
                onClick={handleIncrease}
                disabled={quantity >= maxQuantity}
                className={cn(
                  'px-2 py-1 text-gray-600 hover:bg-gray-100',
                  quantity >= maxQuantity ? 'opacity-50 cursor-not-allowed' : ''
                )}
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={() => onRemove(id)}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
