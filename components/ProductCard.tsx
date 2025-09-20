'use client';
import Image from 'next/image';
import { useState, useMemo, useCallback } from 'react';
import type { Product } from '../app/data/products';
import { formatPrice } from '../src/lib/utils';
import { useCart } from '../providers/CartProvider';

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg 
    className={`h-4 w-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 20 20" 
    fill="currentColor"
    aria-hidden="true"
    role="img"
    aria-label={filled ? 'Filled star' : 'Empty star'}
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const STARS = [1, 2, 3, 4, 5];

interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ 
  product, 
  className = '',
  onAddToCart 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem, cartDetails } = useCart();
  
  const rating = useMemo(() => Math.round((product.rating || 0) * 2) / 2, [product.rating]);
  
  const imageSrc = useMemo(() => {
    if (imageError || !product.image) {
      return '/product-placeholder.svg';
    }
    return product.image;
  }, [product.image, imageError]);
  
  const cartItemQuantity = useMemo(() => {
    return cartDetails?.[product.id]?.quantity || 0;
  }, [cartDetails, product.id]);
  
  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) return;
    
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addItem({
        name: product.name,
        id: product.id,
        price: product.price * 100,
        currency: 'USD',
        image: product.image,
        description: product.description || ''
      });
    }
    
    const button = e.currentTarget;
    button.classList.add('animate-ping');
    setTimeout(() => button.classList.remove('animate-ping'), 300);
  }, [product, onAddToCart, addItem]);
  
  const colorSwatches = useMemo(() => 
    product.colors?.slice(0, 3).map((color) => ({
      color,
         id: `${product.id}-${color}`,
      name: `Color ${color}`
    })),
    [product.colors, product.id]
  );
  
  const formattedPrice = useMemo(() => formatPrice(product.price), [product.price]);
    const formattedOriginalPrice = useMemo(
    () => product.originalPrice ? formatPrice(product.originalPrice) : null,
    [product.originalPrice]
  );

  return (
    <article 
      className={`group relative bg-white border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-card-hover flex flex-col h-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      itemScope
      itemType="https://schema.org/Product"
      aria-label={product.name}
    >
      <meta itemProp="name" content={product.name} />
      <meta itemProp="description" content={product.description || ''} />
      <meta itemProp="brand" content="StyleHub" />
      <meta itemProp="sku" content={product.id} />
      <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <meta itemProp="price" content={product.price.toString()} />
           <meta itemProp="priceCurrency" content="USD" />
        <meta itemProp="availability" content={product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'} />
      </div>
             <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 relative">
        <div className="relative w-full h-36 sm:h-40 md:h-44">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
                 className={`object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-90' : 'opacity-100'
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            priority={false}
            onError={() => setImageError(true)}
            loading="lazy"
            itemProp="image"
            />
          {product.discount && (
            <span 
                className="absolute top-2 right-2 bg-accent-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md"
              aria-label={`${product.discount}% discount`}
            >
              {product.discount}% OFF
            </span>
          )}
             <div 
            className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300`}
            aria-hidden="true"
          />
        </div>
      </div>
      
           <div className="p-2 sm:p-3 flex flex-col flex-1">
        <div className="flex-1">
          <h3 
            className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight min-h-[2.5rem] overflow-hidden"
            itemProp="name"
          >
            {product.name}
          </h3>
          
              <div className="mt-1 flex items-center" aria-label={`Rating: ${rating} out of 5`}>
            <div className="flex items-center" role="img" aria-label={`${rating} out of 5 stars`}>
              {STARS.map((i) => (
                <StarIcon 
                  key={i}
                  filled={i <= Math.floor(rating) || (i === Math.ceil(rating) && rating % 1 > 0)}
                />
              ))}
            </div>
                {product.reviewCount ? (
              <span className="ml-1 text-xs text-gray-500" aria-label={`${product.reviewCount} reviews`}>
                ({product.reviewCount})
              </span>
            ) : null}
          </div>
        </div>
        
                   <div className="mt-2">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <p className="text-sm font-semibold text-gray-900" itemProp="price">
                {formattedPrice}
              </p>
              {formattedOriginalPrice && (
                <p className="text-xs text-gray-500 line-through" aria-hidden="true">
                  {formattedOriginalPrice}
                </p>
              )}
            </div>
              
            {colorSwatches && colorSwatches.length > 0 && (
              <div className="flex -space-x-1" aria-label="Available colors">
                {colorSwatches.map(({ id, color, name }) => (
                  <div 
                    key={id}
                    className="w-3 h-3 rounded-full border border-gray-200 shadow-sm"
                    style={{ backgroundColor: color }}
                             title={name}
                    aria-label={name}
                  />
                ))}
                {product.colors && product.colors.length > 3 && (
                      <span className="text-xs text-gray-500 ml-1" aria-label={`${product.colors.length - 3} more colors`}>
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
                )}
          </div>
          
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full mt-2 flex items-center justify-center rounded-md border border-transparent px-3 py-2 text-xs sm:text-sm font-medium text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
              isHovered 
                   ? 'bg-primary-500 hover:bg-primary-600 shadow-lg' 
                : 'bg-gray-800 hover:bg-gray-900 shadow-md'
            } ${!product.inStock ? 'opacity-70 cursor-not-allowed' : ''}`}
            aria-label={product.inStock ? `Add ${product.name} to cart` : 'Out of stock'}
            disabled={!product.inStock}
            aria-disabled={!product.inStock}
            >
            {product.inStock 
              ? cartItemQuantity > 0 
                ? `Add another (${cartItemQuantity} in cart)`
                : 'Add to cart'
              : 'Out of stock'}
            </button>
          </div>
      </div>
    </article>
  )
}
