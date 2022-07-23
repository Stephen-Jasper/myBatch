import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {BatchData, DogData} from "../batch-dto/batch-response";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class BatchServicesService {
  private url:string = "https://dog.ceo/api/breeds/image/random";

  constructor(private http: HttpClient) { }

  getServiceData(): Observable<DogData[]>{
    return this.http.get<DogData[]>(this.url);
  }

  getAllBatchData(): Observable<BatchData>{
    return this.http.get<BatchData[]>(`${environment.apiUrl}/get-data`)
        .pipe(
            map(response =>{
              return response;
            }), catchError((error) => {
              return error;
            })
        )
  }
}
