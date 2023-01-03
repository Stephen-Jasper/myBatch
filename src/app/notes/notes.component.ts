import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BatchGroupData, CategoryData} from "../batch-dto/batch-response";
import {Router} from "@angular/router";
import {NoteServiceService} from "./note-service.service";
import {inputNotesData, notesData, notesGroupData} from "../batch-dto/notes-response";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  showPopupCreateNotes: boolean
  formInputNote = new FormGroup({});
  notesRequest: inputNotesData;
  dataCat: CategoryData[];
  emptyNote: boolean = false;
  dataGroupResponse: notesGroupData;


  constructor(private fb: FormBuilder,
              private router: Router,
              private noteService:NoteServiceService,) {
    this.formInputNote = this.fb.group({
      name: '',
      hyperlink: '',
      category_id: ''
    })
  }

  ngOnInit(): void {
    this.getFeatureData();
    this.getAllNote();
    console.log(this.emptyNote);
  }

  getFeatureData(){
    this.noteService.getFeature().toPromise().then((response) =>{
      if(response){
        this.dataCat = response;
      }else { // Failed
        window.location.reload();
        this.router.navigate(['/404']);
      }
    }).catch(response => {
      this.router.navigate(['/404']);
    })
  }

  getAllNote(){
    this.noteService.getAllNotes().toPromise().then((response) => {
      if(response){
        console.log('response get all note ', response);
        this.dataGroupResponse = response;
        console.log('result temp', this.dataGroupResponse);
        if(response.length < 1){
          this.emptyNote = true;
        }
      }else { // Failed
        window.location.reload();
        this.router.navigate(['/404']);
      }
    }).catch(response => {
      this.router.navigate(['/404']);
    })
  }

  submit(){
    this.notesRequest = {
      "name": this.formInputNote.controls['name'].value,
      "category_id": this.formInputNote.controls['category_id'].value,
      "hyperlink": this.formInputNote.controls['hyperlink'].value,
    }
    console.log('req ke service', this.notesRequest);
    console.log(this.formInputNote.controls['name'].value);
    console.log(this.formInputNote.controls['category_id'].value);
    console.log(this.formInputNote.controls['hyperlink'].value);
    this.noteService.addNewNote(this.notesRequest).toPromise().then((response) =>{
      if(response){
        console.log('add response', response);
        alert('Success added new note!');
        window.location.reload();
      }else{
        alert('Failed to add new note!');
        window.location.reload();
      }
    }).catch(err => {
      this.router.navigate(['/404']);
    })
  }

  executeDeleteNote(id: string){
    this.noteService.deleteNote(id).toPromise().then((response) => {
      if(response){
        alert('Note deleted successfully!')
      }else { // Failed
        window.location.reload();
        this.router.navigate(['/404']);
      }
    }).catch(response => {
      this.router.navigate(['/404']);
    })
  }

  deleteNote(){
    alert('delete!');
  }

}
