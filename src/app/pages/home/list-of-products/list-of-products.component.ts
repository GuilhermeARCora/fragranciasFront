import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import type { Product } from '../../../shared/types/Product';
import type { Observable } from 'rxjs';

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
export class ListOfProductsComponent {

  productService = inject(ProductsService);
  @Input({ required:true }) products$!: Observable<Product[]>;

};
