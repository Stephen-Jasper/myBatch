import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {DetailServiceService} from "./detail-service.service";
import {BatchDataDetail} from "../batch-dto/batch-response";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit {

  showPopupEdit:boolean = false;
  batchEditForm = new FormGroup({});
  detailData:  BatchDataDetail;
  requestId: string;
  loadingLoad: boolean;
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
    this.detailData = {
      batch_id: '35',
      category_id: '1',
      batch_name: "Inquiry VA",
      description: "Inquiry data transfer virtual account\n\nJam : 12.00 PM sampai 16.00 PM\n batch dijalankan setiap 15 menit\n\nJob  : Ambil data dari DB A ke DB B agar singkron \n" +
          "Transaksi yang ditahan adalah transaksi yang dijalankan melebihi jam cut on.\n",
      environment: 'DEV',
      endpoint: "/inquiry-va",
      request_method: 'GET',
      main_url: 'https://domainVA-DEV-Mock.co.id'
    }
    // this.getDataDetail();
  }

  getDataDetail(){
    this.loadingLoad = true;
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
    this.detailService.updateSelectedBatch(this.requestId, this.detailData).toPromise().then((response) =>{
      if(response){
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
