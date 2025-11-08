import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AdminPanelService } from '../adminPanel/admin-panel.service';
import type { Order, OrderCreateItem, OrderFilter, OrderList } from '../../../shared/types/order';
import type { Observable } from 'rxjs';
import type { ResponseData } from './../../../shared/types/responseData';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  path = 'orders';

  router = inject(Router);
  adminPanelService = inject(AdminPanelService);

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  readonly orders$ = this.ordersSubject.asObservable();

  createOrder(items: OrderCreateItem[]): Observable<string>{
    return this.http.post<ResponseData<Order>>(`${this.apiUrl}${this.path}/`, { items }).pipe(
      map(v => v.data._id),
      tap(() => {
        this.adminPanelService.refreshStatistics();
        this.adminPanelService.refreshOrdersEvolution();
      })
    );
  };

  completeOrder(orderId:string): Observable<ResponseData<Order>>{
    return this.http.patch<ResponseData<Order>>(`${this.apiUrl}${this.path}/${orderId}/status`, { status : 'CONCLUIDO' }).pipe(
      tap(() => {
        this.adminPanelService.refreshStatistics();
        this.adminPanelService.refreshOrdersEvolution();
      })
    );
  };

  cancelOrder(orderId:string): Observable<ResponseData<Order>>{
    return this.http.patch<ResponseData<Order>>(`${this.apiUrl}${this.path}/${orderId}/status`, { status : 'CANCELADO' }).pipe(
      tap(() => {
        this.adminPanelService.refreshStatistics();
        this.adminPanelService.refreshOrdersEvolution();
      })
    );
  };

  findOneOrder(orderId:string): Observable<Order>{
    return this.http.get<ResponseData<Order>>(`${this.apiUrl}${this.path}/${orderId}`).pipe(
      map(v => v.data)
    );
  };

  findAllOrders(filters: OrderFilter): Observable<Order[]>{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params = new HttpParams({ fromObject:filters as any });

    return this.http.get<ResponseData<OrderList>>(`${this.apiUrl}${this.path}/`, { params }).pipe(
      map((res) => res.data.orders),
      tap(o => this.ordersSubject.next(o))
    );
  };

};
