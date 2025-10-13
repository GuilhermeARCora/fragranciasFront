export interface Product {
  _id:string;
  name:string;
  fullPrice:number;
  currentPrice:number;
  pixPrice:number;
  image: string;
  promoPercentage:number;
  categories?:string[];
  description?:string;
  active?:boolean;
  cod?:string;
  createdAt?:string;
  updatedAt?:string;
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
