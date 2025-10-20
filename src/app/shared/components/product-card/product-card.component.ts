import { Component, DestroyRef, inject, input, Input, signal } from '@angular/core';
import { Product } from '../../types/Product';
import { CommonModule } from '@angular/common';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { FormsModule } from '@angular/forms';
import { StandardBtnComponent } from "../standard-btn/standard-btn.component";
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartService } from '../../../core/services/cart/cart.service';
import { Router } from '@angular/router';

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

  @Input({required:true}) product!: Product
  isCategory = input<boolean>(false);

  cartService = inject(CartService);
  breakPointService = inject(BreakPointService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);

  added = signal(false);

  addCart(product: Product): void {
    this.cartService.addOrUpdateCart(product, 1, true);
    this.added.set(true);

    timer(1200)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.added.set(false));
  };

  redirectToProduct(product : Product){
    this.router.navigate([`/produto/${product._id}`], {
      state: product
    });
  };

};
