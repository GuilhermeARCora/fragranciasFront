import { Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, inject, Input, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import type { AfterViewInit, ElementRef } from '@angular/core';
import type { Product } from '../../../shared/types/product';
import { combineLatest, debounceTime, filter, fromEvent, type Observable } from 'rxjs';
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
  zone = inject(NgZone);

  ngAfterViewInit(): void {
    this.products$
      .pipe(
        filter(p => !!p && p.length > 0),
        debounceTime(200),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.waitImagesAndUpdate();
      });
  }

  private waitImagesAndUpdate(): void {
    const container = this.swiperEl.nativeElement as HTMLElement;
    const imgs = Array.from(container.querySelectorAll('img'));

    if (imgs.length === 0) {
      this.safeUpdate();
      return;
    }

    // Espera todas as imagens terminarem de carregar
    const imageLoads$ = imgs.map(img => fromEvent(img, 'load'));

    combineLatest(imageLoads$)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.safeUpdate();
      });

    // Se já estavam cacheadas
    if (imgs.every(img => img.complete)) {
      this.safeUpdate();
    }
  }

  private safeUpdate(): void {
    this.zone.runOutsideAngular(() => {
      const swiper = this.swiperEl?.nativeElement?.swiper;
      if (!swiper) return;

      requestAnimationFrame(() => {
        swiper.update();
        swiper.slideTo(0);
      });
    });
  }

};
