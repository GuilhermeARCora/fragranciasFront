import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import type { CanMatchFn, UrlTree } from '@angular/router';

export const loginRedirectGuard: CanMatchFn = (): UrlTree | boolean => {

  const router = inject(Router);
  const authService = inject(AuthService);

  const user = authService.currentUser;

  if(user?.role === 'admin'){
    return router.createUrlTree(['/admin/painel-admin']);
  };

  return true;
};
