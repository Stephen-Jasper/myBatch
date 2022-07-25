import {Component, Input, OnInit} from '@angular/core';
import {BatchData} from "../../batch-dto/batch-response";
import {BatchServicesService} from "../batch-services.service";
import {$0} from "@angular/compiler/src/chars";
import {Router} from "@angular/router";

@Component({
  selector: 'app-batch-hit',
  templateUrl: './batch-hit.component.html',
  styleUrls: ['./batch-hit.component.scss']
})
export class BatchHitComponent implements OnInit {

  @Input()
  dataResponseCard: BatchData[];

  lastHit: string = '';
  result = [];
  searchedBatch: string;
  selectedBatch: string;
  selectedId: string;
  loadingHit:boolean = false;
  popUpHit:boolean = false;
  executeResponse: boolean = false;

  public APIdata = [];
  guide:string = 'Get response by click "Hit!"';

  constructor(private _batchService: BatchServicesService,
              private router: Router) { }

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
    this._batchService.getServiceData()
        .subscribe(data => {
          this.APIdata.push(data)
          this.loadingHit = false;
        });
  }

  findData(str: string){
    return this.dataResponseCard.filter((data) => {
      return data.batchName === str;
    })
  }

  selectBatchHit(batchName: string, batchId: string){
    this.selectedBatch = batchName;
    this.selectedId = batchId;
    this.popUpHit = true;
  }

  getResponse(batchId: string, batchName: string){
    this._batchService.executeBatch(batchId).toPromise().then((response) => {
      if(response) {
        this.executeResponse = response;
      }else{
        window.location.reload();
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0,0);
    });
    this.guide = '';
    this.selectedBatch = batchName;
    this.lastHit = batchName + ' : ';
    this.popUpHit = false;
    // if(batchId === 'VA Inquiry'){
    //   this.executeResponse = false;
    // }else{
    //   this.executeResponse = true;
    // }
    // window.scroll(0,0);
  }

  toDetail(){
    this.router.navigate(['/data-detail'])
  }

  cancelHit(){
    this.popUpHit = false;
  }

}
