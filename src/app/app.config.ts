import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/services/auth/auth.service';
import { preloadUser } from './app.init';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),

    // AuthService so Angular can inject it
    AuthService,
    // Preload function to run at app startup
    {
      provide: APP_INITIALIZER,
      useFactory: preloadUser,
      deps: [AuthService],
      multi: true
    }
  ]
};
