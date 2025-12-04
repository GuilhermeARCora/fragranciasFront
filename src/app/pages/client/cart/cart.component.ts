import { OrderService } from './../../../core/services/order/order.service';
import { Component, computed, DestroyRef, inject } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item/cart-item.component';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { ToastService } from '../../../core/services/swal/toast.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CheckoutService } from '../../../core/services/checkout/checkout.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import Swal from 'sweetalert2';
import type { Order } from '../../../shared/types/order';
import type { OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    CartItemComponent,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  toaster = inject(ToastService);
  breakPointService = inject(BreakPointService);

  authService = inject(AuthService);
  checkoutService = inject(CheckoutService);
  OrderService = inject(OrderService);
  cartService = inject(CartService);

  destroyRef = inject(DestroyRef);
  router = inject(Router);
  route = inject(ActivatedRoute);

  cartTotalDiscount = computed(() => {
    const cart = this.cartService.cartSignal();

    return (cart.totalFullPrice ?? 0) - (cart.totalCurrentPrice ?? 0);
  });

  orderId!:string | null;
  private orderSubject = new BehaviorSubject<Order | null>(null);
  readonly order$ = this.orderSubject.asObservable();
  readonly orderItems$ = this.order$.pipe(map(order => order?.items));
  readonly orderStatus$ = this.order$.pipe(map(order => order?.status));
  readonly orderTotalFullPrice$ = this.order$.pipe(map(order => order?.totalFullPrice));
  readonly orderTotalCurrentPrice$ = this.order$.pipe(map(order => order?.totalCurrentPrice));
  readonly orderTotalDiscount$ = this.order$.pipe(map(order => order?.totalDiscount));
  readonly orderTotalPixPrice$ = this.order$.pipe(map(order => order?.totalPixPrice));

  viewMode:boolean = false;

  ngOnInit(): void {
    this.isOrder();
  };

  isOrder():void{
    this.orderId = this.route.snapshot.paramMap.get('id');

    if(!this.orderId) return;

    this.viewMode = true;
    this.getOrder(this.orderId);
  };

  getOrder(orderId: string):void{
    this.OrderService.findOneOrder(orderId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(order => {
      this.orderSubject.next(order);
    });
  };

  isClient(): void {
    Swal.fire({
      title: 'Já é cliente?',
      text: 'Se sim, enviaremos seu carrinho direto para o WhatsApp.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, já sou!',
      cancelButtonText: 'Não, preciso preencher meus dados',
      confirmButtonColor: '#1b7d0c',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {

        this.checkoutService.alreadyAClient();
      } else if (result.dismiss === Swal.DismissReason.cancel) {

        this.router.navigateByUrl('/checkout');
      }
    });
  };

  endOrder(): void {
    if (!this.orderId) return;

    this.OrderService.completeOrder(this.orderId!).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(() => this.OrderService.findOneOrder(this.orderId!))
    ).subscribe(order => {
      this.toaster.success('Pedido finalizado com sucesso');
      this.orderSubject.next(order);
    });
  };

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href);
    this.toaster.success('link copiado!');
  };

};
