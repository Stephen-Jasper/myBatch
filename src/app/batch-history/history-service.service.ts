import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, map, Observable, throwError} from "rxjs";
import {ServiceResponse} from "../batch-dto/service-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HistoryServiceService {

  constructor(private http: HttpClient,
              private router: Router) { }

  // GET HISTORY DATA
  getHitBatchHistory(): Observable<any>{
    return this.http.get<ServiceResponse<any>>(`${environment.apiUrl}/history/get-history`)
        .pipe(
            map(
                response =>{
                  return response
                }, catchError((err) => {
                  return this.errorMapping(err);
                })
            )
        )
  }


  errorMapping(error): Observable<any> {
    if (error.status === 400) {
      this.router.navigate(['/404']).then(r => null);
    } else if (error.status === 408 || error.status === 500) {
      return throwError(error.error.error_schema);
    }
    return error;
  }
}
