import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../../../core/services/swal/toast.service';
import { CommonModule } from '@angular/common';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-user-info',
  imports: [MatIcon,MatMenuModule,MatDividerModule, CommonModule, RouterLink],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss'
})
export class UserInfoComponent implements OnInit{

  authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);
  isUserLoggedIn$ = this.authService.isLoggedIn$;
  currentUser$    = this.authService.user$;

  isMobile: boolean = window.innerWidth < 768;

  displaySection$ = combineLatest([
    this.isUserLoggedIn$,
  ]).pipe(
    map(([loggedIn]) => loggedIn || this.isMobile)
  );

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    this.isMobile = (event.target as Window).innerWidth < 768;
  };

  ngOnInit(): void {
  };

  logOut(): void{
    this.authService.logout().subscribe(() => {
        this.router.navigateByUrl('/home').then(() => {
            this.toast.info("Deslogado com sucesso!");
        });
    });
  };



}
