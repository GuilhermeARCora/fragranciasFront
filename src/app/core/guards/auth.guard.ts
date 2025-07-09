import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/swal/toast.service';
import { take, tap, map } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const toast = inject(ToastService);

  return authService.isLoggedIn$.pipe(
    take(1), // only need the latest value once
    tap(ok => {
      if (!ok) toast.error('Você não está autenticado!');
    }),
    map(ok => ok
      ? true
      : router.createUrlTree(['/'])
    )
  );

};
