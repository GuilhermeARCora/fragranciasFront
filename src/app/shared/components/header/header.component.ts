import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogoComponent } from "./logo/logo.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { SidenavLinksComponent } from "./sidenav-links/sidenav-links.component";
import { SearchComponent } from "./search/search.component";

@Component({
  selector: 'app-header',
  imports: [CommonModule, LogoComponent, ShoppingCartComponent, UserInfoComponent, SidenavLinksComponent, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {



};
