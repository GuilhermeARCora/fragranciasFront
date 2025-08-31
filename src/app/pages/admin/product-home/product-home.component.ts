import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { map } from 'rxjs';

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

  breakpoint = inject(BreakpointObserver);
  router = inject(Router);

  isSmall$ = this.breakpoint.observe([Breakpoints.Handset,Breakpoints.Tablet]).pipe(
    map(r => r.matches)
  );

  redirectCreateProduct():void{
    this.router.navigateByUrl('/admin/createProduct');
  };

  redirectEditProduct(id:string):void{
    this.router.navigate(['/admin/editProduct', id]);
  };

};
