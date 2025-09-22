import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AdminHeaderComponent } from "../admin-header/admin-header.component";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { LayoutComponent } from "./layout/layout.component";
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';

@Component({
  selector: 'app-shell',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    RouterModule,
    AdminHeaderComponent,
    LayoutComponent
],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {

  breakpoint = inject(BreakPointService);

};
