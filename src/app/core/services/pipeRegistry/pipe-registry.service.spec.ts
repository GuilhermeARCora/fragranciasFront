import { TestBed } from '@angular/core/testing';

import { PipeRegistryService } from './pipe-registry.service';

describe('PipeRegistryService', () => {
  let service: PipeRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipeRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
