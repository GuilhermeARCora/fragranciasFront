import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing'

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // afterEach(() => {
  //   // Fails if any HTTP calls are still outstanding
  //   httpMock.verify();
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login endpoint', () => {
    const fakeToken = {token: '123'};

    // Exercise your service method
    service.login({ email: 'u', password: 'p' }).subscribe(res => {
      expect(res).toEqual(fakeToken);
    });

    // “Expect” that one HTTP request went out to /api/login
    const req = httpMock.expectOne('http://localhost:3000/api/v1/users/login');
    expect(req.request.method).toBe('POST');

    // Simulate the server responding with our fakeToken
    req.flush(fakeToken);
  });

});
