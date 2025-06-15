import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { preloadUser } from './app.init'; // ✅ import your preload function
import { AuthService } from './core/services/auth/auth.service'; // ✅ import AuthService

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideAnimations(),

    // ✅ Register AuthService so Angular can inject it
    AuthService,

    // ✅ Register the preload function to run at app startup
    {
      provide: APP_INITIALIZER,
      useFactory: preloadUser,
      deps: [AuthService],
      multi: true
    }
  ]
};
