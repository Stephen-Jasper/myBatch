import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {ServiceResponse} from "../batch-dto/service-response";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {notesData} from "../batch-dto/notes-response";

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  constructor(private http: HttpClient,
              private router: Router) { }

  // VIEW ALL NOTES
  getAllNotes(): Observable<any>{
    return this.http.get<ServiceResponse<any>[]>(`${environment.apiUrl}/note`)
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

  // CREATE NOTES
  addNewNote(requestNewNote: notesData): Observable<any>{
      return this.http.post<ServiceResponse<any>>(`${environment.apiUrl}/note`, requestNewNote)
          .pipe(
              map((response) =>{
                  return response
              }), catchError((error) => {
                  return this.errorMapping(error)
              })
          )
  }

  // DELETE NOTES
  deleteNote(noteId: string): Observable<any>{
      return this.http.delete<ServiceResponse<any>>(`${environment.apiUrl}/note/delete-note/${noteId}`)
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
