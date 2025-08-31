import { Component, inject } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged, filter, map, shareReplay, startWith } from 'rxjs';
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
export class AppComponent{

  private router = inject(Router);

  private headerExcludedRoutes = ['/login', '/not-found', '/404', '/category'];
  private footerExcludedRoutes = ['/login', '/not-found', '/404'];

  readonly url$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map(e => e.urlAfterRedirects),
    startWith(this.router.url),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  private matches(url: string, route: string) {
    return url === route || url.startsWith(route + '/');
  }

  readonly isAdmin$ = this.url$.pipe(
    map(url => url === '/admin' || url.startsWith('/admin/'))
  );

  readonly hideHeader$ = this.url$.pipe(
    map(url => this.headerExcludedRoutes.some(r => this.matches(url, r)))
  );

  readonly hideFooter$ = this.url$.pipe(
    map(url => this.footerExcludedRoutes.some(r => this.matches(url, r)))
  );

};
