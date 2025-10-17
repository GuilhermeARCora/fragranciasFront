import { Component, DestroyRef, effect, inject, Injector, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { filter, Observable, pairwise, startWith, switchMap, timer } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from '../../../../core/services/swal/toast.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartService } from '../../../../core/services/cart/cart.service';

@Component({
  selector: 'app-header-cart',
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    RouterModule,
    MatTooltipModule
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
  cartService = inject(CartService);
  destroyRef = inject(DestroyRef);
  injector = inject(Injector);
  toaster = inject(ToastService);

  cartCount = this.cartService.cartUnits;
  glow = signal<boolean>(false);

  ngOnInit(): void {
    this.activateAnimation();
  };

  redirectCart(count: number | null):void {
    if (!count) {
      this.toaster.info("Seu carrinho está vazio");
      return;
    };

    this.router.navigate(['/carrinho']);
  };

  activateAnimation():void {
    let prevUnits = this.cartCount();
    let saveTimeout: any;

    effect(() => {
      const currUnits = this.cartCount();

      if (currUnits > prevUnits) {
        this.glow.set(true);

        clearTimeout(saveTimeout);

        saveTimeout = setTimeout(() => this.glow.set(false), 450);
      };

      prevUnits = currUnits;
    }, {injector: this.injector});
  };

};
