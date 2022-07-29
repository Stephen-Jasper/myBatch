import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {ServiceResponse} from "../batch-dto/service-response";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {BatchDataDetail} from "../batch-dto/batch-response";

@Injectable({
  providedIn: 'root'
})
export class DetailServiceService {

  constructor(private http: HttpClient,
              private router: Router) { }

  // GET SELECTED DATA batch/get-batch/id
  getSelectedBatch(BchId: string): Observable<any>{
    return this.http.get<ServiceResponse<any>>(`${environment.apiUrl}/batch/get-batch/${BchId}`)
        .pipe(
            map(
                response => {
                  return response;
                }, catchError((error) => {
                  return this.errorMapping(error);
                })
            )
        )
  }

  // UPDATE BATCH
  updateSelectedBatch(BchId: string, requestUpdateBatch: BatchDataDetail): Observable<any>{
      return this.http.put(`${environment.apiUrl}/batch/update-batch/${BchId}`, requestUpdateBatch)
          .pipe(
              map((response) =>{
                  return response;
              }), catchError((error) => {
                  return this.errorMapping(error);
              })
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
