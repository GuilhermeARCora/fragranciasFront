import { CommonModule, Location } from '@angular/common';
import { Component, inject, input, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { HeaderCartComponent } from './header-cart/header-cart.component';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';
@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule,
    MatTooltipModule,
    HeaderCartComponent,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent{

  @Input({required:true}) isHome$!: Observable<boolean>;

  location = inject(Location);
  breakpointService = inject(BreakPointService);

  title = input<string>('');

  back():void {
    this.location.back();
  };

};
