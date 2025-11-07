import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakPointService } from '../../../../core/services/breakPoint/break-point.service';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../../core/services/cart/cart.service';
import { Router } from '@angular/router';
import type { Product } from '../../../../shared/types/Product';

@Component({
  selector: 'app-cart-item',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent{

  @Input({ required:true }) product!: Product;
  @Input({ required:true }) amount!:number;
  @Input({ required:true }) isModoView!:boolean;

  cartService = inject(CartService);
  breakPointService = inject(BreakPointService);
  router = inject(Router);

  itemCurrentPrice = computed(() => {
    const cart = this.cartService.cartSignal();
    const item = cart.items.find(v => v.product._id === this.product._id);
    return item ? item.product.currentPrice * this.amount : 0;
  });

  itemFullPrice = computed(() => {
    const cart = this.cartService.cartSignal();
    const item = cart.items.find(v => v.product._id === this.product._id);
    return item ? item.product.fullPrice * this.amount : 0;
  });

  increase(): void {
    this.amount++;
    this.cartService.addOrUpdateCart(this.product, this.amount);
  };

  decrease(): void {
    if (this.amount > 1) {
      this.amount--;
      this.cartService.addOrUpdateCart(this.product, this.amount);
    };
  };

  removeItem(product:Product):void{
    this.cartService.removeProductFromCart(product._id);
  };

  redirectToProduct(product : Product){
    this.router.navigate([`/produto/${product._id}`], {
      state: { product }
    });
  };

};
