import {Component, Input, OnInit} from '@angular/core';
import {BatchData} from "../batch-dto/batch-response";
import {BatchServicesService} from "./batch-services.service";

@Component({
  selector: 'app-batch-services',
  templateUrl: './batch-services.component.html',
  styleUrls: ['./batch-services.component.scss']
})
export class BatchServicesComponent implements OnInit {

  showPopup:boolean = false;
  dataResponse: BatchData[];
  data = [];
  constructor(private batchService: BatchServicesService) { }

  ngOnInit(): void {
    this.dataResponse = [
      {
        batchId: '1',
        categoryId: '1',
        batchName: 'Payroll Inquiry ',
        description: 'blablabla',
        requestMethod: 'GET',
        environtment: 'DEV',
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
        environtment: 'UAT',
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
        environtment: 'DEV',
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
        environtment: 'UAT',
        mainUrl: 'https://www.facebook.com',
        endpoint: 'dataBatch',
        imgUrl: 'https://karir.bca.co.id/public/assets/img/logo-color.svg'
      },
    ]
    this.getDataBatch();
  }

  getDataBatch(){
    this.batchService.getAllBatchData().toPromise().then((response) => {
      // if (response.error_schema.error_code === 'MBB-00-000') {
      //   this.dataResponse = response.output_schema;
      // } else { // kalo gagal dpt data
      //   window.location.reload();
      // }
    }).catch(response => {
      window.scrollTo(0, 0);
    });

  }

  addBatch(){
    alert('Add Batch');
  }

  activePopUp(){
    this.showPopup = true;
  }

  delete(){
    alert('Batch deleted!');
    window.location.reload();
  }

  cancelDel(){
    this.showPopup =false;
  }

  edit(){
    alert('Edit batch');
  }

}
