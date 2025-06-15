// src/app/core/services/loading/loading.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private activeRequests = signal(0);

  readonly isLoading = signal(false);

  show() {
    this.activeRequests.update(n => n + 1);
    this.isLoading.set(true);
  }

  hide() {
    this.activeRequests.update(n => Math.max(n - 1, 0));
    if (this.activeRequests() === 0) this.isLoading.set(false);
  }
}
