import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
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

  hideHeader = signal<boolean>(true);
  hideFooter = signal<boolean>(true);

  private headerExcludedRoutes = ['/login', '/not-found', '/404', '/register', '/category'];

  private footerExcludedRoutes = ['/not-found', '/404'];

  ngOnInit() {
    this.verifyWhichRouteIsGettingAccessed();
  };

  verifyWhichRouteIsGettingAccessed():void{

     this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(
        (event: NavigationEnd) => {
          const url = event.urlAfterRedirects;

          this.hideHeader.set(this.headerExcludedRoutes.some(route => url.startsWith(route + '/')));

          this.hideFooter.set(this.footerExcludedRoutes.some(route => url.startsWith(route + '/')));
        });
  };

};
