import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortOption {
  value: string;
  label: string;
}

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SortOption[];
  className?: string;
  label?: string;
}

export function SortSelect({
  value,
  onChange,
  options,
  className = '',
  label = 'Sort by',
}: SortSelectProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {label && (
        <label htmlFor="sort" className="text-sm font-medium text-gray-700 whitespace-nowrap">
          {label}:
        </label>
      )}
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger 
          id="sort" 
          className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:w-auto"
        >
          <Select.Value placeholder="Sort by" />
          <Select.Icon className="ml-2">
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </Select.Icon>
        </Select.Trigger>
        
        <Select.Portal>
          <Select.Content className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden bg-white rounded-md shadow-lg">
            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
              <ChevronDown className="w-4 h-4" />
            </Select.ScrollUpButton>
            
            <Select.Viewport className="p-1">
              {options.map((option) => (
                <Select.Item 
                  key={option.value} 
                  value={option.value}
                  className="relative flex items-center px-8 py-2 text-sm text-gray-700 rounded-md cursor-pointer select-none hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check className="w-4 h-4" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
            
            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
              <ChevronDown className="w-4 h-4" />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
