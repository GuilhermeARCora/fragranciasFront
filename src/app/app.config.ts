import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import type { ApplicationConfig } from '@angular/core';
import { LOCALE_ID, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth-interceptor/auth.interceptor';
import { initApp } from './core/app-init';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { PercentagePipe } from './shared/pipes/percentage/percentage.pipe';
import { DisplayCategoryPipe } from './shared/pipes/display-category/display-category.pipe';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthInterceptor, loadingInterceptor, errorInterceptor])),
    provideAppInitializer(initApp),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    PercentagePipe,
    DisplayCategoryPipe
  ]
};
