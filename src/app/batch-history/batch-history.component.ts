import { Component, OnInit } from '@angular/core';
import { HistoryData } from "../batch-dto/batch-response";
import {HistoryServiceService} from "./history-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-batch-history',
  templateUrl: './batch-history.component.html',
  styleUrls: ['./batch-history.component.scss']
})
export class BatchHistoryComponent implements OnInit {
  historyData: HistoryData[];
  isNoHistoryData: boolean;

  constructor(private historyService: HistoryServiceService,
              private router: Router) { }

  ngOnInit(): void {
    this.historyData = [
      {
        history_id: '1',
        environment: 'DEV',
        category_name: 'Transfer VA',
        hit_date: '2023-01-04T10:07:27',
        batch_name: 'VA Inquiry',
        result: 'true',
      },
      {
        history_id: '1',
        environment: 'DEV',
        category_name: 'Transfer DOM',
        hit_date: '2023-01-12T15:07:27',
        batch_name: 'DOM Inquiry',
        result: 'true',
      },
    ]
    // this.getHistory();
  }

  getHistory(){
    this.isNoHistoryData = false;
    this.historyService.getHitBatchHistory().toPromise().then((response) => {
      if(response){
        this.historyData = response;
        if(response.length === 0){
          this.isNoHistoryData = true;
        }
      }else{
        this.router.navigate(['/404']);
      }
    }).catch(resp =>{
      this.router.navigate(['/404']);
    });
  }

}
