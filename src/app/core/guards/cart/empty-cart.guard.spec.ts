import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { emptyCartGuard } from './empty-cart.guard';

describe('emptyCartGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => emptyCartGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
