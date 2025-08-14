import { Observable, of } from 'rxjs';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { ProductView } from '../../types/Product';

@Component({
  selector: 'app-novidades-list',
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './novidades-list.component.html',
  styleUrl: './novidades-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NovidadesListComponent implements OnInit{

  products$!: Observable<ProductView[]>;

  ngOnInit(): void {
    this.products$ = of([this.product1, this.product2, this.product3, this.product4, this.product5]);
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

}
