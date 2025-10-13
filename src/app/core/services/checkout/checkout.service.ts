import { inject, Injectable } from '@angular/core';
import { OrderService } from '../order/order.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  orderService = inject(OrderService);
  whatsappNumber =  61996263326;

  alreadyAClient():void{
    //cria order
    const orderId = this.orderService.createOrder();
    //envia para o zap
    // this.whatsAppMessage(true, orderId);
  };

  newClient(form?: any):void{
    //cria order
    const orderId = this.orderService.createOrder();
    //envia para o zap
    // this.whatsAppMessage(false, orderId, form);
  };

  private whatsAppMessage(isClient:boolean, orderId: string, checkoutForm?:any){
    const link = `http://localhost:4200/pedido/${orderId}`;

    let message = '';

    if(isClient){
      const salutations = 'Olá, já sou cliente e gostaria de prosseguir com minha compra!';
      const orderMessage = `Meu carrinho: ${link}`;

      message = `${salutations}\n\n${orderMessage}`;
    }else{
      const checkout = checkoutForm; // retorna objeto ou texto com dados do novo cliente

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
