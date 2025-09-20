import { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { cn } from '../../lib/utils';

interface Category {
  id: string;
  name: string;
  count: number;
  items?: Array<{
    id: string;
    name: string;
    count: number;
  }>;
}

interface FilterSidebarProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  onSubcategoryToggle: (categoryId: string, subcategoryId: string) => void;
  className?: string;
}

export function FilterSidebar({
  categories,
  selectedCategories,
  onCategoryToggle,
  onSubcategoryToggle,
  className = '',
}: FilterSidebarProps) {
  // Refs for focus management
  const categoryRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const firstSubcategoryRefs = useRef<Record<string, HTMLInputElement | null>>({});
  
  // Auto-expand categories that have selected subcategories
  useEffect(() => {
    const newExpandedCategories = { ...expandedCategories };
    let shouldUpdate = false;
    
    categories.forEach(category => {
      if (category.items?.some(item => 
        selectedCategories.includes(`${category.id}-${item.id}`)
      )) {
        if (!newExpandedCategories[category.id]) {
          newExpandedCategories[category.id] = true;
          shouldUpdate = true;
        }
      }
    });
    
    if (shouldUpdate) {
      setExpandedCategories(newExpandedCategories);
    }
  }, [selectedCategories, categories]);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});
  const [visibleItems, setVisibleItems] = useState<Record<string, number>>(
    categories.reduce((acc, cat) => ({ ...acc, [cat.id]: 6 }), {})
  );

  const toggleCategory = (categoryId: string, event: React.MouseEvent | React.KeyboardEvent) => {
    event.preventDefault();
    
    setExpandedCategories(prev => {
      const isExpanding = !prev[categoryId];
      
      // If we're expanding, focus the first subcategory if it exists
      if (isExpanding) {
        setTimeout(() => {
          const firstSubcategory = firstSubcategoryRefs.current[categoryId];
          if (firstSubcategory) {
            firstSubcategory.focus();
          }
        }, 0);
      }
      
      return {
        ...prev,
        [categoryId]: isExpanding
      };
    });
  };

  const toggleSubcategory = (categoryId: string, subcategoryId: string) => {
    setExpandedSubcategories(prev => ({
      ...prev,
      [`${categoryId}-${subcategoryId}`]: !prev[`${categoryId}-${subcategoryId}`]
    }));
  };

  const showMoreItems = (categoryId: string, currentCount: number) => {
    setVisibleItems(prev => ({
      ...prev,
      [categoryId]: currentCount + 6
    }));
  };

  const isCategorySelected = (categoryId: string) => {
    return selectedCategories.includes(categoryId);
  };

  const isSubcategorySelected = (categoryId: string, subcategoryId: string) => {
    return selectedCategories.includes(`${categoryId}-${subcategoryId}`);
  };

  return (
    <aside className={cn('w-64 space-y-6', className)}>
      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
      
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-gray-200 pb-6">
            <button
              type="button"
              className="flex w-full items-center justify-between py-2 text-sm font-medium text-gray-900"
              onClick={(e) => toggleCategory(category.id, e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleCategory(category.id, e);
                }
              }}
              ref={(el: HTMLButtonElement | null) => {
                if (el) {
                  categoryRefs.current[category.id] = el;
                }
              }}
              aria-label={`${expandedCategories[category.id] ? 'Collapse' : 'Expand'} ${category.name} category`}
              aria-expanded={expandedCategories[category.id]}
              aria-controls={`category-${category.id}-content`}
            >
              <span>{category.name}</span>
              <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs">
                {category.count}
              </span>
              {expandedCategories[category.id] ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              )}
            </button>

            <div
              id={`category-${category.id}-content`}
              className={cn(
                'mt-2 space-y-2',
                !expandedCategories[category.id] && 'hidden'
              )}
            >
              {category.items && category.items.length > 0 ? (
                <>
                  {category.items.slice(0, visibleItems[category.id] || 6).map((item, index) => (
                    <div key={item.id} className="flex items-center">
                      <input
                        id={`filter-${category.id}-${item.id}`}
                        name={`${category.id}[]`}
                        type="checkbox"
                        checked={isSubcategorySelected(category.id, item.id)}
                        onChange={() => onSubcategoryToggle(category.id, item.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        ref={(el: HTMLInputElement | null) => {
                          if (index === 0) {
                            firstSubcategoryRefs.current[category.id] = el;
                          }
                        }}
                        aria-labelledby={`filter-${category.id}-${item.id}-label`}
                      />
                      <label
                        id={`filter-${category.id}-${item.id}-label`}
                        htmlFor={`filter-${category.id}-${item.id}`}
                        className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
                      >
                        {item.name} <span className="text-xs text-gray-500">({item.count})</span>
                      </label>
                    </div>
                  ))}
                  
                  {category.items.length > (visibleItems[category.id] || 6) && (
                    <div className="mt-2">
                      <button
                        type="button"
                        className="text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md px-2 py-1"
                        onClick={() => showMoreItems(category.id, visibleItems[category.id] || 6)}
                        aria-label={`Show more ${category.name}`}
                      >
                        + Show {Math.min(category.items.length - (visibleItems[category.id] || 6), 6)} more
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-sm text-gray-500">No items available</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
