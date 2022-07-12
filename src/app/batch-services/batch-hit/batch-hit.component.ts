import {Component, Input, OnInit} from '@angular/core';
import {BatchResponse} from "../../batch-dto/batch-response";

@Component({
  selector: 'app-batch-hit',
  templateUrl: './batch-hit.component.html',
  styleUrls: ['./batch-hit.component.scss']
})
export class BatchHitComponent implements OnInit {

  @Input()
  dataResponseCard: BatchResponse[];

  response:string = 'Get response by click "Hit!"';

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

  toDetail(){
    alert('To Detail');
  }

}
