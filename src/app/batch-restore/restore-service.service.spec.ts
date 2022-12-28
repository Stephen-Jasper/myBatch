import { TestBed } from '@angular/core/testing';

import { RestoreServiceService } from './restore-service.service';

describe('RestoreServiceService', () => {
  let service: RestoreServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestoreServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
