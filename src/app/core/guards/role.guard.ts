import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/swal/toast.service';
import { map, take, tap } from 'rxjs';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {

  const toast = inject(ToastService);
  const router = inject(Router);
  const authService = inject(AuthService);

  const allowedRoles = route.data['roles'] as string[] || [];

  return authService.user$.pipe(
    take(1),  // only need the latest user once
    map(user => {
      if (!user) {
        toast.error('Você não está logado!');
        return router.createUrlTree(['/']);
      }
      if (allowedRoles.includes(user.role)) {
        return true;
      }
      toast.error('Você não possui permissão!');
     return router.createUrlTree(['/']);
    })
  );
};
