import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {BatchRestore, CategoryData} from "../batch-dto/batch-response";
import {RestoreServiceService} from "./restore-service.service";
import {InputServiceService} from "../batch-services/batch-input/input-service.service";

@Component({
  selector: 'app-batch-restore',
  templateUrl: './batch-restore.component.html',
  styleUrls: ['./batch-restore.component.scss']
})
export class BatchRestoreComponent implements OnInit {
  isNoDeletedBatch: boolean = false;
  errorRestoreMessage: string;
  deletedBatch: BatchRestore[];
  categoryList: CategoryData[];

  constructor(private router: Router,
              private inputService: InputServiceService,
              private restoreService: RestoreServiceService) { }

  ngOnInit(): void {
    this.deletedBatch = [
      {
        deleted_batch_id: '1',
        category_id: '1',
        batch_name: 'VA Sync',
        description: '',
        request_method: 'GET',
        environment_id: 1,
        main_url: 'https://domainVA-DEV-Mock.co.id',
        endpoint: '/endpoint',
      }
    ]

    this.categoryList = [
      {
        category_id: '1',
        category_name: "Transfer VA",
        main_url_dev: "https://domainVA-DEV-Mock.co.id",
        main_url_uat: "https://domainVA-UAT-Mock.co.id"
      },
      {
        category_id: '2',
        category_name: "Transfer DOM",
        main_url_dev: "https://domainDOM-DEV-Mock.co.id",
        main_url_uat: "https://domainDOM-UAT-Mock.co.id"
      }
    ]

    // this.getDeletedBatch();
    // this.getCategory()
  }

  convertEnv(batch: number){
    return batch === 1 ? 'DEV' : 'UAT';
  }

  convertBatchCategory(batch: string){
    for (let i=0; i<this.categoryList.length; ++i){
      if(this.categoryList[i].category_id === batch){
        return this.categoryList[i].category_name;
      }
    }
    return batch;
  }

  getCategory(){
    this.inputService.getFeature().toPromise().then((response) => {
      if(response){
        this.categoryList = response;
      }else { // Failed
        window.location.reload();
        this.router.navigate(['/404']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
      this.router.navigate(['/404']);
    })
  }

  getDeletedBatch(){
    this.restoreService.getAllDeletedBatch().toPromise().then((response) => {
      if(response){
        this.deletedBatch = response;
        if(response.length === 0){
          this.isNoDeletedBatch = true;
        }
      }else{
        this.router.navigate(['/404']);
      }
    }).catch(resp =>{
      this.router.navigate(['/404']);
    });
  }

  executeRestore(id: string){
    this.restoreService.restoreBatch(id).toPromise().then((response) => {
      if(response){
        if(response.error_schema.error_code === 'FAILED_INVALID_NAME'){
          this.errorRestoreMessage = response.error_schema.error_message;
        } else if(response.error_schema.error_code === 'FAILED_INVALID_ENDPOINT'){
          this.errorRestoreMessage = response.error_schema.error_message;
        }else{
          alert('Batch successfully restored!')
        }
      }else{
        this.router.navigate(['/404']);
      }
    }).catch(resp =>{
      this.router.navigate(['/404']);
    });
    window.location.reload();
  }

  executePermanentDelete(id: string){
    this.restoreService.permanentDeleteBatch(id).toPromise().then((response) => {
      if(response){
        alert('Batch has been permanently deleted!')
      }else{
        this.router.navigate(['/404']);
      }
    }).catch(resp =>{
      this.router.navigate(['/404']);
    });
    window.location.reload();
  }

  toHome(){
    this.router.navigate(['/myBatch'])
  }

}
