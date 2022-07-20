import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BatchResponse, DogData, mockResp} from "../batch-dto/batch-response";

@Injectable({
  providedIn: 'root'
})

export class BatchServicesService {

  batch:string = "https://mybcabisnis-virtual-account-service-dev.apps.pcf.dti.co.id/inquiry-va"
  private url:string = "https://dog.ceo/api/breeds/image/random";

  constructor(private http: HttpClient) { }

  getServiceData(): Observable<DogData[]>{
    return this.http.get<DogData[]>(this.url);
  }

  hitVABatch(): Observable<boolean>{
    return this.http.get<boolean>(this.batch);
  }
}
