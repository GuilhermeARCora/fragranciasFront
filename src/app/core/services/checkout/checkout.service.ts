import { inject, Injectable } from '@angular/core';
import { OrderService } from '../order/order.service';
import { take } from 'rxjs';
import { ToastService } from '../swal/toast.service';
import type { CheckoutMsg } from '../../../shared/types/checkout';
import type { Cart } from '../../../shared/types/cart';
import type { OrderCreateItem } from '../../../shared/types/order';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  orderService = inject(OrderService);
  whatsappNumber =  61996263326;
  toaster = inject(ToastService);
  router = inject(Router);

  private readonly salutationsAlreadyClient = 'Olá, já sou cliente e gostaria de prosseguir com minha compra!';
  private readonly salutationsNewClient = 'Olá, sou um novo cliente e gostaria de prosseguir com minha compra!';

  private mapCartToOrderItems(cart: Cart): OrderCreateItem[] {
    return cart.items.map(item => ({
      _id: item.product._id,
      name: item.product.name,
      fullPrice: item.product.fullPrice,
      promoPercentage: item.product.promoPercentage,
      amount: item.amount,
      image: item.product.image
    }));
  };

  alreadyAClient():void {
    const cart:Cart = JSON.parse(localStorage.getItem('cart') || 'null');
    if (!cart || !cart.items?.length) {
      this.toaster.info('Seu carrinho está vazio');
      return;
    };

    const orderItems = this.mapCartToOrderItems(cart);

    this.orderService.createOrder(orderItems).pipe(take(1)).subscribe(id => {
      const wasBlocked = this.whatsAppMessage(true, id);

      if (wasBlocked) this.showFallbackModalForClient(id);
      else {
        this.toaster.setTimerEnabled(false);
        this.toaster.success('Carrinho enviado para o WhatsApp com sucesso!');
        this.router.navigateByUrl(`/pedido/${id}`);
      };

    });

    return;
  };

  newClient(form: CheckoutMsg):void {
    const cart:Cart = JSON.parse(localStorage.getItem('cart') || 'null');
    if (!cart || !cart.items?.length) {
      this.toaster.info('Seu carrinho está vazio');
      return;
    };

    const orderItems = this.mapCartToOrderItems(cart);
    const { fullName, cpfOrCnpj, email, address } = form;
    const checkoutMessage = `Nome: ${fullName}\nCPF/CNPJ: ${cpfOrCnpj}\nEmail: ${email}\nEndereço: ${address}`;

    this.orderService.createOrder(orderItems).pipe(take(1)).subscribe(id => {
      const wasBlocked = this.whatsAppMessage(false, id, checkoutMessage);

      if (wasBlocked) {
        this.showFallbackModalForNewClient(id, checkoutMessage);
        this.router.navigateByUrl(`/pedido/${id}`);
      }
      else {
        this.toaster.setTimerEnabled(false);
        this.toaster.success('Carrinho enviado para o WhatsApp com sucesso!');
        this.router.navigateByUrl(`/pedido/${id}`);
      };

    });
  };

  private whatsAppMessage(isClient:boolean, orderId: string, checkoutMsg?:string):boolean {
    const link = `https://fragranciasdecor.com.br/pedido/${orderId}`;

    let message = '';

    if(isClient){
      const orderMessage = `Meu carrinho: ${link}`;

      message = `${this.salutationsAlreadyClient}\n\n${orderMessage}`;
    }else{

      const checkoutInfo = `Aqui vão as minhas informações preenchidas no checkout:\n${checkoutMsg}`;
      const orderMessage = `Meu carrinho: ${link}`;

      message = `${this.salutationsNewClient}\n\n${checkoutInfo}\n\n${orderMessage}`;
    };

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/55${this.whatsappNumber}?text=${encodedMessage}`;

    const popup = window.open(whatsappUrl, '_blank');

    return popup === null;
  };

  private showFallbackModalForClient(orderId: string):void {
    const orderLink = `https://fragranciasdecor.com.br/pedido/${orderId}`;
    const orderMessage = `Meu carrinho: ${orderLink}`;
    const message = `${this.salutationsAlreadyClient}\n\n${orderMessage}`;

    Swal.fire({
      title: `WhatsApp da Loja: ${this.whatsappNumber}`,
      icon: 'info',
      html: `
        <p>Seu navegador bloqueou o redirecionamento automático.</p>
        <p>Envie manualmente para o WhatsApp da loja o link do seu pedido:</p>
        <br>
        <strong>${orderLink}</strong>
      `,
      showCancelButton: true,
      confirmButtonText: 'Copiar link',
      cancelButtonText: 'Fechar',
      confirmButtonColor: '#1b7d0c',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        navigator.clipboard.writeText(message);
        Swal.fire('Copiado!', 'O link foi copiado.', 'success');
        this.router.navigateByUrl(`/pedido/${orderId}`);
      }
    });
  };

  private showFallbackModalForNewClient(orderId: string, checkoutMsg: string):void {
    const orderLink = `https://fragranciasdecor.com.br/pedido/${orderId}`;

    const checkoutInfo = `Aqui vão as minhas informações preenchidas no checkout:\n${checkoutMsg}`;
    const orderMessage = `Meu carrinho: ${orderLink}`;
    const message = `${this.salutationsNewClient}\n\n${checkoutInfo}\n\n${orderMessage}`;

    Swal.fire({
      title: `WhatsApp da Loja: ${this.whatsappNumber}`,
      icon: 'info',
      html: `
        <p>O WhatsApp não pode ser aberto automaticamente no seu dispositivo.</p>
        <p>Envie manualmente para o WhatsApp da loja o link do seu pedido:</p>
        <br>
        <strong>${orderLink}</strong>
      `,
      showCancelButton: true,
      confirmButtonText: 'Copiar texto com pedido e seus dados',
      cancelButtonText: 'Fechar',
      confirmButtonColor: '#1b7d0c',
      cancelButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        navigator.clipboard.writeText(message);
        Swal.fire('Copiado!', 'O link foi copiado.', 'success');
        this.router.navigateByUrl(`/pedido/${orderId}`);
      }
    });
  };

};
