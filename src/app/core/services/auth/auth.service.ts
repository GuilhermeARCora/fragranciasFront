import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthUser, LoginPayload, LoginResponse, MeResponse, RegisterPayload, RegisterResponse } from '../../types/User';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  private currentUser$ = new BehaviorSubject<AuthUser | null> (null);

  public user$:Observable<AuthUser | null> = this.currentUser$.asObservable();
  public isLoggedIn$:Observable<boolean> = this.currentUser$.asObservable().pipe(map(v => !!v));
  public isAdmin$:Observable<boolean> = this.user$.pipe(map(u => u?.role === 'admin'));

  login(form:LoginPayload): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}login`, form).pipe(
      tap(() => {
        switchMap(() => this.fetchAndStoreUser())
      })
    )
  };

  fetchAndStoreUser(): Observable<AuthUser> {
    return this.http.get<MeResponse>(`${this.apiUrl}me`).pipe(
        map(res => res.data.user),
        tap(user => this.currentUser$.next(user))
      );
  };

  get userName(): string {
    return this.currentUser$.value?.name ?? 'Visitante';
  }


};
