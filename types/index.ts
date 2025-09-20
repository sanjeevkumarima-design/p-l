export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  colors?: string[];
  category?: string;
  subcategory?: string;
  discount?: number;
  slug?: string;
  images?: string[];
  featured?: boolean;
  tags?: string[];
  specifications?: Record<string, string>;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CartItem extends Product {
  quantity: number;
  addedAt: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | null;
  children?: Category[];
  productCount?: number;
}

export interface FilterOptions {
  categories?: string[];
  priceRange?: [number, number];
  colors?: string[];
  sizes?: string[];
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'rating';
  searchQuery?: string;
  inStock?: boolean;
  onSale?: boolean;
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role?: 'user' | 'admin';
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    selectedColor?: string;
    selectedSize?: string;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
  userName: string;
  userImage?: string;
  verifiedPurchase: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface WishlistItem {
  id: string;
  userId: string;
  product: Product;
  createdAt: string | Date;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface FormFieldError {
  field: string;
  message: string;
}
