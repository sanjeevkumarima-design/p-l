'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../common/Button';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  current?: boolean;
}

interface NavbarProps {
  categories?: NavItem[];
  cartItemCount?: number;
  onSearch?: (query: string) => void;
  className?: string;
}

export function Navbar({ 
  categories = [], 
  cartItemCount = 0, 
  onSearch,
  className = '' 
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const navigation: NavItem[] = [
    { name: 'Home', href: '/', current: pathname === '/' },
    { name: 'Shop', href: '/products', current: pathname?.startsWith('/products') },
    { name: 'About', href: '/about', current: pathname === '/about' },
    { name: 'Contact', href: '/contact', current: pathname === '/contact' },
  ];

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full bg-white transition-shadow',
      isScrolled ? 'shadow-sm' : '',
      className
    )}>
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-gray-900">ShopEase</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                    item.current
                      ? 'border-primary-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center">
              {/* Search */}
              <div className="hidden md:ml-6 md:block">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <form onSubmit={handleSearch}>
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  )}
                </Button>
              </div>

              {/* User account */}
              <div className="hidden md:ml-4 md:flex md:items-center">
                <Link
                  href="/account"
                  className="rounded-full p-1 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Account</span>
                  <UserIcon className="h-6 w-6" aria-hidden="true" />
                </Link>
              </div>

              {/* Shopping cart */}
              <div className="ml-4 flow-root md:ml-6">
                <Link href="/cart" className="group -m-2 flex items-center p-2">
                  <ShoppingCartIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cartItemCount}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
                    item.current
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <UserIcon className="h-10 w-10 rounded-full text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Guest</div>
                  <div className="text-sm font-medium text-gray-500">Sign in to your account</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link
                  href="/account"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wishlist
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category navigation */}
      {categories.length > 0 && (
        <div className="hidden bg-white md:block">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-10 items-center justify-between">
              <div className="flex space-x-8">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className={cn(
                      'flex items-center text-sm font-medium',
                      category.current
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-500'
                    )}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center">
                <Link
                  href="/sale"
                  className="text-sm font-medium text-red-600 hover:text-red-500"
                >
                  Sale
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
