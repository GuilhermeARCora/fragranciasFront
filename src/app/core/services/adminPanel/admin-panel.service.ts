import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
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
    this.http
      .get<ResponseData<OrdersStatistics>>(`${this.apiUrl}${this.pathOrder}/statistics`)
      .pipe(
        map(res => res.data)
      ).subscribe(data => this.ordersStatistics.set(data));
  };

  getOrdersEvolution(): void{
    this.http.get<ResponseData<OrdersEvolution[]>>(`${this.apiUrl}${this.pathOrder}/ordersEvolution`).pipe(
      map(res => res.data)
    ).subscribe(data => this.ordersEvolution.set(data));
  };

  getProductsStatistics():void {
    this.http.get<ResponseData<ProductsStatistics>>(`${this.apiUrl}${this.pathProduct}/statistics`).pipe(
      map(res => res.data)
    ).subscribe(data => this.productsStatistics.set(data));
  };

};
