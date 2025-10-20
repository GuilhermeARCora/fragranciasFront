import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, distinctUntilChanged, shareReplay, tap } from 'rxjs';
import { Product } from '../../../shared/types/Product';

@Injectable({
  providedIn: 'root'
})
export class DefineLayoutService {
  private router = inject(Router);

  private headerExcludedRoutes = ['/login', '/not-found'];
  private footerExcludedRoutes = ['/login', '/not-found', '/categoria', '/admin', '/carrinho', '/checkout', '/pedido'];
  readonly title = signal<string>('');

  constructor(){
    this.setRouteTitle();
  };

  readonly url$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map(e => e.urlAfterRedirects),
    startWith(this.router.url),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  private matches(url: string, route: string) {
    return url === route || url.startsWith(route + '/');
  };

  readonly isAdmin$ = this.url$.pipe(
    map(url => url === '/admin' || url.startsWith('/admin/'))
  );

  readonly hideHeader$ = this.url$.pipe(
    map(url => this.headerExcludedRoutes.some(r => this.matches(url, r)))
  );

  readonly hideFooter$ = this.url$.pipe(
    map(url => this.footerExcludedRoutes.some(r => this.matches(url, r)))
  );

  readonly isHome$ = this.url$.pipe(
    map(url => url === '/home')
  );

  readonly isCategoria$ = this.url$.pipe(
    map(url => url.startsWith('/categoria')),
  );

  private getRouteTitle(): string | null {
    const route = this.router.routerState.root;
    let title: string | null = null;

    // Percorre os filhos até achar o "ativo"
    let currentRoute = route;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    };

    if (currentRoute.snapshot.paramMap.get('categoria')) {
      const categoria = currentRoute.snapshot.paramMap.get('categoria');

      if(categoria === 'aromatizadores') title = 'Aromatizadores';
      else if(categoria === 'autoCuidado') title = 'Autocuidado';
      else title = 'Casa e Bem estar';

    }else if(currentRoute.snapshot.data['title'] === 'Pedido'){
      const idDoPedido = currentRoute.snapshot.paramMap.get('id');

      title = `Pedido #${idDoPedido}`;

    }else if(currentRoute.snapshot.data['title'] === 'Produto'){
      const product = history.state['product'] as Product | undefined;

      const currentNav = this.router.getCurrentNavigation();
      const productFromNav = currentNav?.extras?.state as Product | undefined;

      const finalProduct = productFromNav ?? product;
      title = finalProduct?.name ?? 'Produto';
    }
    else if (currentRoute.snapshot.data['title']) title = currentRoute.snapshot.data['title'];

    return title;
  };

  setRouteTitle(): void{
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.title.set(this.getRouteTitle() ?? '');
      };
    });
  };

};
