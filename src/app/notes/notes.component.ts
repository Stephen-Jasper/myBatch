import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoryData} from "../batch-dto/batch-response";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  showPopupCreateNotes: boolean
  batchInputNote = new FormGroup({});
  dataCat: CategoryData[];


  constructor(private fb: FormBuilder) {
    this.batchInputNote = this.fb.group({
      notes_name: '',
      notes_link: '',
      notes_category: ''
    })
  }

  ngOnInit(): void {
    this.dataCat = [
      {
        'category_id': '1',
        'category_name': 'Trf Dom'
      },
      {
        'category_id': '2',
        'category_name': 'Trf Bulk'
      },
    ]
    console.log(this.dataCat);
  }

  deleteNote(){
    alert('delete!');
  }

  submit(){
    alert('Note succesfully added!')
  }

}
