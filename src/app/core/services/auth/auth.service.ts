import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthUser, LoginPayload, LoginResponse, MeResponse, RegisterPayload, RegisterResponse } from '../../types/User';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  private currentUser$ = new BehaviorSubject<AuthUser | null> (null);

  public user$:Observable<AuthUser | null> = this.currentUser$.asObservable();
  public isLoggedIn$:Observable<boolean> = this.currentUser$.asObservable().pipe(map(v => !!v));

  login(form:LoginPayload): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}login`, form).pipe(
      tap(() => {
        switchMap(() => this.fetchAndStoreUser())
      })
    )
  };

  fetchAndStoreUser(): Observable<AuthUser> {

     const cached = this.currentUser$.value;
     if (cached) {
      return of(cached);
     };

    return this.http.get<MeResponse>(`${this.apiUrl}users/me`).pipe(
        map(res => res.data.user),
        tap(user => this.currentUser$.next(user))
      );
  };

  register(form:RegisterPayload):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.apiUrl}users/signup`,form).pipe(
        tap(res => this.currentUser$.next(res.data.user)),
      );
  };

  logout():Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}users/logout`).pipe(
      tap(() => {
        this.currentUser$.next(null);
      })
    )
  };

  get userName(): string {
    return this.currentUser$.value?.name ?? 'Visitante';
  };


};
