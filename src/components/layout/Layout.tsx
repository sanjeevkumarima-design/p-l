import { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  hideFooter?: boolean;
  hideHeader?: boolean;
}

export function Layout({
  children,
  title = 'ShopEase - Your One-Stop Shop',
  description = 'Discover amazing products at great prices',
  className = '',
  hideFooter = false,
  hideHeader = false,
}: LayoutProps) {
  const router = useRouter();
  
  // Example categories - in a real app, these would come from your API
  const categories = [
    { name: 'Electronics', href: '/categories/electronics' },
    { name: 'Fashion', href: '/categories/fashion' },
    { name: 'Home & Garden', href: '/categories/home-garden' },
    { name: 'Beauty', href: '/categories/beauty' },
    { name: 'Sports', href: '/categories/sports' },
  ].map(item => ({
    ...item,
    current: router.asPath.startsWith(item.href),
  }));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://shopease.com${router.asPath}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/images/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://shopease.com${router.asPath}`} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content="/images/og-image.jpg" />
      </Head>

      {!hideHeader && <Navbar categories={categories} cartItemCount={0} />}
      
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
}

// Default export for backward compatibility
export default Layout;
