import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth/auth.service';

export const AuthGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const apiUrl = environment.apiUrl;
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

  return authService.getMe().pipe(
    map(() => true), // success = authenticated
    catchError((err) => {

      Toast.fire({
          icon: "error",
          title: "Acesso negado!",
          text: err?.error?.message
       });

      router.navigate(['/login']);
      return of(false);
    })
  );
};
