import { Component, OnInit } from '@angular/core';
import { BannerComponent } from "../../shared/components/banner/banner.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryCardComponent } from "../../shared/components/category-card/category-card.component";
import { CategoryBanner } from '../../shared/types/banner';
import { NovidadesListComponent } from "../../shared/components/novidades-list/novidades-list.component";
@Component({
  selector: 'app-home',
  imports: [CommonModule, BannerComponent, RouterModule, CategoryCardComponent, NovidadesListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  listaDeCategorias: CategoryBanner[] = [];

  ngOnInit(): void {
    this.preencherListaDeUrls();
  };

  preencherListaDeUrls(){

    this.listaDeCategorias.push({
      url:'assets/img/aromatizadores.webp',
      tall:false,
      thick: false,
      name: "Aromatizadores"
    })

    this.listaDeCategorias.push({
      url:'assets/img/autoCuidado.webp',
      tall:false,
      thick: true,
      name: "Autocuidado"
    })

    this.listaDeCategorias.push({
      url:'assets/img/casaEBemEstar.webp',
      tall:true,
      thick: false,
      name: "Casa e Bem estar"
    })
  };

}
