import {Component, Input, OnInit} from '@angular/core';
import {BatchData, FeatureRequest, seachRequest} from "../../batch-dto/batch-response";
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

  dataFromService: BatchData[];
  inputSearchBatch: seachRequest;
  updateCategory: FeatureRequest;
  categoryIdForm = new FormGroup({});
  categoryUpdateForm = new FormGroup({});

  lastHit: string = '';
  errorExecute: string = '';
  searchedBatch: string;
  selectedBatch: string;
  selectedCategory: string = '';
  selectedId: string;
  selectedFitId: string;
  selectedFitName: string;
  selectedfeature: string;
  loadingHit:boolean = false;
  popUpHit:boolean = false;
  popUpEdit:boolean = false;
  executeResponse: boolean;
  popUpResponse: boolean = false;
  isNoData: boolean = false;

  newFeatureName: string;

  // public APIdata = [];
  guide:string = 'Get response by click "Hit!"';

  constructor(private _batchService: BatchServicesService,
              private dataService: InputServiceService,
              private router: Router,
              private fb: FormBuilder) {
    this.categoryIdForm = this.fb.group({
      categoryIdFiltered: '',
      searchBatchFilterd: ''
    })
    this.categoryUpdateForm = this.fb.group({
      categoryNameUpdated: ''
    })
  }

  get CategoryId(){
    return this.categoryIdForm.get('categoryIdFiltered');
  }

  get SearchedBatch(){
    return this.categoryIdForm.get('searchBatchFilterd');
  }

  get categoryNameUpdt(){
    return this.categoryUpdateForm.get('categoryNameUpdated');
  }

  ngOnInit(): void {
    // this.getCategoryFilter();
    this.getBatchData();
  }

  getBatchData(){
    this.isNoData = false;
    this._batchService.getAllBatchData().toPromise().then((response) => {
      if (response) { // Success Get Data
        this.dataFromService = response;
        if(response.length === 0){
          this.isNoData = true;
        }
      } else { // Failed
        window.location.reload();
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
    });
  }

  convertBatchCategory(batch: string){
    return this.categoryList[parseInt(batch)-1].category_name;
    // return batch
  }

  showPopupEdit(fitId: string, fitName: string){
    this.popUpEdit = true
    this.selectedFitId = fitId;
    this.selectedFitName = fitName
  }

  findBatch(){
    this.isNoData = false;
    this.inputSearchBatch = {
      batch_name: this.searchedBatch,
      category_id: this.selectedCategory
    }
    console.log(this.inputSearchBatch);
    this._batchService.getSearchBatch(this.inputSearchBatch).toPromise().then((response) => {
      if(response){
        console.log(response);
        this.dataFromService = response;
        if(response.length === 0){
          this.isNoData = true;
        }
      }else{
        window.location.reload();
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
    })
  }

  filterbyCategory(){
    this.isNoData = false;
    this.selectedCategory = this.categoryIdForm.controls['categoryIdFiltered'].value;
    this._batchService.getBatchbyCategory(this.selectedCategory).toPromise().then((response) => {
      if(response){
        console.log(response);
        this.dataFromService = response;
        console.log('all data 2: ' + this.dataFromService);
        if(response.length === 0){
          this.isNoData = true;
        }
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
    // this.dataResponseCard = this.dataResponseCard.filter(value);
    console.log(value);
  }

  selectBatchHit(batchName: string, batchId: string, categoryId:string){
    this.selectedBatch = batchName;
    this.selectedId = batchId;
    this.selectedfeature = this.convertBatchCategory(categoryId);
    this.popUpHit = true;
  }

  getResponse(batchId: string, batchName: string){
    this.errorExecute = '';
    this.loadingHit = true;
    this.popUpResponse = false;
    this.executeResponse = null;
    this._batchService.executeBatch(batchId).toPromise().then((response) => {
      if(response) {
        this.executeResponse = response;
        this.loadingHit = false;
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
    this.popUpResponse = true;
    console.log('res: ' + this.executeResponse);
  }
  closeResponse(){
    this.popUpResponse = false;
  }

  updateCategoryName(){
    this.updateCategory = {
      category_name: this.categoryUpdateForm.controls['categoryNameUpdated'].value
    }
    console.log(this.updateCategory);
    this._batchService.updatedFeature(this.selectedFitId, this.updateCategory).toPromise().then((response) =>{
      if(response){
        alert('Update Success!');
        window.location.reload();
      }else{
        this.router.navigate(['/401']);
      }
    }).catch(err => {
      window.scrollTo(0,0);
    })
  }

  toDetail(BchId: string){
    this.router.navigate(['myBatch/data-detail/' + BchId]);
  }

  cancelHit(){
    this.popUpHit = false;
  }

}
