import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {interval} from "rxjs";
import {DetailServiceService} from "./detail-service.service";
import {BatchDataDetail} from "../batch-dto/batch-response";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit {

  date: Date | undefined;
  loadingDate: boolean = true;
  showPopupEdit:boolean = false;
  batchEditForm = new FormGroup({});
  detailData:  BatchDataDetail;
  requestId: string;
  loadingLoad: boolean = true;
  errorEditName: string = '';
  errorEditEndpoint: string = '';

  detailName: string;
  detailUrl: string;
  detailEndPoint: string;
  detailDesc: string;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private detailService: DetailServiceService,
              private fb: FormBuilder) {
    this.batchEditForm = this.fb.group({
      batch_Logo: '',
      batch_Name: '',
      batch_Environment: '',
      req_Method: '',
      category_Name: '',
      batch_url: '',
      batch_endPoint: '',
      batch_Desc: '',
    })
  }

  ngOnInit(): void {
    this.requestId = (this.activeRoute.snapshot.params as any).BchId;
    this.getDataDetail();
  }

  get logoField(){
    return this.batchEditForm.get('batch_Logo');
  }

  get nameField(){
    return this.batchEditForm.get('batch_Name');
  }

  // get environtmentField(){
  //   return this.batchEditForm.get('batch_Environment');
  // }
  //
  // get methodField(){
  //   return this.batchEditForm.get('req_Method');
  // }
  //
  // get featureField(){
  //   return this.batchEditForm.get('category_Name');
  // }

  get urlField(){
    return this.batchEditForm.get('batch_url');
  }

  get endPointField(){
    return this.batchEditForm.get('batch_endPoint');
  }

  get descField(){
    return this.batchEditForm.get('batch_Desc');
  }

  getDataDetail(){
    this.detailService.getSelectedBatch(this.requestId).toPromise().then((response) =>{
      if(response){
        this.detailData = response;
        this.setModelValue();
        this.loadingLoad = false;
      }else{
        window.location.reload();
        this.router.navigate(['/404']);
      }
    }).catch(response => {
      this.router.navigate(['/404']);
    })
  }

  setModelValue(){
    this.detailName = this.detailData.batch_name;
    this.detailUrl = this.detailData.main_url;
    this.detailEndPoint = this.detailData.endpoint;
    this.detailDesc = this.detailData.description;
  }

  editBatch(){
    this.showPopupEdit = true;
  }

  backToList(){
    this.router.navigate(['/myBatch'])
  }

  submit(){
    this.detailData = {
      category_id: this.detailData.category_id,
      batch_name: this.batchEditForm.controls['batch_Name'].value,
      description: this.batchEditForm.controls['batch_Desc'].value,
      request_method: this.batchEditForm.controls['req_Method'].value,
      environment:this.detailData.environment,
      main_url: this.batchEditForm.controls['batch_url'].value,
      endpoint: this.batchEditForm.controls['batch_endPoint'].value,
    }
    console.log('request ', this.detailData);
    this.detailService.updateSelectedBatch(this.requestId, this.detailData).toPromise().then((response) =>{
      if(response){
        console.log(response);
        if(response.error_schema.error_code === 'FAILED_INVALID_NAME'){
          this.errorEditName = response.error_schema.error_message;
        } else if(response.error_schema.error_code === 'FAILED_INVALID_ENDPOINT'){
          this.errorEditEndpoint = response.error_schema.error_message;
        }
        else{
          alert('Success update your batch!');
          window.location.reload();
        }
      }else{
        alert('Failed to update your batch!');
        window.location.reload();
      }
    }).catch(err => {
      this.router.navigate(['/404']);
    })
  }

}
