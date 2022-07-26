import { Component, OnInit } from '@angular/core';
import {CategoryData} from "../../batch-dto/batch-response";
import {Route, Router} from "@angular/router";
import {BatchServicesService} from "../batch-services.service";

@Component({
  selector: 'app-batch-input',
  templateUrl: './batch-input.component.html',
  styleUrls: ['./batch-input.component.scss']
})
export class BatchInputComponent implements OnInit {

  dataCat: CategoryData[];
  selectedLevel = '';

  constructor(private router: Router,
              private inputService: BatchServicesService) { } // Servicenya sesuaikan

  ngOnInit(): void {
    this.dataCat = [
      {
        categoryName: 'Transfer Payroll'
      },
      {
        categoryName: 'Transfer VA'
      },
      {
        categoryName: 'Transfer BCA'
      },
      {
        categoryName: 'Transfer DOM'
      }
    ]
   // this.getFeatureData();
  }

  getFeatureData(){
    this.inputService.getFeature().toPromise().then((response) =>{
      if(response){
        this.dataCat = response;
      }else { // Failed
        window.location.reload();
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0, 0);
    })
  }

  upp(){
    alert('Select ' + this.selectedLevel);
    console.log('Test');
  }

}
