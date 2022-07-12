import {Component, Input, OnInit} from '@angular/core';
import {BatchResponse} from "../batch-dto/batch-response";

@Component({
  selector: 'app-batch-services',
  templateUrl: './batch-services.component.html',
  styleUrls: ['./batch-services.component.scss']
})
export class BatchServicesComponent implements OnInit {

  dataResponse: BatchResponse[];
  data = [];
  constructor() { }

  ngOnInit(): void {
    this.dataResponse = [
      {
        req_method: 'GET',
        name: 'Payroll Inquiry ',
        link: 'https://www.instagram.com'
      },
      {
        req_method: 'GET',
        name: 'Transfer Inquiry',
        link: 'https://www.facebook.com'
      },
      {
        req_method: 'GET',
        name: 'VA Inquiry',
        link: 'https://www.youtube.com'
      },
      {
        req_method: 'GET',
        name: 'Trf DOM Inquiry',
        link: 'https://www.youtube.com'
      },
      {
        req_method: 'GET',
        name: 'Trf BCA Inquiry',
        link: 'https://www.youtube.com'
      },
      {
        req_method: 'POST',
        name: 'Bulk trf Inquiry',
        link: 'https://www.youtube.com'
      }
    ]
  }

  addBatch(){
    alert('Add Batch');
  }

  delete(){
    alert('Delete batch');
  }

  edit(){
    alert('Edit batch');
  }

}
