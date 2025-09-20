import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Rating } from '../common/Rating';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  category?: string;
  colors?: string[];
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
  className?: string;
  onAddToCart?: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating = 0,
  reviewCount = 0,
  category,
  colors = [],
  isNew = false,
  isOnSale = false,
  discount,
  className = '',
  onAddToCart,
}: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart) {
      onAddToCart(id);
    }
  };

  return (
    <Link href={`/products/${id}`} className={cn('group block', className)}>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="h-full w-full object-cover object-center transition-opacity group-hover:opacity-75"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {isNew && <Badge variant="secondary">New</Badge>}
          {isOnSale && <Badge variant="destructive">Sale</Badge>}
          {discount && <Badge variant="destructive">{discount}% OFF</Badge>}
        </div>
      </div>
      
      <div className="mt-4">
        {category && (
          <p className="text-sm text-gray-500 mb-1">{category}</p>
        )}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">
          {name}
        </h3>
        
        <div className="mt-1">
          <div className="flex items-center">
            <Rating value={rating} size="sm" showText={false} />
            {reviewCount > 0 && (
              <span className="ml-1 text-xs text-gray-500">
                ({reviewCount})
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-2">
          <div className="flex items-center">
            <p className="text-sm font-medium text-gray-900">
              ${price.toFixed(2)}
            </p>
            {originalPrice && originalPrice > price && (
              <p className="ml-2 text-xs text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>
        
        {colors.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 mb-1">Colors:</p>
            <div className="flex space-x-1">
              {colors.slice(0, 4).map((color, index) => (
                <span
                  key={index}
                  className="h-4 w-4 rounded-full border border-gray-200"
                  style={{ backgroundColor: color }}
                  aria-label={`Color ${color}`}
                />
              ))}
              {colors.length > 4 && (
                <span className="text-xs text-gray-500">+{colors.length - 4}</span>
              )}
            </div>
          </div>
        )}
        
        <Button
          variant="outline"
          size="sm"
          className="mt-3 w-full"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </div>
    </Link>
  );
}
