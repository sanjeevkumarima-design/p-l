'use client'

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
         <footer className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Furnish</h2>
            <p className="mt-4 text-sm text-gray-600">
              Making your home beautiful with our curated collection of furniture and decor.
              </p>
          </div>
          
          <div>
               <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/products" className="text-sm text-gray-600 hover:text-gray-900">All Products</Link></li>
              <li><Link href="/new-arrivals" className="text-sm text-gray-600 hover:text-gray-900">New Arrivals</Link></li>
                  <li><Link href="/featured" className="text-sm text-gray-600 hover:text-gray-900">Featured</Link></li>
              <li><Link href="/sale" className="text-sm text-gray-600 hover:text-gray-900">Sale</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">About</h3>
                <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">Our Story</Link></li>
              <li><Link href="/careers" className="text-sm text-gray-600 hover:text-gray-900">Careers</Link></li>
                  <li><Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
            </ul>
          </div>
          
             <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Customer Service</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">FAQs</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-600 hover:text-gray-900">Shipping & Returns</Link></li>
              <li><Link href="/track-order" className="text-sm text-gray-600 hover:text-gray-900">Track Order</Link></li>
            </ul>
          </div>
           </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="md:flex md:items-center md:justify-between">
               <div className="md:w-1/2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                Subscribe to our newsletter
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                The latest news, articles, and resources, sent to your inbox weekly.
                 </p>
            </div>
            <form className="mt-4 sm:flex sm:max-w-md md:mt-0">
              <label htmlFor="email-address" className="sr-only">
                Email address
                 </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                  required
                className="w-full min-w-0 rounded-md border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:border-primary-500 focus:ring-primary-500"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
               &copy; {currentYear} Furnish. All rights reserved.
          </p>
         </div>
      </div>
    </footer>
  );
}
