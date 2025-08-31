import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HeaderCartComponent } from "../header-cart/header-cart.component";
@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, MatTooltipModule, HeaderCartComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent{

};
