export interface OrdersStatistics {
  amountStatusPendente: number,
  amountStatusConcluido: number,
  amountStatusCancelado: number,
  amountInTheLastTwoDays: number,
  amountWithFinalPriceOverFiveHundred: number,
};

export interface OrdersEvolution {
  month : string,
  PENDENTE: number,
  CONCLUIDO: number,
  CANCELADO: number
};

export interface ProductsStatistics {
  countActiveProds:number,
  countInactiveProds:number,
  countInPromo:number,
  greatestDiscount:number,
  countProdsAroma:number,
  countProdsAuto:number,
  countProdsCasa:number,
  countProdsDest: number
};
