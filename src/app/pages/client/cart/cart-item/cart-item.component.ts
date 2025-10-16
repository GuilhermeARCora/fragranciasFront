import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Product } from '../../../../shared/types/Product';
import { CommonModule } from '@angular/common';
import { BreakPointService } from '../../../../core/services/breakPoint/break-point.service';
import { ShoppingCartService } from '../../../../core/services/shoppingCart/shopping-cart.service';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-cart-item',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent implements OnInit{

  @Input({required:true}) product!: Product;
  @Input({required:true}) amount!:number;
  @Input({required:true}) isModoView!:boolean;
  cartService = inject(ShoppingCartService);
  breakPointService = inject(BreakPointService);

  itemCurrentPrice$!: Observable<number>;
  itemFullPrice$!: Observable<number>;

  ngOnInit(): void {
    this.calcCurrentTotalAmount();
    this.calcFullTotalAmount();
  };

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

  calcCurrentTotalAmount():void{

    this.itemCurrentPrice$ = this.cartService.cart$.pipe(
      map(v => {
        const item = v.items.find(v => v.product._id === this.product._id)

        return item ? item?.product.currentPrice * this.amount : 0;
      })
    );

  };

  calcFullTotalAmount():void{

    this.itemFullPrice$ = this.cartService.cart$.pipe(
      map(v => {
        const item = v.items.find(v => v.product._id === this.product._id)

        return item ? item?.product.fullPrice * this.amount : 0;
      })
    );

  };

};
