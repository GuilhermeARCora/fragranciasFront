import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs';
import { BreakPointService } from '../../../core/services/breakPoint/break-point.service';

@Component({
  selector: 'app-product-home',
  imports: [
    MatIconModule,
    CommonModule
  ],
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss'
})
export class ProductHomeComponent {

  breakpoint = inject(BreakPointService);
  router = inject(Router);

  redirectCreateProduct():void{
    this.router.navigateByUrl('/admin/createProduct');
  };

  redirectEditProduct(id:string):void{
    this.router.navigate(['/admin/editProduct', id]);
  };

};
