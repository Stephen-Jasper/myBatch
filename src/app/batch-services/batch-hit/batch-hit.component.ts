import {Component, Input, OnInit} from '@angular/core';
import {BatchData} from "../../batch-dto/batch-response";
import {CategoryData} from "../../batch-dto/batch-response";
import {BatchServicesService} from "../batch-services.service";
import {$0} from "@angular/compiler/src/chars";
import {Router} from "@angular/router";
import {InputServiceService} from "../batch-input/input-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-batch-hit',
  templateUrl: './batch-hit.component.html',
  styleUrls: ['./batch-hit.component.scss']
})
export class BatchHitComponent implements OnInit {

  @Input()
  dataResponseCard: BatchData[];

  @Input()
  categoryList: CategoryData[];

  categoryIdForm = new FormGroup({});
  lastHit: string = '';
  errorExecute: string = '';
  searchedBatch: string;
  selectedBatch: string;
  selectedCategory: string = '';
  selectedId: string;
  loadingHit:boolean = false;
  popUpHit:boolean = false;
  executeResponse: boolean;

  // public APIdata = [];
  guide:string = 'Get response by click "Hit!"';

  constructor(private _batchService: BatchServicesService,
              private dataService: InputServiceService,
              private router: Router,
              private fb: FormBuilder) {
    this.categoryIdForm = this.fb.group({
      categoryIdFiltered: ''
    })
  }

  get CategoryId(){
    return this.categoryIdForm.get('categoryIdFiltered');
  }

  ngOnInit(): void {
    // this.getCategoryFilter();
  }

  convertBatchCategory(batch: string){
    return this.categoryList[parseInt(batch)-1].categoryName;
  }

  // getCategoryFilter(){
  //   this.dataService.getFeature().toPromise().then((response) => {
  //     if(response){
  //       this.categoryList = response;
  //     }else { // Failed
  //       window.location.reload();
  //       this.router.navigate(['/401']);
  //     }
  //   }).catch(response => {
  //     window.scrollTo(0, 0);
  //   })
  // }

  filterbyCategory(){
    this.selectedCategory = this.categoryIdForm.controls['categoryIdFiltered'].value;
    this._batchService.getBatchbyCategory(this.selectedCategory).toPromise().then((response) => {
      if(response){
        this.dataResponseCard = response;
      }else{
        window.location.reload();
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
    })
  }

  getAllDataBack(){
    window.location.reload();
  }

  filterIt($event){
    const value = $event.target.value;
    this.dataResponseCard = this.dataResponseCard.filter(value);
  }

  // hit(){
  //   this.loadingHit = true;
  //   this.APIdata = [];
  //   this._batchService.getServiceData()
  //       .subscribe(data => {
  //         this.APIdata.push(data)
  //         this.loadingHit = false;
  //       });
  // }

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
    this.errorExecute = '';
    this.loadingHit = true;
    this._batchService.executeBatch(batchId).toPromise().then((response) => {
      if(response) {
        this.executeResponse = response;
        this.loadingHit = false;
        window.scrollTo(0,0);
      }else{
        window.location.reload();
        this.loadingHit = false;
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0,0);
      this.errorExecute = 'Failed to hit Batch! Please check rest API'
      this.loadingHit = false;
    });
    this.guide = '';
    this.selectedBatch = batchName;
    this.lastHit = batchName + ' : ';
    this.popUpHit = false;
    console.log('res: ' + this.executeResponse);
  }

  toDetail(BchId: string){
    this.router.navigate(['myBatch/data-detail/' + BchId]);
  }

  cancelHit(){
    this.popUpHit = false;
  }

}
