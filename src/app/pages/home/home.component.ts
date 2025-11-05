import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryCardComponent } from './category-card/category-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { AtendimentoAoClienteComponent } from './atendimento-ao-cliente/atendimento-ao-cliente.component';
import { AutoScrollOnOpenDirective } from '../../shared/directives/autoScrollOnOpen/auto-scroll-on-open.directive';
import { LayoutComponent } from '../client/layout/layout.component';
import { ListOfProductsComponent } from './list-of-products/list-of-products.component';
import { ProductsService } from '../../core/services/products/products.service';
import { map } from 'rxjs';
import type { CategoryBanner } from '../../shared/types/Banner';
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
    LayoutComponent,
    AutoScrollOnOpenDirective,
    ListOfProductsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  productService = inject(ProductsService);
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

};
