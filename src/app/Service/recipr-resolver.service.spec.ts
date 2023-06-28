import { TestBed } from '@angular/core/testing';

import { ReciprResolverService } from './recipr-resolver.service';

describe('ReciprResolverService', () => {
  let service: ReciprResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReciprResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
