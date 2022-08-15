import { TestBed } from '@angular/core/testing';

import { DetailServiceService } from './detail-service.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from "@angular/core";

describe('DetailServiceService', () => {
  let service: DetailServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(DetailServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
