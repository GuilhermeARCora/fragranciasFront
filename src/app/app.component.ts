import { Component, inject } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from './core/services/loading/loading.service';
import { DefineLayoutService } from './core/services/defineLayout/defineLayout.service';
import { ScrollTopBtnComponent } from './shared/components/scroll-top-btn/scroll-top-btn.component';
import { LayoutComponent } from './pages/client/layout/layout.component';
import { SeoService } from './core/services/seo/seo.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    CommonModule,
    ScrollTopBtnComponent,
    LayoutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  loadingService = inject(LoadingService);
  layoutService = inject(DefineLayoutService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  seo = inject(SeoService);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      let active = this.route.firstChild;
      while (active?.firstChild) active = active.firstChild;

      const data = active?.snapshot.data || {};
      this.seo.updateTags({
        title: data['title'],
        description: data['description'],
        image: data['image'],
        keywords: data['keywords'],
        url: window.location.href
      });
    });
  };

};
