import {Component, Input, OnInit} from '@angular/core';
import {BatchData} from "../batch-dto/batch-response";
import {BatchServicesService} from "./batch-services.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-batch-services',
  templateUrl: './batch-services.component.html',
  styleUrls: ['./batch-services.component.scss']
})
export class BatchServicesComponent implements OnInit {

  selected_Batch: string;
  selected_Id: string;
  showPopupDelete:boolean = false;
  showPopupCreate:boolean = false;
  dataResponse: BatchData[];
  data = [];
  constructor(private batchService: BatchServicesService,
              private router: Router) { }

  ngOnInit(): void {
    this.dataResponse = [
      {
        batchId: '1',
        categoryId: '1',
        batchName: 'Payroll Inquiry ',
        description: 'blablabla',
        requestMethod: 'GET',
        environment: 'DEV',
        mainUrl: 'https://www.instagram.com',
        endpoint: 'dataBatch',
        imgUrl: '../assets/kuromi.png'
      },
      {
        batchId: '2',
        categoryId: '1',
        batchName: 'Transfer Inquiry ',
        description: 'blablabla',
        requestMethod: 'GET',
        environment: 'UAT',
        mainUrl: 'https://www.facebook.com',
        endpoint: 'dataBatch',
        imgUrl: 'https://karir.bca.co.id/public/assets/img/logo-color.svg'
      },
      {
        batchId: '3',
        categoryId: '2',
        batchName: 'VA Inquiry ',
        description: 'blablabla',
        requestMethod: 'GET',
        environment: 'DEV',
        mainUrl: 'https://www.facebook.com',
        endpoint: 'dataBatch',
        imgUrl: '../assets/Kero2.jpg'
      },
      {
        batchId: '4',
        categoryId: '3',
        batchName: 'Transfer DOM Inquiry ',
        description: 'blablabla',
        requestMethod: 'GET',
        environment: 'UAT',
        mainUrl: 'https://www.facebook.com',
        endpoint: 'dataBatch',
        imgUrl: 'https://karir.bca.co.id/public/assets/img/logo-color.svg'
      },
    ]
    // this.getDataBatch();
  }

  getDataBatch(){
    this.batchService.getAllBatchData().toPromise().then((response) => {
      if (response) { // Success Get Data
        this.dataResponse = response;
      } else { // Failed
        window.location.reload();
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
    });

  }

  addBatch(){
    this.showPopupCreate = true;
  }

  createService(){
    // HIT SERVICE CREATE
    window.location.reload();
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
        this.router.navigate(['/401']);
      }
    }).catch(err => {
      window.scrollTo(0,0);
    })
  }

  cancelDel(){
    this.showPopupDelete =false;
  }

  edit(){
    alert('Edit batch');
  }


}
