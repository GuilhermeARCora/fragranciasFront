import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ShoppingCartService } from '../../../core/services/shoppingCart/shopping-cart.service';
import { Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-cart',
  imports: [CommonModule, MatIconModule, MatBadgeModule, MatButtonModule, RouterModule],
  templateUrl: './header-cart.component.html',
  styleUrl: './header-cart.component.scss'
})
export class HeaderCartComponent {

  router = inject(Router);
  cartService = inject(ShoppingCartService);
  cartCount$: Observable<number> = of(0);

  ngOnInit(): void {
    this.cartCount$ = this.cartService.cartLength;
  }

  redirectCart():void{
    this.router.navigate(['/cart'])
  };

};
