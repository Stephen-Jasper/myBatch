import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {ServiceResponse} from "../batch-dto/service-response";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RestoreServiceService {

  constructor(private http: HttpClient,
              private router: Router) { }

  // GET ALL DATA
  getAllJunk(): Observable<any>{
    return this.http.get<ServiceResponse<any>[]>(`${environment.apiUrl}/batch/get-list-batch`)
        .pipe(
            map(response =>{
              return response;
            }), catchError((error) => {
              return this.errorMapping(error);
            })
        )
  }

  // RESTRORE BATCH
  restoreBatch(batchId: string): Observable<any>{
    return this.http.get<ServiceResponse<any>>(`${environment.apiUrl}/batch/restore-batch/${batchId}`)
        .pipe(
            map(response =>{
              return response;
            }), catchError((error) => {
              return this.errorMapping(error);
            })
        )
  }

  // DELETE BATCH
  permanentDeleteBatch(batchId: string): Observable<any>{
    return this.http.delete<ServiceResponse<any>>(`${environment.apiUrl}/batch/delete-batch/${batchId}`)
        .pipe(
            map(response =>{
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
