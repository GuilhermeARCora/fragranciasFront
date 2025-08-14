import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderCartComponent } from '../../shared/components/header-cart/header-cart.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { BannerComponent } from "../../shared/components/banner/banner.component";
import { ProductCardComponent } from "../../shared/components/product-card/product-card.component";
import { Observable, of } from 'rxjs';
import { ProductView } from '../../shared/types/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [CommonModule,HeaderCartComponent, MatTooltipModule, MatIconModule, RouterModule, BannerComponent, ProductCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  router = inject(Router);
  title = signal<string>('Categoria');
  categories:string[] = ['aromatizadores', 'autoCuidado', 'casaEBemEstar'];
  products$!: Observable<ProductView[]>;

  ngOnInit(): void {
    this.setTitle();
    this.products$ = of([this.product1, this.product2, this.product3, this.product4, this.product5]);
  };

  setTitle():void{
    const currentUrl = this.router.url;
    const lastSlash = currentUrl.lastIndexOf('/');
    const category = currentUrl.slice(lastSlash+1);

    if(category === 'aromatizadores'){
      this.title.set('Aromatizadores')
    }else if(category === 'autoCuidado'){
      this.title.set('Autocuidado')
    }else{
      this.title.set('Casa e Bem estar')
    };

  };

    product1:ProductView = {
      _id:'1',
      imgUrl: 'assets/img/difusorTomada.webp',
      name:"Difusor Aromatizador Elétrico Bivolt Standard - Via AromaAAAAAAAAA",
      fullPrice:"R$41,00",
      currentPrice:"R$32,90",
      pixPrice:"R$31,00",
      isInPromo:false,
      promoPorcentage:0,
    }

    product2:ProductView = {
      _id:'2',
      imgUrl: 'assets/img/aguaPerfumada.webp',
      name:"Água Perfumada Lavanda Aromatherapy Via Aroma - 250ml",
      fullPrice:"R$41,00",
      currentPrice:"R$30,00",
      pixPrice:"R$28,00",
      isInPromo:true,
      promoPorcentage:8,
    }

    product3:ProductView = {
      _id:'3',
      imgUrl: 'assets/img/aguaPerfumada.webp',
      name:"Água Perfumada Lavanda Aromatherapy Via Aroma - 250ml",
      fullPrice:"R$41,00",
      currentPrice:"R$30,00",
      pixPrice:"R$28,00",
      isInPromo:false,
      promoPorcentage:0,
    }

    product4:ProductView = {
      _id:'4',
      imgUrl: 'assets/img/difusorTomada.webp',
      name:"Difusor Aromatizador Elétrico Bivolt Standard - Via Aroma",
      fullPrice:"R$41,00",
      currentPrice:"R$32,90",
      pixPrice:"R$31,00",
      isInPromo:true,
      promoPorcentage:5,
    }

    product5:ProductView = {
      _id:'5',
      imgUrl: 'assets/img/aguaPerfumada.webp',
      name:"Água Perfumada Lavanda Aromatherapy Via Aroma - 250ml",
      fullPrice:"R$41,00",
      currentPrice:"R$30,00",
      pixPrice:"R$28,00",
      isInPromo:false,
      promoPorcentage:0,
    }

};
