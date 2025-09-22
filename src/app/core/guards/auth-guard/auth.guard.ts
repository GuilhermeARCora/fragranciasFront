import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { ToastService } from '../../services/swal/toast.service';
import { AuthService } from '../../services/auth/auth.service';

export const AuthGuard: CanMatchFn = (): UrlTree | boolean => {

  const toaster = inject(ToastService);
  const router = inject(Router);
  const auth = inject(AuthService);

  const user = auth.currentUser;

  if(!user){
    toaster.error("Você não está logado!");
    return router.createUrlTree(['/home']);
  }

  return true;
};
