
export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: string;
  subcategory?: string;
  image: string;
  images?: string[];
  rating?: number;
  reviewCount?: number;
  colors?: string[];
  sizes?: string[];
  material?: string;
  careInstructions?: string;
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
}

export const products: Product[] = [
  { 
    id: 'p1', 
    name: 'Premium Cotton T-Shirt 6-Pack', 
    description: 'Essential basic t-shirts made from 100% organic cotton. Perfect for everyday wear with a comfortable fit that never goes out of style. Pre-shrunk fabric maintains shape wash after wash.',
    price: 2499, 
    originalPrice: 3499, 
    discount: 29,
    category: 'Clothing',
    subcategory: 'T-Shirts',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      'https://images.unsplash.com/photo-1578932750355-5eb30ece487a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
    ],
    rating: 4.8,
    reviewCount: 1242,
    colors: ['#000000', '#1E4ED8', '#DC2626', '#F59E0B', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    material: '100% Organic Cotton (200 GSM)',
    careInstructions: 'Machine wash cold, Tumble dry low, Do not bleach, Iron low heat',
    inStock: true,
    isNew: true,
    isBestSeller: true,
    tags: ['casual', 'basic', 'essential', 'cotton', 'pack', 't-shirt']
  },
  { 
    id: 'p3', 
    name: 'Slim Fit Stretch Jeans', 
    description: 'Classic indigo denim jeans with a modern slim fit. Made with premium stretch technology for all-day comfort and mobility. Features five-pocket styling and a zip fly with button closure.',
    price: 3299, 
    originalPrice: 4299, 
    discount: 23,
    category: 'Clothing',
    subcategory: 'Pants',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80',
      'https://images.unsplash.com/photo-1542272604-3a1c8e9bcf8d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80',
      'https://images.unsplash.com/photo-1542272604-1d3d8f1a8b9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80'
    ],
    rating: 4.6,
    reviewCount: 894,
    colors: ['#1F2937', '#1E40AF', '#374151', '#1E3A8A'],
    sizes: ['28', '30', '32', '34', '36', '38', '40'],
    material: '98% Cotton, 2% Elastane (12oz Denim)',
    careInstructions: 'Machine wash cold, Tumble dry low, Do not bleach, Iron inside out, Wash inside out',
    inStock: true,
    isNew: true,
    isBestSeller: true,
    tags: ['jeans', 'denim', 'slim fit', 'casual', 'pants', 'bottoms']
  },
  { 
    id: 'p4', 
    name: 'Classic Oxford Shirt', 
    description: 'Timeless Oxford shirt in a regular fit. Perfect for both casual and business casual occasions. Made from breathable cotton oxford fabric with a button-down collar and chest pocket.',
    price: 2199, 
    originalPrice: 2999,
    discount: 27,
    category: 'Clothing',
    subcategory: 'Shirts',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.5,
    reviewCount: 567,
    colors: ['#F9FAFB', '#6B7280', '#1F2937', '#F3F4F6', '#E5E7EB'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    material: '100% Premium Cotton Oxford (140 GSM)',
    careInstructions: 'Machine wash cold, Tumble dry low, Iron medium heat, Do not bleach',
    inStock: true,
    isBestSeller: true,
    tags: ['shirt', 'oxford', 'casual', 'business casual', 'button-down', 'dress shirt']
  },
  { 
    id: 'p8', 
    name: 'Premium Cotton Socks 3-Pack', 
    description: 'Breathable and comfortable cotton socks with reinforced heels and toes for extra durability. Arch support and moisture-wicking technology keep feet dry and comfortable all day long.',
    price: 899, 
    originalPrice: 1299,
    discount: 31,
    category: 'Clothing',
    subcategory: 'Socks',
    image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599241383382-2d3e1d3f1f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 1245,
    colors: ['#000000', '#FFFFFF', '#6B7280', '#1F2937', '#DC2626', '#1E40AF'],
    sizes: ['US 6-8', 'US 9-12', 'US 13+'],
    material: '85% Premium Cotton, 12% Polyester, 3% Spandex',
    careInstructions: 'Machine wash cold, Tumble dry low, Do not bleach, Wash with like colors',
    inStock: true,
    isBestSeller: true,
    tags: ['socks', 'cotton', 'essential', 'casual', 'athletic', 'ankle']
  },
  
  // Accessories
  { 
    id: 'p2', 
    name: 'Genuine Leather Bifold Wallet', 
    description: 'Handcrafted from full-grain leather, this bifold wallet features multiple card slots, ID window, and a bill compartment. Ages beautifully over time, developing a unique patina.',
    price: 3499, 
    originalPrice: 4999,
    discount: 30,
    category: 'Accessories',
    subcategory: 'Wallets',
    image: 'https://images.unsplash.com/photo-1548032885-b5e38734688a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
    images: [
      'https://images.unsplash.com/photo-1548032885-b5e38734688a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1548032885-4fe70f9d15d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1548032885-d9c1f1e5e9b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80'
    ],
    rating: 4.8,
    reviewCount: 789,
    colors: ['#000000', '#78350F', '#422006', '#1C1917'],
    material: 'Full-grain Vegetable-Tanned Leather',
    careInstructions: 'Clean with leather conditioner, Keep away from water, Store in dry place, Avoid direct sunlight',
    inStock: true,
    isBestSeller: true,
    tags: ['leather', 'wallet', 'accessory', 'premium', 'bifold', 'men\'s']
  },
  { 
    id: 'p6', 
    name: 'Genuine Leather Belt', 
    description: 'Handcrafted full-grain leather belt with a polished metal buckle. Features a classic design that pairs well with both casual and formal attire. Ages beautifully over time.',
    price: 1999, 
    originalPrice: 2999,
    discount: 33,
    category: 'Accessories',
    subcategory: 'Belts',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.7,
    reviewCount: 453,
    colors: ['#000000', '#78350F', '#422006', '#1C1917'],
    sizes: ['30', '32', '34', '36', '38', '40', '42'],
    material: 'Full-grain Vegetable-Tanned Leather (4mm thickness)',
    careInstructions: 'Clean with leather conditioner, Keep away from water, Store in dry place, Avoid direct sunlight',
    inStock: true,
    isBestSeller: true,
    tags: ['belt', 'leather', 'accessory', 'dress', 'casual', 'men\'s']
  },
  { 
    id: 'p7', 
    name: 'Premium Merino Wool Beanie', 
    description: 'Warm and comfortable beanie made from premium merino wool. Features a slouchy fit and ribbed knit design. Perfect for cold weather while remaining breathable.',
    price: 1499, 
    originalPrice: 1999, 
    discount: 25,
    category: 'Accessories', 
    subcategory: 'Hats',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599241383382-2d3e1d3f1f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.6,
    reviewCount: 321,
    colors: ['#1F2937', '#6B7280', '#D1D5DB', '#111827', '#4B5563'],
    material: '100% Premium Merino Wool (Grade A)',
    careInstructions: 'Hand wash cold, Lay flat to dry, Do not bleach, Do not tumble dry, Do not wring',
    inStock: true,
    isNew: true,
    isBestSeller: true,
    tags: ['hat', 'beanie', 'winter', 'wool', 'cold weather', 'knit']
  },
  
  // Electronics
  { 
    id: 'p5', 
    name: 'Wireless Noise Cancelling Earbuds Pro', 
    description: 'Premium wireless earbuds with active noise cancellation, 30-hour battery life (with case), and crystal clear sound quality. Features touch controls, water resistance, and customizable EQ settings.',
    price: 14999, 
    originalPrice: 19999,
    discount: 25,
    category: 'Electronics',
    subcategory: 'Audio',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590658375922-1e4b5f9e3c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590658375922-1e4b5f9e3c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    rating: 4.9,
    reviewCount: 2345,
    colors: ['#000000', '#FFFFFF', '#F3F4F6', '#1F2937'],
    material: 'Premium Plastic, Metal, Silicone Tips',
    careInstructions: 'Wipe clean with dry cloth, Avoid water exposure, Store in case when not in use, Keep away from extreme temperatures',
    inStock: true,
    isNew: true,
    isBestSeller: true,
    tags: ['electronics', 'audio', 'wireless', 'noise cancelling', 'earbuds', 'bluetooth']
  },
  
  // New Products
  { 
    id: 'p9', 
    name: 'Minimalist Analog Watch', 
    description: 'Sleek and minimalist analog watch with a genuine leather strap and stainless steel case. Water resistant up to 50 meters with a Japanese quartz movement for accurate timekeeping.',
    price: 4299, 
    originalPrice: 5999,
    discount: 28,
    category: 'Accessories',
    subcategory: 'Watches',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    images: [
      'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
    ],
    rating: 4.8,
    reviewCount: 876,
    colors: ['#1F2937', '#78350F', '#000000', '#1E40AF'],
    material: 'Stainless Steel Case, Genuine Leather Strap',
    careInstructions: 'Wipe with soft dry cloth, Avoid water exposure, Store in dry place, Keep away from magnets',
    inStock: true,
    isNew: true,
    isBestSeller: true,
    tags: ['watch', 'analog', 'minimalist', 'accessory', 'timepiece', 'fashion']
  },
  { 
    id: 'p10', 
    name: 'Classic Aviator Sunglasses', 
    description: 'Timeless aviator sunglasses with UV400 protection lenses. Features a lightweight metal frame and polarized lenses that reduce glare while maintaining true color perception.',
    price: 2499, 
    originalPrice: 3499,
    discount: 29,
    category: 'Accessories',
    subcategory: 'Sunglasses',
    image: 'https://images.unsplash.com/photo-1572635196184-35d5d11c210b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196184-35d5d11c210b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      'https://images.unsplash.com/photo-1572635148818-ef6fd7eb32fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      'https://images.unsplash.com/photo-1572635149373-50f1f31d2a1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
    ],
    rating: 4.7,
    reviewCount: 654,
    colors: ['#1F2937', '#000000', '#78350F', '#92400E'],
    material: 'Metal Frame, Polarized Glass Lenses',
    careInstructions: 'Clean with microfiber cloth, Store in case when not in use, Avoid placing lens down',
    inStock: true,
    isNew: true,
    tags: ['sunglasses', 'aviator', 'eyewear', 'accessory', 'uv protection', 'polarized']
  }
]
