import { ResponseData } from './../../../shared/types/ResponseData';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Order, OrderCreateItem, OrderFilter, OrderList } from '../../../shared/types/Order';
import { AdminPanelService } from '../adminPanel/admin-panel.service';

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
        this.adminPanelService.refreshStatistics()
        this.adminPanelService.refreshOrdersEvolution()
      })
    );
  };

  completeOrder(orderId:string): Observable<ResponseData<Order>>{
    return this.http.patch<ResponseData<Order>>(`${this.apiUrl}${this.path}/${orderId}/status`, {status : 'CONCLUIDO'}).pipe(
      tap(() => {
        this.adminPanelService.refreshStatistics()
        this.adminPanelService.refreshOrdersEvolution()
      })
    );
  };

  cancelOrder(orderId:string): Observable<ResponseData<Order>>{
    return this.http.patch<ResponseData<Order>>(`${this.apiUrl}${this.path}/${orderId}/status`, {status : 'CANCELADO'}).pipe(
      tap(() => {
        this.adminPanelService.refreshStatistics()
        this.adminPanelService.refreshOrdersEvolution()
      })
    );
  };

  findOneOrder(orderId:string): Observable<Order>{
    return this.http.get<ResponseData<Order>>(`${this.apiUrl}${this.path}/${orderId}`).pipe(
      map(v => v.data)
    );
  };

  findAllOrders(filters: OrderFilter): Observable<Order[]>{
    const params = new HttpParams({fromObject:filters as any });

    return this.http.get<ResponseData<OrderList>>(`${this.apiUrl}${this.path}/`, { params }).pipe(
      map((res) => res.data.orders),
      tap(o => this.ordersSubject.next(o))
    );
  };

};
