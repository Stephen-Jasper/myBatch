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
    this.getHistory();
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

  clearHistory(){
    this.historyService.clearAllData().toPromise().then((response) => {
      alert('Succesfully clear history data!');
      window.location.reload();
    }).catch(resp =>{
      this.router.navigate(['/404']);
    });
  }

}
