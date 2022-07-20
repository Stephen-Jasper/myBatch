import {Component, Input, OnInit} from '@angular/core';
import {BatchResponse} from "../../batch-dto/batch-response";
import {BatchServicesService} from "../batch-services.service";
import {$0} from "@angular/compiler/src/chars";

@Component({
  selector: 'app-batch-hit',
  templateUrl: './batch-hit.component.html',
  styleUrls: ['./batch-hit.component.scss']
})
export class BatchHitComponent implements OnInit {

  @Input()
  dataResponseCard: BatchResponse[];

  lastHit: string = '';
  vaResponse: boolean;
  selectedCat: string;
  result = [];
  // result: string = '';
  searchedBatch: string;
  loadingHit:boolean = false;

  public APIdata = [];
  response:string = 'Get response by click "Hit!"';

  constructor(private _batchData: BatchServicesService) { }

  ngOnInit(): void {
  }

  RealResponse(){
    // this._batchData.hitVABatch().subscribe(resp => {
    //   if(resp){
    //     this.vaResponse = resp;
    //   }else{
    //   }
    // });
  }

  filterIt($event){
    const value = $event.target.value;
    this.dataResponseCard = this.dataResponseCard.filter(value);
  }

  hit(){
    this.loadingHit = true;
    this.APIdata = [];
    this._batchData.getServiceData()
        .subscribe(data => {
          this.APIdata.push(data)
          this.loadingHit = false;
        });
  }

  findData(str: string){
    console.log('kepanggil : ' + str);
    // this.result = this.dataResponseCard.find(x=>x.name == str).name;
    // this.dataResponseCard = this.dataResponseCard.filter(function (data) {
    //   data.name === str;
    //   console.log(data.name);
    // })
    return this.dataResponseCard.filter((data) => {
      return data.name === str;
    })
  }

  getResponse(name: string){
    if(name === 'VA Inquiry'){
      this.response = 'false';
    }else{
      this.response = 'true';
    }
    this.lastHit = name + ' : ';
  }

  toDetail(){
    alert('To Detail');
  }

}
