export interface Product {
  _id:string;
  name:string;
  fullPrice:number;
  currentPrice:number;
  pixPrice:number;
  image: string | File;
  promoPercentage:number;
  categories?:string[];
  description?:string;
  active?:boolean;
  cod?:string;
};
export interface ProductForm {
  name:string;
  fullPrice:number;
  description:string;
  image: File;
  categories:string[];
  cod:string;
  promoPercentage?:number;
};

export interface ProductsList{
  products: Product[],
  amount: number
};

export type ProductFilters = Omit<Product, 'image' | '_id' | 'currentPrice' | 'pixPrice' | 'description' | 'createdAt' | 'updatedAt'>;
