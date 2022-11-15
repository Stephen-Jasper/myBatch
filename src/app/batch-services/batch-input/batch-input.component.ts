import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BatchRequest, CategoryData} from "../../batch-dto/batch-response";
import {Route, Router} from "@angular/router";
import {BatchServicesService} from "../batch-services.service";
import {InputServiceService} from "./input-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-batch-input',
  templateUrl: './batch-input.component.html',
  styleUrls: ['./batch-input.component.scss']
})
export class BatchInputComponent implements OnInit {

  selectedLevel = '';
  errorEndpoint: boolean = false;
  batchInputForm = new FormGroup({});
  dataCat: CategoryData[];
  requestBatch: BatchRequest;


  constructor(private router: Router,
              private inputService: InputServiceService,
              private fb: FormBuilder) {
    this.batchInputForm = this.fb.group({
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
    // this.dataCat = [
    //   {
    //     categoryName: 'Transfer Payroll'
    //   },
    //   {
    //     categoryName: 'Transfer VA'
    //   },
    //   {
    //     categoryName: 'Transfer BCA'
    //   },
    //   {
    //     categoryName: 'Transfer DOM'
    //   }
    // ]
   this.getFeatureData();
  }

  get logoField(){
    return this.batchInputForm.get('batch_Logo');
  }

  get nameField(){
    return this.batchInputForm.get('batch_Name');
  }

  get environtmentField(){
    return this.batchInputForm.get('batch_Environment');
  }

  get methodField(){
    return this.batchInputForm.get('req_Method');
  }

  get featureField(){
    return this.batchInputForm.get('category_Name');
  }

  get urlField(){
    return this.batchInputForm.get('batch_url');
  }

  get endPointField(){
    return this.batchInputForm.get('batch_endPoint');
  }

  get descField(){
    return this.batchInputForm.get('batch_Desc');
  }

  getFeatureData(){
    this.inputService.getFeature().toPromise().then((response) =>{
      if(response){
        this.dataCat = response;
      }else { // Failed
        window.location.reload();
        this.router.navigate(['/404']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
    })
  }

  submit(){
    this.requestBatch = {
      category_id: this.batchInputForm.controls['category_Name'].value,
      batch_name: this.batchInputForm.controls['batch_Name'].value,
      description: this.batchInputForm.controls['batch_Desc'].value,
      request_method: 'GET',
      environment: this.batchInputForm.controls['batch_Environment'].value,
      main_url: this.batchInputForm.controls['batch_url'].value,
      endpoint: this.batchInputForm.controls['batch_endPoint'].value,
    }
    if(!this.batchInputForm.controls['batch_endPoint'].value.startsWith('/')){
      this.errorEndpoint = true;
    }else{
      this.inputService.createNewBatch(this.requestBatch).toPromise().then((response) => {
        if(response){
          alert('Success create new batch!');
          window.location.reload();
        }else{
          this.router.navigate(['/404']);
        }
      }).catch(err => {
        window.scrollTo(0,0);
      })
    }
  }


}
