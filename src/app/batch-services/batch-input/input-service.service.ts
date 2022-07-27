import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {ServiceResponse} from "../../batch-dto/service-response";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {BatchRequest} from "../../batch-dto/batch-response";

@Injectable({
  providedIn: 'root'
})
export class InputServiceService {

  constructor(private http: HttpClient,
              private router: Router) { }

  // GET FEATURE LIST FOR DROPDOWN
  getFeature(): Observable<any>{
    return this.http.get<ServiceResponse<any>[]>(`${environment.apiUrl}/category/get-category`)
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

  //   CREATE NEW FEATURE
  createNewFeature(newFreature: string): Observable<any>{
      return this.http.post(`${environment.apiUrl}/category/add-category`, newFreature)
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

  // CREATE NEW BATCH
  createNewBatch(requestBody: BatchRequest): Observable<any>{
      return this.http.post(`${environment.apiUrl}/batch/add-batch`, requestBody)
          .pipe(
              map(
                  response => {
                      return response
                  }, catchError((error) => {
                      return this.errorMapping(error);
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
