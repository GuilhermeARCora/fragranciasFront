import {  Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AuthUser, GetMeResponse, LoginPayload, LoginResponse, UserForm } from '../../../shared/types/User'; // Assuming this exists
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  // ✅ 1. Signal to hold current user
  private _currentUser = signal<AuthUser | null>(null);

  private hasFetchedUser = signal(false); // ✅ new flag

  // ✅ 2. Expose observable version if needed
  readonly currentUser$ = toObservable(this._currentUser);

  // ✅ 3. Computed signal for login status
  readonly isLoggedIn = computed(() => !!this._currentUser());

  getMe(): Observable<AuthUser> {
    if (this.hasFetchedUser() && this._currentUser()) {
      return of(this._currentUser()!); // ✅ return cached user
    };

    return this.http.get<GetMeResponse>(`${this.apiUrl}users/me`).pipe(
      map(res => res.data.user),
      tap(user => {
        this._currentUser.set(user);
        this.hasFetchedUser.set(true); // ✅ set flag after fetch
      })
    );
  };

  // ✅ 5. Synchronous getter if needed
  getCurrentUser(): AuthUser | null {
    return this._currentUser();
  };

  // ✅ 6. Clear user on logout
  clearUser() {
    this._currentUser.set(null);
    this.hasFetchedUser.set(false);
  };

  register(userData: UserForm): Observable<AuthUser> {
    return this.http.post<UserForm>(`${this.apiUrl}users/signup`, userData).pipe(
    switchMap(() => this.getMe())
    );
  };

  login(payload: LoginPayload): Observable<AuthUser> {
    return this.http.post<{ token: string }>(`${this.apiUrl}users/login`, payload, { withCredentials: true }).pipe(
    switchMap(() => this.getMe()) // fetches and caches the user using cookie
    );
  };

  logout(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}users/logout`).pipe(
    tap(() => this.clearUser()));
  };

};
