//sera deletado
export interface ProductView {
  _id:string;
  imgUrl: string;
  name:string;
  fullPrice:string;
  currentPrice:string;
  pixPrice:string;
  isInPromo:boolean;
  promoPorcentage:number;
};
export interface Product {
  _id:string;
  name:string;
  fullPrice:number;
  currentPrice:number;
  pixPrice:number;
  description:string;
  imageUrl: string;
  categories:string[];
  active?:boolean;
  promoPercentage?:number;
  cod:string;
  createdAt?:string;
  updatedAt?:string;
};
export interface ProductForm {
  name:string;
  fullPrice:number;
  description:string;
  image: File;
  categories:string[];
  promoPercentage?:number;
  cod:string;
};

export interface ProductResponse{
  message:string;
  product: Product;
};

export interface ProductAllRes{
  message:string;
  products: Product[];
};
