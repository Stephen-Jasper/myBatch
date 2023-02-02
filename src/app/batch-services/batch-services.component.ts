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
  // dataResponse: BatchData[];
  dataGroupResponse: BatchGroupData;
  categoryList: CategoryData[];
  requestNewFeature: FeatureRequest;
  constructor(private batchService: BatchServicesService,
              private inputService: InputServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataGroupResponse = {
      batches_per_categories: [
        {
          category_id: '1',
          category_name: 'Transfer VA',
          list_batch: [
            {
              batch_id: '35',
              category_id: '1',
              batch_name: "Inquiry VA",
              description: "inquiry VA contoh deskripsi",
              environment_id: 2,
              endpoint: "/inquiry-va"
            },
            {
              batch_id: '1',
              category_id: '1',
              batch_name: "VA Inquiry (off)",
              description: "Inquiry data transfer virtual account\n\nJam : 12.00 PM sampai 16.00 PM\n          batch dijalankan setiap 15 menit\n\nJob  : Ambil data dari DB A ke DB B agar singkron \nTransaksi yang ditahan adalah transaksi yang dijalankan melebihi jam cut on.\n\nDibuat oleh KA",
              environment_id: 1,
              endpoint: "/inquiry-va"
            }
          ]
        },
        {
          category_id: '2',
          category_name: 'Transfer Domestik',
          list_batch: [
            {
              batch_id: '24',
              category_id: '2',
              batch_name: "DOM Sync",
              description: "Sync data domestik",
              environment_id: 2,
              endpoint: "/dom-sync"
            },
            {
              batch_id: '48',
              category_id: '2',
              batch_name: "Send email DOM",
              description: "Inquiry data transfer virtual account\n\nJam : 12.00 PM sampai 16.00 PM\n          batch dijalankan setiap 15 menit\n\nJob  : Ambil data dari DB A ke DB B agar singkron \nTransaksi yang ditahan adalah transaksi yang dijalankan melebihi jam cut on.\n\nDibuat oleh KA",
              environment_id: 1,
              endpoint: "/dom-email"
            }
          ]
        }
      ]
    }

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
    // this.getGroupedData();
    // this.getCategoryFilter();
  }

  toDetail(BchId: string){
    this.router.navigate(['myBatch/data-detail/' + BchId]);
  }

  convertEnv(batch: number){
    return batch === 1 ? 'DEV' : 'UAT';
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

  getCategoryFilter(){
    this.batchService.getFeature().toPromise().then((response) => {
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

  // MOCK FUNCTION

}
