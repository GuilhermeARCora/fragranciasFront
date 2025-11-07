import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, type Observable } from 'rxjs';
import { ToastService } from '../../../core/services/swal/toast.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StandardBtnComponent } from '../../../shared/components/standard-btn/standard-btn.component';
import { MarkdownPipe } from '../../../shared/pipes/markdown/markdown.pipe';
import type { AfterViewInit, ElementRef, OnInit } from '@angular/core';
import type { Product } from '../../../shared/types/Product';

@Component({
  selector: 'app-individual-product',
  imports: [
    CommonModule,
    StandardBtnComponent,
    MarkdownPipe
  ],
  templateUrl: './individual-product.component.html',
  styleUrl: './individual-product.component.scss'
})
export class IndividualProductComponent implements OnInit, AfterViewInit{

  @ViewChild('image') imageRef!: ElementRef<HTMLImageElement>;

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
      this.imageRef?.nativeElement.focus();
    });
  };

  watchRoute():void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(paramMap => {
        this.id = paramMap.get('id');
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

};
