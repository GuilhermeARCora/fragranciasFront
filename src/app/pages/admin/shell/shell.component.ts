import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector: 'app-shell',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    RouterModule,
    AdminHeaderComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {

  breakpoint = inject(BreakpointObserver);

  isSmall$ = this.breakpoint.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
    map(r => r.matches)
  );

};
