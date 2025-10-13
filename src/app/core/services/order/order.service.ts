import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from '../swal/toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  toaster = inject(ToastService);
  router = inject(Router);

  private ordersSubject = new BehaviorSubject<[]>([]);
  readonly orders$ = this.ordersSubject.asObservable();

  createOrder():void{
    //criar order e retornar id

  };

  completeOrder(orderId:string):void{


    this.toaster.success("Pedido finalizado com sucesso!");
    this.router.navigateByUrl('/admin/home');
  };

  findOneOrder(id:string):void{

  };

  findAllOrders(filters:any):void{

  };

};
