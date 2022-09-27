import { TestBed } from '@angular/core/testing';

import { HttpTimeoutInterceptor } from './http-timeout.interceptor';
import {HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('HttpTimeoutInterceptor', () => {
  let interceptor: HttpTimeoutInterceptor;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpTimeoutInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpTimeoutInterceptor,
          multi: true
        }
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(HttpTimeoutInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should return a specific HttpErrorResponse on service timeout or error 500', (done) => {
    httpClient.get<any>('/api').subscribe(
      () => {
        fail('failing the call');
      },
      (errorResponse: HttpErrorResponse) => {
        expect(errorResponse.status).toEqual(408);
        done();
      }
    );
    const req = httpMock.expectOne('/api');
    req.flush({}, {status: 408, statusText: ''});
  });
});
