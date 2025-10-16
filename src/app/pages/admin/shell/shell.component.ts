import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { LayoutComponent } from "./admin-layout/admin-layout.component";
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

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
  title = signal<string>('Titulo');

  constructor(){
    // escuta mudanças de rota
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

    this.title.set(rawTitle);
  };

};
