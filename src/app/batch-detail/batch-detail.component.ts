import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {interval} from "rxjs";
import {DetailServiceService} from "./detail-service.service";
import {BatchDataDetail} from "../batch-dto/batch-response";

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit {

  date: Date | undefined;
  loadingDate: boolean = true;
  detailData: BatchDataDetail;

  constructor(private router: Router,
              private detailService: DetailServiceService) { }

  ngOnInit(): void {
    const source = interval(1000);
    source.subscribe((res) => {
      this.date = new Date();
      this.loadingDate = false;
    });
    this.getDataDetail();
  }

  getDataDetail(){
    this.detailService.getSelectedBatch('1').toPromise().then((response) =>{
      if(response){
        this.detailData = response;
      }else{
        window.location.reload();
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0,0);
    })
  }

  editBatch(){

  }

  backToList(){
    this.router.navigate(['/myBatch'])
  }

  logout(){
    this.router.navigate(['/login']);
  }

}
