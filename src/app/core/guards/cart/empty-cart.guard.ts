import { inject } from '@angular/core';
import { Router, type CanMatchFn } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { ToastService } from '../../services/swal/toast.service';

export const emptyCartGuard: CanMatchFn = () => {
  const cartService = inject(CartService);
  const toastService = inject(ToastService);
  const router = inject(Router);

  const cart = cartService.getCartFromLocalStorage();

  if (cart?.items.length === 0) {
    toastService.setTimerEnabled(false);
    toastService.warning('Seu carrinho está vazio');
    return router.parseUrl('/home');
  };

  return true;
};
