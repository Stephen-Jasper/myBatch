import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch-services',
  templateUrl: './batch-services.component.html',
  styleUrls: ['./batch-services.component.scss']
})
export class BatchServicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  data = [
    {
      name: 'Payroll Inquiry ',
      link: 'https://www.instagram.com'
    },
    {
      name: 'Transfer Inquiry',
      link: 'https://www.facebook.com'
    },
    {
      name: 'VA Inquiry',
      link: 'https://www.youtube.com'
    }
  ]

  delete(){
    console.log('Delete batch');
  }

  edit(){
    console.log('Edit batch');
  }

}
