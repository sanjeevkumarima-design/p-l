import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Featured', href: '/featured' },
    { name: 'Sale', href: '/sale' },
  ],
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
  customerService: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Shipping & Returns', href: '/shipping' },
    { name: 'Track Order', href: '/track-order' },
  ],
};

const socialLinks = [
  {
    name: 'Facebook',
    href: '#',
    icon: Facebook,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: Twitter,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: Instagram,
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: Linkedin,
  },
];

export function Footer({ className = '' }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('bg-gray-50', className)}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Furnish
            </Link>
            <p className="text-sm text-gray-600">
              Making your home beautiful with our curated collection of furniture and decor.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Shop
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.shop.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              About
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.about.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-2">
              {footerLinks.customerService.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
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
                  <span>Subscribe</span>
                  <Mail className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} Furnish. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
