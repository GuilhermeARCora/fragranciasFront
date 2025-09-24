import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { ApplicationConfig, LOCALE_ID, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth-interceptor/auth.interceptor';
import { initApp } from './core/app-init';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { PercentagePipe } from './shared/pipes/percentage/percentage.pipe';
import { DisplayCategoryPipe } from './shared/pipes/display-category/display-category.pipe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor, loadingInterceptor])),
    provideAppInitializer(initApp),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    PercentagePipe,
    DisplayCategoryPipe
  ]
};
