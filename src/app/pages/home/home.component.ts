import { Component, ChangeDetectionStrategy, inject, PLATFORM_ID } from '@angular/core';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryCardComponent } from './category-card/category-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { AtendimentoAoClienteComponent } from './atendimento-ao-cliente/atendimento-ao-cliente.component';
import { AutoScrollOnOpenDirective } from '../../shared/directives/autoScrollOnOpen/auto-scroll-on-open.directive';
import { ProductsService } from '../../core/services/products/products.service';
import { map } from 'rxjs';
import type { OnInit } from '@angular/core';
import type { CategoryBanner } from '../../shared/types/banner';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    BannerComponent,
    RouterModule,
    CategoryCardComponent,
    MatExpansionModule,
    SobreNosComponent,
    PoliticasComponent,
    AtendimentoAoClienteComponent,
    AutoScrollOnOpenDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{

  productService = inject(ProductsService);
  platformId = inject(PLATFORM_ID);

  categories: CategoryBanner[] = [
    {
      url:'assets/img/aromatizadores.webp',
      tall:false,
      thick: false,
      name: 'Aromatizadores'
    },
    {
      url:'assets/img/autoCuidado.webp',
      tall:false,
      thick: true,
      name: 'Autocuidado'
    },
    {
      url:'assets/img/casaEBemEstar.webp',
      tall:true,
      thick: false,
      name: 'Casa e Bem estar'
    }
  ];

  productsDestaque$ = this.productService
    .getProductsByCategory('destaque')
    .pipe(map(v => v.data.products));

  productsLatest$ = this.productService.getLastAddedProducts();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listComponent: any = null;
  isBrowser = false;

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      import('./list-of-products/list-of-products.component').then(c => this.listComponent = c.ListOfProductsComponent);
    }
  };

};
