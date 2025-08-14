import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShoppingCartService } from '../../../core/services/shoppingCart/shopping-cart.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule, MatBadgeModule, MatButtonModule, RouterModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{

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
