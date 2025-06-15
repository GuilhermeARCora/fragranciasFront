import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  if (authService.isLoggedIn()) {
    return true;
  }

  Toast.fire({
    icon: "error",
    title: "Acesso negado!",
    text: "Você precisa estar logado"
  });
  router.navigate(['/login']);
  return false;

};
