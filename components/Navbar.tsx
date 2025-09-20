'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { XMarkIcon, Bars3Icon, MagnifyingGlassIcon, UserIcon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';

const CartIcon = dynamic(() => import('./CartIcon'), { ssr: false });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setIsScrolled(window.scrollY > 10);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/90 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="lg:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                onClick={() => setIsOpen(true)}
                aria-expanded="false"
              >
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                StyleHub
              </Link>
            </div>

            <div className="hidden lg:ml-8 lg:flex lg:space-x-8">
              <Link
                href="/shop"
                className="border-transparent text-gray-700 hover:border-primary-500 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="border-transparent text-gray-700 hover:border-primary-500 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Categories
              </Link>
              <Link
                href="/new-arrivals"
                className="border-transparent text-gray-700 hover:border-primary-500 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                New Arrivals
              </Link>
              <Link
                href="/sale"
                className="border-transparent text-gray-700 hover:border-primary-500 hover:text-gray-800 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Sale
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center lg:ml-4">
              <div className="ml-4 flex items-center lg:ml-6">
                <Link
                  href="/account"
                  className="p-2 text-gray-700 hover:text-primary-600 transition-colors duration-200"
                  aria-label="Account"
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
              </div>

              <div className="ml-4 flow-root lg:ml-6">
                <CartIcon />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div
          className={`fixed inset-0 bg-black bg-opacity-25 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>

        <div
          className={`fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-4 pt-4">
            <h2 className="text-lg font-medium text-gray-900">Menu</h2>
            <button
              type="button"
              className="rounded-md text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          
          <div className="px-4 pt-4 pb-3 border-t border-gray-200">
            <div className="space-y-1">
              <Link
                href="/shop"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/categories"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/new-arrivals"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                New Arrivals
              </Link>
              <Link
                href="/sale"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Sale
              </Link>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between px-4">
                <h3 className="text-base font-medium text-gray-700">Cart</h3>
                <CartIcon />
              </div>
              <div className="mt-3">
                <Link
                  href="/account"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  Your Account
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsOpen(false)}
                >
                  Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
