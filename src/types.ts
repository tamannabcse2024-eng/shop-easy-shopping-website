export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: 'card' | 'cod' | 'upi';
}

export interface PlacedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customer: CustomerInfo;
}
