import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
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
