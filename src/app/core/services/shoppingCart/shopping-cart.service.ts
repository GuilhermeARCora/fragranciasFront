import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { ProductView } from '../../../shared/types/Product';
import { ToastService } from '../swal/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private _cart = new BehaviorSubject<ProductView[]>(this.getCartFromLocalStorage());
  readonly cart$ = this._cart.asObservable();
  readonly cartLength = this.cart$.pipe(map(v => v.length));

  toaster = inject(ToastService);

  constructor() {
    this._cart.pipe(
      debounceTime(100),
      map(cart => JSON.stringify(cart)),
      distinctUntilChanged(),
      tap(json => localStorage.setItem('cart', json))
    ).subscribe();
  };

  private getCartFromLocalStorage(): ProductView[] {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  addProductToCart(product: ProductView): void {
    const currentCart = this._cart.value;
    const alreadyInCart = currentCart.some(v => v._id === product._id);

    if (!alreadyInCart) {
      this._cart.next([...currentCart, product]);
      this.toaster.success('Produto adicionado')
    } else {
      this.toaster.warning("Esse produto já está no carrinho");
    }
  };

  removeProductFromCart(productId: string): void {
    const updatedCart = this._cart.value.filter(p => p._id !== productId);
    this._cart.next(updatedCart);
  };

  clearCart(): void {
    localStorage.setItem('cart', JSON.stringify([]));
    this._cart.next([]);
  };

};
