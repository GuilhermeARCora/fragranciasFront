import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserForm } from '../../../shared/types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  register(userData:UserForm): Observable<UserForm> {
    return this.http.post<UserForm>(`${this.apiUrl}users/signup`, userData, {withCredentials:true});
  };

};
