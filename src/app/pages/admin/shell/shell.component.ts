import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { LayoutComponent } from './admin-layout/admin-layout.component';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, map, shareReplay, startWith } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastService } from '../../../core/services/swal/toast.service';

@Component({
  selector: 'app-shell',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
    AdminHeaderComponent,
    LayoutComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {

  breakpoint = inject(BreakPointService);
  router = inject(Router);
  authService = inject(AuthService);
  toaster = inject(ToastService);
  destroyRef = inject(DestroyRef);
  title:string = 'Titulo';

  readonly url$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map(e => e.urlAfterRedirects),
    startWith(this.router.url),
    distinctUntilChanged(),
    shareReplay(1),
    takeUntilDestroyed(this.destroyRef)
  );

  readonly isPainel$ = this.url$.pipe(
    map(url => url === '/admin/painel-admin')
  );

  constructor(){
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.setTitle());
  };

  setTitle():void {
    const route = this.router.routerState.root;

    let currentRoute = route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    };

    const rawTitle:string = currentRoute.snapshot.data['title'];

    this.title = rawTitle;
  };

  logout():void{
    this.authService.logout().subscribe({
      next : () => {
        this.router.navigateByUrl('/home');
        this.toaster.success('Deslogado com sucesso!');
      }
    });
  };

};
