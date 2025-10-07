import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const loginRedirectGuard: CanMatchFn = (): UrlTree | boolean => {

  const router = inject(Router);
  const authService = inject(AuthService);

  const user = authService.currentUser;

  if(user?.role === 'admin'){
    return router.createUrlTree(['/admin/home']);
  };

  return true;
};
