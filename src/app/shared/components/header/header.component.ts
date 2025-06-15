import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  readonly hasFetchedUser = this.authService.hasFetchedUser;
  readonly userLoggedIn = this.authService.isLoggedIn;

  logOut(): void{
    this.authService.logout().subscribe(() => {
        this.router.navigateByUrl('/home').then(() => {
            this.Toast.fire({
              icon: "warning",
              title: "Deslogado com sucesso"
            });
           });
    });
  };

  Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    });

};
