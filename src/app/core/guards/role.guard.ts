// role.guard.ts
import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  authService = inject(AuthService);
  router = inject(Router);

  Toast = Swal.mixin({
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

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    const expectedRoles: string[] = route.data['roles'];

    return this.authService.getMe().pipe(
      map(user => {

        if (user && expectedRoles.includes(user.role)) {
          return true;
        }

        this.Toast.fire({
          icon: "error",
          title: "Acesso negado!",
          text: "Você não possui permissão para acessar essa rota!"
        });

        this.router.navigate(['/home']);
        return false;
      }),
      catchError((err) => {

        this.Toast.fire({
          icon: "error",
          title: "Acesso negado!",
          text: err?.error?.message
        });

        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
