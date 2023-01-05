import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BatchRequest, CategoryData, EnvData} from "../../batch-dto/batch-response";
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

  errorEndpoint: boolean = false;
  errorCreateName: string = '';
  errorCreateEndpoin: string = '';
  batchInputForm = new FormGroup({});
  dataCat: CategoryData[];
  envData: EnvData[];
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
    this.envData = [
      {
      env_id : '1',
      env_name: 'DEV'
      },
      {
        env_id: '2',
        env_name: 'UAT'
      }]
   this.getFeatureData();
   this.getEnvData();
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

  getEnvData(){
    this.inputService.getEnvironment().toPromise().then((response) => {
      if(response){
        this.envData = response;
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
      environment_id: this.batchInputForm.controls['batch_Environment'].value,
      main_url: this.batchInputForm.controls['batch_url'].value,
      endpoint: this.batchInputForm.controls['batch_endPoint'].value,
    }
    this.errorCreateName = '';
    this.errorCreateEndpoin = '';
    if(this.batchInputForm.controls['batch_Name'].value === '' || this.batchInputForm.controls['batch_endPoint'].value === '' || this.batchInputForm.controls['batch_Environment'].value === ''
    || this.batchInputForm.controls['category_Name'].value === ''){
      alert('Please fill all the field!');
    }
    else if(!this.batchInputForm.controls['batch_endPoint'].value.startsWith('/')){
      this.errorEndpoint = true;
    }else{
      this.inputService.createNewBatch(this.requestBatch).toPromise().then((response) => {
        if(response){
          if(response.error_schema.error_code === 'FAILED_INVALID_NAME'){
            this.errorCreateName = response.error_schema.error_message;
          } else if(response.error_schema.error_code === 'FAILED_INVALID_ENDPOINT'){
            this.errorCreateEndpoin = response.error_schema.error_message;
          }
          else{
            alert('Success create new batch!');
            window.location.reload();
          }
        }else{
          alert('Failed to create new batch!');
          window.location.reload();
        }
      }).catch(err => {
        this.router.navigate(['/404']);
      })
    }
  }


}
