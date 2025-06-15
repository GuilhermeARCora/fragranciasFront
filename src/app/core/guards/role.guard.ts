import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';

export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[];
  const user = authService.getCurrentUser();

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  if (user && allowedRoles.includes(user.role)) {
    return true;
  }

  // Show toast and redirect
  Toast.fire({
    icon: 'error',
    title: 'Acesso negado!',
    text: user
      ? 'Você não possui permissão para acessar essa rota!'
      : 'Você não está autenticado.'
  });

  router.navigate(['/home']);
  return false;
};
