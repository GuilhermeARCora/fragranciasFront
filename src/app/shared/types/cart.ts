import type { Product } from './product';

export interface CartItem {
  product: Product;
  amount: number;
};

export interface Cart {
  items: CartItem[];
  totalUnits: number;
  totalCurrentPrice: number;
  totalFullPrice: number;
  totalPixPrice: number;
};

