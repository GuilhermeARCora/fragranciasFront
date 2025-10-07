import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, distinctUntilChanged, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private router = inject(Router);

  private headerExcludedRoutes = ['/login', '/not-found', '/404', '/category'];
  private footerExcludedRoutes = ['/login', '/not-found', '/404', '/category', '/admin'];

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
