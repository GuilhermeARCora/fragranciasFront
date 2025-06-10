import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginPayload, UserForm } from '../../../shared/types/User';
import { Observable } from 'rxjs';
interface LoginResponse {
  status: 'success';
  token: string;
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  register(userData:UserForm): Observable<UserForm> {
    return this.http.post<UserForm>(`${this.apiUrl}users/signup`, userData);
  };

  login(userData:LoginPayload): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}users/login`, userData);
  };

  logout(){}

  authenticated(){}

};
