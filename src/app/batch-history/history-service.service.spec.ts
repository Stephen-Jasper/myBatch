import { TestBed } from '@angular/core/testing';
import { HistoryServiceService } from './history-service.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

describe('HistoryServiceService', () => {
  let service: HistoryServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
    service = TestBed.inject(HistoryServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
