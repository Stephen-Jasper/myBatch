import {Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError, TimeoutError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  concurrentLoginErrorMsg = 'Something went wrong';

  constructor(private injector: Injector,
              private zone: NgZone) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
        .pipe(
            catchError((error: any) => {
              if (error instanceof HttpErrorResponse) {
                const router = this.injector.get(Router);
                if (error.status === 401) {
                  const hasHitMaxConcurrentSessions = error.error === this.concurrentLoginErrorMsg;
                  if (hasHitMaxConcurrentSessions) {
                    this.zone.run(() => router.navigate(['/404'], {state: {hasHitMaxConcurrentSessions}}));
                  } else {
                    this.zone.run(() => router.navigate(['/404']));
                  }
                }
              } else if (error instanceof TimeoutError) {
                /**
                 * todo
                 * timeout do something
                 */
              }
              return throwError(error);
            })
        );
  }
}
