import { Component, inject } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from './core/services/loading/loading.service';
import { LayoutService } from './core/services/layout/layout.service';
import { ScrollTopBtnComponent } from "./shared/components/scroll-top-btn/scroll-top-btn.component";
@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    CommonModule,
    ScrollTopBtnComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  loadingService = inject(LoadingService);
  isLoading$ = this.loadingService.isLoading$;

  layoutService = inject(LayoutService);
  isAdmin$ = this.layoutService.isAdmin$;
  hideHeader$ = this.layoutService.hideHeader$;
  hideFooter$ = this.layoutService.hideFooter$;

};
