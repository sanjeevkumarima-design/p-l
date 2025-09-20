import { cn } from '@/lib/utils';

interface ColorSwatchProps {
  color: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
}

export function ColorSwatch({
  color,
  isActive = false,
  onClick,
  className = '',
  size = 'md',
  showTooltip = false,
  tooltipPosition = 'top',
  disabled = false,
}: ColorSwatchProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const tooltipPositions = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick && !disabled) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick && !disabled) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        className={cn(
          'relative inline-flex items-center justify-center rounded-full border-2 border-transparent transition-all',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
          isActive ? 'ring-2 ring-offset-2 ring-primary-500' : 'hover:ring-2 hover:ring-gray-300',
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          sizes[size],
          className
        )}
        style={{ backgroundColor: color }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={`Color ${color}`}
        aria-pressed={isActive}
        tabIndex={disabled ? -1 : 0}
      >
        {isActive && (
          <svg
            className="h-3/5 w-3/5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      {showTooltip && (
        <div
          className={cn(
            'absolute z-10 hidden whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white group-hover:block',
            tooltipPositions[tooltipPosition]
          )}
          role="tooltip"
        >
          {color}
        </div>
      )}
    </div>
  );
}

interface ColorSwatchGroupProps {
  colors: string[];
  selectedColors: string[];
  onChange: (colors: string[]) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  maxVisible?: number;
}

export function ColorSwatchGroup({
  colors,
  selectedColors = [],
  onChange,
  className = '',
  size = 'md',
  maxVisible = 5,
}: ColorSwatchGroupProps) {
  const visibleColors = colors.slice(0, maxVisible);
  const hasMore = colors.length > maxVisible;

  const handleColorToggle = (color: string) => {
    const newSelectedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    onChange(newSelectedColors);
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {visibleColors.map((color) => (
        <ColorSwatch
          key={color}
          color={color}
          isActive={selectedColors.includes(color)}
          onClick={() => handleColorToggle(color)}
          size={size}
          showTooltip
        />
      ))}
      {hasMore && (
        <span className="flex items-center text-xs text-gray-500">
          +{colors.length - maxVisible} more
        </span>
      )}
    </div>
  );
}
