import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BannerComponent } from "../../shared/components/banner/banner.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryCardComponent } from "../../shared/components/category-card/category-card.component";
import { NovidadesListComponent } from "../../shared/components/novidades-list/novidades-list.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { SobreNosComponent } from "./sobre-nos/sobre-nos.component";
import { PoliticasComponent } from "./politicas/politicas.component";
import { AtendimentoAoClienteComponent } from "./atendimento-ao-cliente/atendimento-ao-cliente.component";
import { AutoScrollOnOpenDirective } from '../../shared/directives/autoScrollOnOpen/auto-scroll-on-open.directive';
import { CategoryBanner } from '../../shared/types/Banner';
import { LayoutComponent } from '../client/layout/layout.component';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    BannerComponent,
    RouterModule,
    CategoryCardComponent,
    NovidadesListComponent,
    MatExpansionModule,
    SobreNosComponent,
    PoliticasComponent,
    AtendimentoAoClienteComponent,
    LayoutComponent,
    AutoScrollOnOpenDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  categories: CategoryBanner[] = [];

  ngOnInit(): void {
    this.categoriesList();
  };

  categoriesList(): void{

    this.categories.push({
      url:'assets/img/aromatizadores.webp',
      tall:false,
      thick: false,
      name: "Aromatizadores"
    });

    this.categories.push({
      url:'assets/img/autoCuidado.webp',
      tall:false,
      thick: true,
      name: "Autocuidado"
    });

    this.categories.push({
      url:'assets/img/casaEBemEstar.webp',
      tall:true,
      thick: false,
      name: "Casa e Bem estar"
    });
  };

};
