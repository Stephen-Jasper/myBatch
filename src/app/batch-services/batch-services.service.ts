import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {BatchData, DogData} from "../batch-dto/batch-response";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ServiceResponse} from "../batch-dto/service-response";

@Injectable({
  providedIn: 'root'
})

export class BatchServicesService {
  private url:string = "https://dog.ceo/api/breeds/image/random";

  constructor(private http: HttpClient,
              private router: Router) { }

  getServiceData(): Observable<DogData[]>{
    return this.http.get<DogData[]>(this.url);
  }

  // READ ALL BATCH FROM DB
  getAllBatchData(): Observable<any>{
    return this.http.get<ServiceResponse<any>[]>(`${environment.apiUrl}/batch/get-list-batch`)
        .pipe(
            map(response =>{
              return response;
            }), catchError((error) => {
              return this.errorMapping(error);
            })
        )
  }

  // HIT BATCH SERVICE
  executeBatch(batchId: string): Observable<any>{
      return this.http.get<ServiceResponse<any>>(`${environment.apiUrl}/hit/batch/${batchId}`)
          .pipe(
              map(response =>{
                  return response;
              }), catchError((error) => {
                  return this.errorMapping(error);
              })
          )
  }

  // DELETE BATCH
  deleteBatch(batchId: string): Observable<any>{
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
