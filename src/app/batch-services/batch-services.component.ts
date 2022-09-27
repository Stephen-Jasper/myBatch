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
  panelOpen: boolean = false;
  showPopupFeature:boolean = false;
  showPopupCreate:boolean = false;
  showPopupDelete:boolean = false;
  dataResponse: BatchData[];
  dataGroupResponse: BatchGroupData;
  categoryList: CategoryData[];
  requestNewFeature: FeatureRequest;
  data = [];
  constructor(private batchService: BatchServicesService,
              private inputService: InputServiceService,
              private router: Router) { }

  ngOnInit(): void {
    // this.dataResponse = [
    //   {
    //     batchId: '1',
    //     categoryId: '1',
    //     batchName: 'Payroll Inquiry ',
    //     description: 'blablabla',
    //     requestMethod: 'GET',
    //     environment: 'DEV',
    //     mainUrl: 'https://www.instagram.com',
    //     endpoint: 'dataBatch',
    //     imgUrl: '../assets/kuromi.png'
    //   },
    //   {
    //     batchId: '2',
    //     categoryId: '1',
    //     batchName: 'Transfer Inquiry ',
    //     description: 'blablabla',
    //     requestMethod: 'GET',
    //     environment: 'UAT',
    //     mainUrl: 'https://www.facebook.com',
    //     endpoint: 'dataBatch',
    //     imgUrl: 'https://karir.bca.co.id/public/assets/img/logo-color.svg'
    //   },
    //   {
    //     batchId: '3',
    //     categoryId: '2',
    //     batchName: 'VA Inquiry ',
    //     description: 'blablabla',
    //     requestMethod: 'GET',
    //     environment: 'DEV',
    //     mainUrl: 'https://www.facebook.com',
    //     endpoint: 'dataBatch',
    //     imgUrl: '../assets/Kero2.jpg'
    //   },
    //   {
    //     batchId: '4',
    //     categoryId: '3',
    //     batchName: 'Transfer DOM Inquiry ',
    //     description: 'blablabla',
    //     requestMethod: 'GET',
    //     environment: 'UAT',
    //     mainUrl: 'https://www.facebook.com',
    //     endpoint: 'dataBatch',
    //     imgUrl: 'https://karir.bca.co.id/public/assets/img/logo-color.svg'
    //   },
    // ]
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

  expandBatch(id: string){
    this.batchService.getBatchbyCategory(id).toPromise().then((resp)=>{
      if(resp){
        this.dataResponse = resp;
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

  deleteFeature(id: string){
    this.inputService.deleteFeature(id).toPromise().then((response) => {
      if(response){
        alert('Succesfully delete feature!');
        window.location.reload();
      }else{
        alert('Faild delete feature!');
        this.router.navigate(['/404']);
      }
    }).catch(err => {
      window.scrollTo(0,0);
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
      this.inputService.createNewFeature(this.requestNewFeature).toPromise().then((response) => {
        if(response){
          alert("Succesfully add feature!");
          window.location.reload();
        }else{
          alert("Faild to add feature!");
          this.router.navigate(['/404']);
        }
      }).catch(err => {
        window.scrollTo(0,0);
        this.router.navigate(['/404']);
      })
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

  deleteService(DeletedId: string){
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

  goUp(){
    window.scrollTo(0,0);
  }
}
