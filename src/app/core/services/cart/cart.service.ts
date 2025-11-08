import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { ToastService } from '../swal/toast.service';
import { Router } from '@angular/router';
import type { Cart, CartItem } from '../../../shared/types/cart';
import type { Product } from '../../../shared/types/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  toaster = inject(ToastService);
  router = inject(Router);

  private readonly empty: Cart = { items: [], totalUnits: 0, totalCurrentPrice: 0, totalFullPrice: 0, totalPixPrice: 0 };

  cartSignal = signal<Cart>(this.getCartFromLocalStorage() ?? this.empty);
  readonly cartItems = computed(() => this.cartSignal()?.items ?? []);
  readonly cartUnits = computed(() => this.cartSignal()?.totalUnits ?? 0);
  readonly cartCurrentPriceTotal = computed(() => this.cartSignal()?.totalCurrentPrice ?? 0);
  readonly cartFullPriceTotal = computed(() => this.cartSignal()?.totalFullPrice ?? 0);
  readonly cartPixPriceTotal = computed(() => this.cartSignal()?.totalPixPrice ?? 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private saveTimeout: any = null;

  constructor() {
    effect(() => {
      const cart = this.cartSignal();

      if (!cart || typeof cart !== 'object' || !Array.isArray(cart.items)) return;

      const cartStr = JSON.stringify(cart);

      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(() => {
        localStorage.setItem('cart', cartStr);
      }, 100);
    });
  };

  private getCartFromLocalStorage():Cart | null{
    try{
      const cartStr = localStorage.getItem('cart');
      if (!cartStr || cartStr === 'undefined') return null;

      const cart = JSON.parse(cartStr);
      if (!cart || !Array.isArray(cart.items)) return null;

      return cart;
    }catch{
      return null;
    };
  };

  addOrUpdateCart(product: Product, amount:number, sum = false): void {
    const currentCart = this.cartSignal();
    const productAlreadyInCart = currentCart.items.some(item => item.product._id === product._id);

    let updatedItems!: CartItem[];

    if(productAlreadyInCart){
      updatedItems = currentCart.items.map(item => item.product._id === product._id ?
        { ...item, amount: sum ? item.amount + amount : amount } : item);
    }
    else updatedItems = [...currentCart.items, { product, amount }];

    const totalUnits = updatedItems.reduce((acc, item) => acc + item.amount, 0);
    const totalCurrentPrice = updatedItems.reduce((acc, item) => acc + (item.product.currentPrice * item.amount), 0);
    const totalFullPrice = updatedItems.reduce((acc, item) => acc + (item.product.fullPrice * item.amount), 0);
    const totalPixPrice = updatedItems.reduce((acc, item) => acc + (item.product.pixPrice * item.amount), 0);

    const updatedCart: Cart = {
      items: updatedItems,
      totalUnits,
      totalCurrentPrice,
      totalFullPrice,
      totalPixPrice
    };

    this.cartSignal.set(updatedCart);
  };

  removeProductFromCart(productId: string): void {
    const currentCart = this.cartSignal();

    const updatedItems = currentCart.items.filter(item => item.product._id !== productId);

    if (updatedItems.length === 0) {
      this.cartSignal.set(this.empty);
      return;
    };

    const totalUnits = updatedItems.reduce((acc, item) => acc + item.amount, 0);
    const totalCurrentPrice = updatedItems.reduce((acc, item) => acc + (item.product.currentPrice * item.amount), 0);
    const totalFullPrice = updatedItems.reduce((acc, item) => acc + (item.product.fullPrice * item.amount), 0);
    const totalPixPrice = updatedItems.reduce((acc, item) => acc + (item.product.pixPrice * item.amount), 0);

    const updatedCart: Cart = {
      items: updatedItems,
      totalUnits,
      totalCurrentPrice,
      totalFullPrice,
      totalPixPrice
    };

    this.cartSignal.set(updatedCart);
  };

  clearCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.empty));
    this.cartSignal.set(this.empty);

    this.toaster.info('Carrinho vazio');
    this.router.navigateByUrl('/');
  };

};
