import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import Swal from 'sweetalert2';

export const AuthGuard: CanActivateFn = () => {
  const http = inject(HttpClient);
  const router = inject(Router);

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

  return http.get(`/api/v1/users/me`, { withCredentials: true }).pipe(
    map(() => true), // success = authenticated
    catchError(() => {

      Toast.fire({
          icon: "error",
          title: "Acesso negado!",
          text: "Faça login!"
       });

      router.navigate(['/login']);
      return of(false);
    })
  );
};
