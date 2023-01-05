import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {BatchData} from "../batch-dto/batch-response";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ServiceResponse} from "../batch-dto/service-response";
import {seachRequest, FeatureRequest} from "../batch-dto/batch-response";

@Injectable({
  providedIn: 'root'
})

export class BatchServicesService {

  constructor(private http: HttpClient,
              private router: Router) { }

  // GET ALL BATCH FROM DB
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

  // GET ALL BATCH DATA WITH GROUP
  getAllgroupData(): Observable<any>{
      return this.http.get<ServiceResponse<any>[]>(`${environment.apiUrl}/batch/get-list-batch/grouped`)
          .pipe(
              map(response => {
                  return response;
              }), catchError((error) => {
                  return this.errorMapping(error);
              })
          )
  }

  // GET BATCH BY CATEGORY
  getBatchbyCategory(categoryId: string): Observable<any>{
      return this.http.get<ServiceResponse<any>[]>(`${environment.apiUrl}/batch/get-list-batch/category/${categoryId}`)
          .pipe(
              map( response => {
                  return response;
              }), catchError((error) => {
                  return this.errorMapping(error);
              })
          )
  }

  // getFeature
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

  // SEARCH BATCH
  getSearchBatch(requestSearch: seachRequest){
      return this.http.post<ServiceResponse<any>>(`${environment.apiUrl}/batch/search-batch`, requestSearch)
          .pipe(
              map(response => {
                  return response;
              }), catchError ((error) => {
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

  // SEND BATCH to JUNK
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

  // EDIT FEATURE
  updatedFeature(featureId: string, featureName: FeatureRequest): Observable<any>{
      return this.http.put<ServiceResponse<any>>(`${environment.apiUrl}/category/update-category/${featureId}`, featureName)
          .pipe(
              map(response =>{
                  return response
              }), catchError((err) => {
                  return this.errorMapping(err);
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
