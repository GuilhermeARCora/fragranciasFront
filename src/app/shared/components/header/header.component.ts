import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule, MatBadgeModule, MatButtonModule, RouterModule, MatTooltipModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  cartCount$: Observable<number> = of(0);
  router = inject(Router);

  redirectCart():void{
    this.router.navigate(['/cart'])
  };

};
