import { Component, inject } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingService } from './core/services/loading/loading.service';
import { ScrollTopBtnComponent } from "./shared/components/scroll-top-btn/scroll-top-btn.component";
import { DefineLayoutService } from './core/services/defineLayout/defineLayout.service';
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
  layoutService = inject(DefineLayoutService);

};
