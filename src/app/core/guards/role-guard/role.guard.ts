import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/swal/toast.service';

export const RoleGuard: CanMatchFn = (route): UrlTree | boolean => {

  const toaster = inject(ToastService);
  const router = inject(Router);
  const auth = inject(AuthService);
  const allowed: string[] = (route.data as any)?.roles ?? [];

  const role = auth.currentUser?.role;

  if(!role){
    toaster.error("Você não está logado!");
    return router.createUrlTree(['/home']);
  };

  if (!allowed.includes(role)) {
    toaster.error("Você não possui permissão!");
    return router.createUrlTree(['/home']);
  };

  return true;
};
