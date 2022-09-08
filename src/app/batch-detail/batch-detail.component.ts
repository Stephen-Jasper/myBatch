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

    const source = interval(1000);
    source.subscribe((res) => {
      this.date = new Date();
      this.loadingDate = false;
    });
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
        console.log(response);
        this.detailData = response;
      }else{
        window.location.reload();
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0,0);
    })
  }

  editBatch(){
    this.showPopupEdit = true;
  }

  backToList(){
    this.router.navigate(['/myBatch'])
  }

  logout(){
    this.router.navigate(['/login']);
  }

  submit(){
    this.detailData = {
      categoryId: this.batchEditForm.controls['category_Name'].value,
      batchName: this.batchEditForm.controls['batch_Name'].value,
      description: this.batchEditForm.controls['batch_Desc'].value,
      requestMethod: this.batchEditForm.controls['req_Method'].value,
      environment: this.batchEditForm.controls['batch_Environment'].value,
      mainUrl: this.batchEditForm.controls['batch_url'].value,
      endpoint: this.batchEditForm.controls['batch_endPoint'].value,
    }
    console.log('data send: ' + this.detailData);
    this.detailService.updateSelectedBatch(this.requestId, this.detailData).toPromise().then((response) =>{
      if(response){
        // this.detailData = response;
        alert('Successfully update your batch!')
        window.location.reload()
        // this.router.navigate(['/myBatch'])
      }else{
        this.router.navigate(['/401']);
      }
    }).catch(err => {
      window.scrollTo(0,0);
    })
    console.log(this.detailData);
  }

}
