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

export interface ProductResponse{
  message:string;
  product: Product;
};

export interface ProductAllRes{
  message:string;
  products: Product[];
};

export interface ProductByCategoryRes{
  message:string;
  products: Product[];
  amount:number;
};
