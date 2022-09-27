import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError, TimeoutError} from 'rxjs';
import {catchError, timeout} from 'rxjs/operators';
import {environment} from '../../../environments/environment';



@Injectable()
export class HttpTimeoutInterceptor implements HttpInterceptor {
  private readonly TIMEOUT = environment.timeout;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const errObj = new HttpErrorResponse({
      error: {
        error_schema: {
          error_code: 'batch-500',
          error_message: {
            english: 'Timeout! Cannot be process.',
            indonesian: 'Telah terjadi timeout! Tidak dapat diproses.'
          }
        },
        output_schema: {
          message: 'Telah terjadi timeout! Tidak dapat diproses.'
        }
      },
      headers: request.headers,
      status: 500, // 408
      url: request.url
    });

    // OFFLINE EVENT HANDLER
    if(!window.navigator.onLine) {
      return throwError(errObj);
    }

    return next.handle(request).pipe(
      timeout(this.TIMEOUT),
      catchError(err => {
        if (!err.error || err instanceof TimeoutError) {
          return throwError(errObj);
        } else {
          return throwError(err);
        }
      })
    );
  }
}
