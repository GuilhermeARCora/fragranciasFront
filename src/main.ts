import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';

// register Swiper custom elements
register();
registerLocaleData(localePt, 'pt-BR', localePtExtra);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
