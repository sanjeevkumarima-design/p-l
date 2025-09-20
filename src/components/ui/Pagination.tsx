import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ChevronDoubleLeftIcon, 
  ChevronDoubleRightIcon, 
  EllipsisHorizontalIcon 
} from '@heroicons/react/24/outline';
import { Button } from './Button';
import { cn } from '../../lib/utils';
import { useMediaQuery } from '../../hooks/use-media-query';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
  showFirstLast?: boolean;
  showPageNumbers?: boolean;
  previousLabel?: string;
  nextLabel?: string;
}

// Component for rendering page number buttons
const PageNumber = ({ 
  pageNumber, 
  isActive, 
  onClick, 
  className = '' 
}: {
  pageNumber: number;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      isActive 
        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
        : 'text-gray-700 hover:bg-gray-100',
      className
    )}
    aria-current={isActive ? 'page' : undefined}
  >
    {pageNumber}
  </button>
);
  
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  siblingCount = 1,
  showFirstLast = true,
  showPageNumbers = true,
  previousLabel = 'Previous',
  nextLabel = 'Next',
}: PaginationProps) {
  const isMobile = useMediaQuery('(max-width: 640px)');
  
  if (totalPages <= 1) return null;
  
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate page numbers to show
  const range = (start: number, end: number): number[] => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPageNumbers = (): (number | string)[] => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    // Case 1: If the number of pages is less than the page numbers we want to show, return the range [1..totalPages]
    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    // Calculate left and right sibling index and make sure they are within range 1 and totalPages
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 2: No left dots to show, but rights dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    return [];
  };

  const pageNumbers = getPageNumbers();

  if (isMobile && totalPages > 5) {
    return (
      <nav 
        className={cn("flex items-center justify-between w-full px-2 sm:px-0", className)}
        aria-label="Pagination"
      >
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm font-medium rounded-md min-w-[80px]"
          size="sm"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        
        <div className="text-sm text-gray-700 px-3 py-2 bg-gray-100 rounded-md">
          Page {currentPage} of {totalPages}
        </div>
        
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm font-medium rounded-md min-w-[80px]"
          size="sm"
          aria-label="Next page"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </nav>
    );
  }

  return (
    <nav className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center space-x-2">
        {showFirstLast && (
          <Button
            variant="ghost"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium rounded-md"
            size="sm"
          >
            <span className="sr-only">First</span>
            <ChevronDoubleLeftIcon className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium rounded-md"
          size="sm"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>

        {showPageNumbers && (
          <div className="flex items-center space-x-1">
            {pageNumbers.map((pageNumber, index) => {
              if (pageNumber === '...') {
                return (
                  <span key={`dots-${index}`} className="px-3 py-1 text-gray-500">
                    ...
                  </span>
                );
              }

              const num = Number(pageNumber);
              return typeof num === 'number' && !isNaN(num) ? (
                <PageNumber
                  key={num}
                  pageNumber={num}
                  isActive={num === currentPage}
                  onClick={() => onPageChange(num)}
                />
              ) : null;
            })}
          </div>
        )}

        <Button
          variant="ghost"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium rounded-md"
          size="sm"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        {showFirstLast && (
          <Button
            variant="ghost"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium rounded-md"
            size="sm"
          >
            <span className="sr-only">Last</span>
            <ChevronDoubleRightIcon className="h-4 w-4" />
          </Button>
        )}
      </div>
    </nav>
  );
}