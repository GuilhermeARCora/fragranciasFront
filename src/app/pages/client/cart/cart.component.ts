import { OrderService } from './../../../core/services/order/order.service';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ShoppingCartService } from '../../../core/services/shoppingCart/shopping-cart.service';
import { combineLatest, map, Observable } from 'rxjs';
import { CommonModule, Location } from '@angular/common';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { ToastService } from '../../../core/services/swal/toast.service';
import { LayoutComponent } from '../layout/layout.component';
import { CartItem } from '../../../shared/types/Cart';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import Swal from 'sweetalert2';
import { CheckoutService } from '../../../core/services/checkout/checkout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    CartItemComponent,
    LayoutComponent
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
  cartService = inject(ShoppingCartService);

  destroyRef = inject(DestroyRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  location = inject(Location);

  cartItems$!: Observable<CartItem[]>;
  cartDiscountTotal$!: Observable<number>;

  orderItems$!: Observable<CartItem[]>;

  orderId = this.route.snapshot.paramMap.get('id');
  viewMode = signal<boolean>(false);

  ngOnInit(): void {
    this.cartItems$ = this.getItemsFromCart();
    this.calcCartDiscount();
    this.isOrder();
  };

  getItemsFromCart(): Observable<CartItem[]>{
    return this.cartService.cart$.pipe(
      map(cart => cart.items)
    );
  };

  calcCartDiscount():void{

    this.cartDiscountTotal$ = combineLatest([
      this.cartService.cartFullPriceTotal$,
      this.cartService.cartCurrentPriceTotal$
    ]).pipe(
      map(([full, current]) => (full ?? 0) - (current ?? 0)),
      takeUntilDestroyed(this.destroyRef)
    );

  };

  isOrder():void{

    if(!this.orderId) return;

    this.viewMode.set(true);
  };

  isClient(): void {
    Swal.fire({
      title: "Já é cliente?",
      text: "Se sim, enviaremos seu carrinho direto para o WhatsApp.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim, já sou!",
      cancelButtonText: "Não, preciso fazer o checkout",
      confirmButtonColor: "#1b7d0c",
      cancelButtonColor: "#d33",
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {

        this.checkoutService.alreadyAClient();
        this.toaster.success("Carrinho enviado para o WhatsApp com sucesso!");
      } else if (result.dismiss === Swal.DismissReason.cancel) {

        this.router.navigateByUrl('/checkout');
      }
    });
  };

  endOrder():void{
    this.OrderService.completeOrder(this.orderId!);
  };

  redirectBack():void{
    this.location.back();
  };

};
