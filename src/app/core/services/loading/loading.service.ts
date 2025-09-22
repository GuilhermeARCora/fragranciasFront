import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {

  private count = 0;
  private readonly loading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$ = this.loading.asObservable().pipe(
    distinctUntilChanged(),
    debounceTime(100)
  );

  show(): void {
    if (++this.count === 1) this.loading.next(true);
  };

  hide(): void {
    if (this.count > 0 && --this.count === 0) this.loading.next(false);
  };

};
