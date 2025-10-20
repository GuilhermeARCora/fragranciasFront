import { Component } from '@angular/core';
import { LayoutComponent } from "../layout/layout.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-individual-product',
  imports: [
    CommonModule,
    LayoutComponent
  ],
  templateUrl: './individual-product.component.html',
  styleUrl: './individual-product.component.scss'
})
export class IndividualProductComponent {

};
