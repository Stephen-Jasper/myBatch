import {Component, Input, OnInit} from '@angular/core';
import {BatchData, BatchGroupData, BatchRequest, CategoryData, FeatureRequest} from "../batch-dto/batch-response";
import {BatchServicesService} from "./batch-services.service";
import {Router} from "@angular/router";
import {InputServiceService} from "./batch-input/input-service.service";

@Component({
  selector: 'app-batch-services',
  templateUrl: './batch-services.component.html',
  styleUrls: ['./batch-services.component.scss']
})
export class BatchServicesComponent implements OnInit {

  selected_Batch: string;
  selected_Id: string;
  newFeature: string = '';
  newUrlDev: string = '';
  newUrlUat: string = '';
  errorDomain: boolean = false;
  showPopupFeature:boolean = false;
  showPopupCreate:boolean = false;
  showPopupDelete:boolean = false;
  dataResponse: BatchData[];
  dataGroupResponse: BatchGroupData;
  categoryList: CategoryData[];
  requestNewFeature: FeatureRequest;
  constructor(private batchService: BatchServicesService,
              private inputService: InputServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.getGroupedData();
    this.getDataBatch();
    this.getCategoryFilter();
  }

  toDetail(BchId: string){
    this.router.navigate(['myBatch/data-detail/' + BchId]);
  }

  getGroupedData(){
    this.batchService.getAllgroupData().toPromise().then((resp)=>{
      if(resp){
        this.dataGroupResponse = resp;
      }else { // Failed
        window.location.reload();
        this.router.navigate(['/404']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
      this.router.navigate(['/404']);
    });
  }

  getDataBatch(){
    this.batchService.getAllBatchData().toPromise().then((response) => {
      if (response) { // Success Get Data
        this.dataResponse = response;
      } else { // Failed
        window.location.reload();
        this.router.navigate(['/404']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
      this.router.navigate(['/404']);
    });
  }

  getCategoryFilter(){
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

  popUpFeature(){
    this.showPopupFeature = true;
  }

  createFeature(name: string, dev: string, uat:string){
    if(name === '' || dev === '' || uat === ''){
      alert('Please complete the field!');
    }else{ // HIT SERVICE
      this.requestNewFeature = {
        "category_name" : name,
        "main_url_dev": dev,
        "main_url_uat": uat
      }
      if(dev.endsWith('/') || uat.endsWith('/')){
        this.errorDomain = true;
      }else{
        this.inputService.createNewFeature(this.requestNewFeature).toPromise().then((response) => {
          if(response){
            alert("Succesfully add feature!");
            window.location.reload();
          }else{
            alert("Failed to add feature!");
            this.router.navigate(['/404']);
          }
        }).catch(err => {
          window.scrollTo(0,0);
          this.router.navigate(['/404']);
        })
      }
    }
  }

  addBatch(){
    this.showPopupCreate = true;
  }

  cancelDel(){
    this.showPopupDelete =false;
  }

  activePopUp(id: string, name:string){
    this.selected_Id = id;
    this.selected_Batch = name;
    this.showPopupDelete = true;
  }

  deleteBatch(DeletedId: string){
    this.batchService.deleteBatch(DeletedId).toPromise().then((response) => {
      if(response){
        alert("Succesfully delete batch!");
        window.location.reload();
      }else{
        alert("Failed to delete batch");
        this.router.navigate(['/404']);
      }
    }).catch(err => {
      window.scrollTo(0,0);
      this.router.navigate(['/404']);
    })
  }
}
