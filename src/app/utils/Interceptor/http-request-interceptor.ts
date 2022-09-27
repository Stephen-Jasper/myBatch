import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap, timeout} from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private TIMEOUT: number = 60000;

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let customHeader = {};
    if (request.url.includes('/assets/i18n')) {
      return next.handle(request);
    } else if (request.url.includes('/api/payroll/download-pdf-zip')) {
      customHeader = {'Content-Type': 'application/zip', responseType: 'arraybuffer'};
    }
    return next.handle(
      request.clone(
        {
          headers: new HttpHeaders(this.generateHeader(request, customHeader)),
          withCredentials: true
        }
      )
    ).pipe(
      timeout(this.TIMEOUT),
      tap(response => {
      //  DO SOMETHING
      })
    );
  }

  private generateHeader(request: HttpRequest<unknown>, customHeader: {}) {
    const xOnce = new Date().getTime().toString();
    const body = request.body == null ? '' : JSON.stringify(request.body);
    const xDigest = this.generateDigest(request.urlWithParams, request.method.toUpperCase(), body, xOnce);

    return{
      ...customHeader,
      'x-once': xOnce,
      'x-digest': xDigest
    };
  }

  private generateDigest(url: string, method: string, body: string, xOnce: string): string {
    return 'Interceptor';
  }
}
