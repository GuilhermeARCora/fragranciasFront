import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { finalize } from 'rxjs';
import type { HttpInterceptorFn } from '@angular/common/http';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);

  loading.show();

  return next(req).pipe(finalize(() => loading.hide()));
};
