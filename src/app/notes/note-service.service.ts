import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {catchError, map, Observable, throwError} from "rxjs";
import {ServiceResponse} from "../batch-dto/service-response";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {inputNotesData, notesData} from "../batch-dto/notes-response";

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

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

  // VIEW ALL NOTES
  getAllNotes(): Observable<any>{
    return this.http.get<ServiceResponse<any>[]>(`${environment.apiUrl}/notes/view-notes`)
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
  addNewNote(requestNewNote: inputNotesData): Observable<any>{
      return this.http.post<ServiceResponse<any>>(`${environment.apiUrl}/notes/add-notes`, requestNewNote)
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
      return this.http.delete<ServiceResponse<any>>(`${environment.apiUrl}/notes/delete-notes/${noteId}`)
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
