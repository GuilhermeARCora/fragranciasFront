import { Component, DestroyRef, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { filter, Observable, pairwise, startWith, switchMap, timer } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../../../core/services/shoppingCart/shopping-cart.service';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header-cart',
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './header-cart.component.html',
  styleUrl: './header-cart.component.scss',
  animations: [
    trigger('badgeBounce', [
      transition('* => *', [
        animate(
          '600ms cubic-bezier(0.28, 0.84, 0.42, 1)', // curva de desaceleração natural
          keyframes([
            style({ transform: 'scale(1) translateY(0)', offset: 0 }),
            style({ transform: 'scale(1.3) translateY(-3px)', offset: 0.25 }),
            style({ transform: 'scale(0.95) translateY(1px)', offset: 0.5 }),
            style({ transform: 'scale(1.1) translateY(-1px)', offset: 0.75 }),
            style({ transform: 'scale(1) translateY(0)', offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class HeaderCartComponent {

  router = inject(Router);
  cartService = inject(ShoppingCartService);
  destroyRef = inject(DestroyRef);

  cartCount$: Observable<number> = this.cartService.cartUnits$;
  glow = signal<boolean>(false);

  ngOnInit(): void {
    this.activateAnimation();
  };

  redirectCart():void{
    this.router.navigate(['/carrinho']);
  };

  activateAnimation():void{
    this.cartService.cartUnits$.pipe(
      startWith(0),
      pairwise(),
      filter(([prev, curr]) => curr > prev), // só reage se o número aumentar
      switchMap(() => {
        this.glow.set(true);
        return timer(450);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => this.glow.set(false));
  };

};
