import type { HttpInterceptorFn } from '@angular/common/http';
import type { HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {

  const authReq = req.clone({
    withCredentials: true
  });

  return next(authReq);
};
