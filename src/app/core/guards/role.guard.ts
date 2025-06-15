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
    return router.createUrlTree(['/login']);
  };

  // Defensive: if no roles defined, deny access
  if (!allowedRoles || allowedRoles.length === 0) {
    console.warn('No roles specified for this route.');
    toast.error('Rota sem permissão configurada.');
    return router.createUrlTree(['/login']);
  };

  if (user && allowedRoles.includes(user.role)) {
    return true;
  };

  toast.error('Você não possui permissão!');
  return router.createUrlTree(['/login']);
};
