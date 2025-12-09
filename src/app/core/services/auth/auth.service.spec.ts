import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import type { LoginPayload } from '../../../shared/types/authentication';
import type { ResponseData } from '../../../shared/types/responseData';
import type { User } from '../../../shared/types/user';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const apiUrl = environment.apiUrl;
  const path = 'auth';

  const resMockMe: ResponseData<User> = {
    status: 200,
    message: 'Sucesso ao recuperar o usuário autenticado',
    data: {
      _id: '123',
      name: 'teste@gmail.com',
      email: 'teste@gmail.com',
      role: 'client',
      active: true
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AuthService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and save the current user', () => {
    const loginUrl = `${apiUrl}${path}/login`;
    const meUrl = `${apiUrl}${path}/me`;
    const form: LoginPayload = {
      email: 'teste@gmail.com',
      password: '123'
    };
    const resMock = {
      status: 200,
      message: 'Conectado com sucesso',
      data: 'TOKEN'
    };

    const result$ = service.login(form);
    result$.subscribe(value => {
      expect(value).toEqual(resMockMe.data);
    });

    const reqLogin = httpMock.expectOne(loginUrl);

    expect(reqLogin.request.method).toBe('POST');
    expect(reqLogin.request.body).toEqual(form);
    reqLogin.flush(resMock);

    const reqMe = httpMock.expectOne(meUrl);
    expect(reqMe.request.method).toBe('GET');
    reqMe.flush(resMockMe);

    expect(service.userSubject.getValue()).toEqual(resMockMe.data);
    expect(service.currentUser).toEqual(resMockMe.data);
  });

  it('should logout the user', () => {
    const logoutUrl = `${apiUrl}${path}/logout`;
    const resMock = {
      status:200,
      message:'Desconectado com sucesso!',
      data:{}
    };

    const result$ = service.logout();
    result$.subscribe();

    const req = httpMock.expectOne(logoutUrl);

    expect(req.request.method).toBe('DELETE');

    req.flush(resMock);
    expect(service.userSubject.getValue()).toEqual(null);
  });

  it('should set the current user', () => {
    const currentUser = resMockMe.data;

    service.setCurrentUser(currentUser);

    expect(service.userSubject.getValue()).toEqual(resMockMe.data);
  });

});
