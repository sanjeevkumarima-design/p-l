import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  showText = true,
  className = '',
}: RatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        {[...Array(max)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = value >= starValue;
          const isHalfFilled = value >= starValue - 0.5 && value < starValue;

          return (
            <span key={index} className="relative">
              <StarIconOutline
                className={`${sizeClasses[size]} ${
                  isFilled || isHalfFilled ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
              {(isFilled || isHalfFilled) && (
                <span
                  className={`absolute left-0 top-0 overflow-hidden ${
                    isHalfFilled ? 'w-1/2' : 'w-full'
                  }`}
                >
                  <StarIconSolid
                    className={`${sizeClasses[size]} text-yellow-400`}
                  />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showText && (
        <span className={`ml-1 text-gray-600 ${textSizes[size]}`}>
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
