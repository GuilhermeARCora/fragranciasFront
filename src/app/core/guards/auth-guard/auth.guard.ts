import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../services/swal/toast.service';
import { AuthService } from '../../services/auth/auth.service';
import type { CanMatchFn, UrlTree } from '@angular/router';

export const AuthGuard: CanMatchFn = (): UrlTree | boolean => {

  const toaster = inject(ToastService);
  const router = inject(Router);
  const auth = inject(AuthService);

  const user = auth.currentUser;

  if(!user){
    toaster.error('Você não está logado!');
    return router.createUrlTree(['/home']);
  }

  return true;
};
