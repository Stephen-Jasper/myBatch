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
  selectedDevUrl: string;
  selectedUatUrl: string;
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
      categoryNameUpdated: '',
      devUrlUpdated: '',
      uatUrlUpdated: ''
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

  get categoryDevUpdated(){
    return this.categoryUpdateForm.get('devUrlUpdated');
  }

  get categoryUatUpdated(){
    return this.categoryUpdateForm.get('uatUrlUpdated');
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
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
      this.router.navigate(['/401']);
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

  findBatch(){
    this.isNoData = false;
    this.inputSearchBatch = {
      batch_name: this.searchedBatch,
      category_id: this.selectedCategory
    }
    this._batchService.getSearchBatch(this.inputSearchBatch).toPromise().then((response) => {
      if(response){
        this.dataFromService = response;
        if(response.length === 0){
          this.isNoData = true;
        }
      }else{
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
      this.router.navigate(['/401']);
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
          this.router.navigate(['/401']);
        }
      }).catch(response => {
        window.scrollTo(0, 0);
        this.router.navigate(['/401']);
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
  }
  closeResponse(){
    this.popUpResponse = false;
  }

  updateCategoryName(){
    this.updateCategory = {
      category_name: this.categoryUpdateForm.controls['categoryNameUpdated'].value,
      main_url_dev: this.categoryUpdateForm.controls['devUrlUpdated'].value,
      main_url_uat: this.categoryUpdateForm.controls['uatUrlUpdated'].value
    }
    this._batchService.updatedFeature(this.selectedFitId, this.updateCategory).toPromise().then((response) =>{
      if(response){
        alert('Update Success!');
        window.location.reload();
      }else{
        alert('Upadate Failed!');
        this.router.navigate(['/401']);
      }
    }).catch(err => {
      window.scrollTo(0,0);
      this.router.navigate(['/401']);
    })
  }

  toDetail(BchId: string){
    this.router.navigate(['myBatch/data-detail/' + BchId]);
  }

  cancelHit(){
    this.popUpHit = false;
  }

}
