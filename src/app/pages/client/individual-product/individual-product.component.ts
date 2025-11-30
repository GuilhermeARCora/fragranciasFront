import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, type Observable } from 'rxjs';
import { ToastService } from '../../../core/services/swal/toast.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StandardBtnComponent } from '../../../shared/components/standard-btn/standard-btn.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown/markdown.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import type { AfterViewInit, OnInit } from '@angular/core';
import type { Product } from '../../../shared/types/product';

@Component({
  selector: 'app-individual-product',
  imports: [
    CommonModule,
    StandardBtnComponent,
    MarkdownPipe,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatListModule
  ],
  templateUrl: './individual-product.component.html',
  styleUrl: './individual-product.component.scss'
})
export class IndividualProductComponent implements OnInit, AfterViewInit{

  productService = inject(ProductsService);
  cartService = inject(CartService);
  toaster = inject(ToastService);

  route = inject(ActivatedRoute);
  router = inject(Router);
  destroyRef = inject(DestroyRef);

  product$!: Observable<Product>;
  id!: string | null;

  amount:number = 1;

  ngOnInit(): void {
    this.watchRoute();
  };

  ngAfterViewInit(): void {
    queueMicrotask(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  watchRoute():void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(paramMap => {
        this.id = paramMap.get('id');
        this.amount = 1;
        this.getProduct();
      });
  };

  getProduct():void {
    const productState = history.state['product'] as Product | undefined;

    if(productState){
      this.product$ = of(productState);
    }else{
      this.product$ = this.productService.getOneProduct(this.id);
    };
  };

  addCart(product: Product): void {
    this.cartService.addOrUpdateCart(product, this.amount, true);
  };

  increase(): void {
    this.amount++;
  };

  decrease(): void {
    if (this.amount > 1) {
      this.amount--;

    };
  };

  shareWhatsapp(): void {
    let message = '';
    const title = 'Conheça esse produto da loja Fragrâncias Decor';
    const url = encodeURIComponent(window.location.href);
    message = `${title}%0A%0A${url}`;
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  copyLink(): void {
    navigator.clipboard.writeText(window.location.href);
    this.toaster.success('link copiado!');
  };

};
