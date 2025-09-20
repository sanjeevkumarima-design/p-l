import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../common/Button';
import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroupProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onSelect: (id: string) => void;
  className?: string;
}

function FilterGroup({
  title,
  options,
  selected,
  onSelect,
  className = '',
}: FilterGroupProps) {
  return (
    <div className={cn('py-4 border-b border-gray-200', className)}>
      <h3 className="text-sm font-medium text-gray-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selected.includes(option.id)}
              onChange={() => onSelect(option.id)}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-3 text-sm text-gray-700">
              {option.label}
              {option.count !== undefined && (
                <span className="ml-1 text-xs text-gray-500">({option.count})</span>
              )}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

interface PriceRange {
  min: number;
  max: number;
}

interface FilterPanelProps {
  categories: FilterOption[];
  brands: FilterOption[];
  priceRanges: PriceRange[];
  selectedCategories: string[];
  selectedBrands: string[];
  selectedPriceRange: string | null;
  onCategorySelect: (id: string) => void;
  onBrandSelect: (id: string) => void;
  onPriceRangeSelect: (range: string) => void;
  onClearAll: () => void;
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

export function FilterPanel({
  categories,
  brands,
  priceRanges,
  selectedCategories,
  selectedBrands,
  selectedPriceRange,
  onCategorySelect,
  onBrandSelect,
  onPriceRangeSelect,
  onClearAll,
  className = '',
  isMobile = false,
  onClose,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  const priceRangeOptions = priceRanges.map((range, index) => ({
    id: `range-${index}`,
    label: `$${range.min} - $${range.max}`,
  }));

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    selectedPriceRange !== null;

  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-sm p-4 h-full overflow-y-auto',
        isMobile ? 'fixed inset-0 z-50' : 'sticky top-4',
        className
      )}
    >
      {isMobile && (
        <div className="flex items-center justify-between mb-4 pb-2 border-b">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        <FilterGroup
          title="Categories"
          options={categories}
          selected={selectedCategories}
          onSelect={onCategorySelect}
        />

        <FilterGroup
          title="Brands"
          options={brands}
          selected={selectedBrands}
          onSelect={onBrandSelect}
        />

        <div className="py-4 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
          <div className="space-y-2">
            {priceRangeOptions.map((range) => (
              <label key={range.id} className="flex items-center">
                <input
                  type="radio"
                  name="price-range"
                  checked={selectedPriceRange === range.id}
                  onChange={() => onPriceRangeSelect(range.id)}
                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="ml-3 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="mt-6">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onClose}
          >
            Show results
          </Button>
        </div>
      )}
    </div>
  );
}
