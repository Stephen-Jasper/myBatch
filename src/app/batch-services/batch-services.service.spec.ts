import { TestBed } from '@angular/core/testing';

import { BatchServicesService } from './batch-services.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('BatchServicesService', () => {
  let service: BatchServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(BatchServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
