import { Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, inject, Input, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import type { AfterViewInit, ElementRef } from '@angular/core';
import type { Product } from '../../../shared/types/product';
import { debounceTime, filter, type Observable } from 'rxjs';
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
        filter((p) => !!p && p.length > 0),
        debounceTime(200),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        // pequeno atraso para o Angular pintar a tela
        setTimeout(() => this.reflowAndUpdate(), 300);
      });
  }

  private reflowAndUpdate(): void {
    const swiperEl = this.swiperEl.nativeElement as any;
    if (!swiperEl) return;

    const swiper = swiperEl.swiper;
    if (!swiper) return;

    // 🔥 Safari às vezes não atualiza o layout até forçarmos um reflow
    swiperEl.style.display = 'none';
    void swiperEl.offsetHeight; // força reflow
    swiperEl.style.display = '';

    // agora reatualiza o swiper
    this.zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        swiper.update();
        swiper.slideTo(0);
      });
    });
  }

};
