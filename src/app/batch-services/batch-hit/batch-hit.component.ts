import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-batch-hit',
  templateUrl: './batch-hit.component.html',
  styleUrls: ['./batch-hit.component.scss']
})
export class BatchHitComponent implements OnInit {

  response:string = 'Get response by click "Hit!"';

  batchData = [
    {
      req: 'GET',
      name: 'Payroll Inquiry '
    },
    {
      req: 'GET',
      name: 'Transfer Inquiry'
    },
    {
      req: 'GET',
      name: 'VA Inquiry'
    },
    {
      req: 'GET',
      name: 'DOM Inquiry'
    },
    {
      req: 'GET',
      name: 'Transfer BCA Inquiry'
    },
    {
      req: 'GET',
      name: 'Bulk Transfer Inquiry'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  getResponse(name: string){
    if(name === 'VA Inquiry'){
      this.response = 'false';
    }else{
      this.response = 'true';
    }
  }

}
