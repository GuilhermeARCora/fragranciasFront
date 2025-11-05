import { Component, inject, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { FormsModule } from '@angular/forms';
import { StandardBtnComponent } from '../standard-btn/standard-btn.component';
import { CartService } from '../../../core/services/cart/cart.service';
import { Router } from '@angular/router';
import type { Product } from '../../types/Product';

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

  @Input({ required:true }) product!: Product;
  isCategory = input<boolean>(false);

  cartService = inject(CartService);
  breakPointService = inject(BreakPointService);
  router = inject(Router);

  addCart(product: Product): void {
    this.cartService.addOrUpdateCart(product, 1, true);
  };

  redirectToProduct(product : Product){
    this.router.navigate([`/produto/${product._id}`], {
      state: { product }
    });
  };

};
