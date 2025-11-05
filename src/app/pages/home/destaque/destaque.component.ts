import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, inject, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import type { AfterViewInit, ElementRef } from '@angular/core';
import type { Product } from '../../../shared/types/Product';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-destaque',
  imports: [
    CommonModule,
    ProductCardComponent
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './destaque.component.html',
  styleUrl: './destaque.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DestaqueComponent implements AfterViewInit{

  productService = inject(ProductsService);

  @ViewChild('swiperEl', { static: true }) swiperEl!: ElementRef;

  private products$ = this.productService
    .getProductsByCategory('destaque')
    .pipe(map(v => v.data.products));

  readonly productsSig = toSignal(this.products$, { initialValue: [] as Product[] });

  // Track current active slide index
  private activeIndexSig = signal(0);

  // Derive the active product reactively
  readonly activeProduct = computed(() => {
    const list = this.productsSig();
    const index = this.activeIndexSig();
    return list[index % (list.length || 1)];
  });

  ngAfterViewInit(): void {
    const el = this.swiperEl.nativeElement;

    Object.assign(el, {
      loop: true,
      centeredSlides: true,
      slideToClickedSlide: true,
      grabCursor: true,
      watchSlidesProgress: true,
      loopAdditionalSlides: 6,
      speed: 400,
      breakpoints: {
        0: { slidesPerView: 1.2, spaceBetween: 12 },
        500: { slidesPerView: 1.4, spaceBetween: 14 },
        768: { slidesPerView: 1.7, spaceBetween: 16 },
        950: { slidesPerView: 2.1, spaceBetween: 18 },
        1200: { slidesPerView: 2.6, spaceBetween: 20 },
        1600: { slidesPerView: 3.1, spaceBetween: 22 }
      },
      on: {
        slideChange: () => {
          const real = el.swiper?.realIndex ?? 0;
          this.activeIndexSig.set(real);
        }
      }
    });

    el.initialize?.();

    // Start centered on the first product
    queueMicrotask(() => {
      el.swiper?.slideToLoop(0, 0);
    });
  }

};
