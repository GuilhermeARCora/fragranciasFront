import { Component, inject, input, Input } from '@angular/core';
import { Product } from '../../types/Product';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../../core/services/shoppingCart/shopping-cart.service';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { FormsModule } from '@angular/forms';
import { StandardBtnComponent } from "../standard-btn/standard-btn.component";

@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    FormsModule,
    StandardBtnComponent
],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: Product

  isCategory = input<boolean>(false);

  cartService = inject(ShoppingCartService);
  breakPointService = inject(BreakPointService);

  addCart(product: Product):void{
    this.cartService.addProductToCart(product);
  };

};
