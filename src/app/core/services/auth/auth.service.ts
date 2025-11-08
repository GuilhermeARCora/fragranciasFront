import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastService } from '../swal/toast.service';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import type { Observable } from 'rxjs';
import type { User } from '../../../shared/types/user';
import type { LoginPayload } from '../../../shared/types/authentication';
import type { ResponseData } from '../../../shared/types/responseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiUrl;
  route = 'auth';
  http = inject(HttpClient);
  router = inject(Router);
  toast = inject(ToastService);

  private userSubject = new BehaviorSubject<User | null>(null);
  public readonly user$ = this.userSubject.asObservable();

  login(form: LoginPayload): Observable<User> {
    return this.http.post<ResponseData<string>>(`${this.url}${this.route}/login`, form).pipe(
      switchMap(() => this.loggedUser())
    );
  };

  loggedUser(): Observable<User> {
    return this.http.get<ResponseData<User>>(`${this.url}${this.route}/me`).pipe(
      map(v => v.data),
      tap(user => {
        this.userSubject.next(user);
      })
    );
  };

  logout():Observable<ResponseData<void>> {
    return this.http.delete<ResponseData<void>>(`${this.url}${this.route}/logout`).pipe(
      tap(() => {
        this.userSubject.next(null);
        this.router.navigateByUrl('/login');
      })
    );
  };

  get currentUser(): User | null {
    return this.userSubject.value;
  };

  setCurrentUser(user: User): void {
    this.userSubject.next(user);
  };

};
