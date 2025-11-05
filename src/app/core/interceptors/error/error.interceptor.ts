import { inject } from '@angular/core';
import { ToastService } from '../../services/swal/toast.service';
import { catchError, throwError } from 'rxjs';
import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toaster = inject(ToastService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const silentEndpoints = ['/me'];

      if (silentEndpoints.some(url => req.url.includes(url))) {
        return throwError(() => err); // skip toast
      }

      const message = err.error?.message || 'Erro inesperado.';
      const status = err.status;

      switch (status) {
      case 0:
        toaster.error('Falha de conexão com o servidor.');
        break;
      case 401:
      case 403:
        toaster.error(message || 'Não autorizado.');
        break;
      case 404:
        toaster.warning(message || 'Recurso não encontrado.');
        break;
      case 429:
        toaster.warning(message || 'Muitas requisições. Tente novamente em alguns minutos.');
        break;
      case 500:
        toaster.error(message || 'Erro interno no servidor.');
        break;
      default:
        toaster.error(message);
      }

      return throwError(() => err);
    })
  );
};
