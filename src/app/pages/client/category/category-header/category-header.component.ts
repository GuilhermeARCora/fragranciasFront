import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderCartComponent } from "../../../../shared/components/header-cart/header-cart.component";
import { RouterModule } from '@angular/router';
import { BreakPointService } from '../../../../core/services/breakPoint/break-point.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-header',
  imports: [
    CommonModule,
    MatIconModule,
    HeaderCartComponent,
    RouterModule,
],
  templateUrl: './category-header.component.html',
  styleUrl: './category-header.component.scss'
})
export class CategoryHeaderComponent {

  title = input<string>('Categoria');
  breakPointService = inject(BreakPointService);

};
