import { useState, useEffect } from 'react';
import { XMarkIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface FilterOption {
  id: string;
  name: string;
  value: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
  type?: 'checkbox' | 'radio' | 'color' | 'price';
}

interface FilterPanelProps {
  filters: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, values: string[]) => void;
  onResetFilters: () => void;
  className?: string;
}

export function FilterPanel({
  filters,
  selectedFilters,
  onFilterChange,
  onResetFilters,
  className = '',
}: FilterPanelProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // Initialize expanded state for filter groups
  useEffect(() => {
    const initialExpanded: Record<string, boolean> = {};
    filters.forEach(filter => {
      initialExpanded[filter.id] = true;
    });
    setExpandedGroups(initialExpanded);
  }, [filters]);

  const toggleFilterGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const handleFilterChange = (filterId: string, value: string, isChecked: boolean) => {
    const currentValues = selectedFilters[filterId] || [];
    let newValues: string[];

    if (isChecked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }

    onFilterChange(filterId, newValues);
  };

  const selectedFilterCount = Object.values(selectedFilters).reduce(
    (acc, values) => acc + values.length,
    0
  );

  return (
    <div className={className}>
      {/* Mobile filter dialog */}
      <div className="lg:hidden">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center gap-2"
        >
          <FunnelIcon className="h-5 w-5" />
          Filters
          {selectedFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {selectedFilterCount}
            </Badge>
          )}
        </Button>

        {/* Mobile filter dialog */}
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/25" onClick={() => setIsMobileFiltersOpen(false)} />
            <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-50"
                  onClick={() => setIsMobileFiltersOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <div className="mt-4 border-t border-gray-200">
                {filters.map((filter) => (
                  <div key={filter.id} className="border-b border-gray-200 py-6 px-4">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                        onClick={() => toggleFilterGroup(filter.id)}
                        aria-expanded={expandedGroups[filter.id]}
                      >
                        <span className="font-medium text-gray-900">{filter.name}</span>
                        <span className="ml-6 flex items-center">
                          {expandedGroups[filter.id] ? (
                            <span className="text-gray-600">-</span>
                          ) : (
                            <span className="text-gray-600">+</span>
                          )}
                        </span>
                      </button>
                    </h3>
                    {expandedGroups[filter.id] && (
                      <div className="pt-6">
                        <div className="space-y-6">
                          {filter.options.map((option) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`${filter.id}-${option.value}-mobile`}
                                name={`${filter.id}[]`}
                                type={filter.type === 'radio' ? 'radio' : 'checkbox'}
                                checked={selectedFilters[filter.id]?.includes(option.value) || false}
                                onChange={(e) =>
                                  handleFilterChange(filter.id, option.value, e.target.checked)
                                }
                                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                              />
                              <label
                                htmlFor={`${filter.id}-${option.value}-mobile`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.name}
                                {option.count !== undefined && (
                                  <span className="ml-1 text-xs text-gray-500">
                                    ({option.count})
                                  </span>
                                )}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 px-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onResetFilters();
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-full"
                >
                  Clear all
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between border-b border-gray-200 pb-6">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          {selectedFilterCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              Clear all
            </button>
          )}
        </div>

        {filters.map((filter) => (
          <div key={filter.id} className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
              <button
                type="button"
                className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                onClick={() => toggleFilterGroup(filter.id)}
                aria-expanded={expandedGroups[filter.id]}
              >
                <span className="font-medium text-gray-900">{filter.name}</span>
                <span className="ml-6 flex items-center">
                  {expandedGroups[filter.id] ? (
                    <span className="text-gray-600">-</span>
                  ) : (
                    <span className="text-gray-600">+</span>
                  )}
                </span>
              </button>
            </h3>
            {expandedGroups[filter.id] && (
              <div className="pt-6">
                <div className="space-y-4">
                  {filter.options.map((option) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`${filter.id}-${option.value}`}
                        name={`${filter.id}[]`}
                        type={filter.type === 'radio' ? 'radio' : 'checkbox'}
                        checked={selectedFilters[filter.id]?.includes(option.value) || false}
                        onChange={(e) =>
                          handleFilterChange(filter.id, option.value, e.target.checked)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label
                        htmlFor={`${filter.id}-${option.value}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.name}
                        {option.count !== undefined && (
                          <span className="ml-1 text-xs text-gray-500">({option.count})</span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
