import { Component, inject, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { ProductsService } from '../../../core/services/products/products.service';
import { ToastService } from '../../../core/services/swal/toast.service';
import type { Product } from '../../../shared/types/product';
import type { OnInit } from '@angular/core';
@Component({
  selector: 'app-category',
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    ProductCardComponent
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  router = inject(Router);
  productService = inject(ProductsService);
  toaster = inject(ToastService);
  breakPointService = inject(BreakPointService);

  page:number = 1;
  amount:number = 0;
  firstLoad:boolean = true;

  products = signal<Product[]>([]);

  categories:string[] = ['aromatizadores', 'autoCuidado', 'casaEBemEstar'];
  categoryFromURl!:string;

  ngOnInit(): void {
    this.getCategoryFromUrl();
    this.setProducts();
  };

  getCategoryFromUrl():void{
    const currentUrl = this.router.url;
    const lastSlash = currentUrl.lastIndexOf('/');
    this.categoryFromURl = currentUrl.slice(lastSlash+1);
  };

  setProducts(page = 1):void{
    this.productService.getProductsByCategory(this.categoryFromURl, page).subscribe(v => {
      const products = v.data.products;
      if(products.length === 0 && !this.firstLoad) return this.toaster.info('Todos os produtos já foram listados');
      this.firstLoad = false;

      const currentProducts = this.products();
      this.products.set([...currentProducts,...products]);

      const amount = v.data.amount;
      const currentAmount = this.amount;
      this.amount = amount + currentAmount;
    });
  };

  showMoreProducts():void{
    this.setProducts(++this.page);
  };

};
