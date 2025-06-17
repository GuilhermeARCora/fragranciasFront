import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from "./logo/logo.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { SidenavLinksComponent } from "./sidenav-links/sidenav-links.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LogoComponent, ShoppingCartComponent, UserInfoComponent, SidenavLinksComponent,MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  logOut(): void{
    this.authService.logout().subscribe(() => {
        this.router.navigateByUrl('/home').then(() => {
            //add toast here
           });
    });
  };

};
