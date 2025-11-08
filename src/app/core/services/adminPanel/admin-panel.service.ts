import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { finalize, map } from 'rxjs';
import type { ResponseData } from '../../../shared/types/responseData';
import type { OrdersStatistics, OrdersEvolution, ProductsStatistics } from '../../../shared/types/adminPanel';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  pathOrder = 'orders';
  pathProduct = 'products';

  readonly ordersStatistics = signal<OrdersStatistics | null>(null);

  readonly ordersEvolution = signal<OrdersEvolution[] | null>(null);

  readonly productsStatistics = signal<ProductsStatistics | null>(null);

  getStatisticsForOrder():void {
    if(this.ordersStatistics()) return;

    this.refreshStatistics();
  };

  private loadingOrders = false;
  refreshStatistics(): void {
    if (this.loadingOrders) return;
    this.loadingOrders = true;

    this.http
      .get<ResponseData<OrdersStatistics>>(`${this.apiUrl}${this.pathOrder}/statistics`)
      .pipe(
        map(res => res.data),
        finalize(() => (this.loadingOrders = false))
      )
      .subscribe(data => this.ordersStatistics.set(data));
  };

  getOrdersEvolution(): void{
    if(this.ordersEvolution()) return;

    this.refreshOrdersEvolution();
  };

  private loadingEvolution = false;
  refreshOrdersEvolution(): void{
    if (this.loadingEvolution) return;
    this.loadingEvolution = true;

    this.http.get<ResponseData<OrdersEvolution[]>>(`${this.apiUrl}${this.pathOrder}/ordersEvolution`).pipe(
      map(res => res.data),
      finalize(() => (this.loadingEvolution = false))
    ).subscribe(data => this.ordersEvolution.set(data));
  };

  getProductsStatistics():void {
    if(this.productsStatistics()) return;

    this.refreshProductsStatistics();
  };

  private loadingProducts= false;
  refreshProductsStatistics():void {
    if (this.loadingProducts) return;
    this.loadingProducts = true;

    this.http.get<ResponseData<ProductsStatistics>>(`${this.apiUrl}${this.pathProduct}/statistics`).pipe(
      map(res => res.data),
      finalize(() => (this.loadingProducts = false))
    ).subscribe(data => this.productsStatistics.set(data));

  };

};
