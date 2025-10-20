import { Observable } from 'rxjs';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { Product } from '../../../shared/types/Product';

@Component({
  selector: 'app-novidades-list',
  imports: [
    CommonModule,
    ProductCardComponent
  ],
  templateUrl: './novidades-list.component.html',
  styleUrl: './novidades-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NovidadesListComponent implements OnInit{

  productService = inject(ProductsService);
  products$!: Observable<Product[]>;

  ngOnInit(): void {
    this.products$ = this.productService.getLastAddedProducts();
  };

};
