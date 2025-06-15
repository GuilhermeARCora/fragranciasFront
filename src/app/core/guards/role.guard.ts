import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import { ToastService } from '../services/swal/toast.service';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];

  const toast = inject(ToastService);

  // if (user && allowedRoles.includes(user.role)) {
  //   return true;
  // }

  router.navigate(['/home']).then(() => {
    toast.error('Você não possui permissão!');
  });

  return false;
};
