import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthUser, LoginPayload, LoginResponse, MeResponse, RegisterPayload, RegisterResponse } from '../../../shared/types/User';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  currentUser = signal<AuthUser | null>(null);

  loggedInUser = computed(() => !!this.currentUser);

  signup(formData:RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}users/signup`, formData)
    .pipe(
      tap(response => {
        this.currentUser.set(response.data.user)
      })
    );
  };

  login(formData: LoginPayload): Observable<AuthUser> {
    return this.http.post<LoginResponse>(`${this.apiUrl}users/login`, formData)
    .pipe(
      switchMap(() =>this.checkUserAuth())
    );
  };

  checkUserAuth(): Observable<AuthUser> {
    if(this.currentUser()){
      return of(this.currentUser()!);
    };

    return this.http.get<MeResponse>(`${this.apiUrl}users/me`).pipe(
      tap(response => {
        this.currentUser.set(response.data.user);
      }),
      map(response => response.data.user)
    );
  };

  //is this function necessary?
  getCurrentUser(): AuthUser | null {
    return this.currentUser();
  };

  isAuthenticated(): boolean {
    return !!this.currentUser();
  };

  logout(): Observable<any>{
    return  this.http.delete<any>(`${this.apiUrl}users/logout`).pipe(
      tap(()=>{
        this.clearUser()
      })
    )
  };

  clearUser(): void{
    this.currentUser.set(null);
  };

};
