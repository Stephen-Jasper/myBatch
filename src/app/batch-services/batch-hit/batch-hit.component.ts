import {Component, Input, OnInit} from '@angular/core';
import {BatchResponse} from "../../batch-dto/batch-response";
import {BatchServicesService} from "../batch-services.service";

@Component({
  selector: 'app-batch-hit',
  templateUrl: './batch-hit.component.html',
  styleUrls: ['./batch-hit.component.scss']
})
export class BatchHitComponent implements OnInit {

  @Input()
  dataResponseCard: BatchResponse[];

  public APIdata = [];
  response:string = 'Get response by click "Hit!"';

  constructor(private _batchData: BatchServicesService) { }

  ngOnInit(): void {
  }

  hit(){
    // this._batchData.getServiceData()
    //     .subscribe(data => this.APIdata.push(data));
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
