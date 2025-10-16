import { inject, Injectable } from '@angular/core';
import { OrderService } from '../order/order.service';
import { CheckoutMsg } from '../../../shared/types/Checkout';
import { Cart } from '../../../shared/types/Cart';
import { OrderCreateItem } from '../../../shared/types/Order';
import { map, take } from 'rxjs';
import { ToastService } from '../swal/toast.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  orderService = inject(OrderService);
  whatsappNumber =  61996263326;
  toaster = inject(ToastService);

  mapCartToOrderItems(cart: Cart): OrderCreateItem[] {
    return cart.items.map(item => ({
      _id: item.product._id,
      name: item.product.name,
      fullPrice: item.product.fullPrice,
      promoPercentage: item.product.promoPercentage,
      amount: item.amount,
      image: item.product.image
    }));
  };

  alreadyAClient():void{
    const cart:Cart = JSON.parse(localStorage.getItem('cart') || 'null');
    if (!cart || !cart.items?.length) {
      this.toaster.info('Seu carrinho está vazio');
      return;
    };

    const orderItems = this.mapCartToOrderItems(cart);

    this.orderService.createOrder(orderItems).pipe(take(1)).subscribe(id => {
       this.whatsAppMessage(true, id);
    });
  };

  newClient(form: CheckoutMsg):void{
    const cart:Cart = JSON.parse(localStorage.getItem('cart') || 'null');
    if (!cart || !cart.items?.length) {
      this.toaster.info('Seu carrinho está vazio');
      return;
    };

    const orderItems = this.mapCartToOrderItems(cart);
    const { fullName, cpfOrCnpj, email, address } = form;
    const checkoutMessage = `Nome: ${fullName}\nCPF/CNPJ: ${cpfOrCnpj}\nEmail: ${email}\nEndereço: ${address}`;

    this.orderService.createOrder(orderItems).pipe(take(1)).subscribe(id => {
       this.whatsAppMessage(false, id, checkoutMessage);
    });
  };

  private whatsAppMessage(isClient:boolean, orderId: string, checkoutMsg?:string){
    const link = `http://localhost:4200/pedido/${orderId}`;

    let message = '';

    if(isClient){
      const salutations = 'Olá, já sou cliente e gostaria de prosseguir com minha compra!';
      const orderMessage = `Meu carrinho: ${link}`;

      message = `${salutations}\n\n${orderMessage}`;
    }else{
      const checkout = checkoutMsg; // retorna objeto ou texto com dados do novo cliente

      const salutations = 'Olá, sou um novo cliente e gostaria de prosseguir com minha compra!';
      const checkoutInfo = `Aqui vão as minhas informações preenchidas no checkout:\n${checkout}`;
      const orderMessage = `Meu carrinho: ${link}`;

      message = `${salutations}\n\n${checkoutInfo}\n\n${orderMessage}`;
    };

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/55${this.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

};
