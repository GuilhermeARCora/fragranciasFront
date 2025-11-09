import { Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import type { AfterViewInit, ElementRef } from '@angular/core';
import type { Product } from '../../../shared/types/product';
import { debounceTime, tap, timer, type Observable } from 'rxjs';
import type { SwiperContainer } from 'swiper/element';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-list-of-products',
  imports: [
    CommonModule,
    ProductCardComponent
  ],
  templateUrl: './list-of-products.component.html',
  styleUrl: './list-of-products.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListOfProductsComponent implements AfterViewInit {

  @ViewChild('swiperEl') swiperEl!: ElementRef<SwiperContainer>;
  @Input({ required:true }) products$!: Observable<Product[]>;
  productService = inject(ProductsService);
  destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    // Delay reativo para garantir renderização estável
    timer(400)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.forceUpdate());

    // Quando os produtos chegam, refaz update com debounce
    this.products$
      .pipe(
        debounceTime(250),
        tap(() => timer(150).subscribe(() => this.forceUpdate())),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  forceUpdate(): void {
    const swiper = this.swiperEl?.nativeElement?.swiper;
    if (!swiper) return;

    swiper.update();
    swiper.slideTo(0);
  }

};
