import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BatchResponse, DogData} from "../batch-dto/batch-response";

@Injectable({
  providedIn: 'root'
})

export class BatchServicesService {

  // private url:string = "https://mybcabisnis-virtual-account-service-dev.apps.pcf.dti.co.id/inquiry-va"
  private url:string = "https://dog.ceo/api/breeds/image/random";

  constructor(private http: HttpClient) { }

  // getServiceData(): Observable<BatchResponse[]>{
  //   return this.http.get<BatchResponse[]>(this.url);
  // }

  getServiceData(): Observable<DogData[]>{
    return this.http.get<DogData[]>(this.url);
  }
}
