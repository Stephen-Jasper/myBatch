import {Component, Input, OnInit} from '@angular/core';
import {BatchResponse} from "../batch-dto/batch-response";

@Component({
  selector: 'app-batch-services',
  templateUrl: './batch-services.component.html',
  styleUrls: ['./batch-services.component.scss']
})
export class BatchServicesComponent implements OnInit {

  showPopup:boolean = false;
  dataResponse: BatchResponse[];
  data = [];
  constructor() { }

  ngOnInit(): void {
    this.dataResponse = [
      {
        id: '1',
        req_method: 'GET',
        env: 'DEV',
        name: 'Payroll Inquiry ',
        mainUrl: 'https://www.instagram.com',
        img: '../assets/kuromi.png'
      },
      {
        id: '2',
        req_method: 'GET',
        env: 'UAT',
        name: 'Transfer Inquiry',
        mainUrl: 'https://www.facebook.com',
        img: 'https://karir.bca.co.id/public/assets/img/logo-color.svg'
      },
      {
        id: '3',
        req_method: 'GET',
        env: 'DEV',
        name: 'VA Inquiry',
        mainUrl: 'https://www.youtube.com',
        img: '../assets/Kero2.jpg'
      },
      {
        id: '4',
        req_method: 'GET',
        env: 'UAT',
        name: 'Trf DOM Inquiry',
        mainUrl: 'https://www.youtube.com',
        img: 'https://karir.bca.co.id/public/assets/img/logo-color.svg'
      },
      {
        id: '5',
        req_method: 'GET',
        env: 'DEV',
        name: 'Trf BCA Inquiry',
        mainUrl: 'https://www.youtube.com',
        img: '../assets/HK.jpg'
      },
      {
        id: '6',
        req_method: 'UAT',
        env: 'DEV',
        name: 'Bulk trf Inquiry',
        mainUrl: 'https://www.youtube.com',
        img: 'https://karir.bca.co.id/public/assets/img/logo-color.svg'
      }
    ]
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
