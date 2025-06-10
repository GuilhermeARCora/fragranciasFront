import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthUser, LoginPayload, LoginResponse, UserForm } from '../../../shared/types/User'; // Assuming this exists
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  private currentUser$ = new BehaviorSubject<AuthUser | null>(null);

  getMe(): Observable<AuthUser> {
    return this.http.get<{ status: string, data: { user: AuthUser } }>(`${this.apiUrl}users/me`)
    .pipe(
      map(res => res.data.user), // unwrap the user here
      tap(user => this.currentUser$.next(user))
    );
  }

  clearUserCache(): void {
    this.currentUser$.next(null);
  }

  register(userData: UserForm): Observable<UserForm> {
    return this.http.post<UserForm>(`${this.apiUrl}users/signup`, userData);
  }

  login(userData: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}users/login`, userData);
  }

  logout() {
    this.clearUserCache();
  }

  authenticated() {
    return this.getMe();
  }
}
