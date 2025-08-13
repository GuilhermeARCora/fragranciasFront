import { Component, Input } from '@angular/core';
import { ProductView } from '../../types/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product: ProductView = {
    _id:'',
    imgUrl: '',
    name: '',
    fullPrice: '',
    currentPrice: '',
    pixPrice: '',
    isInPromo: false,
    promoPorcentage: 0,
  };

  addCart($event:MouseEvent):void{
    const id = this.product._id;
    console.log('Produto '+id);
  };

}
