import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/swal/toast.service';

export const AuthGuard: CanActivateFn = () => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const toast = inject(ToastService);

  if (authService.loggedInUser()) {
    return true;
  }

  toast.error('Você precisa estar logado!');
  return router.createUrlTree(['/login']);

};
