import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import type { Product } from '../../../shared/types/product';

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

  @Input({ required:true }) products!: Product[] | null;

};
