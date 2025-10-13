import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, Observable, tap } from 'rxjs';
import { ToastService } from '../swal/toast.service';
import { Product } from '../../../shared/types/Product';
import { Cart, CartItem } from '../../../shared/types/Cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartSubject = new BehaviorSubject<Cart>(this.getCartFromLocalStorage());
  readonly cart$:Observable<Cart> = this.cartSubject.asObservable();
  readonly cartUnits$:Observable<number> = this.cart$.pipe(map(cart => cart?.totalUnits));
  readonly cartCurrentPriceTotal$:Observable<number> = this.cart$.pipe(map(cart => cart?.totalCurrentPrice));
  readonly cartFullPriceTotal$:Observable<number> = this.cart$.pipe(map(cart => cart?.totalFullPrice));
  readonly cartPixPriceTotal$:Observable<number> = this.cart$.pipe(map(cart => cart?.totalPixPrice));

  toaster = inject(ToastService);

  constructor() {
    this.cartSubject.pipe(
      debounceTime(100),
      map(cart => JSON.stringify(cart)),
      distinctUntilChanged(),
      tap(json => localStorage.setItem('cart', json))
    ).subscribe();
  };

  private getCartFromLocalStorage(): Cart{
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : { items: [], totalUnits: 0, totalCurrentPrice: 0, totalFullPrice: 0, totalPixPrice: 0 };
    } catch {
      return { items: [], totalUnits: 0, totalCurrentPrice: 0, totalFullPrice: 0, totalPixPrice: 0 };
    };
  };

  addOrUpdateCart(product: Product, amount = 1): void {
    const currentCart = this.cartSubject.value;
    const exists = currentCart?.items.some(item => item.product._id === product._id);

    let updatedItems: CartItem[];

    if (exists) {
      updatedItems = currentCart.items.map(item =>
        item.product._id === product._id ? { ...item, amount } : item
      );
    } else {
      updatedItems = [...currentCart.items, { product, amount }];
    }

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

    this.cartSubject.next(updatedCart);
  };

  removeProductFromCart(productId: string): void {
    const currentCart = this.cartSubject.getValue();

    const updatedItems = currentCart.items.filter(item => item.product._id !== productId);

    if (updatedItems.length === 0) {
      this.cartSubject.next({ items: [], totalUnits: 0, totalCurrentPrice: 0, totalFullPrice: 0, totalPixPrice: 0 });
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

    this.cartSubject.next(updatedCart);
  };

  clearCart(): void {
    localStorage.setItem('cart', JSON.stringify({ items: [], totalUnits: 0, totalCurrentPrice: 0, totalFullPrice: 0, totalPixPrice: 0 }));
    this.cartSubject.next({items: [], totalUnits: 0, totalCurrentPrice: 0, totalFullPrice: 0, totalPixPrice: 0});
  };

};
