import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-batch-services',
  templateUrl: './batch-services.component.html',
  styleUrls: ['./batch-services.component.scss']
})
export class BatchServicesComponent implements OnInit {

  // @Input()
  constructor() { }

  ngOnInit(): void {
  }

  data = [
    {
      req: 'GET',
      name: 'Payroll Inquiry ',
      link: 'https://www.instagram.com'
    },
    {
      req: 'GET',
      name: 'Transfer Inquiry',
      link: 'https://www.facebook.com'
    },
    {
      req: 'GET',
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
