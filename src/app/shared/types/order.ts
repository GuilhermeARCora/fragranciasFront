export interface OrderItem {
  _id: string;
  name: string;
  fullPrice: number;
  currentPrice: number;
  pixPrice: number;
  promoPercentage: number;
  amount: number;
  image: string | File;
};

export type OrderCreateItem = Omit<OrderItem, 'currentPrice' | 'pixPrice'>;

export interface Order {
  _id: string;
  items: OrderItem[];
  status: string;
  totalUnits: number;
  totalFullPrice: number;
  totalDiscount: number;
  totalCurrentPrice: number;
  totalPixPrice: number;
  dayItWasIssued: string;
};

export interface OrderList {
  orders: Order[];
  amount: number;
};

export interface OrderFilter {
  _id?: string;
  status?: string;
  totalUnits?: number;
  totalFullPrice?: number;
  totalDiscount?: number;
  totalCurrentPrice?: number;
  totalPixPrice?: number;
  daysAgo?: number;
};
