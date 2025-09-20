'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { products as rawProducts, Product } from '../app/data/products';
import { FilterSidebar } from '../src/components/filters/FilterSidebar';
import { Pagination } from '../src/components/ui/Pagination';
import { SortSelect } from '../src/components/ui/SortSelect';
import { Button } from '../src/components/ui/Button';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from './ProductCard';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'top-rated' | 'newest';

const ITEMS_PER_PAGE = 12;

const simulateLoading = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'top-rated', label: 'Top Rated' },
  { value: 'newest', label: 'Newest Arrivals' },
];

export default function ProductListing() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const page = parseInt(searchParams.get('page') || '1', 10);
  const sortParam = (searchParams.get('sort') as SortOption) || 'featured';
  const categoryParam = searchParams.get('category');
  
  const [sort, setSort] = useState<SortOption>(sortParam);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const updateUrlParams = useCallback((newPage: number, newSort: SortOption, newCategories: string[]) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set('page', newPage.toString());
    if (newSort !== 'featured') params.set('sort', newSort);
    if (newCategories.length > 0) params.set('category', newCategories[0]);
    
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [pathname, router]);

  const categories = useMemo(() => {
    const categoryMap = new Map<string, {id: string, name: string, count: number, items: Array<{id: string, name: string, count: number}>}>()
    
    rawProducts.forEach(product => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, {
          id: product.category.toLowerCase().replace(/\s+/g, '-'),
          name: product.category,
             count: 0,
          items: []
        })
      }
      
      const category = categoryMap.get(product.category)!
      category.count += 1
      
      
      if (product.subcategory) {
        let subcategory = category.items.find(item => item.name === product.subcategory)
        if (!subcategory) {
          subcategory = {
            id: product.subcategory.toLowerCase().replace(/\s+/g, '-'),
            name: product.subcategory,
            count: 0
          }
          category.items.push(subcategory)
        }
        subcategory.count += 1
      }
    })
    
    return Array.from(categoryMap.values()).map(category => ({
      ...category,
      items: category.items.sort((a, b) => a.name.localeCompare(b.name))
    })).sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  useEffect(() => {
    const filterAndSort = async () => {
      setIsLoading(true);
      await simulateLoading(300);      
      let result = [...rawProducts];
      
      if (selectedCategories.length > 0) {
        result = result.filter(product => {
          if (selectedCategories.includes(product.category.toLowerCase().replace(/\s+/g, '-'))) {
            return true;
          }
          
          if (product.subcategory) {
            const subcategoryId = `${product.category.toLowerCase().replace(/\s+/g, '-')}-${product.subcategory.toLowerCase().replace(/\s+/g, '-')}`;
            return selectedCategories.includes(subcategoryId);
          }
          
          return false;
        });
      }
      
      switch (sort) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'top-rated':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'newest':
          result.sort((a, b) => parseInt(b.id.substring(1)) - parseInt(a.id.substring(1)));
          break;
        case 'featured':
        default:
          result.sort((a, b) => a.id.localeCompare(b.id));
      }
      
      setFilteredProducts(result);
      setIsLoading(false);
    };
    
    filterAndSort();
    updateUrlParams(1, sort, selectedCategories);
  }, [sort, selectedCategories, updateUrlParams]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => {
      
      const category = categories.find(cat => cat.id === categoryId)
      const subcategoryIds = category?.items.map(item => `${categoryId}-${item.id}`) || []
      
      
      const newSelected = prev.filter(id => !subcategoryIds.includes(id))
      
      
      if (!prev.includes(categoryId)) {
        return [...newSelected, categoryId]
      }
      
      return newSelected
    })
  }

  const toggleSubcategory = (categoryId: string, subcategoryId: string) => {
    const fullId = `${categoryId}-${subcategoryId}`
    setSelectedCategories(prev => {
      
      if (prev.includes(fullId)) {
        return prev.filter(id => id !== fullId)
      }
      
      
      return [...prev.filter(id => id !== categoryId), fullId]
    })
  }

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, page), totalPages || 1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
  const handlePageChange = (newPage: number) => {
    updateUrlParams(newPage, sort, selectedCategories);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleSortChange = (newSort: string) => {
    setSort(newSort as SortOption);
    updateUrlParams(1, newSort as SortOption, selectedCategories);
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSort('featured');
    updateUrlParams(1, 'featured', []);
  };

  return (
    <div className="bg-gray-50 pt-20 sm:pt-24 pb-12">
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" 
            onClick={() => setIsMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transform transition-transform ease-in-out duration-300">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100"
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            
            <div className="mt-4 border-t border-gray-200 px-4 py-6">
              <FilterSidebar
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryToggle={toggleCategory}
                onSubcategoryToggle={toggleSubcategory}
              />
              
              <div className="mt-6">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="w-full rounded-md border border-transparent bg-gradient-to-r from-primary-500 to-primary-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          {/* Filters sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </h3>
                {selectedCategories.length > 0 && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center transition-colors duration-200"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <FilterSidebar
                  categories={categories}
                  selectedCategories={selectedCategories}
                  onCategoryToggle={toggleCategory}
                  onSubcategoryToggle={toggleSubcategory}
                />
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="lg:hidden flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCategories.length > 0 
                  ? `Products (${filteredProducts.length})`
                  : 'All Products'}
              </h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {selectedCategories.length > 0 && (
                  <span className="ml-1.5 rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </div>
            
            <div className="hidden lg:flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedCategories.length > 0 
                    ? `Filtered Products (${filteredProducts.length})`
                    : 'All Products'}
                </h1>
                {selectedCategories.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Showing {Math.min(filteredProducts.length, ITEMS_PER_PAGE)} of {filteredProducts.length} products
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <div className="w-56">
                  <SortSelect
                    value={sort}
                    onChange={handleSortChange}
                    options={sortOptions}
                    label="Sort by"
                  />
                </div>
              </div>
            </div>
            
            {(selectedCategories.length > 0 || sort !== 'featured') && (
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Active filters:</span>
                  
                  {selectedCategories.map((category) => {
                    const [cat, subcat] = category.split('-', 2);
                    const displayName = subcat 
                      ? `${categories.find(c => c.id === cat)?.name || cat} > ${categories.find(c => c.id === cat)?.items.find(i => i.id === subcat)?.name || subcat}`
                      : categories.find(c => c.id === category)?.name || category;
                      
                    return (
                      <span 
                        key={category}
                        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                      >
                        {displayName}
                        <button
                          type="button"
                          className="ml-1.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                          onClick={() => {
                            const newCategories = selectedCategories.filter(c => c !== category);
                            setSelectedCategories(newCategories);
                            updateUrlParams(1, sort, newCategories);
                          }}
                        >
                          <span className="sr-only">Remove filter</span>
                          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                          </svg>
                        </button>
                      </span>
                    );
                  })}
                  
                  {(selectedCategories.length > 0 || sort !== 'featured') && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-sm font-medium text-primary-600 hover:text-primary-500 flex items-center transition-colors duration-200"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="animate-pulse flex flex-col h-full">
                    <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 rounded-lg overflow-hidden"></div>
                    <div className="mt-2 sm:mt-3 space-y-2 flex-1 flex flex-col">
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {paginatedProducts.map((product) => (
                    <div key={`product-${product.id}`} className="flex flex-col h-full">
                      <ProductCard 
                        product={product} 
                        className="flex-1 flex flex-col"
                      />
                    </div>
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="mt-8 sm:mt-10">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      className="mt-6 sm:mt-8"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-md">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                  <p className="mt-2 text-base text-gray-600">
                    We couldn't find any products matching your filters.
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={clearFilters}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Clear all filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
