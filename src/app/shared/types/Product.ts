export interface ProductView {
  _id:string;
  imgUrl: string;
  name:string;
  fullPrice:string;
  currentPrice:string;
  pixPrice:string;
  isInPromo:boolean;
  promoPorcentage:number;
}

export interface ProductForm{
  _id?:string;
  imgUrl: string;
  name:string;
  fullPrice:number;
  currentPrice:number;
  pixPrice:number;
  isInPromo:boolean;
  promoPorcentage:number;
  cod:string;
}
