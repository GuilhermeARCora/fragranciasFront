import { Component, DestroyRef, inject, input, Input, signal } from '@angular/core';
import { Product } from '../../types/Product';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../../core/services/shoppingCart/shopping-cart.service';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { FormsModule } from '@angular/forms';
import { StandardBtnComponent } from "../standard-btn/standard-btn.component";
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  cartService = inject(ShoppingCartService);
  breakPointService = inject(BreakPointService);
  destroyRef = inject(DestroyRef);

  added = signal(false);

  addCart(product: Product): void {
    this.cartService.addOrUpdateCart(product);
    this.added.set(true);

    timer(1200)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.added.set(false));
  };

};
