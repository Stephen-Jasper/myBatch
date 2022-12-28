import {Component, Input, OnInit} from '@angular/core';
import {BatchData, FeatureRequest, seachRequest} from "../../batch-dto/batch-response";
import {CategoryData} from "../../batch-dto/batch-response";
import {BatchServicesService} from "../batch-services.service";
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
  selectedDevUrl: string;
  selectedUatUrl: string;
  selectedfeature: string;
  loadingHit:boolean = false;
  popUpHit:boolean = false;
  popUpEdit:boolean = false;
  executeResponse: string;
  popUpResponse: boolean = false;
  isNoData: boolean = false;
  loadData: boolean = true;

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
      categoryNameUpdated: '',
      devUrlUpdated: '',
      uatUrlUpdated: ''
    })
  }

  ngOnInit(): void {
    this.getBatchData();
  }

  getBatchData(){
    this.isNoData = false;
    this._batchService.getAllBatchData().toPromise().then((response) => {
      if (response) { // Success Get Data
        this.dataFromService = response;
        this.loadData = false;
        if(response.length === 0){
          this.isNoData = true;
        }
      } else { // Failed
        this.router.navigate(['/404']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
      this.router.navigate(['/404']);
    });
  }

  convertBatchCategory(batch: string){
    for (let i=0; i<this.categoryList.length; ++i){
      if(this.categoryList[i].category_id === batch){
        return this.categoryList[i].category_name;
      }
    }
    return batch;
  }

  showPopupEdit(fitId: string, fitName: string, devUrl: string, uatUrl: string){
    this.popUpEdit = true
    this.selectedFitId = fitId;
    this.selectedFitName = fitName;
    this.selectedDevUrl = devUrl;
    this.selectedUatUrl = uatUrl;
  }

  toRestore(){
    this.router.navigate(['/restore'])
  }

  findBatch(){
    this.isNoData = false;
    this.inputSearchBatch = {
      batch_name: this.searchedBatch,
      category_id: this.selectedCategory === 'default' ? '' : this.selectedCategory
    }
    this._batchService.getSearchBatch(this.inputSearchBatch).toPromise().then((response) => {
      if(response){
        this.dataFromService = response;
        if(response.length === 0){
          this.isNoData = true;
        }
      }else{
        this.router.navigate(['/404']);
      }
    }).catch(response => {
      this.router.navigate(['/404']);
    })
  }

  filterbyCategory(){
    this.isNoData = false;
    this.selectedCategory = this.categoryIdForm.controls['categoryIdFiltered'].value;
    if(this.selectedCategory === 'default'){
      this.getBatchData();
    }else{
      this._batchService.getBatchbyCategory(this.selectedCategory).toPromise().then((response) => {
        if(response){
          this.dataFromService = response;
          if(response.length === 0){
            this.isNoData = true;
          }
        }else{
          this.router.navigate(['/404']);
        }
      }).catch(response => {
        window.scrollTo(0, 0);
        this.router.navigate(['/404']);
      })
    }
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
        this.executeResponse = response.result;
        this.loadingHit = false;
      }else{ // kalau false
        this.executeResponse = response.result;
        this.loadingHit = false;
      }
    }).catch(response => {
      window.scrollTo(0,0);
      this.errorExecute = 'Failed to hit Batch! Please check domain and endpoint'
      this.loadingHit = false;
    });
    this.guide = '';
    this.selectedBatch = batchName;
    this.lastHit = batchName + ' : ';
    this.popUpHit = false;
    this.popUpResponse = true;
  }

  closeResponse(){
    this.popUpResponse = false;
  }

  updateCategoryData(){
    this.updateCategory = {
      category_name: this.categoryUpdateForm.controls['categoryNameUpdated'].value,
      main_url_dev: this.categoryUpdateForm.controls['devUrlUpdated'].value,
      main_url_uat: this.categoryUpdateForm.controls['uatUrlUpdated'].value
    }
    this._batchService.updatedFeature(this.selectedFitId, this.updateCategory).toPromise().then((response) =>{
      if(response){
        alert('Success update your feature!');
        window.location.reload();
      }else{
        alert('Failed to update your feature!');
        window.location.reload();
      }
    }).catch(err => {
      window.scrollTo(0,0);
      this.router.navigate(['/404']);
    })
  }

  toDetail(BchId: string){
    this.router.navigate(['myBatch/data-detail/' + BchId]);
  }

  cancelHit(){
    this.popUpHit = false;
  }

}
