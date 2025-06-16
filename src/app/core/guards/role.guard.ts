import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/swal/toast.service';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const toast = inject(ToastService);

  const authService = inject(AuthService);
  const user = authService.currentUser();
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[] | undefined;

  if(!user){
    toast.error('Você não está logado!');
    return router.createUrlTree(['/home']);
  };

  // Defensive: if no roles defined, deny access
  if (!allowedRoles || allowedRoles.length === 0) {
    toast.error('Permissão negada.');
    return router.createUrlTree(['/home']);
  };

  if (user && allowedRoles.includes(user.role)) {
    return true;
  };

  toast.error('Você não possui permissão!');
  return router.createUrlTree(['/home']);
};
