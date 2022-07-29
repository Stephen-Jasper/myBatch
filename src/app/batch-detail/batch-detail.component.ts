import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {interval} from "rxjs";
import {DetailServiceService} from "./detail-service.service";
import {BatchDataDetail} from "../batch-dto/batch-response"

@Component({
  selector: 'app-batch-detail',
  templateUrl: './batch-detail.component.html',
  styleUrls: ['./batch-detail.component.scss']
})
export class BatchDetailComponent implements OnInit {

  date: Date | undefined;
  loadingDate: boolean = true;
  detailData: BatchDataDetail;
  requestId: string;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private detailService: DetailServiceService) { }

  ngOnInit(): void {
    this.requestId = (this.activeRoute.snapshot.params as any).BchId;
    this.getDataDetail();

    const source = interval(1000);
    source.subscribe((res) => {
      this.date = new Date();
      this.loadingDate = false;
    });
  }

  getDataDetail(){
    this.detailService.getSelectedBatch(this.requestId).toPromise().then((response) =>{
      if(response){
        this.detailData = response;
        console.log(this.detailData);
      }else{
        window.location.reload();
        this.router.navigate(['/401']);
      }
    }).catch(response => {
      window.scrollTo(0,0);
    })
  }

  editBatch(){
    alert(this.detailData.batchName);
  }

  backToList(){
    this.router.navigate(['/myBatch'])
  }

  logout(){
    this.router.navigate(['/login']);
  }

}
