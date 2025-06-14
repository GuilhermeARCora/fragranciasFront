import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  router = inject(Router);

  hideHeader = false;
  hideFooter = false;

  constructor(private auth: AuthService) {
    this.auth.getMe().subscribe({
      next: () => {},
      error: () => {
        this.auth.clearUser(); // in case user was invalid
      }
    });
  };

  // Rotas que ocultam apenas o header
  private headerExcludedRoutes = ['/login', '/not-found', '/404', '/cadastro'];

  // Rotas que ocultam apenas o footer
  private footerExcludedRoutes = ['/not-found', '/404'];


  ngOnInit() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        this.hideHeader = this.headerExcludedRoutes.some(route =>
          url === route || url.startsWith(route + '/')
        );

        this.hideFooter = this.footerExcludedRoutes.some(route =>
          url === route || url.startsWith(route + '/')
        );
      });
  };

};
