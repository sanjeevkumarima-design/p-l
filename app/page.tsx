import ProductListing from '../components/ProductListing'
import Link from 'next/link'

export default function Page() {
     return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gradient-to-r from-blue-50 to-cyan-50 overflow-hidden">
                   <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold text-cyan-700 bg-cyan-100 rounded-full">
                  New Arrivals
                </span>
                      <h1 className="text-5xl tracking-tight font-bold text-gray-900 sm:text-6xl md:text-7xl">
                  <span className="block">Summer Collection</span>
                  <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">2025</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 sm:mt-5 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl lg:mx-0">
                  Discover the essence of summer with our exclusive 2025 collection. Light, vibrant, and effortlessly stylish.
                </p>
                   <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Link
                    href="#featured-products"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 transform hover:scale-105"
                  >
                    Shop the Collection
                  </Link>
                  <Link
                       href="#lookbook"
                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-cyan-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-sm ring-1 ring-gray-200 hover:ring-cyan-300 transition-all duration-200"
                  >
                    View Lookbook →
                  </Link>
                   </div>
                <div className="mt-8 flex items-center space-x-6">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="h-10 w-10 rounded-full border-2 border-white bg-gray-200"></div>
                    ))}
                  </div>
                      <p className="text-sm text-gray-600">
                    <span className="font-semibold">50,000+</span> happy customers this season
                  </p>
                   </div>
              </div>
            </main>
          </div>
           </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-72 w-full object-cover sm:h-96 md:h-[32rem] lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Summer Collection 2025"
          />
        </div>
      </div>

             <div className="bg-white pt-12 sm:pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Categories</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Shop by Category
               </p>
          </div>

              <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
            {[
              {
                name: 'Electronics',
                href: '#',
                 imageSrc: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80',
                description: 'Latest gadgets and electronics',
              },
              {
                name: 'Fashion',
                href: '#',
                imageSrc: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                description: 'Trendy clothing and accessories',
              },
              {
                name: 'Home & Living',
                href: '#',
                imageSrc: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
                description: 'Furniture and home decor',
              },
            ].map((category) => (
              <div key={category.name} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">
                  <img className="h-48 w-full object-cover" src={category.imageSrc} alt={category.name} />
                </div>
                   <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <a href={category.href} className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900">{category.name}</p>
                      <p className="mt-3 text-base text-gray-500">{category.description}</p>
                    </a>
                  </div>
                      </div>
              </div>
            ))}
             </div>
           </div>
        </div>

      <div id="featured-products" className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
               <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">Products</h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Our Featured Products
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                 Check out our handpicked selection of premium products
            </p>
          </div>

          <div className="mt-12">
            <ProductListing />
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Sign up for our newsletter
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-500">
              Get the latest updates on new products and upcoming sales
            </p>
            </div>
          <div className="mt-8 lg:mt-0 lg:ml-8">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:max-w-xs rounded-md"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Notify me
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-gray-500">
              We care about your data. Read our{' '}
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
