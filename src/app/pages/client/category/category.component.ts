import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { BannerComponent } from "../../../shared/components/banner/banner.component";
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { Product } from '../../../shared/types/Product';
import { ProductsService } from '../../../core/services/products/products.service';
import { ToastService } from '../../../core/services/swal/toast.service';
import { LayoutComponent } from '../layout/layout.component';

@Component({
  selector: 'app-category',
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    ProductCardComponent,
    BannerComponent,
    LayoutComponent
],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  router = inject(Router);
  productService = inject(ProductsService);
  toaster = inject(ToastService);
  breakPointService = inject(BreakPointService);

  page = 1;

  products = signal<Product[]>([]);
  amount = signal<number>(0);

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
        if(products.length === 0)return this.toaster.info("Todos os produtos já foram listados");

        const currentProducts = this.products();
        this.products.set([...currentProducts,...products]);

        const amount = v.data.amount;
        const currentAmount = this.amount();
        this.amount.set(amount + currentAmount);
      });
  };

  showMoreProducts():void{
    this.setProducts(++this.page);
  };

};
