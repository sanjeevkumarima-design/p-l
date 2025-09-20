import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
}

export function Breadcrumb({
  items,
  className = '',
  separator = <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />,
}: BreadcrumbProps) {
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2 md:space-x-4">
        {items.map((item, index) => (
          <li key={item.name} className="flex items-center">
            {index > 0 && <span className="mx-2 text-gray-400">{separator}</span>}
            {item.current ? (
              <span 
                className="text-sm font-medium text-gray-500"
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Example usage:
/*
<Breadcrumb 
  items={[
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Electronics', href: '/products/electronics' },
    { name: 'Smartphones', href: '/products/electronics/smartphones', current: true },
  ]} 
  className="mb-6"
/>
*/
