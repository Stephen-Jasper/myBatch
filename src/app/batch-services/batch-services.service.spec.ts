import { TestBed } from '@angular/core/testing';

import { BatchServicesService } from './batch-services.service';

describe('BatchServicesService', () => {
  let service: BatchServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
