import { Component, inject, Input } from '@angular/core';
import { ProductView } from '../../types/Product';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../../core/services/shoppingCart/shopping-cart.service';

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

  cartService = inject(ShoppingCartService);

  addCart($event:MouseEvent):void{

    this.cartService.addProductToCart(this.product);

    console.log('Produto '+ this.product.name);
  };

}
