import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showCount?: boolean;
}

export function Rating({
  value,
  count,
  size = 'md',
  className = '',
  showCount = true,
}: RatingProps) {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <StarIconSolid
            key={`full-${i}`}
            className={`${sizes[size]} text-yellow-400`}
            aria-hidden="true"
          />
        ))}
        
        {hasHalfStar && (
          <div className="relative">
            <StarIconOutline
              className={`${sizes[size]} text-yellow-400`}
              aria-hidden="true"
            />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <StarIconSolid
                className={`${sizes[size]} text-yellow-400`}
                aria-hidden="true"
              />
            </div>
          </div>
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <StarIconOutline
            key={`empty-${i}`}
            className={`${sizes[size]} text-gray-300`}
            aria-hidden="true"
          />
        ))}
      </div>
      
      {showCount && count !== undefined && (
        <span className={`ml-1 ${textSizes[size]} text-gray-600`}>
          ({count})
        </span>
      )}
    </div>
  );
}
